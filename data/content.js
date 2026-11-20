/* =========================================================
   SERVICES, STACK, APPROACH, EDUCATION — edit here.
   ========================================================= */
window.SERVICES = [
  { t: "Native Android Development", d: "Custom Android apps built with Kotlin, Jetpack Compose, the Android SDK and modern architecture.", tags: ["Kotlin", "Compose", "Android SDK"], vis: "android" },
  { t: "Jetpack Compose UI", d: "Modern, responsive, polished interfaces with Material Design 3 and reusable components.", tags: ["Compose", "Material 3"], vis: "ui" },
  { t: "App Modernization", d: "Upgrading existing apps — cleaner architecture, modern UI, better performance and maintainability.", tags: ["Refactoring", "Architecture", "Performance"], vis: "layers" },
  { t: "API & Backend Integration", d: "REST APIs, authentication, Firebase and Firestore, WebSocket communication and local databases.", tags: ["REST", "Firebase", "WebSocket"], vis: "api" },
  { t: "AI-powered Mobile Apps", d: "AI model integration, conversational interfaces, voice commands and intelligent in-app actions.", tags: ["NER", "Voice", "Chat UI"], vis: "ai" },
  { t: "Offline-first Apps", d: "Apps that keep working without a connection — Room persistence and connectivity-aware sync.", tags: ["Room", "Sync"], vis: "offline" },
  { t: "Kotlin Multiplatform", d: "Shared business logic across platforms. An emerging service, offered where it fits the project.", tags: ["KMP"], vis: "kmp", developing: true },
  { t: "Compose Multiplatform", d: "Declarative UI across supported platforms. An area of developing expertise.", tags: ["CMP"], vis: "cmp", developing: true }
];

/* level: "core" = professional experience, "dev" = developing / exploring.
   match: extra names used to find which projects used the technology. */
window.STACK = [
  { id: "android", name: "Core Android", items: [
    { n: "Kotlin" }, { n: "Java" }, { n: "Android SDK" }, { n: "Jetpack Compose" },
    { n: "XML" }, { n: "Material Design 3" }, { n: "Jetpack Components" } ] },
  { id: "arch", name: "Architecture", items: [
    { n: "MVVM" }, { n: "MVP" }, { n: "Clean Architecture" }, { n: "State Management" },
    { n: "Coroutines" }, { n: "Flow" }, { n: "Hilt" }, { n: "Dagger" }, { n: "Koin" } ] },
  { id: "data", name: "Data & Networking", items: [
    { n: "REST APIs" }, { n: "Retrofit" }, { n: "Ktor" }, { n: "JSON" }, { n: "WebSocket" },
    { n: "Room", match: ["Room Database"] }, { n: "DataStore" },
    { n: "Firebase", match: ["Firebase Authentication"] }, { n: "Firestore", match: ["Cloud Firestore"] }, { n: "SQL" } ] },
  { id: "quality", name: "Testing & Quality", items: [
    { n: "Unit Testing" }, { n: "UI Testing" }, { n: "Performance Optimization" }, { n: "Firebase Crashlytics" } ] },
  { id: "ai", name: "AI / ML", items: [
    { n: "Named Entity Recognition" }, { n: "AI Model Integration", match: ["AI model integration"] },
    { n: "Conversational Interfaces" }, { n: "Voice Commands" } ] },
  { id: "cross", name: "Cross-platform", items: [
    { n: "Kotlin Multiplatform", level: "dev" }, { n: "Compose Multiplatform", level: "dev" } ] },
  { id: "tools", name: "Tools & Workflow", items: [
    { n: "Android Studio" }, { n: "VS Code" }, { n: "Cursor" }, { n: "Git" }, { n: "GitHub" },
    { n: "Postman" }, { n: "Slack" }, { n: "Asana" }, { n: "Monday" }, { n: "Agile" } ] }
];

window.PRINCIPLES = [
  "Clean code is an investment.",
  "Performance is part of the experience.",
  "Architecture should support growth.",
  "Great UI needs great engineering.",
  "Reliability matters."
];

window.PROCESS = [
  { t: "Discover", d: "Your vision, goals, audience and requirements." },
  { t: "Plan", d: "Features, architecture, technology and scope." },
  { t: "Design", d: "App flows, interface structure and experience." },
  { t: "Develop", d: "Built with modern Android practices." },
  { t: "Test", d: "Functionality, performance, stability, usability." },
  { t: "Deliver", d: "The finished app, agreed documentation and handover." }
];

window.EDUCATION = {
  degree: { title: "Bachelor's Degree", place: "PSG College of Arts and Science", when: "Aug 2019 – Jun 2022", where: "Coimbatore, India" },
  certs: [
    { title: "Android Development", by: "Udemy" },
    { title: "Mastering Jetpack Compose", by: "Udemy" },
    { title: "Android Project Foundation", by: "Training" }
  ]
};

window.PROJECT_TYPES = [
  "New Android app", "Jetpack Compose UI", "Modernize an existing app", "API / backend integration",
  "AI-powered features", "Offline-first app", "Kotlin / Compose Multiplatform", "Something else"
];
