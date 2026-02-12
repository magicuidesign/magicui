# GoldenLA Database Schema

This directory contains the complete database schema for the GoldenLA Directory Platform using Supabase and PostgreSQL.

## 📋 Overview

The database consists of three main tables:
- `users` - User authentication and profile data with bookmark functionality
- `submission` - User-submitted places pending admin approval
- `listings` - Main directory data enriched with AI-generated metadata

## 🗄️ Table Structure

### users Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| name | TEXT | User's display name |
| email | TEXT | User's email (unique) |
| role | TEXT | User role ('user' or 'admin') |
| bookmarks | JSONB | Array of bookmarked listing IDs |
| created_at | TIMESTAMPTZ | Record creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### submission Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| name | TEXT | Place name (required) |
| about | TEXT | Description of the place |
| cover_image | TEXT | Hero image URL |
| address | TEXT | Full address |
| latitude | DOUBLE PRECISION | GPS latitude |
| longitude | DOUBLE PRECISION | GPS longitude |
| website | TEXT | Official website URL |
| phone | TEXT | Contact phone number |
| price_range | TEXT | Price level ($, $$, $$$, $$$$) |
| category | TEXT | Place type/category |
| created_by | UUID | Foreign key to users table |
| status | TEXT | Approval status ('pending', 'approved', 'rejected') |
| admin_note | TEXT | Admin notes for rejection/approval |
| created_at | TIMESTAMPTZ | Record creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### listings Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| name | TEXT | Place name (required) |
| slug | TEXT | SEO-friendly URL slug (unique) |
| about | TEXT | Description of the place |
| cover_image | TEXT | Hero image URL |
| address | TEXT | Full address |
| neighborhood | TEXT | Derived neighborhood name |
| latitude | DOUBLE PRECISION | GPS latitude |
| longitude | DOUBLE PRECISION | GPS longitude |
| website | TEXT | Official website URL |
| phone | TEXT | Contact phone number |
| price_range | TEXT | Price level ($, $$, $$$, $$$$) |
| overall_score | DOUBLE PRECISION | Combined rating (0-10) |
| sub_scores | JSONB | Detailed category breakdown |
| public_sentiment | TEXT | Review summary |
| best_time_to_visit | TEXT | Optimal visit times |
| category | TEXT | Place type/category |
| tags | JSONB | Array of descriptive tags |
| opening_hours | JSONB | Operating hours array |
| accessibility_amenities | TEXT | Accessibility information |
| services | TEXT | Available services |
| total_stores | INTEGER | Number of stores (for malls) |
| dishes | TEXT | Featured menu items |
| cuisine | TEXT | Cuisine type |
| meals | TEXT | Meal types served |
| getting_there | TEXT | Directions information |
| faq | JSONB | FAQ array |
| created_by | UUID | Foreign key to users table |
| status | TEXT | Publication status ('draft', 'published', 'archived') |
| created_at | TIMESTAMPTZ | Record creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

## 📊 Sub-scores Structure

The `sub_scores` JSONB field contains detailed ratings:

```json
{
  "shopping_experience": 9.2,
  "dining_entertainment": 9.1,
  "ambience_design": 9.0,
  "value_variety": 8.9,
  "accessibility_amenities": 9.1
}
```

Each score is rated from 0-10 and contributes to the `overall_score`.

## 🔒 Security Features

### Row-Level Security (RLS)

All tables have RLS enabled with policies for:
- **Users**: Can only view/update their own profile
- **Submissions**: Users can only view/update their own submissions
- **Listings**: Public read access to published listings, admin write access

### Database Functions

- `is_admin()`: Returns true if current user is an admin
- `toggle_bookmark(listing_id)`: Adds/removes a listing from user bookmarks
- `get_user_bookmarks()`: Returns all bookmarked listing IDs for current user

## 🚀 Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### 2. Run Migrations

```bash
# Install Supabase CLI
npm install -g @supabase/cli

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref <your-project-ref>

# Run migrations
supabase db push
```

### 3. Configure Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 📝 Migration Files

### 20240115000001_initial_schema.sql
- Creates all three tables with proper constraints
- Sets up indexes for performance
- Adds triggers for updated_at timestamps
- Includes comments for documentation

### 20240115000002_rls_policies.sql
- Enables RLS on all tables
- Creates comprehensive security policies
- Sets up admin role and permissions
- Includes helper functions for bookmarks

## 🔧 TypeScript Support

The `types/database.ts` file provides complete TypeScript definitions for:
- All table schemas (Row, Insert, Update types)
- Database functions
- Form types
- API response types

## 📈 Performance Indexes

The schema includes strategic indexes:
- **B-tree indexes** on frequently queried fields (slug, category, status, etc.)
- **GIN indexes** on JSONB fields for fast JSON queries
- **Composite indexes** on location data for geo-queries
- **Partial indexes** for common filter combinations

## 🛡️ Data Validation

The schema includes comprehensive constraints:
- **Check constraints** for enums and score ranges
- **NOT NULL constraints** on required fields
- **UNIQUE constraints** on emails and slugs
- **Foreign key constraints** with proper cascading rules

## 🔄 Data Flow

1. **User submits place** → `submission` table (status: pending)
2. **Admin reviews submission** → Approves/Rejects with notes
3. **Approved data** → CSV export → AI enrichment → `listings` table
4. **Published listings** → Visible on public directory

## 🧪 Testing

To test the database setup:

```sql
-- Test user creation
INSERT INTO users (email, name, role) VALUES ('test@example.com', 'Test User', 'user');

-- Test submission creation
INSERT INTO submission (name, address, category, created_by) 
VALUES ('Test Place', '123 Test St', 'restaurant', (SELECT id FROM users WHERE email = 'test@example.com'));

-- Test listing creation
INSERT INTO listings (name, slug, about, category, overall_score, sub_scores, status)
VALUES (
  'Test Restaurant',
  'test-restaurant',
  'A great place to eat',
  'restaurant',
  8.5,
  '{"shopping_experience": 8.0, "dining_entertainment": 9.0, "ambience_design": 8.5, "value_variety": 8.2, "accessibility_amenities": 8.8}',
  'published'
);
```