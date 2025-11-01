-- Row-Level Security (RLS) policies for GoldenLA Directory Platform
-- Ensures proper access control for users and admins

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Create admin role for elevated permissions
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'admin') THEN
    CREATE ROLE admin;
  END IF;
END
$$;

-- Users table policies
-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Policy: Users can update their own profile and bookmarks
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Admins can view all users
CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can update any user
CREATE POLICY "Admins can update any user" ON public.users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Users can insert their own profile (handled by Supabase Auth)
CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Submission table policies
-- Policy: Users can view their own submissions
CREATE POLICY "Users can view own submissions" ON public.submission
  FOR SELECT USING (auth.uid() = created_by);

-- Policy: Users can insert their own submissions
CREATE POLICY "Users can insert own submissions" ON public.submission
  FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Policy: Users can update their own submissions (only before approval)
CREATE POLICY "Users can update own submissions" ON public.submission
  FOR UPDATE USING (
    auth.uid() = created_by AND status = 'pending'
  )
  WITH CHECK (
    auth.uid() = created_by AND status = 'pending'
  );

-- Policy: Admins can view all submissions
CREATE POLICY "Admins can view all submissions" ON public.submission
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can update any submission
CREATE POLICY "Admins can update any submission" ON public.submission
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can delete submissions
CREATE POLICY "Admins can delete submissions" ON public.submission
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Listings table policies
-- Policy: Public can read published listings
CREATE POLICY "Public can read published listings" ON public.listings
  FOR SELECT USING (status = 'published');

-- Policy: Users can view their own draft listings
CREATE POLICY "Users can view own draft listings" ON public.listings
  FOR SELECT USING (
    auth.uid() = created_by AND status IN ('draft', 'published')
  );

-- Policy: Admins can view all listings
CREATE POLICY "Admins can view all listings" ON public.listings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can insert listings
CREATE POLICY "Admins can insert listings" ON public.listings
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can update any listing
CREATE POLICY "Admins can update any listing" ON public.listings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can delete listings
CREATE POLICY "Admins can delete listings" ON public.listings
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT role = 'admin' 
    FROM public.users 
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to handle bookmark updates
CREATE OR REPLACE FUNCTION public.toggle_bookmark(listing_id UUID)
RETURNS JSONB AS $$
DECLARE
  current_user UUID := auth.uid();
  current_bookmarks JSONB;
BEGIN
  -- Validate input
  IF current_user IS NULL THEN
    RAISE EXCEPTION 'User not authenticated';
  END IF;
  
  IF listing_id IS NULL THEN
    RAISE EXCEPTION 'Listing ID is required';
  END IF;
  
  -- Get current bookmarks
  SELECT bookmarks INTO current_bookmarks 
  FROM public.users 
  WHERE id = current_user;
  
  -- Toggle bookmark
  IF current_bookmarks @> to_jsonb(listing_id) THEN
    -- Remove bookmark
    current_bookmarks := current_bookmarks - listing_id::text;
  ELSE
    -- Add bookmark
    current_bookmarks := current_bookmarks || to_jsonb(listing_id);
  END IF;
  
  -- Update user bookmarks
  UPDATE public.users 
  SET bookmarks = current_bookmarks 
  WHERE id = current_user;
  
  RETURN jsonb_build_object(
    'success', true,
    'bookmarked', NOT (current_bookmarks @> to_jsonb(listing_id)),
    'bookmarks', current_bookmarks
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.toggle_bookmark(UUID) TO authenticated;

-- Grant permissions on tables
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON public.users TO authenticated;
GRANT SELECT ON public.users TO anon;
GRANT ALL ON public.submission TO authenticated;
GRANT SELECT ON public.submission TO anon;
GRANT ALL ON public.listings TO authenticated;
GRANT SELECT ON public.listings TO anon;

-- Create function to get user's bookmarked listings
CREATE OR REPLACE FUNCTION public.get_user_bookmarks()
RETURNS SETOF UUID AS $$
BEGIN
  RETURN QUERY
  SELECT jsonb_array_elements_text(bookmarks)::UUID
  FROM public.users
  WHERE id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.get_user_bookmarks() TO authenticated;