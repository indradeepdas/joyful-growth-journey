
export interface RewardItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  goodCoins: number;
  originalPrice: number | null;
  discountedPrice: number | null;
  category: string;
  externalUrl?: string;
}

// Berlin City Rewards (25)
export const berlinCityRewards: RewardItem[] = [
  {
    id: 'berlin-1',
    name: 'Berlin Zoo Tickets',
    description: 'Family ticket to Berlin Zoo, one of the most visited and species-rich zoos in Europe.',
    imageUrl: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=600&h=400&fit=crop',
    goodCoins: 150,
    originalPrice: 59.90,
    discountedPrice: 50.90,
    category: 'city',
    externalUrl: 'https://www.zoo-berlin.de/en'
  },
  {
    id: 'berlin-2',
    name: 'Legoland Discovery Centre',
    description: 'Tickets for the whole family to LEGOLAND Discovery Centre Berlin with rides and attractions.',
    imageUrl: 'https://images.unsplash.com/photo-1575364289437-fb1bc980de6d?w=600&h=400&fit=crop',
    goodCoins: 120,
    originalPrice: 42.00,
    discountedPrice: 36.00,
    category: 'city',
    externalUrl: 'https://www.legolanddiscoverycentre.de/berlin/'
  },
  {
    id: 'berlin-3',
    name: 'Museum Island Pass',
    description: 'Family pass to all 5 museums on Berlin's Museum Island - a UNESCO World Heritage site.',
    imageUrl: 'https://images.unsplash.com/photo-1553547274-7c72beba9a89?w=600&h=400&fit=crop',
    goodCoins: 130,
    originalPrice: 48.00,
    discountedPrice: 41.00,
    category: 'city',
    externalUrl: 'https://www.smb.museum/en/museums-institutions/museumsinsel-berlin/'
  },
  {
    id: 'berlin-4',
    name: 'AquaDom & SEA LIFE Berlin',
    description: 'Tickets to SEA LIFE Berlin featuring the famous AquaDom - the largest free-standing cylindrical aquarium in the world.',
    imageUrl: 'https://images.unsplash.com/photo-1520302659201-9b20b5c4b611?w=600&h=400&fit=crop',
    goodCoins: 100,
    originalPrice: 35.00,
    discountedPrice: 30.00,
    category: 'city',
    externalUrl: 'https://www.visitsealife.com/berlin/'
  },
  {
    id: 'berlin-5',
    name: 'Berlin TV Tower Fast Pass',
    description: 'Skip-the-line tickets to the TV Tower (Fernsehturm) - Berlin's tallest structure with panoramic views.',
    imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=400&fit=crop',
    goodCoins: 90,
    originalPrice: 32.00,
    discountedPrice: 28.00,
    category: 'city',
    externalUrl: 'https://tv-turm.de/en/'
  },
  {
    id: 'berlin-6',
    name: 'Madame Tussauds Berlin',
    description: 'Tickets to see lifelike wax figures of famous celebrities, historical figures, and more.',
    imageUrl: 'https://images.unsplash.com/photo-1588610172434-63e463fd523d?w=600&h=400&fit=crop',
    goodCoins: 100,
    originalPrice: 34.00,
    discountedPrice: 29.00,
    category: 'city',
    externalUrl: 'https://www.madametussauds.com/berlin/'
  },
  {
    id: 'berlin-7',
    name: 'Berlin Dungeon Experience',
    description: 'Interactive journey through Berlin's dark history with live actors and special effects.',
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&h=400&fit=crop',
    goodCoins: 90,
    originalPrice: 30.00,
    discountedPrice: 25.00,
    category: 'city',
    externalUrl: 'https://www.thedungeons.com/berlin/en/'
  },
  {
    id: 'berlin-8',
    name: 'Computerspielemuseum Tickets',
    description: 'Tickets to one of the world's first museums for interactive entertainment and video games.',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&h=400&fit=crop',
    goodCoins: 70,
    originalPrice: 24.00,
    discountedPrice: 19.00,
    category: 'city',
    externalUrl: 'https://www.computerspielemuseum.de/en/'
  },
  {
    id: 'berlin-9',
    name: 'East Side Gallery Tour',
    description: 'Guided family tour of the East Side Gallery - the longest remaining section of the Berlin Wall.',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=400&fit=crop',
    goodCoins: 80,
    originalPrice: 28.00,
    discountedPrice: 23.00,
    category: 'city',
    externalUrl: 'https://www.eastsidegalleryberlin.de/'
  },
  {
    id: 'berlin-10',
    name: 'Jump House Berlin',
    description: 'Tickets to Berlin's largest trampoline park with various jumping areas and activities.',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&h=400&fit=crop',
    goodCoins: 85,
    originalPrice: 29.00,
    discountedPrice: 24.00,
    category: 'city',
    externalUrl: 'https://berlin.jumphouse.de/'
  },
  {
    id: 'berlin-11',
    name: 'Labyrinth Children's Museum',
    description: 'Interactive museum where children can touch, play, and explore various exhibits.',
    imageUrl: 'https://images.unsplash.com/photo-1591993676692-aa6803f3a4a5?w=600&h=400&fit=crop',
    goodCoins: 60,
    originalPrice: 22.00,
    discountedPrice: 18.00,
    category: 'city',
    externalUrl: 'https://www.labyrinth-kindermuseum.de/'
  },
  {
    id: 'berlin-12',
    name: 'Kindercafé Spielzimmer Voucher',
    description: 'Gift card for Kindercafé Spielzimmer - a café with play areas, toys, and food.',
    imageUrl: 'https://images.unsplash.com/photo-1568484653093-ed0ba32c1e36?w=600&h=400&fit=crop',
    goodCoins: 50,
    originalPrice: 18.00,
    discountedPrice: 15.00,
    category: 'city',
    externalUrl: 'https://www.kindercafe-spielzimmer.de/'
  },
  {
    id: 'berlin-13',
    name: 'MACHmit! Museum for Children',
    description: 'Tickets to an interactive museum with workshops for children to learn through play.',
    imageUrl: 'https://images.unsplash.com/photo-1555050551-82f8d3dde557?w=600&h=400&fit=crop',
    goodCoins: 55,
    originalPrice: 20.00,
    discountedPrice: 16.00,
    category: 'city',
    externalUrl: 'https://www.machmitmuseum.de/'
  },
  {
    id: 'berlin-14',
    name: 'Berlin Puppet Theater Tickets',
    description: 'Family tickets to one of Berlin's traditional puppet theaters for a magical performance.',
    imageUrl: 'https://images.unsplash.com/photo-1579546929556-3f6580432bff?w=600&h=400&fit=crop',
    goodCoins: 65,
    originalPrice: 24.00,
    discountedPrice: 20.00,
    category: 'city',
    externalUrl: 'https://www.puppentheater-berlin.de/'
  },
  {
    id: 'berlin-15',
    name: 'Miniatur Welten Berlin',
    description: 'Tickets to see incredible miniature worlds and model railways in amazing detail.',
    imageUrl: 'https://images.unsplash.com/photo-1515276427842-f85802d514a2?w=600&h=400&fit=crop',
    goodCoins: 75,
    originalPrice: 26.00,
    discountedPrice: 22.00,
    category: 'city',
    externalUrl: 'https://www.miniatur-welten-berlin.de/'
  },
  {
    id: 'berlin-16',
    name: 'Tierpark Berlin Family Pass',
    description: 'Family ticket to Tierpark Berlin - a spacious landscape zoo in the eastern part of Berlin.',
    imageUrl: 'https://images.unsplash.com/photo-1569704045404-a3401889bad9?w=600&h=400&fit=crop',
    goodCoins: 110,
    originalPrice: 38.00,
    discountedPrice: 32.00,
    category: 'city',
    externalUrl: 'https://www.tierpark-berlin.de/en'
  },
  {
    id: 'berlin-17',
    name: 'Climbmax Climbing Hall',
    description: 'Family pass to Berlin's popular indoor climbing center with routes for all abilities.',
    imageUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&h=400&fit=crop',
    goodCoins: 95,
    originalPrice: 32.00,
    discountedPrice: 27.00,
    category: 'city',
    externalUrl: 'https://www.climbmax.de/'
  },
  {
    id: 'berlin-18',
    name: 'Minigolf at Volkspark Friedrichshain',
    description: 'Family ticket for minigolf in one of Berlin's beautiful parks.',
    imageUrl: 'https://images.unsplash.com/photo-1579756423368-5bcb6d240cf4?w=600&h=400&fit=crop',
    goodCoins: 60,
    originalPrice: 22.00,
    discountedPrice: 18.00,
    category: 'city',
    externalUrl: 'https://minigolf-berlin.de/'
  },
  {
    id: 'berlin-19',
    name: 'Berlin Bike Tour',
    description: 'Family-friendly guided bike tour through Berlin's main attractions.',
    imageUrl: 'https://images.unsplash.com/photo-1591711696757-98697609beee?w=600&h=400&fit=crop',
    goodCoins: 120,
    originalPrice: 42.00,
    discountedPrice: 36.00,
    category: 'city',
    externalUrl: 'https://berlinonbike.de/'
  },
  {
    id: 'berlin-20',
    name: 'Boat Tour on River Spree',
    description: 'Relaxing boat tour on the River Spree to see Berlin from a different perspective.',
    imageUrl: 'https://images.unsplash.com/photo-1559751943-c40ef20f4ef5?w=600&h=400&fit=crop',
    goodCoins: 100,
    originalPrice: 35.00,
    discountedPrice: 30.00,
    category: 'city',
    externalUrl: 'https://www.berliner-stadtrundfart.de/'
  },
  {
    id: 'berlin-21',
    name: 'Berlin Chocolate Workshop',
    description: 'Family chocolate making workshop at Ritter Sport ChocoWorld Berlin.',
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&h=400&fit=crop',
    goodCoins: 90,
    originalPrice: 30.00,
    discountedPrice: 25.00,
    category: 'city',
    externalUrl: 'https://www.ritter-sport.de/en/ChocoWorld/'
  },
  {
    id: 'berlin-22',
    name: 'Tropical Islands Day Pass',
    description: 'Day passes to Tropical Islands - Europe's largest tropical holiday resort.',
    imageUrl: 'https://images.unsplash.com/photo-1610741083757-1ae88e1a17f7?w=600&h=400&fit=crop',
    goodCoins: 140,
    originalPrice: 48.00,
    discountedPrice: 42.00,
    category: 'city',
    externalUrl: 'https://www.tropical-islands.de/en/'
  },
  {
    id: 'berlin-23',
    name: 'LOXX Miniatur Welten Berlin',
    description: 'Tickets to see Berlin in miniature at this incredible model exhibition.',
    imageUrl: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=600&h=400&fit=crop',
    goodCoins: 70,
    originalPrice: 25.00,
    discountedPrice: 21.00,
    category: 'city',
    externalUrl: 'https://www.loxx.de/en/'
  },
  {
    id: 'berlin-24',
    name: 'Science Center Spectrum',
    description: 'Tickets to an interactive science museum with over 150 experiments to try.',
    imageUrl: 'https://images.unsplash.com/photo-1576086776739-46c92bd49658?w=600&h=400&fit=crop',
    goodCoins: 80,
    originalPrice: 28.00,
    discountedPrice: 24.00,
    category: 'city',
    externalUrl: 'https://sdtb.de/spectrum/start/'
  },
  {
    id: 'berlin-25',
    name: 'Berlin Escape Room Experience',
    description: 'Family ticket to one of Berlin's popular escape rooms for an exciting adventure.',
    imageUrl: 'https://images.unsplash.com/photo-1569416078500-3857b00616f8?w=600&h=400&fit=crop',
    goodCoins: 110,
    originalPrice: 38.00,
    discountedPrice: 32.00,
    category: 'city',
    externalUrl: 'https://www.exitgame-berlin.de/'
  },
];

