const products = [
  {
    id: "1",
    name: "Organic Tomatoes",
    description: "Fresh organic tomatoes grown without pesticides",
    price: 4.99,
    category: "Vegetables",
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1546470427-1bb87b5e5f84?w=400",
    stock: 150,
    unit: "kg",
    rating: 4.8,
    reviews: 42
  },
  {
    id: "2",
    name: "Fresh Strawberries",
    description: "Sweet and juicy strawberries picked daily",
    price: 6.99,
    category: "Fruits",
    farmerId: "f2",
    farmerName: "Berry Fields",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400",
    stock: 80,
    unit: "kg",
    rating: 4.9,
    reviews: 67
  },
  {
    id: "3",
    name: "Farm Fresh Eggs",
    description: "Free-range chicken eggs from happy hens",
    price: 5.49,
    category: "Dairy & Eggs",
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400",
    stock: 200,
    unit: "dozen",
    rating: 4.7,
    reviews: 89
  },
  {
    id: "4",
    name: "Organic Lettuce",
    description: "Crispy green lettuce perfect for salads",
    price: 3.49,
    category: "Vegetables",
    farmerId: "f3",
    farmerName: "Sunshine Organics",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400",
    stock: 120,
    unit: "head",
    rating: 4.6,
    reviews: 34
  },
  {
    id: "5",
    name: "Raw Honey",
    description: "Pure wildflower honey from local bees",
    price: 12.99,
    category: "Pantry",
    farmerId: "f2",
    farmerName: "Berry Fields",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784343?w=400",
    stock: 45,
    unit: "jar",
    rating: 5,
    reviews: 123
  },
  {
    id: "6",
    name: "Fresh Carrots",
    description: "Crunchy orange carrots full of vitamins",
    price: 3.99,
    category: "Vegetables",
    farmerId: "f3",
    farmerName: "Sunshine Organics",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
    stock: 180,
    unit: "kg",
    rating: 4.7,
    reviews: 56
  },
  {
    id: "7",
    name: "Sweet Corn",
    description: "Golden sweet corn, freshly harvested from the field",
    price: 2.99,
    category: "Vegetables",
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400",
    stock: 95,
    unit: "ear",
    rating: 4.8,
    reviews: 48
  },
  {
    id: "8",
    name: "Red Apples",
    description: "Crisp and sweet red apples, perfect for snacking",
    price: 5.49,
    category: "Fruits",
    farmerId: "f2",
    farmerName: "Berry Fields",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
    stock: 140,
    unit: "kg",
    rating: 4.9,
    reviews: 78
  },
  {
    id: "9",
    name: "Fresh Milk",
    description: "Farm-fresh whole milk from grass-fed cows",
    price: 4.49,
    category: "Dairy & Eggs",
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
    stock: 75,
    unit: "gallon",
    rating: 4.8,
    reviews: 92
  },
  {
    id: "10",
    name: "Blueberries",
    description: "Plump and juicy organic blueberries packed with antioxidants",
    price: 7.99,
    category: "Fruits",
    farmerId: "f2",
    farmerName: "Berry Fields",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400",
    stock: 60,
    unit: "pint",
    rating: 5.0,
    reviews: 105
  },
  {
    id: "11",
    name: "Bell Peppers",
    description: "Colorful bell peppers - red, yellow, and green mix",
    price: 4.49,
    category: "Vegetables",
    farmerId: "f3",
    farmerName: "Sunshine Organics",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400",
    stock: 110,
    unit: "kg",
    rating: 4.7,
    reviews: 41
  },
  {
    id: "12",
    name: "Artisan Bread",
    description: "Handcrafted sourdough bread baked fresh daily",
    price: 6.99,
    category: "Pantry",
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    stock: 30,
    unit: "loaf",
    rating: 4.9,
    reviews: 67
  },
  {
    id: "13",
    name: "Organic Spinach",
    description: "Fresh baby spinach leaves, nutrient-rich and tender",
    price: 3.99,
    category: "Vegetables",
    farmerId: "f3",
    farmerName: "Sunshine Organics",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
    stock: 85,
    unit: "bunch",
    rating: 4.6,
    reviews: 39
  },
  {
    id: "14",
    name: "Watermelon",
    description: "Large, sweet watermelons perfect for summer",
    price: 8.99,
    category: "Fruits",
    farmerId: "f2",
    farmerName: "Berry Fields",
    image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400",
    stock: 25,
    unit: "each",
    rating: 4.8,
    reviews: 55
  },
  {
    id: "15",
    name: "Cheddar Cheese",
    description: "Sharp aged cheddar cheese made from local milk",
    price: 9.99,
    category: "Dairy & Eggs",
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400",
    stock: 40,
    unit: "lb",
    rating: 4.9,
    reviews: 88
  },
  {
    id: "16",
    name: "Broccoli",
    description: "Fresh green broccoli crowns, high in fiber",
    price: 3.49,
    category: "Vegetables",
    farmerId: "f3",
    farmerName: "Sunshine Organics",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400",
    stock: 70,
    unit: "head",
    rating: 4.5,
    reviews: 32
  },
  {
    id: "17",
    name: "Peaches",
    description: "Sweet and juicy Georgia peaches, tree-ripened",
    price: 6.49,
    category: "Fruits",
    farmerId: "f2",
    farmerName: "Berry Fields",
    image: "https://images.unsplash.com/photo-1629828874514-944d8c5e6e37?w=400",
    stock: 55,
    unit: "kg",
    rating: 4.9,
    reviews: 71
  },
  {
    id: "18",
    name: "Greek Yogurt",
    description: "Creamy homemade Greek yogurt with live cultures",
    price: 5.99,
    category: "Dairy & Eggs",
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
    stock: 90,
    unit: "lb",
    rating: 4.8,
    reviews: 64
  },
  {
    id: "19",
    name: "Zucchini",
    description: "Fresh garden zucchini, versatile and healthy",
    price: 2.99,
    category: "Vegetables",
    farmerId: "f3",
    farmerName: "Sunshine Organics",
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400",
    stock: 100,
    unit: "kg",
    rating: 4.6,
    reviews: 28
  },
  {
    id: "20",
    name: "Oranges",
    description: "Sweet Valencia oranges bursting with vitamin C",
    price: 5.99,
    category: "Fruits",
    farmerId: "f2",
    farmerName: "Berry Fields",
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400",
    stock: 130,
    unit: "kg",
    rating: 4.7,
    reviews: 59
  },
  {
    id: "21",
    name: "Maple Syrup",
    description: "Pure organic maple syrup tapped from our own trees",
    price: 14.99,
    category: "Pantry",
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1571684342797-e4a08c635007?w=400",
    stock: 35,
    unit: "bottle",
    rating: 5.0,
    reviews: 112
  },
  {
    id: "22",
    name: "Cucumbers",
    description: "Cool and crisp cucumbers, great for salads",
    price: 2.49,
    category: "Vegetables",
    farmerId: "f3",
    farmerName: "Sunshine Organics",
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400",
    stock: 145,
    unit: "kg",
    rating: 4.5,
    reviews: 37
  },
  {
    id: "23",
    name: "Raspberries",
    description: "Delicate fresh raspberries with intense flavor",
    price: 8.49,
    category: "Fruits",
    farmerId: "f2",
    farmerName: "Berry Fields",
    image: "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=400",
    stock: 45,
    unit: "pint",
    rating: 4.9,
    reviews: 83
  },
  {
    id: "24",
    name: "Butter",
    description: "Creamy farm-fresh butter churned from sweet cream",
    price: 6.49,
    category: "Dairy & Eggs",
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400",
    stock: 65,
    unit: "lb",
    rating: 4.8,
    reviews: 76
  },
  {
    id: "25",
    name: "Sweet Potatoes",
    description: "Orange-fleshed sweet potatoes packed with nutrients",
    price: 3.79,
    category: "Vegetables",
    farmerId: "f3",
    farmerName: "Sunshine Organics",
    image: "https://images.unsplash.com/photo-1559604174-6f8fcf8d3c8e?w=400",
    stock: 125,
    unit: "kg",
    rating: 4.7,
    reviews: 51
  },
  {
    id: "26",
    name: "Grapes",
    description: "Seedless red grapes, sweet and refreshing",
    price: 6.99,
    category: "Fruits",
    farmerId: "f2",
    farmerName: "Berry Fields",
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400",
    stock: 80,
    unit: "kg",
    rating: 4.8,
    reviews: 68
  },
  {
    id: "27",
    name: "Granola",
    description: "Homemade granola with honey, nuts, and dried fruits",
    price: 8.99,
    category: "Pantry",
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400",
    stock: 50,
    unit: "bag",
    rating: 4.9,
    reviews: 94
  },
  {
    id: "28",
    name: "Kale",
    description: "Superfood kale leaves, perfect for smoothies and salads",
    price: 3.99,
    category: "Vegetables",
    farmerId: "f3",
    farmerName: "Sunshine Organics",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400",
    stock: 90,
    unit: "bunch",
    rating: 4.6,
    reviews: 44
  },
  {
    id: "29",
    name: "Lemons",
    description: "Bright yellow lemons bursting with fresh citrus flavor",
    price: 4.99,
    category: "Fruits",
    farmerId: "f2",
    farmerName: "Berry Fields",
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400",
    stock: 100,
    unit: "kg",
    rating: 4.7,
    reviews: 53
  },
  {
    id: "30",
    name: "Cottage Cheese",
    description: "Fresh cottage cheese with a creamy texture",
    price: 5.49,
    category: "Dairy & Eggs",
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400",
    stock: 55,
    unit: "container",
    rating: 4.7,
    reviews: 61
  },
  {
    id: "31",
    name: "Mushrooms",
    description: "Fresh button mushrooms grown in organic compost",
    price: 5.99,
    category: "Vegetables",
    farmerId: "f3",
    farmerName: "Sunshine Organics",
    image: "https://images.unsplash.com/photo-1620374645686-a0f6d5e05ab5?w=400",
    stock: 65,
    unit: "lb",
    rating: 4.8,
    reviews: 47
  },
  {
    id: "32",
    name: "Pineapple",
    description: "Tropical golden pineapple with sweet juicy flesh",
    price: 4.99,
    category: "Fruits",
    farmerId: "f2",
    farmerName: "Berry Fields",
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400",
    stock: 40,
    unit: "each",
    rating: 4.9,
    reviews: 72
  },
  {
    id: "33",
    name: "Jam Assortment",
    description: "Handmade fruit jams - strawberry, blueberry, and peach",
    price: 7.99,
    category: "Pantry",
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=400",
    stock: 45,
    unit: "jar",
    rating: 5.0,
    reviews: 98
  },
  {
    id: "34",
    name: "Eggplant",
    description: "Glossy purple eggplants, perfect for grilling",
    price: 3.49,
    category: "Vegetables",
    farmerId: "f3",
    farmerName: "Sunshine Organics",
    image: "https://images.unsplash.com/photo-1659261200833-ec8761558af7?w=400",
    stock: 75,
    unit: "kg",
    rating: 4.5,
    reviews: 29
  },
  {
    id: "35",
    name: "Cherries",
    description: "Dark sweet cherries, hand-picked at peak ripeness",
    price: 9.99,
    category: "Fruits",
    farmerId: "f2",
    farmerName: "Berry Fields",
    image: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=400",
    stock: 35,
    unit: "lb",
    rating: 5.0,
    reviews: 116
  },
  {
    id: "36",
    name: "Sour Cream",
    description: "Rich and tangy sour cream made from fresh cream",
    price: 4.99,
    category: "Dairy & Eggs",
    farmerId: "f1",
    farmerName: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1628290577228-c29f5cfd5bee?w=400",
    stock: 60,
    unit: "container",
    rating: 4.6,
    reviews: 52
  }
];
const orders = [
  {
    id: "ORD-001",
    date: "2026-03-28",
    customer: "John Smith",
    items: ["Organic Tomatoes", "Fresh Eggs"],
    total: 15.48,
    status: "Delivered"
  },
  {
    id: "ORD-002",
    date: "2026-03-29",
    customer: "Sarah Johnson",
    items: ["Strawberries", "Raw Honey"],
    total: 19.98,
    status: "Processing"
  },
  {
    id: "ORD-003",
    date: "2026-03-30",
    customer: "Mike Brown",
    items: ["Organic Lettuce", "Carrots"],
    total: 7.48,
    status: "Shipped"
  }
];
const analyticsData = {
  revenue: [
    { month: "Jan", value: 4200 },
    { month: "Feb", value: 5100 },
    { month: "Mar", value: 4800 },
    { month: "Apr", value: 6200 },
    { month: "May", value: 7500 },
    { month: "Jun", value: 8100 }
  ],
  sales: [
    { name: "Vegetables", value: 45 },
    { name: "Fruits", value: 30 },
    { name: "Dairy", value: 15 },
    { name: "Pantry", value: 10 }
  ],
  topProducts: [
    { name: "Organic Tomatoes", sales: 234 },
    { name: "Fresh Strawberries", sales: 189 },
    { name: "Farm Eggs", sales: 156 },
    { name: "Raw Honey", sales: 142 }
  ]
};
const learningResources = [
  {
    id: "1",
    title: "Sustainable Farming Practices",
    category: "Farming Techniques",
    duration: "12 min",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
    description: "Learn about sustainable methods to improve soil health"
  },
  {
    id: "2",
    title: "Pest Control Without Chemicals",
    category: "Organic Farming",
    duration: "18 min",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400",
    description: "Natural pest control techniques for organic farms"
  },
  {
    id: "3",
    title: "Marketing Your Farm Products",
    category: "Business",
    duration: "25 min",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    description: "Strategies to effectively market and sell your products"
  }
];
const successStories = [
  {
    id: "1",
    name: "Maria Rodriguez",
    farm: "Sunrise Organic Farm",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    story: "Increased my revenue by 300% in just 6 months using this platform. The direct connection with buyers changed everything!",
    revenue: "+300%"
  },
  {
    id: "2",
    name: "Robert Chen",
    farm: "Heritage Harvest",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    story: "The learning hub helped me transition to organic farming, and now I have a loyal customer base who values quality.",
    revenue: "+250%"
  },
  {
    id: "3",
    name: "Amara Okafor",
    farm: "Fresh Fields Co-op",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    story: "Access to analytics and direct customer feedback transformed how I run my farm. Best decision ever!",
    revenue: "+400%"
  }
];
const subscriptionPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    interval: "month",
    features: [
      "Browse all products",
      "Order tracking",
      "Customer support",
      "Weekly newsletter"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    interval: "month",
    popular: true,
    features: [
      "Everything in Basic",
      "Priority shipping",
      "10% off all orders",
      "Early access to new products",
      "AI product recommendations",
      "Community forum access"
    ]
  },
  {
    id: "family",
    name: "Family",
    price: 34.99,
    interval: "month",
    features: [
      "Everything in Premium",
      "20% off all orders",
      "Free shipping",
      "Exclusive products",
      "Personal shopper",
      "Monthly farm box"
    ]
  }
];
const forumPosts = [
  {
    id: "1",
    author: "Sarah Green",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
    role: "farmer",
    title: "Tips for Growing Organic Tomatoes in Hot Weather",
    excerpt: "After years of trial and error, I've found these techniques work best...",
    replies: 23,
    likes: 45,
    date: "2 days ago"
  },
  {
    id: "2",
    author: "Mike Thompson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    role: "buyer",
    title: "Best Practices for Storing Fresh Produce",
    excerpt: "I love buying fresh produce but struggle with storage. Any tips?",
    replies: 18,
    likes: 32
  },
  {
    id: "3",
    author: "Emily Watson",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    role: "farmer",
    title: "Transitioning to Regenerative Agriculture",
    excerpt: "Starting my journey into regenerative practices. Would love to hear experiences...",
    replies: 41,
    likes: 78,
    date: "1 week ago"
  }
];
const users = [
  {
    id: "1",
    name: "John Farmer",
    email: "john@farm.com",
    role: "farmer",
    status: "active",
    joinDate: "2025-01-15",
    products: 12
  },
  {
    id: "2",
    name: "Jane Buyer",
    email: "jane@email.com",
    role: "buyer",
    status: "active",
    joinDate: "2025-06-20",
    orders: 34
  },
  {
    id: "3",
    name: "Bob Producer",
    email: "bob@farm.com",
    role: "farmer",
    status: "pending",
    joinDate: "2026-03-10",
    products: 5
  }
];

