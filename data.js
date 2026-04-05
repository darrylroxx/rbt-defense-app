// data.js - HHF Handbook 2025-2027 Rules
const hhfHandbook = {
  anchors: {
    appearance: {
      section: "2.16",
      // Literal prohibitions from the text
      prohibited: [
        "ripped jeans", "shorts", "tank tops", "crop tops", "graphic t-shirts",
        "offensive images", "open-toed shoes", "slippers", "flip-flops", 
        "hoodies with drawstrings", "lanyards", "dangling earrings", "pins", "scarves"
      ],
      required: ["HHF branded shirts"], //
      // Things the handbook is silent on (Ghost Rules)
      silent: ["scrub color", "pant color", "sneaker brands", "fitbit", "apple watch", "navy blue", "black pants"]
    },
    devices: {
      section: "6.5",
      // Prohibited personal use
      prohibited_use: ["personal calls", "personal texting", "social media", "instagram", "netflix"],
      // Protected clinical use
      protected_use: ["direct patient care", "data collection", "clinical timers", "central reach"],
      ghost_words: ["ipad", "iphone"] // Brand names never appearing in the text
    },
    attendance: {
      section: "2.15",
      excessive_limit: 16, // Hours in 30 days
      mandatory_coaching: "Leader must partner to address barriers during first 30 days of excessive absence." //
    }
  },
  ladder: [
    { step: 1, name: "Verbal Coaching", description: "Supportive and constructive discussion." }, //
    { step: 2, name: "Written Guidance", description: "Formal documentation of issues." }, //
    { step: 3, name: "Final Written Notice", description: "Summarizing concerns and expectations." }, //
    { step: 4, name: "Separation", description: "Termination of employment." } //
  ],
  // Gross Misconduct that bypasses the ladder
  red_zone: ["theft", "violence", "substance abuse", "illegal acts", "neglect", "sleeping", "abuse"]
};
