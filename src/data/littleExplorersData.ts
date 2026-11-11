export interface LittleExplorerExperience {
  id: string;
  category: 'farming' | 'culinary' | 'detective' | 'artisan' | 'culture' | 'nature';
  title: string;
  badge: string;
  tagline: string;
  heroImage: string;
  secondaryImages: string[];
  ageSuitability: string;
  duration: string;
  groupSize: string;
  ratio: string;
  pricePerChild: number;
  escortPrice?: number;
  location: string;
  overview: string;
  curriculumTags: string[];
  activities: string[];
  learningOutcomes: string[];
  whatsIncluded: string[];
  whatToBring: string[];
  sampleSchedule: Array<{ time: string; activity: string }>;
  safetyNotes: string[];
  nextAvailableDates: string[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  url: string;
  caption: string;
  location: string;
}

export const LITTLE_EXPLORER_EXPERIENCES: LittleExplorerExperience[] = [
  {
    id: 'little-farmers',
    category: 'farming',
    title: 'Little Farmers – A Day on the Farm',
    badge: 'Hands-On Nature',
    tagline: 'Get Your Hands Dirty. Discover How Nature Grows.',
    heroImage: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=1200&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=1000&auto=format&fit=crop',
    ],
    ageSuitability: 'Ages 4 – 12',
    duration: 'Half-Day (4h) & Full-Day (6.5h)',
    groupSize: '8 – 18 Children',
    ratio: '1 Facilitator : 5 Children',
    pricePerChild: 1450,
    escortPrice: 650,
    location: 'Valley Permaculture Farm & Coorg Foothills',
    overview: 'Trade concrete pavements for rich black soil. Children step into the shoes of barefoot farmers, understanding where real food comes from, feeling the texture of compost, planting heirloom saplings, and petting farm animals in a nurturing environment.',
    curriculumTags: ['Ecology', 'Botany Basics', 'Sensory Motor', 'Sustainable Food'],
    activities: [
      'Sowing indigenous seeds into organic seedbeds with mini trowels',
      'Harvesting ripe cherry tomatoes, radishes, and leafy greens',
      'Sensory soil exploration and earthworm composting observation',
      'Gentle farm animal interaction (feeding baby calves, ducks & rescued goats)',
      'Natural mud play pit and organic plant dyeing',
      'Wholesome farm-fresh harvest lunch & sun-brewed herbal lemonade'
    ],
    learningOutcomes: [
      'Food literacy: deep appreciation of how food is cultivated with sun and soil',
      'Tactile sensory stimulation and fine motor development',
      'Empathy, gentle care for animals, and ecological stewardship',
      'Patience and teamwork in open-air collaborative tasks'
    ],
    whatsIncluded: [
      'Child gardening kit (cotton tote, wooden hand trowel, organic seeds)',
      'Wide-brim farmer sun hat',
      'Wholesome farm-harvested hot lunch & fresh fruit refreshments',
      'Take-home terracotta pot with sown seeds',
      'Certified naturalist & pediatric first-aid trained guide'
    ],
    whatToBring: [
      'Comfortable clothes that can get muddy',
      'Spare set of dry clothes and small towel',
      'Closed-toe walking shoes or boots',
      'Reusable water bottle and sunscreen'
    ],
    sampleSchedule: [
      { time: '09:00 AM', activity: 'Welcome circle, cold herbal squash & farm animal greeting' },
      { time: '09:45 AM', activity: 'Hands-in-soil: sowing seeds & compost biology workshop' },
      { time: '11:00 AM', activity: 'Harvesting hunt: picking ripe veggies for our lunch table' },
      { time: '12:15 PM', activity: 'Wash up & communal farm-to-plate feast under the neem shade' },
      { time: '01:15 PM', activity: 'Mud art & potting your personal seedling to nurture at home' }
    ],
    safetyNotes: [
      'Dedicated wash stations with child-safe organic soap',
      'All farm animals are veterinary checked, vaccinated, and child-socialized',
      'Fenced sanctuary boundary with zero heavy machinery operating during tours'
    ],
    nextAvailableDates: ['Saturday, Nov 8', 'Sunday, Nov 9', 'Saturday, Nov 15', 'Sunday, Nov 16']
  },
  {
    id: 'junior-masterchef',
    category: 'culinary',
    title: 'Junior Masterchef: Woodfired & Farm Fresh',
    badge: 'Culinary Arts',
    tagline: 'Little Chefs. Big Culinary Dreams.',
    heroImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507048323647-997701fc22bc?q=80&w=1000&auto=format&fit=crop',
    ],
    ageSuitability: 'Ages 5 – 14',
    duration: '4 Hours',
    groupSize: '10 – 16 Children',
    ratio: '1 Chef Mentor : 4 Children',
    pricePerChild: 1850,
    escortPrice: 750,
    location: 'Open-Air Artisan Hearth & Orchard, Nandi Outskirts',
    overview: 'An inspiring culinary wonderland where young creators knead slow-fermented dough, discover aromatic spices by scent, and slide their own handcrafted artisanal pizzas into a crackling wood-fired oven under the guidance of passionate chefs.',
    curriculumTags: ['Culinary Chemistry', 'Math Ratios', 'Sensory Discrimination', 'Kitchen Safety'],
    activities: [
      'Hand-kneading artisan sourdough and organic wheat dough',
      'Sensory spice & herb blindfold smelling challenge in the orchard',
      'Sauce blending and crafting custom personal wood-fired pizzas',
      'Healthy oats & wild honey energy-bites rolling workshop',
      'Botanical mocktail fizz creation with crushed mint and pomegranate',
      'Mini Masterchef presentation & family tasting celebration'
    ],
    learningOutcomes: [
      'Kitchen safety awareness and handling age-appropriate culinary tools',
      'Practical math: measuring volume, fractions, and timing in cooking',
      'Broadened palate and curiosity about fresh, unprocessed herbs and spices',
      'Creative self-expression and immense pride in cooking for oneself'
    ],
    whatsIncluded: [
      'Embroidered Junior Chef canvas apron and toque hat',
      'Personalized illustrated recipe journal with kid-friendly dishes',
      'All farm-sourced organic ingredients and artisanal cheeses',
      'Communal feast of child-crafted pizzas and baked delights',
      'Junior Masterchef graduation certificate'
    ],
    whatToBring: [
      'Hair tie for long hair',
      'Comfortable cotton t-shirt and closed shoes',
      'Empty lunchbox (to bring extra baked goodies home!)'
    ],
    sampleSchedule: [
      { time: '10:00 AM', activity: 'Chef apron donning & kitchen safety briefing' },
      { time: '10:30 AM', activity: 'Herb garden sniffing walk & dough kneading basics' },
      { time: '11:30 AM', activity: 'Pizza crafting: shaping, saucing & toppings artistry' },
      { time: '12:30 PM', activity: 'Wood-fired oven watch with baker & botanical soda mix' },
      { time: '01:15 PM', activity: 'Plating contest, tasting feast & Masterchef badge award' }
    ],
    safetyNotes: [
      'No child handles open oven fire; professional chefs operate the wood hearth',
      'Child-safe serrated nylon safety knives used for soft vegetable chopping',
      'Allergy-conscious: gluten-free and vegan stations available on advance notice'
    ],
    nextAvailableDates: ['Sunday, Nov 9', 'Saturday, Nov 15', 'Saturday, Nov 22']
  },
  {
    id: 'mystery-detectives',
    category: 'detective',
    title: 'Mystery Detective Day: The Forest Enigma',
    badge: 'Critical Thinking',
    tagline: 'Think. Investigate. Crack the Mystery!',
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000&auto=format&fit=crop',
    ],
    ageSuitability: 'Ages 7 – 15',
    duration: '3.5 Hours',
    groupSize: '8 – 20 Children',
    ratio: '1 Detective Marshal : 5 Children',
    pricePerChild: 1650,
    escortPrice: 500,
    location: 'Savandurga Whispering Pines & Eco-Trail',
    overview: 'The Forest Guardian’s ancient talisman has vanished! Junior detectives work in small squads using real magnifying glasses, compass navigation, UV light torches, and cryptogram keys to decipher forest clues and crack the case.',
    curriculumTags: ['Deductive Logic', 'Orienteering', 'Team Collaboration', 'Spatial Reasoning'],
    activities: [
      'Deciphering hidden runic coordinate markers along shaded trails',
      'Nocturnal UV blacklight clue hunting in shady woodland glades',
      'Soil footprint casting and comparative wildlife track analysis',
      'Using magnetic prismatic compasses to follow azimuth bearings',
      'Safe kitchen chemistry: testing secret message invisible inks',
      'Opening the locked Guardian’s Chest with the final master cipher'
    ],
    learningOutcomes: [
      'Scientific method: observing evidence, forming hypotheses, testing solutions',
      'Spatial literacy: navigating terrain using genuine analog compasses',
      'Peer collaboration, negotiation, and high-trust team communication',
      'Resilience and cognitive persistence when facing complex puzzles'
    ],
    whatsIncluded: [
      'Junior Investigator satchel with real brass compass & magnifier',
      'Secret detective cryptogram field manual',
      'UV inspection mini torch',
      'Investigator badge & official Case Closed certificate',
      'Healthy trail snacks & restorative fruit punch'
    ],
    whatToBring: [
      'Comfortable trail walking sneakers',
      'Curious mind and adventurous spirit',
      'Water bottle with shoulder strap'
    ],
    sampleSchedule: [
      { time: '02:30 PM', activity: 'Briefing at Detective HQ: Case brief & equipment handover' },
      { time: '03:00 PM', activity: 'Compass orientation drill & first cipher trail' },
      { time: '04:00 PM', activity: 'The Crime Scene: fingerprint lifting & soil evidence testing' },
      { time: '05:00 PM', activity: 'Decoding the final cipher & unlocking the Forest Vault' },
      { time: '05:45 PM', activity: 'Celebratory case debrief, badges & detective medals' }
    ],
    safetyNotes: [
      'Contained, privately secured nature park perimeter',
      'Facilitators walk directly with every 5-student squad at all times',
      'Zero hazardous materials; all chemicals are edible food-grade reagents'
    ],
    nextAvailableDates: ['Saturday, Nov 8', 'Sunday, Nov 16', 'Saturday, Nov 22']
  },
  {
    id: 'artisan-for-a-day',
    category: 'artisan',
    title: 'Artisan for a Day: Clay, Loom & Earth Pigments',
    badge: 'Craft & Heritage',
    tagline: 'Imagine It. Create It. Take It Home.',
    heroImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1200&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
    ],
    ageSuitability: 'Ages 5 – 14',
    duration: '4 Hours',
    groupSize: '8 – 16 Children',
    ratio: '1 Artisan Master : 4 Children',
    pricePerChild: 1550,
    escortPrice: 550,
    location: 'Ramanagara Ceramic Studio & Crafts Sanctuary',
    overview: 'Step into the tranquil rhythm of an authentic artisan studio. Children feel the soothing spin of the potter’s wheel, carve terracotta tiles, hand-press carved teakwood blocks with herbal pigments, and discover the deep calm of traditional craft.',
    curriculumTags: ['Fine Motor Precision', 'Indigenous Crafts', 'Mindfulness', 'Tactile Creativity'],
    activities: [
      'Centering and shaping earthen clay on electric and kick potter wheels',
      'Sculpting terracotta village animals, whistles, and geometric tiles',
      'Carved teakwood block printing on natural cotton tote bags',
      'Extracting natural colors from marigolds, turmeric, and indigo',
      'Bamboo cane weaving for miniature bird feeders',
      'Studio gallery walk and artisan story circle'
    ],
    learningOutcomes: [
      'Deep tactile focus, hand-eye coordination, and pressure control',
      'Profound respect for indigenous artisans and generational crafts',
      'Mindfulness: calming anxious minds through rhythmic clay shaping',
      'Pride of ownership: creating beautiful, tangible objects with one’s own hands'
    ],
    whatsIncluded: [
      'Natural terracotta clay and mineral glazes',
      'Organic cotton tote bag printed by the child to take home',
      'Two wheel-thrown clay pots safely fired and packaged',
      'Traditional artisan apron',
      'Mid-morning local snack & cold pressed tender coconut water'
    ],
    whatToBring: [
      'Clothes you don’t mind getting clay on',
      'Short-trimmed fingernails for best wheel throwing',
      'Reusable water bottle'
    ],
    sampleSchedule: [
      { time: '09:30 AM', activity: 'Artisan welcome, studio tour & clay preparation' },
      { time: '10:00 AM', activity: 'One-on-one pottery wheel sessions with master potters' },
      { time: '11:15 AM', activity: 'Terracotta sculpting & ceramic tile carving' },
      { time: '12:00 PM', activity: 'Natural botanical dye extraction & block printing on cotton' },
      { time: '01:00 PM', activity: 'Showcase exhibition of handmade works & farewell juice' }
    ],
    safetyNotes: [
      '100% natural, non-toxic lead-free terracotta clay sourced directly from local riverbeds',
      'Low-speed safety pottery wheels with emergency stop pedals',
      'Washable vegetable inks safe for sensitive skin'
    ],
    nextAvailableDates: ['Saturday, Nov 8', 'Sunday, Nov 9', 'Sunday, Nov 16']
  },
  {
    id: 'village-life-culture',
    category: 'culture',
    title: 'Village Life & Living Heritage Day',
    badge: 'Roots & Heritage',
    tagline: 'Discover Traditions. Experience Village Life.',
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609137144822-0b1a03e12502?q=80&w=1000&auto=format&fit=crop',
    ],
    ageSuitability: 'All Ages (Kids 4 – 16 & Families)',
    duration: 'Full Day (6 Hours)',
    groupSize: '12 – 25 Explorers',
    ratio: '1 Community Guide : 6 Children',
    pricePerChild: 1750,
    escortPrice: 1250,
    location: 'Melukote Rural Sanctuary & Janapada Heritage Hamlet',
    overview: 'A soulful step back into the timeless rhythm of rural India. Children ride painted bullock carts, learn spinning wooden tops and indigenous games under a great banyan tree, listen to folk lore, and share a banana-leaf feast with village elders.',
    curriculumTags: ['Cultural Anthropology', 'Folk History', 'Community Living', 'Rural Ecology'],
    activities: [
      'Scenic painted bullock cart ride through lush sugarcane and paddy fields',
      'Walking through the weavers’ colony watching vintage handloom shuttles fly',
      'Traditional folk games: Lagori (7 stones), Gilli Danda, and brass spinning tops',
      'Folk storytelling & percussion jamming under the ancient Banyan tree',
      'Grinding spices on traditional stone grinding wheels (Ammi Kallu)',
      'Community feast served on fresh banana leaves with local sweet obbattu'
    ],
    learningOutcomes: [
      'Bridges urban and rural realities, fostering humble gratitude and empathy',
      'Revives active, cooperative traditional games that promote social bonding',
      'Appreciation for oral traditions, regional languages, and cultural diversity',
      'Understanding circular rural living and zero-waste community practices'
    ],
    whatsIncluded: [
      'Village entry, bullock cart caravan ride, and handloom workshop',
      'Complete village feast on banana leaves with warm payasam',
      'Set of traditional hand-painted wooden tops (Lattu) to take home',
      'Dedicated bilingual village storyteller & community guide',
      'Fresh tender coconut water straight from local groves'
    ],
    whatToBring: [
      'Sun hat or umbrella',
      'Comfortable walking footwear suitable for village paths',
      'Camera or sketchbook to document memories'
    ],
    sampleSchedule: [
      { time: '09:00 AM', activity: 'Arrival to festive folk dhol welcoming & fresh coconut water' },
      { time: '09:45 AM', activity: 'Painted bullock cart caravan ride across river trails' },
      { time: '11:00 AM', activity: 'Handloom weaving & traditional house architecture walk' },
      { time: '12:30 PM', activity: 'Banana leaf traditional feast with village host families' },
      { time: '01:45 PM', activity: 'Traditional sports championship: Lagori & tops tournament' },
      { time: '02:45 PM', activity: 'Story circle under the banyan tree & souvenir top gifting' }
    ],
    safetyNotes: [
      'Gentle, well-tended livestock with experienced handlers',
      'Sanitized clean restrooms and bottled/RO drinking water stations',
      'Village elders and hosts are verified members of our eco-tourism council'
    ],
    nextAvailableDates: ['Saturday, Nov 15', 'Sunday, Nov 23', 'Sunday, Nov 30']
  },
  {
    id: 'nature-detectives',
    category: 'nature',
    title: 'Nature Detectives: Secrets of the Forest Floor',
    badge: 'Wilderness Biology',
    tagline: 'Explore Nature. Discover Its Secrets.',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop',
    ],
    ageSuitability: 'Ages 5 – 13',
    duration: '3.5 Hours',
    groupSize: '8 – 16 Children',
    ratio: '1 Field Naturalist : 5 Children',
    pricePerChild: 1350,
    escortPrice: 450,
    location: 'Western Ghats Foothills & Bannerghatta Bio-Canopy',
    overview: 'Armed with kid-safe binoculars, macro magnifying jars, and illustrated naturalist journals, young explorers venture beneath the tree canopy to decode bird languages, track leaf-cutter ants, catch water skaters in clean brooks, and plant wildflower seed balls.',
    curriculumTags: ['Field Biology', 'Micro-Ecosystems', 'Ornithology', 'Conservation'],
    activities: [
      'Bird spotting & call imitation with lightweight rubberized binoculars',
      'Macro bug observation in safe catch-and-release magnifying viewers',
      'Canopy leaf texture rubbing & tree bark pattern documentation',
      'Stream dip-netting for water striders, tadpoles, and freshwater crabs',
      'Rolling native wildflower seed balls (clay, compost & seeds) to re-green trails',
      'Naturalist sensory listening sit-spot meditation in the forest glade'
    ],
    learningOutcomes: [
      'Acute sensory observation: learning to look closely and listen deeply',
      'Understanding food webs, pollinator importance, and microscopic habitats',
      'Cultivating genuine love for forests, reducing fear of bugs and wild spaces',
      'Hands-on action: actively planting seeds for local birds and butterflies'
    ],
    whatsIncluded: [
      'Nature Explorer Field Journal & waterproof graphite sketching pencil',
      'Pocket dual-magnifier lens',
      'Pack of 5 native wildflower seed balls made during the workshop',
      'Bird and butterfly identification pocket field sheet',
      'Wild forest honey tea & organic trail mix snacks'
    ],
    whatToBring: [
      'Sturdy closed shoes or sports shoes',
      'Full-length comfortable cotton pants (for trail foliage protection)',
      'Small backpack for field journal and water bottle'
    ],
    sampleSchedule: [
      { time: '08:00 AM', activity: 'Dawn chorus walk: spotting barbets, sunbirds & hornbills' },
      { time: '08:45 AM', activity: 'Macro world safari: rot logs, lichens & ant superhighways' },
      { time: '09:45 AM', activity: 'Stream ecology dip & aquatic insect classification' },
      { time: '10:30 AM', activity: 'Wildflower seed ball rolling & journal sketches' },
      { time: '11:15 AM', activity: 'Sharing circle, Junior Naturalist badge & send-off' }
    ],
    safetyNotes: [
      'Pre-scouted, leech-safe and low-risk established trails',
      'Trained certified wildlife naturalists with snake-safe gaiters and first aid',
      'All insect observations are catch-and-release with zero harm to creatures'
    ],
    nextAvailableDates: ['Saturday, Nov 8', 'Sunday, Nov 9', 'Saturday, Nov 15']
  }
];