// Daily Stuff Rewards (25)
export const dailyStuffRewards: RewardItem[] = [
  {
    id: 'daily-1',
    name: '30 Minutes Extra Screen Time',
    description: 'Earn 30 minutes of additional screen time to be used at your discretion.',
    imageUrl: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=600&h=400&fit=crop',
    goodCoins: 50,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-1'
  },
  {
    id: 'daily-2',
    name: 'Choose Dinner For The Family',
    description: 'Get to pick what the family has for dinner one night this week.',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop',
    goodCoins: 75,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-2'
  },
  {
    id: 'daily-3',
    name: 'Stay Up 30 Minutes Later',
    description: 'Push your bedtime back by 30 minutes for one night.',
    imageUrl: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=600&h=400&fit=crop',
    goodCoins: 40,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-3'
  },
  {
    id: 'daily-4',
    name: 'Special Dessert',
    description: 'Receive a special dessert or treat of your choice after dinner.',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=400&fit=crop',
    goodCoins: 35,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-4'
  },
  {
    id: 'daily-5',
    name: 'No Chores Day',
    description: 'Get a day off from your regular chores and responsibilities.',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
    goodCoins: 80,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-5'
  },
  {
    id: 'daily-6',
    name: 'Breakfast in Bed',
    description: 'Have your breakfast served to you in bed on a weekend morning.',
    imageUrl: 'https://images.unsplash.com/photo-1615300236079-4bdb43bd9a9a?w=600&h=400&fit=crop',
    goodCoins: 60,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-6'
  },
  {
    id: 'daily-7',
    name: 'Picnic in the Park',
    description: 'Have a special picnic with your family at a local park.',
    imageUrl: 'https://images.unsplash.com/photo-1540173196447-4a4ccebe3d70?w=600&h=400&fit=crop',
    goodCoins: 65,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-7'
  },
  {
    id: 'daily-8',
    name: 'Board Game Night Host',
    description: 'You get to choose all the games for the next family game night.',
    imageUrl: 'https://images.unsplash.com/photo-1611371805429-8b5c1f0536fc?w=600&h=400&fit=crop',
    goodCoins: 45,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-8'
  },
  {
    id: 'daily-9',
    name: 'Solo TV Time',
    description: 'Get the TV to yourself for 1 hour to watch your favorite show.',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=400&fit=crop',
    goodCoins: 55,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-9'
  },
  {
    id: 'daily-10',
    name: 'Extra Playdate',
    description: 'Have a friend over for an extra playdate this week.',
    imageUrl: 'https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?w=600&h=400&fit=crop',
    goodCoins: 70,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-10'
  },
  {
    id: 'daily-11',
    name: 'Pizza Night',
    description: 'Order your favorite pizza for a special dinner.',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    goodCoins: 60,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-11'
  },
  {
    id: 'daily-12',
    name: 'Baking Session',
    description: 'Choose a recipe and bake something delicious with a parent.',
    imageUrl: 'https://images.unsplash.com/photo-1588710277537-126980d60b56?w=600&h=400&fit=crop',
    goodCoins: 55,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-12'
  },
  {
    id: 'daily-13',
    name: 'Movie Night Snack Bar',
    description: 'Set up a special snack bar for the next family movie night.',
    imageUrl: 'https://images.unsplash.com/photo-1594675229822-4043eec07268?w=600&h=400&fit=crop',
    goodCoins: 50,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-13'
  },
  {
    id: 'daily-14',
    name: 'Breakfast Choice',
    description: 'Choose what the family has for breakfast on a weekend morning.',
    imageUrl: 'https://images.unsplash.com/photo-1550369875-7ab15ad86b85?w=600&h=400&fit=crop',
    goodCoins: 40,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-14'
  },
  {
    id: 'daily-15',
    name: 'Indoor Camping Night',
    description: 'Set up a tent in the living room for an indoor camping experience.',
    imageUrl: 'https://images.unsplash.com/photo-1542107358-95778532a0ed?w=600&h=400&fit=crop',
    goodCoins: 70,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-15'
  },
  {
    id: 'daily-16',
    name: 'Be the Photographer',
    description: 'Be in charge of taking family photos for a special occasion.',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=400&fit=crop',
    goodCoins: 45,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-16'
  },
  {
    id: 'daily-17',
    name: 'Extra Reading Time',
    description: 'Get an extra 30 minutes of reading time before bed.',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop',
    goodCoins: 35,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-17'
  },
  {
    id: 'daily-18',
    name: 'Special Lunch Box',
    description: 'Have a special themed lunch box prepared for school.',
    imageUrl: 'https://images.unsplash.com/photo-1548642783-007f6a4bf005?w=600&h=400&fit=crop',
    goodCoins: 40,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-18'
  },
  {
    id: 'daily-19',
    name: 'Parent Helper',
    description: 'Be the special helper for a parent on a project of your choice.',
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=400&fit=crop',
    goodCoins: 50,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-19'
  },
  {
    id: 'daily-20',
    name: 'Pajama Day',
    description: 'Spend the whole day in your pajamas (on a weekend).',
    imageUrl: 'https://images.unsplash.com/photo-1566938064504-a379175168ba?w=600&h=400&fit=crop',
    goodCoins: 35,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-20'
  },
  {
    id: 'daily-21',
    name: 'DIY Craft Afternoon',
    description: 'Have a special crafting session with all supplies provided.',
    imageUrl: 'https://images.unsplash.com/photo-1584847654591-ae3edaa0dc3d?w=600&h=400&fit=crop',
    goodCoins: 55,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-21'
  },
  {
    id: 'daily-22',
    name: 'Control the Music',
    description: 'Be the DJ for a day and choose all the music for the house.',
    imageUrl: 'https://images.unsplash.com/photo-1518911710364-17ec553bde5d?w=600&h=400&fit=crop',
    goodCoins: 40,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-22'
  },
  {
    id: 'daily-23',
    name: 'Extra Allowance',
    description: 'Receive an extra $5 in your next allowance.',
    imageUrl: 'https://images.unsplash.com/photo-1593672715438-d88a1cf7a8f9?w=600&h=400&fit=crop',
    goodCoins: 75,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-23'
  },
  {
    id: 'daily-24',
    name: 'Special Bath Time',
    description: 'Have a special bath with extra bubbles, toys, and time.',
    imageUrl: 'https://images.unsplash.com/photo-1600414729532-77f00b16a0bb?w=600&h=400&fit=crop',
    goodCoins: 35,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-24'
  },
  {
    id: 'daily-25',
    name: 'Sidewalk Chalk Art',
    description: 'Get new sidewalk chalk and permission to create a masterpiece on the driveway.',
    imageUrl: 'https://images.unsplash.com/photo-1597094618611-de2a44bc9ce9?w=600&h=400&fit=crop',
    goodCoins: 45,
    originalPrice: null,
    discountedPrice: null,
    category: 'daily',
    externalUrl: 'https://example.com/reward/daily-25'
  },
];

