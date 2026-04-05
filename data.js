// data.js - The literal boundaries of the HHF 2025-2027 Handbook
const hhfHandbook = {
  anchors: {
    appearance: {
      section: "2.16", [cite: 366]
      prohibited: [
        "ripped jeans", "shorts", "tank tops", "crop tops", "graphic t-shirts",
        "offensive images", "open-toed shoes", "slippers", "flip-flops", 
        "hoodies with drawstrings", "lanyards", "dangling earrings"
      ], [cite: 389-393, 398-403]
      required: ["HHF branded shirts"], [cite: 374]
      silent: ["scrub color", "pant color", "sneaker brands", "fitbit", "apple watch"]
    },
    devices: {
      section: "6.5", [cite: 991]
      prohibited_use: ["personal calls", "personal texting", "social media"], [cite: 993-996]
      protected_use: ["direct patient care", "data collection", "clinical timers"], [cite: 148, 995-996]
      ghost_words: ["ipad", "iphone"] // These words never appear in the book 
    },
    attendance: {
      section: "2.15", [cite: 304]
      excessive_limit: 16, // hours in 30 days [cite: 340]
      mandatory_coaching: "Leader must partner to address barriers during first 30 days of excessive absence." [cite: 341-342]
    }
  },
  ladder: [
    { step: 1, name: "Verbal Coaching", description: "Supportive and constructive discussion." }, [cite: 433-435]
    { step: 2, name: "Written Guidance", description: "Formal documentation of issues." }, [cite: 436-438]
    { step: 3, name: "Final Written Notice", description: "Summarizing concerns and expectations." }, [cite: 439-441]
    { step: 4, name: "Separation", description: "Termination of employment." } [cite: 442-443]
  ],
  red_zone: ["theft", "violence", "substance abuse", "illegal acts", "neglect", "sleeping"] [cite: 431-432]
};