export const WHY_LITTLE_EXPLORERS_PILLARS = [
  {
    icon: 'TreePine',
    title: '100% Screen-Free Sensory Living',
    description: 'We replace glowing glass tablets with warm dirt, pine needles, cool stream waters, and buzzing dragonflies. Children reconnect with physical reality.',
    highlight: 'Zero screens, 100% presence'
  },
  {
    icon: 'ShieldCheck',
    title: '1:5 Adult-to-Child Care Ratio',
    description: 'Small, deeply personal cohorts ensure every child is seen, heard, nurtured, and guided with patient individual attention and unmatched safety.',
    highlight: 'Rigorous supervision'
  },
  {
    icon: 'Award',
    title: 'Certified Naturalists & Master Artisans',
    description: 'Led not by generic chaperones, but by passionate botanists, rural pottery masters, organic permaculturists, and pediatric first-aid responders.',
    highlight: 'Authentic mentorship'
  },
  {
    icon: 'Sparkles',
    title: 'Real Life Skills Over Memorisation',
    description: 'Children learn by doing: sowing seeds, turning pottery wheels, reading analog compasses, and cooking nutritious meals from scratch.',
    highlight: 'Experiential pedagogy'
  },
  {
    icon: 'Apple',
    title: 'Wholesome Farm & Fresh Nutrition',
    description: 'Fresh tender coconut, stone-ground millets, farm-plucked fruits, and pure RO-filtered water. No processed junk or artificial sweeteners.',
    highlight: '100% organic & nourishing'
  },
  {
    icon: 'HeartHandshake',
    title: 'Take-Home Creations & Stories',
    description: 'Every explorer returns home with tangible triumphs: their own ceramic pots, hand-printed canvas bags, living seedlings, or field journals.',
    highlight: 'Memories that endure'
  }
];