// Brand Exclusive Rewards (25)
export const brandExclusiveRewards: RewardItem[] = [
  {
    id: 'brand-1',
    name: 'LEGO Creator Set',
    description: 'A LEGO Creator 3-in-1 set that can be built in three different ways.',
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop',
    goodCoins: 120,
    originalPrice: 39.99,
    discountedPrice: 29.99,
    category: 'brand',
    externalUrl: 'https://www.lego.com/'
  },
  {
    id: 'brand-2',
    name: 'Crayola Art Set',
    description: 'Comprehensive art set with colored pencils, markers, and crayons.',
    imageUrl: 'https://images.unsplash.com/photo-1599161244426-f31991b36d2c?w=600&h=400&fit=crop',
    goodCoins: 80,
    originalPrice: 24.99,
    discountedPrice: 19.99,
    category: 'brand',
    externalUrl: 'https://www.crayola.com/'
  },
  {
    id: 'brand-3',
    name: 'Nintendo eShop Card',
    description: '$10 Nintendo eShop Card to purchase games or content.',
    imageUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&h=400&fit=crop',
    goodCoins: 150,
    originalPrice: 10.00,
    discountedPrice: 10.00,
    category: 'brand',
    externalUrl: 'https://www.nintendo.com/'
  },
  {
    id: 'brand-4',
    name: 'Spotify Premium (1 Month)',
    description: 'One month of Spotify Premium for ad-free music streaming.',
    imageUrl: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=600&h=400&fit=crop',
    goodCoins: 100,
    originalPrice: 9.99,
    discountedPrice: 9.99,
    category: 'brand',
    externalUrl: 'https://www.spotify.com/'
  },
  {
    id: 'brand-5',
    name: 'Disney+ Subscription (1 Month)',
    description: 'One month of Disney+ streaming service.',
    imageUrl: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=600&h=400&fit=crop',
    goodCoins: 120,
    originalPrice: 11.99,
    discountedPrice: 11.99,
    category: 'brand',
    externalUrl: 'https://www.disneyplus.com/'
  },
  {
    id: 'brand-6',
    name: 'Minecraft Extension Content',
    description: 'Special content pack for Minecraft game.',
    imageUrl: 'https://images.unsplash.com/photo-1607603750871-b5a3205a207c?w=600&h=400&fit=crop',
    goodCoins: 90,
    originalPrice: 8.99,
    discountedPrice: 8.99,
    category: 'brand',
    externalUrl: 'https://www.minecraft.net/'
  },
  {
    id: 'brand-7',
    name: 'Hasbro Board Game',
    description: 'Classic Hasbro board game for family fun.',
    imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&h=400&fit=crop',
    goodCoins: 110,
    originalPrice: 34.99,
    discountedPrice: 29.99,
    category: 'brand',
    externalUrl: 'https://shop.hasbro.com/'
  },
  {
    id: 'brand-8',
    name: 'National Geographic Kids Subscription',
    description: '1-year subscription to National Geographic Kids magazine.',
    imageUrl: 'https://images.unsplash.com/photo-1576633587370-461fe5e6fa4a?w=600&h=400&fit=crop',
    goodCoins: 130,
    originalPrice: 39.99,
    discountedPrice: 30.00,
    category: 'brand',
    externalUrl: 'https://kids.nationalgeographic.com/'
  },
  {
    id: 'brand-9',
    name: 'Adidas Gift Card',
    description: '$25 gift card to Adidas online or in-store.',
    imageUrl: 'https://images.unsplash.com/photo-1609709295948-a8e93d661948?w=600&h=400&fit=crop',
    goodCoins: 250,
    originalPrice: 25.00,
    discountedPrice: 25.00,
    category: 'brand',
    externalUrl: 'https://www.adidas.com/'
  },
  {
    id: 'brand-10',
    name: 'Amazon Kids+ Subscription',
    description: '3-month subscription to Amazon Kids+ with books, games, and videos.',
    imageUrl: 'https://images.unsplash.com/photo-1571867424488-4565932edb41?w=600&h=400&fit=crop',
    goodCoins: 140,
    originalPrice: 29.99,
    discountedPrice: 29.99,
    category: 'brand',
    externalUrl: 'https://www.amazon.com/Amazon-FreeTime-Unlimited-Monthly-Subscription/dp/B01KPTV12W'
  },
  {
    id: 'brand-11',
    name: 'Nerf Blaster',
    description: 'Popular Nerf blaster toy with darts.',
    imageUrl: 'https://images.unsplash.com/photo-1563396983088-a621091fbf49?w=600&h=400&fit=crop',
    goodCoins: 95,
    originalPrice: 29.99,
    discountedPrice: 24.99,
    category: 'brand',
    externalUrl: 'https://nerf.hasbro.com/'
  },
  {
    id: 'brand-12',
    name: 'Roblox Gift Card',
    description: '$10 Roblox gift card for in-game currency.',
    imageUrl: 'https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?w=600&h=400&fit=crop',
    goodCoins: 100,
    originalPrice: 10.00,
    discountedPrice: 10.00,
    category: 'brand',
    externalUrl: 'https://www.roblox.com/'
  },
  {
    id: 'brand-13',
    name: 'Barbie Dreamhouse Accessories',
    description: 'Accessory pack for Barbie Dreamhouse play.',
    imageUrl: 'https://images.unsplash.com/photo-1612462766564-3dbec0a35b0f?w=600&h=400&fit=crop',
    goodCoins: 85,
    originalPrice: 24.99,
    discountedPrice: 19.99,
    category: 'brand',
    externalUrl: 'https://barbie.mattel.com/'
  },
  {
    id: 'brand-14',
    name: 'Hot Wheels 5-Pack',
    description: 'Set of 5 Hot Wheels die-cast cars.',
    imageUrl: 'https://images.unsplash.com/photo-1595779950632-5e586fd0f9a5?w=600&h=400&fit=crop',
    goodCoins: 70,
    originalPrice: 19.99,
    discountedPrice: 14.99,
    category: 'brand',
    externalUrl: 'https://hotwheels.mattel.com/'
  },
  {
    id: 'brand-15',
    name: 'Playmobil Figure Set',
    description: 'Character set from Playmobil for imaginative play.',
    imageUrl: 'https://images.unsplash.com/photo-1610395179018-efa0ac4fc616?w=600&h=400&fit=crop',
    goodCoins: 90,
    originalPrice: 29.99,
    discountedPrice: 24.99,
    category: 'brand',
    externalUrl: 'https://www.playmobil.de/'
  },
  {
    id: 'brand-16',
    name: 'Pokémon Trading Card Game Pack',
    description: 'Booster pack of Pokémon trading cards.',
    imageUrl: 'https://images.unsplash.com/photo-1605979713174-eff45f0b341f?w=600&h=400&fit=crop',
    goodCoins: 60,
    originalPrice: 16.99,
    discountedPrice: 14.99,
    category: 'brand',
    externalUrl: 'https://www.pokemon.com/us/pokemon-tcg/'
  },
  {
    id: 'brand-17',
    name: 'Ravensburger Puzzle',
    description: 'High-quality puzzle from Ravensburger.',
    imageUrl: 'https://images.unsplash.com/photo-1586984826607-5281d9a1ab56?w=600&h=400&fit=crop',
    goodCoins: 75,
    originalPrice: 22.99,
    discountedPrice: 18.99,
    category: 'brand',
    externalUrl: 'https://www.ravensburger.org/en/start/index.html'
  },
  {
    id: 'brand-18',
    name: 'Audible Kids Book',
    description: 'One audiobook credit for a children's book on Audible.',
    imageUrl: 'https://images.unsplash.com/photo-1612367974659-1779e0a92f11?w=600&h=400&fit=crop',
    goodCoins: 80,
    originalPrice: 14.95,
    discountedPrice: 14.95,
    category: 'brand',
    externalUrl: 'https://www.audible.com/'
  },
  {
    id: 'brand-19',
    name: 'Melissa & Doug Craft Kit',
    description: 'Creative craft kit from Melissa & Doug.',
    imageUrl: 'https://images.unsplash.com/photo-1583149269449-7a8bfaf94a86?w=600&h=400&fit=crop',
    goodCoins: 85,
    originalPrice: 24.99,
    discountedPrice: 19.99,
    category: 'brand',
    externalUrl: 'https://www.melissaanddoug.com/'
  },
  {
    id: 'brand-20',
    name: 'Play-Doh Super Set',
    description: 'Multi-color Play-Doh set with tools.',
    imageUrl: 'https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=600&h=400&fit=crop',
    goodCoins: 70,
    originalPrice: 19.99,
    discountedPrice: 16.99,
    category: 'brand',
    externalUrl: 'https://playdoh.hasbro.com/'
  },
  {
    id: 'brand-21',
    name: 'Minecraft Plush Toy',
    description: 'Official Minecraft character plush toy.',
    imageUrl: 'https://images.unsplash.com/photo-1619547871583-51511ed57a3f?w=600&h=400&fit=crop',
    goodCoins: 65,
    originalPrice: 18.99,
    discountedPrice: 15.99,
    category: 'brand',
    externalUrl: 'https://www.minecraft.net/'
  },
  {
    id: 'brand-22',
    name: 'YouTube Premium (1 Month)',
    description: 'One month of ad-free YouTube viewing.',
    imageUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop',
    goodCoins: 100,
    originalPrice: 11.99,
    discountedPrice: 11.99,
    category: 'brand',
    externalUrl: 'https://www.youtube.com/premium'
  },
  {
    id: 'brand-23',
    name: 'Nintendo Amiibo Figure',
    description: 'Collectible Nintendo Amiibo character figure.',
    imageUrl: 'https://images.unsplash.com/photo-1612036781871-9679b73d7723?w=600&h=400&fit=crop',
    goodCoins: 120,
    originalPrice: 14.99,
    discountedPrice: 12.99,
    category: 'brand',
    externalUrl: 'https://www.nintendo.com/amiibo/'
  },
  {
    id: 'brand-24',
    name: 'Klutz Activity Book',
    description: 'Hands-on activity book with supplies included.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    goodCoins: 85,
    originalPrice: 24.99,
    discountedPrice: 19.99,
    category: 'brand',
    externalUrl: 'https://klutz.com/'
  },
  {
    id: 'brand-25',
    name: 'Fortnite V-Bucks Card',
    description: '1,000 V-Bucks card for Fortnite in-game currency.',
    imageUrl: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=600&h=400&fit=crop',
    goodCoins: 130,
    originalPrice: 9.99,
    discountedPrice: 9.99,
    category: 'brand',
    externalUrl: 'https://www.epicgames.com/fortnite/'
  },
];

