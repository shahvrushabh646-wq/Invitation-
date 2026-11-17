// ============================================
// CENTRAL CONFIGURATION - EDIT ALL WEDDING DETAILS HERE
// ============================================

const WEDDING_CONFIG = {
  // Couple Names
  groom: {
    name: "Nemin",
    gujarati: "નિમિન"
  },
  bride: {
    name: "Heta",
    gujarati: "હેતા"
  },

  // Wedding Date & Time (ISO format for countdown)
  // IMPORTANT: Set your actual wedding date here
  weddingDate: "2027-02-14T18:00:00", // Placeholder - update with real date
  weddingTime: "6:00 PM onwards",

  // Welcome Message
  welcomeMessage: "Together with their families, we invite you to celebrate the beginning of our forever.",

  // Our Story
  story: {
    text: "Two souls, one journey. What began as a beautiful friendship blossomed into a love that feels destined. Nemin and Heta found in each other a partner for life — someone to share laughter, dreams, and every ordinary moment made extraordinary. With the blessings of their families, they now begin this new chapter together.",
    // Add photo paths later: photos: ["images/couple1.jpg", "images/couple2.jpg"]
    photos: []
  },

  // Events - Update with real dates, times, venues
  events: [
    {
      id: "mehendi",
      title: "Mehendi",
      gujarati: "મેહંદી",
      date: "TBA",
      time: "TBA",
      venue: "To be announced",
      address: "",
      mapLink: "",
      description: "A vibrant celebration of colour and tradition as the bride's hands are adorned with intricate henna designs."
    },
    {
      id: "haldi",
      title: "Haldi",
      gujarati: "હળદી",
      date: "TBA",
      time: "TBA",
      venue: "To be announced",
      address: "",
      mapLink: "",
      description: "A joyful ceremony where turmeric paste is applied for blessings of prosperity and glowing skin."
    },
    {
      id: "wedding",
      title: "Wedding Ceremony",
      gujarati: "લગ્ન સમારંભ",
      date: "TBA",
      time: "TBA",
      venue: "To be announced",
      address: "",
      mapLink: "",
      description: "The sacred union of two hearts under the blessings of elders and the divine."
    },
    {
      id: "reception",
      title: "Reception",
      gujarati: "રિસેપ્શન",
      date: "TBA",
      time: "TBA",
      venue: "To be announced",
      address: "",
      mapLink: "",
      description: "An evening of celebration, music, and feasting as we welcome our loved ones."
    }
  ],

  // Destinations / Locations (examples from reference - update with confirmed)
  destinations: [
    {
      name: "Ahmedabad",
      state: "Gujarat, India",
      description: "The heart of Gujarat — where traditions meet modern celebrations."
    },
    {
      name: "Udaipur",
      state: "Rajasthan, India",
      description: "The City of Lakes — a royal backdrop for timeless memories."
    },
    {
      name: "Jaipur",
      state: "Rajasthan, India",
      description: "The Pink City — where heritage and grandeur come alive."
    }
  ],

  // Main Venue (update when confirmed)
  venue: {
    name: "Venue to be announced",
    city: "Ahmedabad / Udaipur",
    state: "Gujarat / Rajasthan, India",
    address: "Full address will be shared closer to the date",
    mapLink: "",
    photo: ""
  },

  // Family Blessings
  family: {
    groomSide: {
      title: "Groom's Family",
      parents: "Parents of Nemin",
      message: "With love and blessings"
    },
    brideSide: {
      title: "Bride's Family",
      parents: "Parents of Heta",
      message: "With love and blessings"
    },
    blessingMessage: "We seek the blessings of our elders and the love of our dear ones as we begin this beautiful journey together."
  },

  // RSVP
  rsvp: {
    whatsappNumber: "", // e.g. "919876543210" (with country code, no +)
    message: "Kindly respond by the date shared so we can plan for your presence."
  },

  // Thank You
  thankYouMessage: "Thank you for being part of our story. Your love, blessings, and presence mean the world to us. We look forward to celebrating this joyous occasion with you.",

  // Music (place a royalty-free instrumental mp3 in assets/ and set path)
  music: {
    enabled: false,
    src: "assets/wedding-instrumental.mp3",
    title: "Soft Wedding Instrumental"
  },

  // Meta
  siteTitle: "Nemin & Heta — Wedding Invitation",
  siteDescription: "You are cordially invited to the wedding celebration of Nemin & Heta"
};
