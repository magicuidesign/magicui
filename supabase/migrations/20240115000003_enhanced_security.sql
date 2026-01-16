-- Additional Security Functions and Policies for GoldenLA Directory Platform
-- Enhanced security features for production use

-- Function to check if user can access specific submission
CREATE OR REPLACE FUNCTION public.can_access_submission(submission_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.submission s
    WHERE s.id = submission_id 
    AND (
      -- Admin can access all submissions
      EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
      OR
      -- User can access their own submissions
      s.created_by = auth.uid()
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can modify listing
CREATE OR REPLACE FUNCTION public.can_modify_listing(listing_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.listings l
    WHERE l.id = listing_id 
    AND EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log security events
CREATE TABLE IF NOT EXISTS public.security_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on security logs
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Policy for security logs (only admins can view, users can see their own logs)
CREATE POLICY "Admins can view all security logs" ON public.security_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can view own security logs" ON public.security_logs
  FOR SELECT USING (user_id = auth.uid());

-- Function to log security events (security definer)
CREATE OR REPLACE FUNCTION public.log_security_event(
  action TEXT,
  resource_type TEXT,
  resource_id UUID DEFAULT NULL,
  ip_address INET DEFAULT NULL,
  user_agent TEXT DEFAULT NULL,
  metadata JSONB DEFAULT '{}'
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.security_logs (user_id, action, resource_type, resource_id, ip_address, user_agent, metadata)
  VALUES (auth.uid(), action, resource_type, resource_id, ip_address, user_agent, metadata);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enhanced bookmark function with logging
CREATE OR REPLACE FUNCTION public.toggle_bookmark_secure(listing_id UUID, client_ip INET DEFAULT NULL, user_agent TEXT DEFAULT NULL)
RETURNS JSONB AS $$
DECLARE
  current_user UUID := auth.uid();
  current_bookmarks JSONB;
  listing_exists BOOLEAN;
  is_bookmarked BOOLEAN;
BEGIN
  -- Validate input
  IF current_user IS NULL THEN
    PERFORM public.log_security_event('bookmark_attempt_unauthorized', 'listing', listing_id, client_ip, user_agent);
    RAISE EXCEPTION 'User not authenticated';
  END IF;
  
  IF listing_id IS NULL THEN
    PERFORM public.log_security_event('bookmark_invalid_id', 'listing', listing_id, client_ip, user_agent);
    RAISE EXCEPTION 'Listing ID is required';
  END IF;
  
  -- Check if listing exists and is published
  SELECT EXISTS (
    SELECT 1 FROM public.listings 
    WHERE id = listing_id AND status = 'published'
  ) INTO listing_exists;
  
  IF NOT listing_exists THEN
    PERFORM public.log_security_event('bookmark_nonexistent_listing', 'listing', listing_id, client_ip, user_agent);
    RAISE EXCEPTION 'Listing not found or not published';
  END IF;
  
  -- Get current bookmarks
  SELECT bookmarks INTO current_bookmarks 
  FROM public.users 
  WHERE id = current_user;
  
  -- Check if already bookmarked
  is_bookmarked := current_bookmarks @> to_jsonb(listing_id);
  
  -- Toggle bookmark
  IF is_bookmarked THEN
    -- Remove bookmark
    current_bookmarks := current_bookmarks - listing_id::text;
    PERFORM public.log_security_event('bookmark_removed', 'listing', listing_id, client_ip, user_agent);
  ELSE
    -- Add bookmark
    current_bookmarks := current_bookmarks || to_jsonb(listing_id);
    PERFORM public.log_security_event('bookmark_added', 'listing', listing_id, client_ip, user_agent);
  END IF;
  
  -- Update user bookmarks
  UPDATE public.users 
  SET bookmarks = current_bookmarks 
  WHERE id = current_user;
  
  RETURN jsonb_build_object(
    'success', true,
    'bookmarked', NOT is_bookmarked,
    'bookmarks', current_bookmarks
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Rate limiting function for API calls
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on rate limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Policy for rate limits (users can only see their own limits)
CREATE POLICY "Users can view own rate limits" ON public.rate_limits
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own rate limits" ON public.rate_limits
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can insert own rate limits" ON public.rate_limits
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Function to check rate limit
CREATE OR REPLACE FUNCTION public.check_rate_limit(endpoint TEXT, max_requests INTEGER DEFAULT 100, window_minutes INTEGER DEFAULT 60)
RETURNS BOOLEAN AS $$
DECLARE
  current_user UUID := auth.uid();
  window_start TIMESTAMPTZ;
  request_count INTEGER;
BEGIN
  IF current_user IS NULL THEN
    RETURN FALSE;
  END IF;
  
  window_start := NOW() - (window_minutes || ' minutes')::INTERVAL;
  
  -- Get or create rate limit record
  SELECT request_count INTO request_count
  FROM public.rate_limits
  WHERE user_id = current_user 
    AND endpoint = endpoint 
    AND window_start <= window_start;
  
  IF request_count IS NULL THEN
    -- First request in window
    INSERT INTO public.rate_limits (user_id, endpoint, request_count, window_start)
    VALUES (current_user, endpoint, 1, NOW());
    RETURN TRUE;
  ELSIF request_count < max_requests THEN
    -- Increment counter
    UPDATE public.rate_limits
    SET request_count = request_count + 1,
        updated_at = NOW()
    WHERE user_id = current_user 
      AND endpoint = endpoint;
    RETURN TRUE;
  ELSE
    -- Rate limit exceeded
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for rate_limits updated_at
CREATE TRIGGER handle_rate_limits_updated_at
  BEFORE UPDATE ON public.rate_limits
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- Additional security policies for submissions (enhanced)
DROP POLICY IF EXISTS "Users can update own submissions" ON public.submission;
CREATE POLICY "Users can update own submissions" ON public.submission
  FOR UPDATE USING (
    auth.uid() = created_by AND 
    status = 'pending'
  )
  WITH CHECK (
    auth.uid() = created_by AND 
    status = 'pending'
  );

-- Additional security policies for listings (enhanced)
DROP POLICY IF EXISTS "Users can view own draft listings" ON public.listings;
CREATE POLICY "Users can view own draft listings" ON public.listings
  FOR SELECT USING (
    (auth.uid() = created_by AND status IN ('draft', 'published')) OR
    (status = 'published')
  );

-- Function to sanitize input (basic XSS prevention)
CREATE OR REPLACE FUNCTION public.sanitize_html(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
  -- Basic HTML sanitization - remove script tags and dangerous attributes
  RETURN regexp_replace(
    regexp_replace(
      regexp_replace(
        input_text,
        E'<script[^>]*>.*?</script>',
        '',
        'gi'
      ),
      E'on\w+="[^"]*"',
      '',
      'gi'
    ),
    E'javascript:',
    '',
    'gi'
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.can_access_submission(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_modify_listing(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_security_event(TEXT, TEXT, UUID, INET, TEXT, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.toggle_bookmark_secure(UUID, INET, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(TEXT, INTEGER, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.sanitize_html(TEXT) TO authenticated;

-- Grant permissions on security_logs table
GRANT ALL ON public.security_logs TO authenticated;
GRANT SELECT ON public.security_logs TO anon;