const notifications = {
  farmer: [
    {
      id: "n1",
      type: "order",
      title: "New Order Received",
      message: "Sarah Johnson ordered 5kg of Organic Tomatoes and 2 dozen Fresh Eggs",
      time: "5 minutes ago",
      read: false,
      icon: "ShoppingCart",
      color: "primary"
    },
    {
      id: "n2",
      type: "payment",
      title: "Payment Received",
      message: "$45.50 deposited to your account for Order #ORD-1247",
      time: "2 hours ago",
      read: false,
      icon: "DollarSign",
      color: "success"
    },
    {
      id: "n3",
      type: "review",
      title: "New Product Review",
      message: "Mike Brown left a 5-star review for your Fresh Strawberries",
      time: "5 hours ago",
      read: true,
      icon: "Star",
      color: "warning"
    },
    {
      id: "n4",
      type: "stock",
      title: "Low Stock Alert",
      message: "Only 15kg left of Organic Lettuce. Consider restocking soon.",
      time: "1 day ago",
      read: true,
      icon: "AlertTriangle",
      color: "destructive"
    },
    {
      id: "n5",
      type: "message",
      title: "New Message",
      message: "Emma Wilson asked a question about your Farm Fresh Eggs",
      time: "1 day ago",
      read: true,
      icon: "MessageSquare",
      color: "primary"
    },
    {
      id: "n6",
      type: "achievement",
      title: "Milestone Reached!",
      message: "Congratulations! You've completed 100 orders this month 🎉",
      time: "2 days ago",
      read: true,
      icon: "Award",
      color: "success"
    },
    {
      id: "n7",
      type: "tip",
      title: "Farming Tip",
      message: "New learning resource available: 'Maximizing Tomato Yield in Spring'",
      time: "3 days ago",
      read: true,
      icon: "BookOpen",
      color: "primary"
    }
  ],
  buyer: [
    {
      id: "n1",
      type: "order",
      title: "Order Shipped",
      message: "Your order #ORD-5432 has been shipped and will arrive by tomorrow",
      time: "1 hour ago",
      read: false,
      icon: "Truck",
      color: "primary"
    },
    {
      id: "n2",
      type: "delivery",
      title: "Out for Delivery",
      message: "Your order #ORD-5421 is out for delivery. Track your package.",
      time: "3 hours ago",
      read: false,
      icon: "MapPin",
      color: "success"
    },
    {
      id: "n3",
      type: "promotion",
      title: "Special Offer",
      message: "20% off on all Organic Vegetables this weekend! Don't miss out.",
      time: "6 hours ago",
      read: true,
      icon: "Tag",
      color: "warning"
    },
    {
      id: "n4",
      type: "recommendation",
      title: "New Products You Might Like",
      message: "Fresh Strawberries from Berry Fields are now available near you",
      time: "1 day ago",
      read: true,
      icon: "Sparkles",
      color: "primary"
    },
    {
      id: "n5",
      type: "subscription",
      title: "Subscription Renewed",
      message: "Your Premium subscription has been renewed for another month",
      time: "2 days ago",
      read: true,
      icon: "CreditCard",
      color: "success"
    }
  ],
  admin: [
    {
      id: "n1",
      type: "user",
      title: "New Farmer Registration",
      message: "Bob Producer has registered as a new farmer. Review pending.",
      time: "30 minutes ago",
      read: false,
      icon: "UserPlus",
      color: "primary"
    },
    {
      id: "n2",
      type: "report",
      title: "Content Flagged",
      message: "A product listing has been flagged for review by multiple users",
      time: "2 hours ago",
      read: false,
      icon: "Flag",
      color: "destructive"
    },
    {
      id: "n3",
      type: "analytics",
      title: "Weekly Report Ready",
      message: "Platform analytics for the week are now available for review",
      time: "1 day ago",
      read: true,
      icon: "TrendingUp",
      color: "success"
    },
    {
      id: "n4",
      type: "system",
      title: "System Update Scheduled",
      message: "Platform maintenance scheduled for Sunday 2 AM - 4 AM EST",
      time: "2 days ago",
      read: true,
      icon: "Settings",
      color: "warning"
    }
  ]
};

export {
  analyticsData,
  forumPosts,
  learningResources,
  notifications,
  orders,
  products,
  subscriptionPlans,
  successStories,
  users
};
