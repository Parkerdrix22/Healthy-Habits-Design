-- Healthy Habits - Seed Data (10 rows per table)

-- Users
INSERT INTO Users (userID, username, passwordHash, firstName, lastName, email, userRole, dateCreated, lastLogin) VALUES
(1,  'jparker',    'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2', 'Jamie',    'Parker',   'jamie@healthyhabits.com',   'parent',  '2025-01-10 08:00:00', '2026-02-17 09:15:00'),
(2,  'sthompson',  'b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3', 'Sara',     'Thompson', 'sara@healthyhabits.com',    'parent',  '2025-02-14 10:30:00', '2026-02-16 18:45:00'),
(3,  'mreyes',     'c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4', 'Marco',    'Reyes',    'marco@healthyhabits.com',   'parent',  '2025-03-01 12:00:00', '2026-02-15 07:30:00'),
(4,  'lchen',      'd4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5', 'Lisa',     'Chen',     'lisa@healthyhabits.com',    'parent',  '2025-03-20 09:00:00', '2026-02-17 11:00:00'),
(5,  'dwilson',    'e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6', 'Derek',    'Wilson',   'derek@healthyhabits.com',   'parent',  '2025-04-05 14:00:00', '2026-02-14 20:00:00'),
(6,  'amorales',   'f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1', 'Ana',      'Morales',  'ana@healthyhabits.com',     'parent',  '2025-05-12 07:45:00', '2026-02-17 08:00:00'),
(7,  'coachkim',   'a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3', 'Kim',      'Nguyen',   'kim@healthyhabits.com',     'coach',   '2025-01-05 08:00:00', '2026-02-17 10:30:00'),
(8,  'nutrijess',  'b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4', 'Jessica',  'Adams',    'jessica@healthyhabits.com', 'coach',   '2025-01-08 09:00:00', '2026-02-16 14:00:00'),
(9,  'adminalex',  'c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5', 'Alex',     'Rivera',   'alex@healthyhabits.com',    'admin',   '2025-01-01 00:00:00', '2026-02-17 12:00:00'),
(10, 'tblake',     'd5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6', 'Tanya',    'Blake',    'tanya@healthyhabits.com',   'parent',  '2025-06-01 11:00:00', '2026-02-13 16:30:00');

-- Children
INSERT INTO Children (childID, userID, firstName, lastName, birthdate, age, height, weight, dateCreated) VALUES
(1,  1, 'Avery',   'Parker',   '2015-06-15 00:00:00', 10, 54.50, 72.00,  '2025-01-10 08:05:00'),
(2,  1, 'Jordan',  'Parker',   '2017-09-22 00:00:00', 8,  48.25, 58.50,  '2025-01-10 08:06:00'),
(3,  2, 'Mia',     'Thompson', '2014-03-10 00:00:00', 11, 57.00, 80.00,  '2025-02-14 10:35:00'),
(4,  2, 'Ethan',   'Thompson', '2016-11-05 00:00:00', 9,  50.75, 64.00,  '2025-02-14 10:36:00'),
(5,  3, 'Sofia',   'Reyes',    '2015-01-28 00:00:00', 10, 55.00, 74.50,  '2025-03-01 12:05:00'),
(6,  4, 'Lucas',   'Chen',     '2013-08-19 00:00:00', 12, 60.25, 92.00,  '2025-03-20 09:05:00'),
(7,  4, 'Emma',    'Chen',     '2016-04-03 00:00:00', 9,  49.50, 60.00,  '2025-03-20 09:06:00'),
(8,  5, 'Noah',    'Wilson',   '2014-12-01 00:00:00', 11, 58.00, 85.00,  '2025-04-05 14:05:00'),
(9,  6, 'Isabella','Morales',  '2015-07-20 00:00:00', 10, 53.75, 70.00,  '2025-05-12 07:50:00'),
(10, 10,'Caleb',   'Blake',    '2016-02-14 00:00:00', 9,  51.00, 66.00,  '2025-06-01 11:05:00');

-- activityLogs
INSERT INTO activityLogs (activityID, childID, activityType, timeCreated, duration, steps, caloriesBurned, repeatingFlag) VALUES
(1,  1, 'Soccer drills',  '2026-02-17 08:00:00', 45, 4200, 280, TRUE),
(2,  1, 'Bike ride',      '2026-02-16 15:30:00', 30, 0,    210, FALSE),
(3,  2, 'Basketball',     '2026-02-17 09:00:00', 40, 3800, 250, TRUE),
(4,  3, 'Swimming',       '2026-02-15 16:00:00', 60, 0,    400, TRUE),
(5,  4, 'Jump rope',      '2026-02-17 07:30:00', 15, 1500, 120, FALSE),
(6,  5, 'Dance cardio',   '2026-02-16 17:00:00', 35, 3200, 230, TRUE),
(7,  6, 'Running',        '2026-02-17 06:45:00', 25, 3000, 200, TRUE),
(8,  7, 'Yoga stretch',   '2026-02-15 18:00:00', 30, 500,  90,  FALSE),
(9,  8, 'Family walk',    '2026-02-16 10:00:00', 50, 5500, 180, TRUE),
(10, 9, 'Hiking',         '2026-02-14 09:00:00', 90, 8000, 450, FALSE);

