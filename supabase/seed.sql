-- Sample seed data for GoldenLA Directory Platform
-- Use for development and testing purposes

-- Insert sample users
INSERT INTO public.users (id, email, name, role) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'admin@goldenla.com', 'Admin User', 'admin'),
  ('550e8400-e29b-41d4-a716-446655440002', 'user1@example.com', 'John Doe', 'user'),
  ('550e8400-e29b-41d4-a716-446655440003', 'user2@example.com', 'Jane Smith', 'user')
ON CONFLICT (email) DO NOTHING;

-- Insert sample listings
INSERT INTO public.listings (name, slug, about, address, neighborhood, latitude, longitude, website, phone, price_range, overall_score, sub_scores, public_sentiment, best_time_to_visit, category, tags, opening_hours, accessibility_amenities, services, total_stores, dishes, cuisine, meals, getting_there, faq, status) VALUES
  (
    'The Grove Los Angeles',
    'the-grove-los-angeles',
    'The Grove is a popular open-air shopping and entertainment complex in Los Angeles, featuring a mix of retail stores, restaurants, and entertainment venues.',
    '189 The Grove Dr, Los Angeles, CA 90036',
    'Mid-City West',
    34.0708,
    -118.3579,
    'https://thegrovela.com',
    '(323) 900-8000',
    '$$$',
    8.8,
    '{"shopping_experience": 9.0, "dining_entertainment": 8.5, "ambience_design": 9.2, "value_variety": 8.4, "accessibility_amenities": 8.9}',
    'Visitors love the beautiful atmosphere and diverse shopping options, though some find parking challenging during peak hours.',
    'Weekdays after 6PM or weekend mornings for fewer crowds',
    'shopping_center',
    '["Shopping", "Dining", "Entertainment", "Outdoor", "Family-Friendly"]',
    '[
      {"day": "Monday", "open": "10:00", "close": "21:00"},
      {"day": "Tuesday", "open": "10:00", "close": "21:00"},
      {"day": "Wednesday", "open": "10:00", "close": "21:00"},
      {"day": "Thursday", "open": "10:00", "close": "21:00"},
      {"day": "Friday", "open": "10:00", "close": "22:00"},
      {"day": "Saturday", "open": "10:00", "close": "22:00"},
      {"day": "Sunday", "open": "11:00", "close": "20:00"}
    ]',
    'Wheelchair accessible, Elevators available, Accessible restrooms, ADA compliant',
    'Valet parking, Self-parking, Guest services, Personal shopping, Free Wi-Fi',
    45,
    'Gourmet burgers, artisanal coffee, fresh pastries, craft cocktails',
    'International cuisine, American classics, Asian fusion, Mexican',
    'Breakfast, Lunch, Dinner, Weekend brunch, Happy hour',
    'Located adjacent to The Original Farmers Market. Access via Fairfax Avenue or 3rd Street. Metro Line 217 stops nearby. Parking available in multiple garages.',
    '[
      {"question": "Is parking free?", "answer": "No, parking is paid but validation is available at select stores."},
      {"question": "Are pets allowed?", "answer": "Service animals are welcome. Pets are not allowed in stores except in designated outdoor areas."},
      {"question": "Is there a dress code?", "answer": "No, casual attire is appropriate throughout the center."}
    ]',
    'published'
  ),
  (
    'Grand Central Market',
    'grand-central-market',
    'A historic food hall in Downtown Los Angeles offering diverse culinary options from local vendors, ranging from traditional Mexican to modern fusion cuisine.',
    '317 S Broadway, Los Angeles, CA 90013',
    'Downtown',
    34.0505,
    -118.2494,
    'https://grandcentralmarket.com',
    '(213) 624-2378',
    '$$',
    9.1,
    '{"shopping_experience": 8.2, "dining_entertainment": 9.5, "ambience_design": 8.8, "value_variety": 9.3, "accessibility_amenities": 8.7}',
    'Food enthusiasts praise the diverse food options and authentic local flavors, though it can get very crowded during lunch hours.',
    'Tuesday-Thursday 2PM-4PM for fewer crowds, weekend mornings for relaxed browsing',
    'food_market',
    '["Food Hall", "Historic", "Local Vendors", "Diverse Cuisine", "Lunch Spot"]',
    '[
      {"day": "Monday", "open": "08:00", "close": "21:00"},
      {"day": "Tuesday", "open": "08:00", "close": "21:00"},
      {"day": "Wednesday", "open": "08:00", "close": "21:00"},
      {"day": "Thursday", "open": "08:00", "close": "21:00"},
      {"day": "Friday", "open": "08:00", "close": "22:00"},
      {"day": "Saturday", "open": "09:00", "close": "22:00"},
      {"day": "Sunday", "open": "09:00", "close": "18:00"}
    ]',
    'Wheelchair accessible, Accessible restrooms, Wide aisles, Ground floor access',
    'Seating areas, ATMs, Information desk, Free Wi-Fi, Community events',
    38,
    'Pupusas, ramen, tacos, egg sandwiches, seafood, coffee, pastries',
    'Mexican, Japanese, American, Salvadoran, Chinese, Fusion',
    'Breakfast, Lunch, Dinner, Brunch, Late night, Happy hour',
    'Conveniently located in Downtown LA. Take Metro Red/Purple Line to Civic Center/Grand Park Station. Numerous bus lines stop nearby. Paid parking available in adjacent lots.',
    '[
      {"question": "Is cash accepted everywhere?", "answer": "Most vendors accept both cash and cards, but some small vendors are cash-only. ATMs are available on-site."},
      {"question": "Can I bring my own containers?", "answer": "Some vendors allow reusable containers, but policies vary by vendor."},
      {"question": "Is there seating available?", "answer": "Yes, there are multiple seating areas throughout the market, though they fill up quickly during peak hours."}
    ]',
    'published'
  ),
  (
    'Santa Monica Place',
    'santa-monica-place',
    'A premier shopping destination featuring luxury brands, dining options, and ocean views, located just steps from the Santa Monica Pier and beach.',
    '395 Santa Monica Pl, Santa Monica, CA 90401',
    'Santa Monica',
    34.0161,
    -118.4965,
    'https://www.santamonicaplace.com',
    '(310) 260-8333',
    '$$$$',
    8.7,
    '{"shopping_experience": 9.3, "dining_entertainment": 8.9, "ambience_design": 9.4, "value_variety": 7.8, "accessibility_amenities": 8.9}',
    'Shoppers love the upscale atmosphere and ocean views, though many mention the high price points of stores and restaurants.',
    'Weekday mornings for peaceful shopping, evenings for dining with ocean views',
    'shopping_center',
    '["Luxury Shopping", "Ocean Views", "Fine Dining", "Fashion", "Premium Brands"]',
    '[
      {"day": "Monday", "open": "10:00", "close": "20:00"},
      {"day": "Tuesday", "open": "10:00", "close": "20:00"},
      {"day": "Wednesday", "open": "10:00", "close": "20:00"},
      {"day": "Thursday", "open": "10:00", "close": "20:00"},
      {"day": "Friday", "open": "10:00", "close": "21:00"},
      {"day": "Saturday", "open": "10:00", "close": "21:00"},
      {"day": "Sunday", "open": "11:00", "close": "19:00"}
    ]',
    'Full wheelchair accessibility, Elevators and escalators, Accessible parking, Accessible restrooms',
    'Personal shopping, Concierge services, Valet parking, Package carry-out, Restaurant reservations, Free Wi-Fi',
    85,
    'Premium steaks, fresh seafood, artisanal cocktails, gourmet desserts',
    'Fine dining, Californian cuisine, International cuisine, Farm-to-table',
    'Lunch, Dinner, Weekend brunch, Happy hour, Sunday brunch',
    'Located in the heart of Santa Monica, adjacent to Third Street Promenade. Easy access via the Expo Line (Downtown Santa Monica station). Multiple parking structures available.',
    '[
      {"question": "Is validation available for parking?", "answer": "Validation is available for certain restaurants and stores with minimum purchase requirements."},
      {"question": "Can I access the beach from the mall?", "answer": "Yes, the mall is directly connected to Santa Monica Beach via walkways and stairs."},
      {"question": "Are there family facilities?", "answer": "Yes, family restrooms with changing stations are available on multiple levels."}
    ]',
    'published'
  )
ON CONFLICT (slug) DO NOTHING;

-- Insert sample submissions
INSERT INTO public.submission (name, about, address, category, created_by, status) VALUES
  ('Test Cafe', 'A cozy neighborhood coffee shop serving artisanal coffee and pastries.', '123 Test St, Los Angeles, CA', 'coffee_shop', '550e8400-e29b-41d4-a716-446655440002', 'pending'),
  ('New Restaurant', 'An upcoming fine dining restaurant focusing on seasonal ingredients.', '456 Food Ave, Santa Monica, CA', 'restaurant', '550e8400-e29b-41d4-a716-446655440003', 'pending')
ON CONFLICT DO NOTHING;

-- Update user bookmarks for testing
UPDATE public.users 
SET bookmarks = '["550e8400-e29b-41d4-a716-446655440001", "550e8400-e29b-41d4-a716-446655440002"]'
WHERE email = 'user1@example.com';

UPDATE public.users 
SET bookmarks = '["550e8400-e29b-41d4-a716-446655440003"]'
WHERE email = 'user2@example.com';