-- Initial database schema for GoldenLA Directory Platform
-- Creates users, submission, and listings tables with proper relationships and constraints

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table for authentication and bookmarks
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  bookmarks JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create submission table for user-submitted places pending admin approval
CREATE TABLE IF NOT EXISTS public.submission (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  about TEXT,
  cover_image TEXT,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  website TEXT,
  phone TEXT,
  price_range TEXT CHECK (price_range IN ('$', '$$', '$$$', '$$$$')),
  category TEXT,
  created_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create listings table for main directory data enriched by AI
CREATE TABLE IF NOT EXISTS public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  about TEXT,
  cover_image TEXT,
  address TEXT,
  neighborhood TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  website TEXT,
  phone TEXT,
  price_range TEXT CHECK (price_range IN ('$', '$$', '$$$', '$$$$')),
  overall_score DOUBLE PRECISION CHECK (overall_score >= 0 AND overall_score <= 10),
  sub_scores JSONB DEFAULT '{}' CHECK (
    jsonb_typeof(sub_scores) = 'object' AND
    sub_scores ? 'shopping_experience' AND
    sub_scores ? 'dining_entertainment' AND
    sub_scores ? 'ambience_design' AND
    sub_scores ? 'value_variety' AND
    sub_scores ? 'accessibility_amenities'
  ),
  public_sentiment TEXT,
  best_time_to_visit TEXT,
  category TEXT,
  tags JSONB DEFAULT '[]' CHECK (jsonb_typeof(tags) = 'array'),
  opening_hours JSONB DEFAULT '[]' CHECK (jsonb_typeof(opening_hours) = 'array'),
  accessibility_amenities TEXT,
  services TEXT,
  total_stores INTEGER DEFAULT 0 CHECK (total_stores >= 0),
  dishes TEXT,
  cuisine TEXT,
  meals TEXT,
  getting_there TEXT,
  faq JSONB DEFAULT '[]' CHECK (jsonb_typeof(faq) = 'array'),
  created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
-- Users table indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- Submission table indexes
CREATE INDEX IF NOT EXISTS idx_submission_status ON public.submission(status);
CREATE INDEX IF NOT EXISTS idx_submission_created_by ON public.submission(created_by);
CREATE INDEX IF NOT EXISTS idx_submission_category ON public.submission(category);
CREATE INDEX IF NOT EXISTS idx_submission_created_at ON public.submission(created_at);

-- Listings table indexes
CREATE INDEX IF NOT EXISTS idx_listings_slug ON public.listings(slug);
CREATE INDEX IF NOT EXISTS idx_listings_category ON public.listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_neighborhood ON public.listings(neighborhood);
CREATE INDEX IF NOT EXISTS idx_listings_status ON public.listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_overall_score ON public.listings(overall_score);
CREATE INDEX IF NOT EXISTS idx_listings_location ON public.listings(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON public.listings(created_at);

-- GIN indexes for JSONB fields
CREATE INDEX IF NOT EXISTS idx_listings_sub_scores ON public.listings USING GIN(sub_scores);
CREATE INDEX IF NOT EXISTS idx_listings_tags ON public.listings USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_listings_opening_hours ON public.listings USING GIN(opening_hours);
CREATE INDEX IF NOT EXISTS idx_listings_faq ON public.listings USING GIN(faq);
CREATE INDEX IF NOT EXISTS idx_users_bookmarks ON public.users USING GIN(bookmarks);

-- Add comments to tables
COMMENT ON TABLE public.users IS 'User authentication and profile data with bookmark functionality';
COMMENT ON TABLE public.submission IS 'User-submitted places pending admin approval';
COMMENT ON TABLE public.listings IS 'Main directory data enriched with AI-generated metadata';

-- Add comments to important columns
COMMENT ON COLUMN public.users.bookmarks IS 'JSON array of listing IDs bookmarked by the user';
COMMENT ON COLUMN public.submission.status IS 'Approval status: pending, approved, or rejected';
COMMENT ON COLUMN public.listings.sub_scores IS 'Detailed breakdown of ratings across different categories';
COMMENT ON COLUMN public.listings.overall_score IS 'Combined rating score from 0 to 10';
COMMENT ON COLUMN public.listings.slug IS 'SEO-friendly unique identifier for the listing';
COMMENT ON COLUMN public.listings.tags IS 'Array of descriptive tags for categorization and search';
COMMENT ON COLUMN public.listings.opening_hours IS 'Array of operating hours for different days';
COMMENT ON COLUMN public.listings.faq IS 'Array of frequently asked questions and answers';

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables with updated_at columns
CREATE TRIGGER handle_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_submission_updated_at
  BEFORE UPDATE ON public.submission
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();