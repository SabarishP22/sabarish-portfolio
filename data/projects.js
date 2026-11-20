/* =========================================================
   PROJECTS — edit project content here.
   filters: any of "ai", "social", "realtime", "offline" (all count as Android).
   screenshots: array of image paths — when added, they show as real screenshots.
   github / demo: leave "" to hide the button.
   mock: which concept UI to draw (see js/mockups.js).
   ========================================================= */
window.PROJECTS = [
  {
    id: "nutri-ai", name: "Nutri AI", year: "2026",
    domain: "Nutrition · Fitness · Social · Gamification",
    filters: ["social"], accent: "#8B5CF6", accent2: "#34D399", mock: "nutri",
    tagline: "Meals, fitness, social and challenges in one engaging app.",
    overview: "An internal nutrition and fitness application for tracking meals and fitness activity, with social and gamification features that keep users engaged.",
    tech: ["Kotlin", "Jetpack Compose", "MVVM", "Clean Architecture", "Retrofit", "DataStore", "REST APIs"],
    contributions: [
      "Developed the Home, Social, Nutrition and Games modules.",
      "Implemented meal tracking with calorie and macronutrient breakdowns.",
      "Built social posts and stories.",
      "Implemented challenges and gamification features.",
      "Integrated REST APIs and managed local app data with DataStore.",
      "Improved performance through caching, API optimization and UI enhancements."
    ],
    architecture: [
      { layer: "UI", items: ["Compose screens", "Home · Social · Nutrition · Games"] },
      { layer: "Presentation", items: ["ViewModels", "UI state"] },
      { layer: "Domain", items: ["Use cases", "Models"] },
      { layer: "Data", items: ["Repositories", "Retrofit", "DataStore", "Cache"] }
    ],
    screenshots: [], github: "", demo: ""
  },
  {
    id: "ai-agent", name: "AI Agent", year: "2025",
    domain: "Artificial Intelligence · Productivity · Automation",
    filters: ["ai"], accent: "#60A5FA", accent2: "#A78BFA", mock: "agent",
    tagline: "Control your device by simply asking — in text or voice.",
    overview: "An AI-powered assistant that lets users perform device actions through natural text and voice commands, using an on-device NER model to understand intent.",
    tech: ["Kotlin", "Jetpack Compose", "Named Entity Recognition", "AI model integration"],
    contributions: [
      "Created a conversational, chat-based UI.",
      "Integrated an NER model for intent and entity extraction.",
      "Enabled alarm and calendar event creation from commands.",
      "Supported in-app navigation and location-based tasks.",
      "Implemented both voice and text command processing."
    ],
    architecture: [
      { layer: "Input", items: ["Chat UI (Compose)", "Voice input"] },
      { layer: "Understanding", items: ["NER model", "Intent + entities"] },
      { layer: "Actions", items: ["Alarms", "Calendar", "Navigation", "Location tasks"] }
    ],
    screenshots: [], github: "", demo: ""
  },
  {
    id: "zocrates", name: "Zocrates", year: "2025",
    domain: "Education · E-learning",
    filters: [], accent: "#F59E0B", accent2: "#8B5CF6", mock: "quiz",
    tagline: "English-learning quizzes designed for Japanese children.",
    overview: "An English-learning quiz application for Japanese children, with interactive UI and learning-focused flows.",
    tech: ["Kotlin", "Jetpack Compose", "UI Testing"],
    contributions: [
      "Designed quiz screens and learning interactions.",
      "Built responsive, reusable UI components.",
      "Implemented the core user flows.",
      "Wrote UI test cases for validation and stability."
    ],
    architecture: [
      { layer: "UI", items: ["Quiz screens", "Reusable components"] },
      { layer: "State", items: ["Question flow", "Progress"] },
      { layer: "Quality", items: ["Compose UI tests"] }
    ],
    screenshots: [], github: "", demo: ""
  },
  {
    id: "paceup", name: "PaceUp", year: "2023",
    domain: "Social Networking · Sports",
    filters: ["social"], accent: "#F97316", accent2: "#8B5CF6", mock: "social",
    tagline: "A sports community to connect, share and stay active.",
    overview: "A social networking and sports-focused Android app where users connect, share updates and take part in community activities.",
    tech: ["Java", "Kotlin", "REST APIs", "MVVM"],
    contributions: [
      "Developed core Android features across the app.",
      "Implemented 20+ REST API integrations and optimized network calls.",
      "Built social networking functionality.",
      "Integrated real-time notifications and user activity tracking.",
      "Kept the codebase scalable and maintainable."
    ],
    architecture: [
      { layer: "UI", items: ["Feed", "Profiles", "Activities"] },
      { layer: "Presentation", items: ["ViewModels (MVVM)"] },
      { layer: "Data", items: ["Repositories", "REST APIs (20+)", "Notifications"] }
    ],
    screenshots: [], github: "", demo: ""
  },
  {
    id: "kitty-pay", name: "Kitty Pay", year: "2024",
    domain: "Payments · Real-time Communication",
    filters: ["realtime"], accent: "#22D3EE", accent2: "#8B5CF6", mock: "pay",
    tagline: "Payment-focused features with secure sign-in and live chat.",
    overview: "A payment-focused Android application with secure authentication, transaction-related features and real-time chat.",
    tech: ["Kotlin", "Firebase Authentication", "Cloud Firestore", "MVP"],
    contributions: [
      "Integrated Firebase Authentication.",
      "Integrated Cloud Firestore for app data.",
      "Built real-time chat functionality.",
      "Implemented features in Kotlin following MVP architecture.",
      "Focused on secure, reliable data handling."
    ],
    architecture: [
      { layer: "View", items: ["Activities / Fragments"] },
      { layer: "Presenter", items: ["Presenters (MVP)"] },
      { layer: "Model", items: ["Firebase Auth", "Firestore", "Real-time listeners"] }
    ],
    screenshots: [], github: "", demo: ""
  },
  {
    id: "cmauctions", name: "CMAuctions", year: "2024",
    domain: "Auctions · Real-time Systems",
    filters: ["realtime"], accent: "#EF4444", accent2: "#8B5CF6", mock: "auction",
    tagline: "Live bidding with real-time updates over WebSocket.",
    overview: "A dynamic bidding and auction application with real-time auction updates and live bidding interactions.",
    tech: ["Kotlin", "MVVM", "REST APIs", "WebSocket"],
    contributions: [
      "Developed the auction and bidding modules.",
      "Integrated 40+ APIs.",
      "Implemented real-time updates using WebSocket.",
      "Optimized data synchronization during live auctions.",
      "Improved user interactions during live bidding."
    ],
    architecture: [
      { layer: "UI", items: ["Auction list", "Live bidding"] },
      { layer: "Presentation", items: ["ViewModels (MVVM)"] },
      { layer: "Data", items: ["REST APIs (40+)", "WebSocket stream", "Sync"] }
    ],
    screenshots: [], github: "", demo: ""
  },
  {
    id: "scout", name: "Scout", year: "2025",
    domain: "Offline-first · Field Data Management",
    filters: ["offline"], accent: "#10B981", accent2: "#60A5FA", mock: "scout",
    tagline: "Collects data reliably with no connection, syncs when it returns.",
    overview: "An offline-first surveillance application for collecting, storing and managing security-related data efficiently. Details are kept general due to the confidential nature of the work.",
    tech: ["Kotlin", "Room Database", "Offline-first", "Auto sync"],
    contributions: [
      "Implemented local storage using Room Database.",
      "Built offline-first data collection.",
      "Implemented automatic synchronization when connectivity returns.",
      "Optimized database operations and data retrieval.",
      "Focused on reliability and data consistency."
    ],
    architecture: [
      { layer: "UI", items: ["Data entry", "Records"] },
      { layer: "Local (source of truth)", items: ["Room Database"] },
      { layer: "Sync", items: ["Connectivity-aware sync", "Remote"] }
    ],
    screenshots: [], github: "", demo: ""
  }
];

window.PROJECT_FILTERS = [
  { id: "all", label: "All projects" },
  { id: "ai", label: "AI & Intelligence" },
  { id: "social", label: "Social & Community" },
  { id: "realtime", label: "Real-time" },
  { id: "offline", label: "Offline-first" }
];