-- Goals
INSERT INTO Goals (goalID, userID, childID, category, targetValue, goalType, value, unit, start_date, end_date, frequency, isActive) VALUES
(1,  1, 1, 'Fitness',     10000, 'Steps',          8200,  'steps',    '2026-02-01 00:00:00', '2026-02-28 23:59:59', 'Daily',   TRUE),
(2,  1, 1, 'Reading',     20,    'Duration',        15,   'minutes',  '2026-02-01 00:00:00', '2026-02-28 23:59:59', 'Daily',   TRUE),
(3,  1, 2, 'Fitness',     8000,  'Steps',          6900,  'steps',    '2026-02-01 00:00:00', '2026-02-28 23:59:59', 'Daily',   TRUE),
(4,  2, 3, 'Nutrition',   5,     'Veggie Servings', 4,    'servings', '2026-02-01 00:00:00', '2026-02-28 23:59:59', 'Daily',   TRUE),
(5,  2, 4, 'Screen Time', 2,     'Limit',           1,    'hours',    '2026-02-01 00:00:00', '2026-02-28 23:59:59', 'Daily',   TRUE),
(6,  3, 5, 'Fitness',     150,   'Active Minutes',  120,  'minutes',  '2026-02-10 00:00:00', '2026-03-10 23:59:59', 'Weekly',  TRUE),
(7,  4, 6, 'Hydration',   8,     'Water Intake',    6,    'cups',     '2026-01-15 00:00:00', '2026-04-15 23:59:59', 'Daily',   TRUE),
(8,  4, 7, 'Sleep',       10,    'Duration',        9,    'hours',    '2026-02-01 00:00:00', '2026-02-28 23:59:59', 'Daily',   TRUE),
(9,  5, 8, 'Fitness',     5,     'Workouts',        3,    'sessions', '2026-02-01 00:00:00', '2026-02-28 23:59:59', 'Weekly',  TRUE),
(10, 6, 9, 'Reading',     30,    'Duration',        25,   'minutes',  '2026-02-01 00:00:00', '2026-02-28 23:59:59', 'Daily',   FALSE);

-- workoutIdeas
INSERT INTO workoutIdeas (workoutID, title, description, instructions, ageGroup, durationMinutes, intensity, equipment, location, tags, createdAt, createdByUserID) VALUES
(1,  'Soccer Drills',       'Basic dribbling and passing drills for kids',               'Set up cones 5 feet apart. Dribble through and pass.',          '8-12',  30, 'Medium',  'Soccer ball, cones',  'Outdoor',  'cardio,team',     '2025-06-01 10:00:00', 7),
(2,  'Family Yoga Flow',    'Gentle yoga routine for all ages',                          'Follow along with poses: tree, warrior, downward dog.',          '6-12',  25, 'Low',     'Yoga mat',            'Indoor',   'flexibility',     '2025-06-05 11:00:00', 7),
(3,  'Jump Rope Challenge', 'Interval jump rope for endurance',                          'Jump 30 sec, rest 15 sec. Repeat 10 rounds.',                   '8-12',  15, 'High',    'Jump rope',           'Outdoor',  'cardio,endurance','2025-07-10 08:00:00', 7),
(4,  'Dance Party',         'High-energy dance session with fun music',                  'Play upbeat songs and freestyle dance for the duration.',        '6-10',  20, 'Medium',  'None',                'Indoor',   'cardio,fun',      '2025-07-15 14:00:00', 8),
(5,  'Obstacle Course',     'Backyard obstacle course for agility',                      'Set up stations: crawl, jump, balance beam, sprint.',            '6-12',  35, 'High',    'Household items',     'Outdoor',  'agility,strength','2025-08-01 09:00:00', 7),
(6,  'Morning Stretches',   'Wake-up stretching routine',                                'Stretch neck, arms, legs, and back. Hold each 20 sec.',         '6-12',  10, 'Low',     'None',                'Indoor',   'flexibility',     '2025-08-10 07:00:00', 8),
(7,  'Basketball Basics',   'Dribbling, shooting, and layup practice',                   'Warm up, practice dribbling, then shoot from free throw.',       '8-12',  40, 'Medium',  'Basketball, hoop',    'Outdoor',  'cardio,team',     '2025-09-01 16:00:00', 7),
(8,  'Nature Hike',         'Easy trail hike with nature scavenger hunt',                'Hike a beginner trail. Find 5 items from the scavenger list.',   '6-12',  60, 'Low',     'Comfortable shoes',   'Outdoor',  'endurance,nature','2025-09-15 10:00:00', 9),
(9,  'Strength Circuit',    'Bodyweight exercises for building strength',                'Do 10 squats, 10 push-ups, 10 lunges. Repeat 3 rounds.',        '10-12', 20, 'High',    'None',                'Indoor',   'strength',        '2025-10-01 15:00:00', 7),
(10, 'Bike Adventure',      'Neighborhood bike ride exploring local paths',              'Ride at a steady pace for 30 min. Stay on designated paths.',    '8-12',  30, 'Medium',  'Bicycle, helmet',     'Outdoor',  'cardio,endurance','2025-10-20 09:00:00', 8);