// Experience Rewards (25)
export const experienceRewards: RewardItem[] = [
  {
    id: 'experience-1',
    name: 'Movie Night Selection',
    description: 'Choose the movie for the next family movie night.',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop',
    goodCoins: 60,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-1'
  },
  {
    id: 'experience-2',
    name: 'Day Trip Choice',
    description: 'Choose the destination for the next family day trip or outing.',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop',
    goodCoins: 100,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-2'
  },
  {
    id: 'experience-3',
    name: 'Parent-Child Date',
    description: 'Special one-on-one outing with a parent of your choice.',
    imageUrl: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&h=400&fit=crop',
    goodCoins: 90,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-3'
  },
  {
    id: 'experience-4',
    name: 'Swimming Pool Day',
    description: 'Family trip to a local swimming pool or water park.',
    imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop',
    goodCoins: 120,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-4'
  },
  {
    id: 'experience-5',
    name: 'Cooking Class',
    description: 'Learn to cook a special dish with a parent as your instructor.',
    imageUrl: 'https://images.unsplash.com/photo-1607877212339-37e2500ce0e3?w=600&h=400&fit=crop',
    goodCoins: 85,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-5'
  },
  {
    id: 'experience-6',
    name: 'Camping in the Backyard',
    description: 'Set up a tent and camp overnight in your backyard with a parent.',
    imageUrl: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=600&h=400&fit=crop',
    goodCoins: 95,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-6'
  },
  {
    id: 'experience-7',
    name: 'Bike Riding Adventure',
    description: 'Go on a special bike ride adventure with the family on a trail of your choice.',
    imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4861bc6?w=600&h=400&fit=crop',
    goodCoins: 80,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-7'
  },
  {
    id: 'experience-8',
    name: 'Star Gazing Night',
    description: 'Stay up late on a clear night to look at stars with a parent and hot chocolate.',
    imageUrl: 'https://images.unsplash.com/photo-1532978379173-523e16f371f9?w=600&h=400&fit=crop',
    goodCoins: 70,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-8'
  },
  {
    id: 'experience-9',
    name: 'Visit to a Museum',
    description: 'Family trip to a local museum of your choice.',
    imageUrl: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&h=400&fit=crop',
    goodCoins: 100,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-9'
  },
  {
    id: 'experience-10',
    name: 'Amusement Park Visit',
    description: 'Trip to a local amusement park with the family.',
    imageUrl: 'https://images.unsplash.com/photo-1500927920626-afb1dd86e035?w=600&h=400&fit=crop',
    goodCoins: 150,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-10'
  },
  {
    id: 'experience-11',
    name: 'Science Experiment Day',
    description: 'Spend a day doing fun science experiments with materials provided.',
    imageUrl: 'https://images.unsplash.com/photo-1575900100747-7e544905bbe2?w=600&h=400&fit=crop',
    goodCoins: 85,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-11'
  },
  {
    id: 'experience-12',
    name: 'Breakfast at a Café',
    description: 'Special breakfast outing at a café of your choice.',
    imageUrl: 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=600&h=400&fit=crop',
    goodCoins: 90,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-12'
  },
  {
    id: 'experience-13',
    name: 'Ice Cream Date',
    description: 'Special trip to an ice cream parlor for a treat of your choice.',
    imageUrl: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=600&h=400&fit=crop',
    goodCoins: 60,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-13'
  },
  {
    id: 'experience-14',
    name: 'Nature Hike',
    description: 'Family hiking trip on a local nature trail with picnic included.',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop',
    goodCoins: 80,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-14'
  },
  {
    id: 'experience-15',
    name: 'Bowling Night',
    description: 'Family bowling night at a local bowling alley.',
    imageUrl: 'https://images.unsplash.com/photo-1538511059235-e0231dfb728a?w=600&h=400&fit=crop',
    goodCoins: 95,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-15'
  },
  {
    id: 'experience-16',
    name: 'Trampoline Park Visit',
    description: 'Trip to a local trampoline park for jumping fun.',
    imageUrl: 'https://images.unsplash.com/photo-1575330933415-ea9d1626b638?w=600&h=400&fit=crop',
    goodCoins: 110,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-16'
  },
  {
    id: 'experience-17',
    name: 'Laser Tag Adventure',
    description: 'Family game of laser tag at a local entertainment center.',
    imageUrl: 'https://images.unsplash.com/photo-1566415608380-8967c7841680?w=600&h=400&fit=crop',
    goodCoins: 100,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-17'
  },
  {
    id: 'experience-18',
    name: 'Art Gallery Visit',
    description: 'Visit to a local art gallery followed by an art creation session at home.',
    imageUrl: 'https://images.unsplash.com/photo-1594326427411-6e262103de5c?w=600&h=400&fit=crop',
    goodCoins: 75,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-18'
  },
  {
    id: 'experience-19',
    name: 'Planetarium Visit',
    description: 'Trip to a local planetarium to learn about stars and planets.',
    imageUrl: 'https://images.unsplash.com/photo-1509715513011-e394f0cb20c4?w=600&h=400&fit=crop',
    goodCoins: 90,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-19'
  },
  {
    id: 'experience-20',
    name: 'Mini Golf Adventure',
    description: 'Family mini golf outing at a local course.',
    imageUrl: 'https://images.unsplash.com/photo-1642263161368-97d171a0e993?w=600&h=400&fit=crop',
    goodCoins: 85,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-20'
  },
  {
    id: 'experience-21',
    name: 'Visit to an Aquarium',
    description: 'Family trip to a local aquarium to see marine life.',
    imageUrl: 'https://images.unsplash.com/photo-1580650958738-26817803ed9c?w=600&h=400&fit=crop',
    goodCoins: 120,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-21'
  },
  {
    id: 'experience-22',
    name: 'Pottery Painting Session',
    description: 'Visit to a pottery painting studio to create your own masterpiece.',
    imageUrl: 'https://images.unsplash.com/photo-1597696929736-6d13bed8e6a8?w=600&h=400&fit=crop',
    goodCoins: 90,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-22'
  },
  {
    id: 'experience-23',
    name: 'Arcade Game Day',
    description: 'Trip to a local arcade with a set amount of tokens/credits.',
    imageUrl: 'https://images.unsplash.com/photo-1518997321083-513f78b9c251?w=600&h=400&fit=crop',
    goodCoins: 100,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-23'
  },
  {
    id: 'experience-24',
    name: 'Botanical Garden Visit',
    description: 'Family trip to a local botanical garden to explore plants and flowers.',
    imageUrl: 'https://images.unsplash.com/photo-1556113275-88b981b1b04b?w=600&h=400&fit=crop',
    goodCoins: 70,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-24'
  },
  {
    id: 'experience-25',
    name: 'Theater Show',
    description: 'Tickets to a children's theater production at a local venue.',
    imageUrl: 'https://images.unsplash.com/photo-1572888195250-3eaeb81b1539?w=600&h=400&fit=crop',
    goodCoins: 130,
    originalPrice: null,
    discountedPrice: null,
    category: 'experience',
    externalUrl: 'https://example.com/reward/experience-25'
  },
];

// Combine all rewards
export const allRewards = [
  ...berlinCityRewards,
  ...dailyStuffRewards,
  ...brandExclusiveRewards,
  ...experienceRewards
];

// Get specific category rewards
export const getRewardsByCategory = (category: string) => {
  switch(category) {
    case 'city':
      return berlinCityRewards;
    case 'daily':
      return dailyStuffRewards;
    case 'brand':
      return brandExclusiveRewards;
    case 'experience':
      return experienceRewards;
    default:
      return allRewards;
  }
};