export const SAFETY_PROTOCOLS = [
  {
    title: 'Strict 1:5 to 1:6 Supervision Ratio',
    content: 'We cap every cohort at small groups with dedicated background-verified facilitators assigned to no more than 5 to 6 children. No child ever walks alone or out of sight.'
  },
  {
    title: 'Pediatric First Aid & Medical Evac Standby',
    content: 'All lead facilitators hold active Wilderness First Aid (WFA) & Pediatric CPR certifications. An air-conditioned standby emergency vehicle is stationed at every site with tie-ups to the nearest tertiary care hospital.'
  },
  {
    title: 'Fenced, Pre-Screened Sanctuary Perimeters',
    content: 'Our farms, studios, and eco-trails are private, enclosed properties thoroughly inspected for safety, clear of sharp hazards, toxic flora, or open deep waters before any group arrives.'
  },
  {
    title: 'Hygienic, Farm-Fresh & Allergen-Safe Dining',
    content: 'Food is prepared in commercial-grade sanitized kitchens using filtered RO water and fresh organic produce. Parents complete mandatory dietary and allergy questionnaires prior to the outing.'
  },
  {
    title: 'Live WhatsApp Broadcast for Parents',
    content: 'We understand parental anxiety. Parents receive periodic broadcast photo updates, arrival/departure timestamps, and live location pins throughout the outing.'
  },
  {
    title: 'Non-Toxic, Child-Safe Craft & Explorer Tools',
    content: 'From lead-free river clay and natural plant dyes to blunt nylon kitchen prep knives and shatter-proof magnifiers, all equipment is age-engineered for absolute safety.'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g1',
    title: 'First Turn on the Potter’s Wheel',
    category: 'Artisan',
    url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=900&auto=format&fit=crop',
    caption: 'Little hands shaping cool wet clay with patient guidance from a master artisan.',
    location: 'Ramanagara Ceramic Studio'
  },
  {
    id: 'g2',
    title: 'Harvesting the Sweetest Carrots',
    category: 'Farming',
    url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=900&auto=format&fit=crop',
    caption: 'Pulling fresh carrots straight from dark fertile soil on an organic permaculture farm.',
    location: 'Valley Permaculture Farm'
  },
  {
    id: 'g3',
    title: 'Woodfired Pizza Masters in Training',
    category: 'Culinary',
    url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=900&auto=format&fit=crop',
    caption: 'Proudly sliding hand-stretched dough and freshly plucked basil into the oven.',
    location: 'Nandi Hills Orchard Hearth'
  },
  {
    id: 'g4',
    title: 'Unlocking the Forest Compass Clues',
    category: 'Detective',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=900&auto=format&fit=crop',
    caption: 'A young squad calculating directional bearings to locate the hidden chest.',
    location: 'Savandurga Whispering Pines'
  },
  {
    id: 'g5',
    title: 'Folk Sports Championship: Lagori',
    category: 'Culture',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=900&auto=format&fit=crop',
    caption: 'Laughter ringing across village grounds as seven stones are stacked in a lively game.',
    location: 'Janapada Heritage Village'
  },
  {
    id: 'g6',
    title: 'Macro World Through the Lens',
    category: 'Nature',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=900&auto=format&fit=crop',
    caption: 'Observing the intricate wings of a swallowtail butterfly perched on morning dew.',
    location: 'Bannerghatta Bio-Canopy'
  },
  {
    id: 'g7',
    title: 'Meeting the Farm Calves',
    category: 'Farming',
    url: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=900&auto=format&fit=crop',
    caption: 'Feeding green fodder and learning the names of gentle indigenous farm cows.',
    location: 'Coorg Foothills Dairy'
  },
  {
    id: 'g8',
    title: 'Botanical Natural Dyes & Block Print',
    category: 'Artisan',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=900&auto=format&fit=crop',
    caption: 'Stamping geometric peacock blocks with rich indigo and marigold paste.',
    location: 'Channapatna Crafts Hamlet'
  }
];