-- recipes
INSERT INTO recipes (recipeID, title, difficulty, description, instructions, nutritionInfo, prepMinutes, cookMinutes, servings, tags, imageURL, createdAt, createdByUserID) VALUES
(1,  'Berry Yogurt Bowl',     'Easy',   'Greek yogurt topped with fresh berries and granola',    'Scoop yogurt into bowl. Add berries and granola on top.',       'Protein 15g, Carbs 30g',  5,  0,  1, 'breakfast,healthy',  '/img/berry-bowl.jpg',    '2025-06-01 08:00:00', 8),
(2,  'Avocado Toast',         'Easy',   'Whole grain toast with mashed avocado and seasoning',   'Toast bread. Mash avocado, spread on toast, season.',           'Fat 14g, Fiber 8g',       5,  3,  1, 'breakfast,quick',    '/img/avo-toast.jpg',     '2025-06-10 09:00:00', 8),
(3,  'Chicken Veggie Wrap',   'Easy',   'Grilled chicken with veggies in a whole wheat wrap',    'Grill chicken. Chop veggies. Wrap together with sauce.',        'Protein 28g, Carbs 35g',  10, 10, 2, 'lunch,protein',      '/img/chicken-wrap.jpg',  '2025-07-01 12:00:00', 8),
(4,  'Salmon Rice Bowl',      'Medium', 'Baked salmon over brown rice with steamed broccoli',    'Bake salmon 20 min at 400F. Cook rice. Steam broccoli.',        'Protein 32g, Omega-3',    10, 25, 2, 'dinner,omega3',      '/img/salmon-bowl.jpg',   '2025-07-15 17:00:00', 8),
(5,  'Fruit Smoothie',        'Easy',   'Blended banana, strawberries, spinach, and almond milk','Add all ingredients to blender. Blend until smooth.',            'Vitamin C, Fiber 5g',     5,  0,  1, 'snack,drink',        '/img/smoothie.jpg',      '2025-08-01 07:00:00', 7),
(6,  'Veggie Pasta',          'Medium', 'Whole wheat pasta with sauteed seasonal vegetables',    'Cook pasta. Saute veggies in olive oil. Toss together.',        'Fiber 9g, Carbs 45g',     10, 15, 4, 'dinner,vegetarian',  '/img/veggie-pasta.jpg',  '2025-08-20 18:00:00', 8),
(7,  'Apple Peanut Butter',   'Easy',   'Sliced apple with natural peanut butter dip',           'Slice apple. Serve with 2 tbsp peanut butter.',                'Protein 7g, Fiber 4g',    5,  0,  1, 'snack,quick',        '/img/apple-pb.jpg',      '2025-09-05 15:00:00', 9),
(8,  'Turkey Sandwich',       'Easy',   'Whole grain bread with turkey, lettuce, and tomato',    'Layer turkey, lettuce, tomato on bread. Add mustard.',          'Protein 22g, Carbs 28g',  5,  0,  1, 'lunch,protein',      '/img/turkey-sand.jpg',   '2025-09-18 12:00:00', 8),
(9,  'Oatmeal Power Bowl',    'Easy',   'Rolled oats with banana, honey, and chia seeds',        'Cook oats. Top with sliced banana, honey, chia seeds.',         'Fiber 8g, Carbs 40g',     5,  5,  1, 'breakfast,fiber',    '/img/oatmeal.jpg',       '2025-10-01 07:30:00', 7),
(10, 'Homemade Trail Mix',    'Easy',   'Mixed nuts, dried fruit, and dark chocolate chips',     'Combine almonds, cashews, raisins, and chocolate chips.',       'Healthy fats, Protein 6g', 5, 0,  4, 'snack,energy',       '/img/trail-mix.jpg',     '2025-10-15 10:00:00', 9);

