/* =========================================================
   PROFILE — edit your personal details here.
   Every component reads from this one object.
   ========================================================= */
window.PROFILE = {
  name: "Sabarish P",
  firstName: "Sabarish",
  title: "Software Engineer / Android Specialist",
  shortTitle: "Software Engineer | Native Android Developer",
  experience: "3.5+",
  location: "India",

  email: "sabarish.p1510@gmail.com",
  linkedin: "https://www.linkedin.com/in/sabarish-p-920212262/",
  github: "https://github.com/SabarishP22",

  // Path or URL to your resume PDF, e.g. "assets/Sabarish-P-Resume.pdf".
  // While empty, the resume button becomes "Request resume" (opens an email).
  resume: "",

  // Path or URL to a profile photo. Leave empty to hide the photo slot.
  photo: "",

  // Availability indicator — update manually.
  // status: "available" | "limited" | "unavailable" | "discuss"
  availability: {
    status: "discuss",
    note: "" // optional custom text, e.g. "Booking projects from March"
  },

  // Optional form backend (e.g. a Formspree endpoint "https://formspree.io/f/xxxx").
  // Leave empty to use the email-app (mailto) fallback.
  formEndpoint: ""
};