export const SCHOOL_OUTINGS_BENEFITS = [
  {
    title: 'Curriculum-Mapped Learning Expeditions',
    description: 'We align hands-on field experiments directly with ICSE, CBSE, IB, and Cambridge science, social studies, and environmental science modules.'
  },
  {
    title: 'Complete Turnkey Logistics & End-to-End Safety',
    description: 'From pre-trip risk assessments and police-vetted transportation to healthy dietary arrangements, we manage every operational detail for faculty.'
  },
  {
    title: 'Post-Trip Activity Workbooks & Portfolios',
    description: 'Every student receives an illustrated reflection journal and teachers receive an institutional learning outcomes dossier with photos.'
  },
  {
    title: 'Customizable Themes for Class Sizes 20 to 200',
    description: 'Multiple breakout zones allow large school groups to rotate seamlessly between farming, science, pottery, and cooperative games.'
  }
];

export const FAMILY_PACKAGES = [
  {
    title: 'Weekend Parent-Child Farm Expedition',
    badge: 'Most Popular',
    duration: 'Full Day (9:30 AM – 4:30 PM)',
    idealFor: '1 Child + 1 or 2 Parents',
    description: 'Step into nature together. Plant saplings, harvest lunch vegetables as a team, bake bread, and wrap up with a sunset campfire and flute melodies.',
    price: '₹2,750 (1 Adult + 1 Child)',
    includes: ['All farm & craft supplies', 'Organic lunch & afternoon tea', 'Take-home planter & seed set']
  },
  {
    title: 'Wilderness Birthday & Celebration Escapes',
    badge: 'Special Occasions',
    duration: '4.5 Hours',
    idealFor: 'Groups of 8 – 25 Children',
    description: 'Ditch noisy mall party rooms. Celebrate your child’s birthday with a treasure mystery hunt, wood-fired pizzas, mud play, and campfire stories.',
    price: 'Starting ₹18,500 for 10 kids',
    includes: ['Custom treasure quest', 'Artisanal pizza party', 'Natural campfire with acoustic music']
  },
  {
    title: 'Grandparent & Grandchild Roots Tour',
    badge: 'Multi-Generational',
    duration: 'Half Day (4 Hours)',
    idealFor: 'Families & Elders',
    description: 'A gentle, nostalgic journey connecting generations through pottery wheels, village strolls, traditional sweets, and quiet moments in heritage groves.',
    price: '₹3,400 (Family of 3)',
    includes: ['Easy-paced walking trails', 'Cart ride', 'Traditional herbal beverages & snacks']
  }
];