-- nutritionLog
INSERT INTO nutritionLog (nutritionLogID, childID, foodItem, foodGroup, timeStamp, servingSize, isHealthy) VALUES
(1,  1, 'Avocado toast',       'Grain',     '2026-02-17 07:30:00', 1, TRUE),
(2,  1, 'Berry yogurt bowl',   'Dairy',     '2026-02-17 10:00:00', 1, TRUE),
(3,  1, 'Chicken wrap',        'Protein',   '2026-02-17 12:30:00', 1, TRUE),
(4,  2, 'Fruit smoothie',      'Fruit',     '2026-02-17 08:00:00', 1, TRUE),
(5,  2, 'Turkey sandwich',     'Protein',   '2026-02-17 12:00:00', 1, TRUE),
(6,  3, 'Oatmeal power bowl',  'Grain',     '2026-02-17 07:00:00', 1, TRUE),
(7,  4, 'Candy bar',           'Sweets',    '2026-02-17 15:00:00', 1, FALSE),
(8,  5, 'Salmon rice bowl',    'Protein',   '2026-02-16 18:00:00', 1, TRUE),
(9,  6, 'Apple peanut butter', 'Fruit',     '2026-02-17 15:30:00', 1, TRUE),
(10, 8, 'Soda',                'Beverage',  '2026-02-16 13:00:00', 1, FALSE);

-- screenTimeLog
INSERT INTO screenTimeLog (screenTimeLogID, childID, date, duration, deviceType, activityType, timeStamp) VALUES
(1,  1, '2026-02-17 00:00:00', 45,  'Tablet',     'Educational app',  '2026-02-17 16:00:00'),
(2,  1, '2026-02-17 00:00:00', 30,  'TV',         'Streaming',        '2026-02-17 19:00:00'),
(3,  2, '2026-02-17 00:00:00', 60,  'Tablet',     'Gaming',           '2026-02-17 17:00:00'),
(4,  3, '2026-02-17 00:00:00', 25,  'Computer',   'Homework',         '2026-02-17 16:30:00'),
(5,  4, '2026-02-17 00:00:00', 40,  'Phone',      'Social media',     '2026-02-17 18:00:00'),
(6,  5, '2026-02-16 00:00:00', 50,  'TV',         'Streaming',        '2026-02-16 20:00:00'),
(7,  6, '2026-02-17 00:00:00', 35,  'Computer',   'Educational app',  '2026-02-17 15:00:00'),
(8,  7, '2026-02-17 00:00:00', 20,  'Tablet',     'Reading app',      '2026-02-17 18:30:00'),
(9,  8, '2026-02-16 00:00:00', 90,  'TV',         'Gaming',           '2026-02-16 14:00:00'),
(10, 9, '2026-02-17 00:00:00', 30,  'Phone',      'Video call',       '2026-02-17 17:30:00');

-- streaks
INSERT INTO streaks (streakID, childID, category, currentStreak, longestStreak, lastUpdated) VALUES
(1,  1, 'Fitness',     14, 21, '2026-02-17 08:45:00'),
(2,  1, 'Reading',     9,  12, '2026-02-17 20:00:00'),
(3,  2, 'Fitness',     10, 14, '2026-02-17 09:30:00'),
(4,  3, 'Nutrition',   7,  18, '2026-02-17 19:00:00'),
(5,  4, 'Screen Time', 5,  10, '2026-02-17 21:00:00'),
(6,  5, 'Fitness',     12, 12, '2026-02-16 17:30:00'),
(7,  6, 'Hydration',   20, 30, '2026-02-17 16:00:00'),
(8,  7, 'Sleep',       8,  15, '2026-02-17 07:00:00'),
(9,  8, 'Fitness',     3,  9,  '2026-02-16 10:45:00'),
(10, 9, 'Reading',     6,  6,  '2026-02-17 20:30:00');

-- tips
INSERT INTO tips (tipID, category, content, ageGroup, isActive) VALUES
(1,  'Fitness',     'Try 20 minutes of active play daily.',    '6-8',   TRUE),
(2,  'Fitness',     'Mix cardio and strength each week.',      '8-12',  TRUE),
(3,  'Nutrition',   'Eat 5 servings of fruits and veggies.',   '6-12',  TRUE),
(4,  'Nutrition',   'Drink water instead of sugary drinks.',   '6-12',  TRUE),
(5,  'Screen Time', 'Take a 5-min break every 30 minutes.',   '6-12',  TRUE),
(6,  'Screen Time', 'No screens 1 hour before bedtime.',       '6-10',  TRUE),
(7,  'Sleep',       'Aim for 9-11 hours of sleep per night.',  '6-12',  TRUE),
(8,  'Hydration',   'Drink at least 6 cups of water daily.',   '8-12',  TRUE),
(9,  'Mindfulness', 'Try 5 minutes of deep breathing.',        '8-12',  TRUE),
(10, 'General',     'Celebrate small wins every day!',          '6-12',  FALSE);
