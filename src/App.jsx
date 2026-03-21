import React, { useState, useEffect } from 'react';

// Event start and end times in UTC
const EVENT_START = new Date("2026-03-22T00:00:00Z");
const EVENT_END = new Date("2026-03-24T00:00:00Z");

// Get event dates in user's local timezone
function getLocalEventDates() {
  const startLocal = new Date(EVENT_START);
  const endLocal = new Date(EVENT_END);
  
  const startMonth = startLocal.toLocaleDateString('en-US', { month: 'long' });
  const startDay = startLocal.getDate();
  const endMonth = endLocal.toLocaleDateString('en-US', { month: 'long' });
  const endDay = endLocal.getDate();
  const year = startLocal.getFullYear();
  
  if (startMonth === endMonth) {
    return `${startMonth} ${startDay}–${endDay}, ${year}`;
  } else {
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${year}`;
  }
}

// Get block date range dynamically based on timezone setting
function getBlockDateRange(gmtStart, gmtEnd, showSententral) {
  const start = new Date(gmtStart);
  // Use 1ms before end so we get the correct calendar day for the block's last moment
  const endAdjusted = new Date(new Date(gmtEnd).getTime() - 1);
  
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  if (showSententral) {
    options.timeZone = 'America/Chicago';
  }
  
  const startStr = start.toLocaleDateString('en-US', options);
  const endStr = endAdjusted.toLocaleDateString('en-US', options);
  
  if (startStr === endStr) {
    return startStr;
  }
  return `${startStr} – ${endStr}`;
}

// Schedule data organized by block
const scheduleData = [
  {
    block: 1,
    centralStart: "7:00 PM",
    centralEnd: "1:00 AM",
    gmtStart: "2026-03-22T00:00:00Z",
    gmtEnd: "2026-03-22T06:00:00Z",
    host: "James Bishop and Jimbo Clark",
    regions: "East Asia • Southeast Asia • Oceania",
    sessions: [
      { time: "00:00", speaker: "James Bishop and Jimbo Clark", title: "Welcome to GamiCon48V 2026!", type: "intro", country: "Hong Kong" },
      { time: "00:30", speaker: "Monica Cornetti", title: "F*ck Average", type: "keynote", additionalType: "talk", country: "USA",
        description: "This keynote is for the people who have felt the friction—the ones who tried to raise the bar in corporate training and were met with blank stares, outdated systems, or quiet resistance. It's a clear-eyed call to reject mediocrity in how we design, deliver, and defend meaningful learning. Takeaway: Average is a choice. So is doing something better." },
      { time: "01:00", speaker: "Bernardo Letayf", title: "BlueRabbit", type: "experience", country: "Mexico", description: "Instructions for Using the Gamified Conference App BlueRabbit" },
      { time: "01:15", speaker: "James Bishop", title: "Crossroads: Introduction to the Conference Charity", type: "experience", country: "Hong Kong" },
      { time: "01:30", speaker: "James Bishop", title: "How to Get Away with Murder at a Conference!", type: "talk", country: "Hong Kong", 
        description: "AI-powered design in action: Learn how a resilience conference was transformed into an 80-person murder mystery—designed 80% with AI in under 3 hours." },
      { time: "02:00", speaker: "Amanda Friday, PhD", title: "The Mythic Method: A Magical Approach to Learning Design", type: "talk", country: "USA",
        description: "Drawing from narrative psychology, the monomyth, and Sinospheric myths, Dr. Friday shows how story structures can be translated into practical learning design that drives real behavior change." },
      { time: "02:30", speaker: "Jonathan Peters, PhD", title: "A Brief History of GamiCon and an Introduction to the Throwdown", type: "talk", country: "USA" },
      { time: "03:00", speaker: "Tim Hamons", title: "Sketch Your Game: Visual Tools to Design Engagement, Flow, and Player Motivation", type: "playshop", country: "Singapore",
        description: "Draw your way to better game design. Use simple visual frameworks to clarify player goals, storyboard learning journeys, and map engagement flow." },
      { time: "04:30", speaker: "Dannie Jeffries", title: "Māori-Centred Gamification: Small Shifts, Meaningful Differences", type: "talk", country: "New Zealand",
        description: "Discover how cultural worldviews shape gamified systems. Learn key Māori values and design principles that create more inclusive, impactful experiences." },
      { time: "05:00", speaker: "Beatrice Chu", title: "Bringing University Programs to Life Through Gamification", type: "talk", country: "Hong Kong",
        description: "See how HKUST uses gamification to drive faculty development, learner engagement, and institutional change at scale—with concrete design decisions and lessons learned, not surface-level gimmicks." },
      { time: "05:30", speaker: "James Bishop and Jimbo Clark", title: "Block 1 Wrap-up", type: "experience", country: "Hong Kong" }
    ],
    arcade: [
      { time: "03:30", endTime: "04:30", speaker: "Renee Boisvert", title: "Tabletop Takeover", type: "game", country: "",
        description: "Come to the Arcade. Explore the games on our interactive Game Shelf. Learn more about the Arcade facilitated game sessions that are happening throughout the conference.... and PLAY GAMES!" }
    ],
    talentExchange: []
  },
  {
    block: 2,
    centralStart: "1:00 AM",
    centralEnd: "7:00 AM",
    gmtStart: "2026-03-22T06:00:00Z",
    gmtEnd: "2026-03-22T12:00:00Z",
    host: "Moe Ash & Zunara Nauman",
    regions: "Middle East • South Asia • East Africa",
    sessions: [
      { time: "06:00", speaker: "Moe Ash and Zunara Nauman", title: "Intro Block", type: "intro", country: "UAE" },
      { time: "06:30", speaker: "Ritika Datta", title: "How to Make Words Your Strongest Game Mechanic", type: "talk", country: "Singapore",
        description: "Words aren't just instructions—they're mechanics. Learn how language choices drive behavior change that lasts beyond the session." },
      { time: "07:00", speaker: "Rakshith Bhagavath", title: "Beads of Intent: A Decision Tool Rooted in Ancient Indian Insight", type: "playshop", country: "India",
        description: "Use a simple bead-based activity to uncover your decision-making patterns. Discover avoidance, impulse, and intention through play and reflection." },
      { time: "08:00", speaker: "Darwin Sy Antipolo", title: "WANTED: Games for Developing Future(s)-ready Leaders", type: "talk", country: "Philippines",
        description: "How do you teach people to think about futures that haven't happened yet? Through play. Futures Thinking and Strategic Foresight is an emerging discipline that builds 'futures literacy'—the ability to imagine possibilities, anticipate change, and make better decisions today. In this hands-on session, you'll contribute game ideas and explore proven game mechanics that develop these capabilities." },
      { time: "08:30", speaker: "Mohsin Memon", title: "Throwdown Presentation: Evivve - Leadership Diagnostic Game", type: "experience", country: "" },
      { time: "08:45", speaker: "Moe Ash and Zunara Nauman", title: "Exploration Experience", type: "experience", country: "Pakistan" },
      { time: "09:00", speaker: "Janet Livingstone", title: "Naming, Framing, and Gaming: The Multiplicity Inside", type: "talk", country: "USA/Slovakia",
        description: "Discover Internal Family Systems (IFS) as a gamified leadership development tool. Learn visualization techniques for exploring your inner multiplicity." },
      { time: "10:00", speaker: "Rihan Mustapha", title: "GameFrame in Action: Bringing Purpose, Play, and Progress to Adult Learning", type: "playshop", country: "Saudi Arabia",
        description: "Experience the GameFrame model firsthand. Blend coaching, gamification, and emotional intelligence to create meaningful adult learning." },
      { time: "11:30", speaker: "Moe Ash and Zunara Nauman", title: "Block 2 Wrap-up", type: "experience", country: "UAE" }
    ],
    arcade: [
      { time: "10:30", endTime: "11:30", speaker: "Rebecca Arnett", title: "Control-Alt-Deceive", type: "game", country: "",
        description: "Identify and thwart cyber criminals during this social deduction game." }
    ],
    talentExchange: []
  },
  {
    block: 3,
    centralStart: "7:00 AM",
    centralEnd: "1:00 PM",
    gmtStart: "2026-03-22T12:00:00Z",
    gmtEnd: "2026-03-22T18:00:00Z",
    host: "Bernardo Letayf & Roman Rackwitz",
    regions: "Europe • Africa • Americas (Eastern)",
    sessions: [
      { time: "12:00", speaker: "Bernardo Letayf & Roman Rackwitz", title: "Intro Block", type: "intro", country: "Mexico/Germany" },
      { time: "12:30", speaker: "Thiago Barrionuevo", title: "Dungeon Master", type: "playshop", country: "Portugal",
        description: "Transform learning through game-based dynamics. Experience the Octalysis Framework in action and apply gamification to your own professional challenges." },
      { time: "14:00", speaker: "Alina Tudorache", title: "The Gamification Layer Every Profitable DAO Needs in 2026", type: "talk", country: "Romania",
        description: "Most DAOs die of apathy, not tech failure. Discover the missing behavior layer that turns ghost-town communities into thriving ecosystems." },
      { time: "14:30", speaker: "Michala Liavaag & Dr Ana Garner", title: "Throwdown Presentation: Cyber Security Incident Response Team Experience (CSIRTxp)", type: "experience", country: "" },
      { time: "14:45", speaker: "Moe Ash", title: "Throwdown Presentation: PENTA: It Takes 5 to Ideate a Learning Game", type: "experience", country: "" },
      { time: "15:00", speaker: "Claudio Guz", title: "Vibe Game Coding: Creating Games at the Speed of Imagination", type: "talk", country: "Argentina",
        description: "Create games through conversation, not code. Watch ideas become mechanics instantly through real-time AI collaboration." },
      { time: "15:30", speaker: "Thiago Barrionuevo", title: "Throwdown Presentation: Survivors – Digital Game", type: "experience", country: "" },
      { time: "15:45", speaker: "Rihan Mustapha", title: "Throwdown Presentation: ICF PCC Markers Journey", type: "experience", country: "" },
      { time: "16:00", speaker: "David Chandross and Shoshana Helfenbaum", title: "Panel: Gamified Problem-Based Learning in Compassion-Based Gameworlds", type: "panel", country: "Canada",
        description: "Explore how emerging AI tools and compassionate design can create online learning experiences that feel human, purposeful, and engaging. Learn to design virtual characters that feel alive and relational." },
      { time: "17:00", speaker: "Cedric Pontet", title: "Growing a Global Playful Community: The Story of #play14 and Lessons for Sustainable, Organic Growth", type: "talk", country: "Luxembourg",
        description: "From a small idea in Luxembourg to a thriving international community, #play14 grew because people chose to participate. Explore design principles for sustainable community growth." },
      { time: "17:30", speaker: "Bernardo Letayf and Roman Rackwitz", title: "Block 3 Wrap-up", type: "experience", country: "Mexico/Germany" }
    ],
    arcade: [
      { time: "13:00", endTime: "14:00", speaker: "Clark Aldrich", title: "Socratic Cards", type: "game", country: "",
        description: "Surprise even yourself as simple A/B questions lead to deep exploration. \"Starts as a game, ends up as a guide.\"" }
    ],
    talentExchange: [
      { time: "13:30", endTime: "14:00", speaker: "Shawna Stushnoff", title: "The Game Your Brain Is Already Playing", country: "" }
    ]
  },
  {
    block: 4,
    centralStart: "1:00 PM",
    centralEnd: "7:00 PM",
    gmtStart: "2026-03-22T18:00:00Z",
    gmtEnd: "2026-03-23T00:00:00Z",
    host: "Robert Feeney",
    regions: "Western North America • Mexico • Central America",
    sessions: [
      { time: "18:00", speaker: "Robert Feeney", title: "Intro Block", type: "intro", country: "USA" },
      { time: "18:30", speaker: "Rebecca Arnett", title: "Hidden Gems: Free & Cheap Tools to Level Up Your Training", type: "playshop", country: "USA",
        description: "Stop paying for expensive platforms. Discover free game engines, design tools, and collaborative platforms that make gamification accessible to everyone." },
      { time: "20:00", speaker: "Fiona Gironella", title: "Throwdown Presentation: Border Security Challenge!", type: "experience", country: "" },
      { time: "20:15", speaker: "Patricia Yaker", title: "Throwdown Presentation: Your Benefits Journey", type: "experience", country: "" },
      { time: "20:30", speaker: "Steve Abrams", title: "Making the Story Move Us: Connecting Story Archetypes to the Most Effective Game Mechanics", type: "talk", country: "USA",
        description: "Discover how classic narrative archetypes can be intentionally integrated into gamified learning. Learn a practical framework for matching story structures with game mechanics to create more engaging experiences." },
      { time: "21:00", speaker: "Artrell Williams", title: "We Could Gamify That? Using Gamification Fundamentals to Drive Results", type: "talk", country: "USA",
        description: "Gamification isn't about turning training into a game; it's about applying the principles that make games so engaging." },
      { time: "21:30", speaker: "Sam Liberty", title: "Ethical Gamification", type: "talk", country: "USA",
        description: "When gamification crosses the line into manipulation, everyone loses. Learn the ETHIC framework for designing experiences that respect players." },
      { time: "22:00", speaker: "Bret Wardle", title: "Play with Purpose: Remembering Games Through Empathetic Notes", type: "playshop", country: "USA",
        description: "Bridge experience and insight. Learn a structured note-taking approach to capture emotional responses and synthesize them into better designs." },
      { time: "23:30", speaker: "Robert Feeney", title: "Block 4 Wrap-up", type: "experience", country: "USA" }
    ],
    arcade: [
      { time: "19:00", endTime: "20:30", speaker: "Sharon Goza", title: "4 Years to Mars", type: "game", country: "",
        description: "Join this scenario preview. Fund research, launch projects, and complete mission objectives based on real NASA projects." },
      { time: "22:30", endTime: "23:30", speaker: "John Chen", title: "Game on!", type: "game", country: "",
        description: "Play, debrief, and explore how games lead to powerful learning during this high-energy Engaging Virtual experience." }
    ],
    talentExchange: [
      { time: "19:00", endTime: "19:30", speaker: "Jeffery Riley", title: "Accessibility and Games in Storyline", country: "" },
      { time: "19:30", endTime: "20:00", speaker: "Gwen Fitzpatrick", title: "Gameful Learning Through the Lens of Adult Learning", country: "" },
      { time: "22:30", endTime: "00:00", speaker: "Mary Nunaley, Kristi Conlon, Kevin D. Turner, Dr. Karen Fiorillo, Charlee Riggio", title: "Career Panel", country: "" }
    ]
  },
  {
    block: 5,
    centralStart: "7:00 PM",
    centralEnd: "1:00 AM",
    gmtStart: "2026-03-23T00:00:00Z",
    gmtEnd: "2026-03-23T06:00:00Z",
    host: "James Bishop and Elmer Lau",
    regions: "East Asia • Oceania",
    sessions: [
      { time: "00:00", speaker: "James Bishop and Elmer Lau", title: "Intro Block", type: "intro", country: "USA" },
      { time: "00:30", speaker: "Carriann Lane", title: "Build It Live: Creating Simple Apps Without Writing Code", type: "playshop", country: "USA",
        description: "What if you could create and build an app in 90 minutes without writing code? Together, we'll build an accessible branching scenario you can deploy anywhere using free, simple tools." },
      { time: "02:00", speaker: "Chuck Sigmund, Christian Gossan, Vaughn O'Leary", title: "Fund the Fun: Making the Business Case for Gamification", type: "panel", country: "USA",
        description: "No matter how strong your learning design is, it won't go anywhere without funding. Panelists share real-world strategies for positioning gamification as a business investment." },
      { time: "03:00", speaker: "Brian Slattery and Tom Zacharski", title: "Throwdown Presentation: Submerged: Teamwork Unlocked", type: "experience", country: "" },
      { time: "03:15", speaker: "Maytwin Pitipornvivat", title: "Throwdown Presentation: Storationship", type: "experience", country: "" },
      { time: "03:30", speaker: "Shireen Chua, PhD", title: "When Cultures Clash, Immunities Surface: Game-Based Action Inquiry for Adaptive Leadership", type: "talk", country: "New Zealand",
        description: "Explore how game-based experiences reveal hidden commitments and cultural immunity to change. Design for breakthrough, not just engagement." },
      { time: "04:30", speaker: "Maytwin Pitipornvivat", title: "The Premium Human Play: Gamification Design for 'Premium Human' Skill", type: "talk", country: "Thailand",
        description: "In the age of AI, being human has become premium. Explore design techniques for developing the 7 core human skills through gamification." },
      { time: "05:30", speaker: "Elmer Lau", title: "Block 5 Wrap-up", type: "experience", country: "Hong Kong" }
    ],
    arcade: [
      { time: "01:00", endTime: "02:00", speaker: "Meike Sauerwein", title: "From Farm to Fridge", type: "game", country: "",
        description: "\"Got milk?\" Navigate the journey from cow to carton to cup, making choices that impact milk\'s environmental footprint." }
    ],
    talentExchange: [
      { time: "01:00", endTime: "01:30", speaker: "Jazmin Webster", title: "Bored or Onboard: Rethinking Your Employee\'s Day 1 Experience", country: "" },
      { time: "01:30", endTime: "02:00", speaker: "Joshua Yavelberg", title: "Whatcha Wanna Know About Being AI-gile?", country: "" }
    ]
  },
  {
    block: 6,
    centralStart: "1:00 AM",
    centralEnd: "7:00 AM",
    gmtStart: "2026-03-23T06:00:00Z",
    gmtEnd: "2026-03-23T12:00:00Z",
    host: "Moe Ash & Ercan Altuğ Yılmaz",
    regions: "Middle East • South Asia • East Africa",
    sessions: [
      { time: "06:00", speaker: "Moe Ash & Ercan Altuğ Yılmaz", title: "Intro Block", type: "intro", country: "UAE/Türkiye" },
      { time: "06:30", speaker: "Carol Lim", title: "Reimagining the Futures of Learning Ecosystems through Play", type: "talk", country: "Singapore",
        description: "What if gamified learning isn't about adding mechanics, but reimagining spaces where learning happens? A foresight practitioner's perspective." },
      { time: "07:00", speaker: "Sufiz Suffian", title: "The Hidden System in Play", type: "talk", country: "Malaysia",
        description: "Every game contains an underlying system that shapes what players learn, feel, and do. Discover the invisible architecture of gamified experiences." },
      { time: "08:00", speaker: "Snjezana Slabek", title: "Throwdown Presentation: CogFactory: From Chaos to Clarity with Industrial AI", type: "experience", country: "" },
      { time: "08:15", speaker: "Jolina Kahn", title: "Throwdown Presentation: Monsters and Heroes", type: "experience", country: "" },
      { time: "08:30", speaker: "Namitha Vijayakumar", title: "From Questionnaires to Quests: Rethinking Personality Assessments", type: "talk", country: "India",
        description: "Step into a gamified Everest expedition where every decision reveals personality insights—not through questionnaires, but through lived moments of pressure and uncertainty." },
      { time: "09:30", speaker: "Moe Ash, Kerem Yazici, and Ercan Altuğ Yılmaz", title: "Panel: What's New and in the Future for Gamification", type: "panel", country: "UAE/Türkiye" },
      { time: "10:15", speaker: "Bhaskar Thyagarajan", title: "Don't Wing It! When Games Tell the Truth: Data-based Debriefing for High-Impact Behavioral Learning", type: "playshop", country: "India",
        description: "Move beyond subjective facilitation. Learn breakthrough techniques for data-driven debriefing that proves learning impact." },
      { time: "11:45", speaker: "Moe Ash and Kerem Yazici", title: "Block 6 Wrap-up", type: "experience", country: "UAE" }
    ],
    arcade: [
      { time: "10:15", endTime: "11:45", speaker: "John Robin", title: "Kairos Games", type: "game", country: "",
        description: "First explore values, then work with a team to complete the Ricochet challenge with two fun games optimized for mobile play." }
    ],
    talentExchange: []
  },
  {
    block: 7,
    centralStart: "7:00 AM",
    centralEnd: "1:00 PM",
    gmtStart: "2026-03-23T12:00:00Z",
    gmtEnd: "2026-03-23T18:00:00Z",
    host: "Isobel Wallace (Thinking Cap) & Chuck Sigmund",
    regions: "Europe • Americas • Africa",
    sessions: [
      { time: "12:00", speaker: "Isobel Wallace and Chuck Sigmund", title: "Intro Block", type: "intro", country: "UK" },
      { time: "12:30", speaker: "Monica Cornetti, Marigo Raftopoulos, David Metcalf, Rasha Morsi", title: "AI Hardcoded Bias: UX, AI, and the Human Cost of Design", type: "panel", country: "Global",
        description: "This panel examines how algorithmic systems in healthcare, education, and the workplace often reinforce gendered assumptions, shaping who benefits, who is seen, and who is left out." },
      { time: "13:30", speaker: "Bálint Koller", title: "Throwdown Presentation: Stakeholder Quest: Leveling Up Digital Learning at Grundfos", type: "experience", country: "" },
      { time: "13:45", speaker: "Julie Nguyen", title: "Throwdown Presentation: Biz E. Beaver's Graduate Career Challenge", type: "experience", country: "" },
      { time: "14:00", speaker: "Ayman Elarby", title: "Feedback Marvels", type: "talk", country: "Egypt",
        description: "Give and receive professional feedback through a board game designed with game-based learning principles." },
      { time: "15:00", speaker: "Paula Yaovamal Uebunkul", title: "Throwdown Presentation: Black Hole", type: "experience", country: "" },
      { time: "15:15", speaker: "Isobel Wallace and Chuck Sigmund", title: "Exploration Experience", type: "experience", country: "UK" },
      { time: "15:30", speaker: "Darryn Van Den Berg", title: "Embedding the Learning AFTER Training with Behaviour Economics", type: "talk", country: "South Africa",
        description: "Training fills knowledge gaps, but real impact happens when the workplace environment supports behavior change. Explore the ADAPT model for extending learning beyond the classroom." },
      { time: "16:00", speaker: "Joshua Yavelberg", title: "The Clockwork Prototype Lab: Gamifying Be AI-gile", type: "playshop", country: "USA",
        description: "Enter a steampunk-inspired design bay. Build a playable prototype in 90 minutes while learning the Be AI-gile framework through play." },
      { time: "17:30", speaker: "Isobel Wallace and Chuck Sigmund", title: "Block 7 Wrap-up", type: "experience", country: "UK" }
    ],
    arcade: [
      { time: "16:15", endTime: "18:00", speaker: "Thiago Barrionuevo", title: "Survivors", type: "game", country: "",
        description: "An online cooperative game where each player has unique, partial information and must collaborate, share clues, and make fast decisions to succeed." }
    ],
    talentExchange: [
      { time: "16:30", endTime: "17:30", speaker: "Danielle Watkins and Christy Tucker", title: "5 Portfolio Mistakes Instructional Designers Keep Making (and How to Fix Them)", country: "" }
    ]
  },
  {
    block: 8,
    centralStart: "1:00 PM",
    centralEnd: "7:00 PM",
    gmtStart: "2026-03-23T18:00:00Z",
    gmtEnd: "2026-03-24T00:00:00Z",
    host: "Ginine Capozzi and Casey Webster",
    regions: "Western North America • Mexico • Central America • Oceania",
    sessions: [
      { time: "18:00", speaker: "Ginine Capozzi and Casey Webster", title: "Intro Block", type: "intro", country: "USA" },
      { time: "18:30", speaker: "Jesse Sanderson", title: "We Speak! Addressing Classroom Language Barriers in Under-Resourced Global Regions through Game-Based Learning", type: "talk", country: "USA",
        description: "A student project that became a movement. Learn how game-based learning addresses dropout rates caused by language barriers in Tanzania." },
      { time: "19:00", speaker: "Javier Velasquez", title: "100 Victory Points for Designing Great Point Systems that Teach!", type: "playshop", country: "Colombia",
        description: "Identify point types, understand their psychological value, and design meaningful point systems that actually drive learning." },
      { time: "20:30", speaker: "Ginine Capozzi and Monica Cornetti", title: "Throwdown Showcase Awards", type: "experience", country: "USA" },
      { time: "21:00", speaker: "Julia Allen and Frank Parker", title: "Worldbuilding in Rippily: Enhancing User Experiences Through Design Concepts", type: "playshop", country: "USA",
        description: "Turn virtual platforms into story-rich environments. Hands-on exploration of world-building that surprises and delights." },
      { time: "22:30", speaker: "Keith Lillico", title: "\"Tell Me Why\": What Toddlers, Boy Bands, and Learners Teach Us About Motivation", type: "talk", country: "Canada",
        description: "Examine the underlying ecosystem of human motivation that shapes engagement across very different contexts, from early learning to enterprise compliance. Learn a practical framework for identifying the often-hidden motivations of an audience." },
      { time: "23:00", speaker: "Sententia Team", title: "Closing Celebration", type: "experience", country: "" }
    ],
    arcade: [
      { time: "19:30", endTime: "20:30", speaker: "Peter Williamson", title: "BarometerXP: Hot Air, Cool Games", type: "game", country: "",
        description: "Play a vibe-coded game, then a design thinking activity to explore your own ideas for vibe-coding games." },
      { time: "21:30", endTime: "23:00", speaker: "Lee Chazen", title: "Global Challenge", type: "game", country: "",
        description: "Explore the world in this team-based strategy game. Then land back in your own community to consider how you can vibe-code a game as far-reaching!" }
    ],
    talentExchange: [
      { time: "19:30", endTime: "20:00", speaker: "Keith Lillico", title: "Supercharge Your Network, Supercharge Your Career", country: "" },
      { time: "21:30", endTime: "23:00", speaker: "", title: "Talent Exchange Speed Networking Event", country: "" }
    ]
  }
];

// Convert GMT time to user's local time
function convertToLocal(gmtTimeStr, gmtDate) {
  const [hours, minutes] = gmtTimeStr.split(':').map(Number);
  const date = new Date(gmtDate);
  date.setUTCHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

// Convert GMT time to Central Time
function convertToCentral(gmtTimeStr, gmtDate) {
  const [hours, minutes] = gmtTimeStr.split(':').map(Number);
  const date = new Date(gmtDate);
  date.setUTCHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/Chicago' });
}

// Get type badge styling - colors meet WCAG 2.2 AA 4.5:1 contrast ratio
function getTypeBadge(type) {
  const styles = {
    playshop: { bg: 'bg-amber-700', text: 'text-white', label: 'Playshop' },
    keynote: { bg: 'bg-red-700', text: 'text-white', label: 'Keynote' },
    panel: { bg: 'bg-purple-700', text: 'text-white', label: 'Panel' },
    talk: { bg: 'bg-sky-700', text: 'text-white', label: 'Talk' },
    game: { bg: '', text: 'text-white', label: 'Game', style: { backgroundColor: '#047857' } },
    sponsor: { bg: 'bg-orange-700', text: 'text-white', label: 'Sponsor' },
    intro: { bg: 'bg-slate-600', text: 'text-white', label: 'Welcome' },
    experience: { bg: 'bg-teal-700', text: 'text-white', label: 'Experience' }
  };
  return styles[type] || styles.talk;
}

// Calculate session duration in minutes from time and endTime strings
function getSessionDuration(startStr, endStr) {
  const [sh, sm] = startStr.split(':').map(Number);
  const [eh, em] = endStr.split(':').map(Number);
  let diff = (eh * 60 + em) - (sh * 60 + sm);
  if (diff <= 0) diff += 24 * 60;
  return diff;
}

// Get session start time as Date object
function getSessionStartTime(session, block) {
  const [hours, minutes] = session.time.split(':').map(Number);
  const date = new Date(block.gmtStart);
  date.setUTCHours(hours, minutes, 0, 0);
  return date;
}

// Get session end time based on next session or block end
function getSessionEndTime(session, sessionIndex, block, sessionsArray) {
  if (session.endTime) {
    const [hours, minutes] = session.endTime.split(':').map(Number);
    const date = new Date(block.gmtStart);
    date.setUTCHours(hours, minutes, 0, 0);
    return date;
  }
  
  const sessions = sessionsArray || block.sessions;
  
  if (sessionIndex < sessions.length - 1) {
    return getSessionStartTime(sessions[sessionIndex + 1], block);
  }
  
  return new Date(block.gmtEnd);
}

// Generate ICS calendar file for a session (Apple Calendar & Outlook)
function generateICS(session, sessionIndex, block) {
  const startTime = getSessionStartTime(session, block);
  const endTime = getSessionEndTime(session, sessionIndex, block);
  
  const formatICSDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };
  
  const title = `GamiCon48V: ${session.title}`;
  const description = [
    `Speaker: ${session.speaker}`,
    session.country ? `Location: ${session.country}` : '',
    '',
    session.description || '',
    '',
    'GamiCon48V 2026 - 48 Hours of Playful Learning',
    'https://gamicon48v-landing.vercel.app'
  ].filter(Boolean).join('\\n');
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GamiCon48V//Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${formatICSDate(startTime)}`,
    `DTEND:${formatICSDate(endTime)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `UID:gamicon48v-2026-block${block.block}-session${sessionIndex}@gamicon.com`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `GamiCon48V-${session.title.replace(/[^a-zA-Z0-9]/g, '-').substring(0, 30)}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Generate Google Calendar URL for a session
function getGoogleCalendarUrl(session, sessionIndex, block) {
  const startTime = getSessionStartTime(session, block);
  const endTime = getSessionEndTime(session, sessionIndex, block);
  
  const formatGoogleDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };
  
  const title = encodeURIComponent(`GamiCon48V: ${session.title}`);
  const details = encodeURIComponent([
    `Speaker: ${session.speaker}`,
    session.country ? `Location: ${session.country}` : '',
    '',
    session.description || '',
    '',
    'GamiCon48V 2026 - 48 Hours of Playful Learning',
    'https://gamicon48v-landing.vercel.app'
  ].filter(Boolean).join('\n'));
  
  const dates = `${formatGoogleDate(startTime)}/${formatGoogleDate(endTime)}`;
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}`;
}

// Determine which block is currently live (or next upcoming)
function getCurrentBlockInfo() {
  const now = new Date();
  for (let i = 0; i < scheduleData.length; i++) {
    const block = scheduleData[i];
    const start = new Date(block.gmtStart);
    const end = new Date(block.gmtEnd);
    if (now >= start && now < end) {
      return { status: 'live', blockNumber: block.block };
    }
  }
  // Check if before the event
  if (now < new Date(scheduleData[0].gmtStart)) {
    return { status: 'upcoming', blockNumber: 1 };
  }
  // Check if after the event
  if (now >= new Date(scheduleData[scheduleData.length - 1].gmtEnd)) {
    return { status: 'ended', blockNumber: null };
  }
  // Between blocks — find the next one
  for (let i = 0; i < scheduleData.length; i++) {
    const start = new Date(scheduleData[i].gmtStart);
    if (now < start) {
      return { status: 'between', blockNumber: scheduleData[i].block };
    }
  }
  return { status: 'unknown', blockNumber: null };
}

export default function GamiCon48VLanding() {
  const [showSententralTime, setShowSententralTime] = useState(false);
  const [userTimezone, setUserTimezone] = useState('');
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(null);
  const [currentBlockInfo, setCurrentBlockInfo] = useState({ status: 'unknown', blockNumber: null });

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(tz.replace(/_/g, ' '));
    
    // Load Josefin Sans from Google Fonts
    if (!document.querySelector('link[href*="Josefin+Sans"]')) {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    
    // Check current block status and auto-expand live block
    const info = getCurrentBlockInfo();
    setCurrentBlockInfo(info);
    if (info.status === 'live') {
      setExpandedBlock(info.blockNumber);
    }
    
    // Update every 60 seconds
    const interval = setInterval(() => {
      setCurrentBlockInfo(getCurrentBlockInfo());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Close calendar menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarMenuOpen && !e.target.closest('.calendar-dropdown')) {
        setCalendarMenuOpen(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [calendarMenuOpen]);

  const getDisplayTime = (gmtTime, block) => {
    if (showSententralTime) {
      return convertToCentral(gmtTime, block.gmtStart);
    }
    return convertToLocal(gmtTime, block.gmtStart);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-white focus:font-semibold focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        Skip to main content
      </a>

      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-6 pb-2 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Stair-step icon */}
            <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="0" y="44" width="18" height="14" rx="2" fill="#c45c4a"/>
              <rect x="20" y="44" width="18" height="14" rx="2" fill="#85b1ce"/>
              <rect x="20" y="28" width="18" height="14" rx="2" fill="#f5e6c8"/>
              <rect x="40" y="28" width="18" height="14" rx="2" fill="#4b6176"/>
              <rect x="40" y="12" width="18" height="14" rx="2" fill="#c45c4a"/>
              <circle cx="9" cy="40" r="3" fill="#85b1ce"/>
              <circle cx="29" cy="24" r="3" fill="#c45c4a"/>
              <polygon points="49,4 50.5,7.5 54,8 51.5,10.5 52,14 49,12.5 46,14 46.5,10.5 44,8 47.5,7.5" fill="#f59e0b"/>
            </svg>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                GamiCon<span className="text-amber-400">48V</span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm">Session Schedule</p>
            </div>
          </div>
          {/* Live / Status indicator */}
          {currentBlockInfo.status === 'live' && (
            <div className="flex items-center gap-2 px-4 py-2 bg-rose-900/50 border border-rose-400/50 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <span className="text-rose-300 text-sm font-semibold" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                Block {currentBlockInfo.blockNumber} Live
              </span>
            </div>
          )}
          {currentBlockInfo.status === 'upcoming' && (
            <div className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg shadow-amber-500/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              <span className="text-white text-sm font-bold" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                Starting Soon
              </span>
            </div>
          )}
          {currentBlockInfo.status === 'between' && (
            <div className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-sky-600 to-sky-500 rounded-full shadow-lg shadow-sky-500/20">
              <span className="text-white text-sm font-bold" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                Next: Block {currentBlockInfo.blockNumber}
              </span>
            </div>
          )}
          {currentBlockInfo.status === 'ended' && (
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-500/30 rounded-full">
              <span className="text-slate-300 text-sm font-semibold" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                Event Complete
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative z-10 px-4 py-8 sm:py-12 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-amber-400 uppercase tracking-widest text-xs sm:text-sm mb-4" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
              {getLocalEventDates()} (Your Local Time) • Live Online
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
              Welcome to 48 Hours of<br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent text-amber-400">
                Playful Learning!
              </span>
            </h2>
          </div>
        </section>

        {/* Session Guide */}
        <section className="relative z-10 px-4 pb-6">
          <div className="max-w-6xl mx-auto text-lg text-slate-300 leading-relaxed space-y-2 text-left">
            <p>Your session schedule — browse by block, add sessions to your calendar, and follow along live.</p>
            <p><span className="text-white font-semibold">Main Sessions</span> occur in the Imaginarium. Enter the Auditorium inside the Imaginarium to join a session.</p>
            <p><span className="text-white font-semibold">Talent Exchange</span> is in the Sententia World Headquarters building. Seek the Talent Exchange banner as you enter Headquarters.</p>
            <p><span className="text-white font-semibold">Gameful Experiences</span> happen in the Arcade.</p>
          </div>
        </section>

      {/* Time Zone Toggle - Sticky */}
      <section className="relative z-30 px-4 py-4 sm:py-6 sm:sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-slate-300 text-sm">
              Showing times in {showSententralTime ? 'Sententral Time (Central US)' : `your local time (${userTimezone})`}
            </p>
          </div>
          <button
            onClick={() => setShowSententralTime(!showSententralTime)}
            className="flex items-center gap-3 px-5 py-3 bg-slate-700 rounded-full hover:bg-slate-600 active:bg-slate-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 min-h-[48px]"
            aria-pressed={showSententralTime}
            aria-label={showSententralTime ? 'Switch to local time' : 'Switch to Sententral Time'}
          >
            <span className={`text-xs sm:text-sm font-medium ${!showSententralTime ? 'text-amber-300' : 'text-slate-300'}`}>
              Local
            </span>
            <div className="relative w-12 sm:w-14 h-6 sm:h-7 bg-slate-600 rounded-full">
              <div 
                className={`absolute top-1 w-4 sm:w-5 h-4 sm:h-5 bg-amber-400 rounded-full transition-all duration-300 ${
                  showSententralTime ? 'left-6 sm:left-8' : 'left-1'
                }`}
              ></div>
            </div>
            <span className={`text-xs sm:text-sm font-medium ${showSententralTime ? 'text-amber-300' : 'text-slate-300'}`}>
              Sententral
            </span>
          </button>
        </div>
      </section>

      {/* Schedule Blocks */}
      <section className="relative z-10 px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {scheduleData.map((block) => {
            const isLive = currentBlockInfo.status === 'live' && currentBlockInfo.blockNumber === block.block;
            return (
            <div 
              key={block.block} 
              className={`bg-slate-800/70 rounded-2xl overflow-hidden border shadow-xl ${
                isLive ? 'border-rose-400/50 ring-1 ring-rose-400/30' : 'border-slate-700/50'
              }`}
            >
              {/* Block Header */}
              <button
                onClick={() => setExpandedBlock(expandedBlock === block.block ? null : block.block)}
                className="w-full px-4 sm:px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-700/30 active:bg-slate-700/50 transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400 min-h-[72px]"
                aria-expanded={expandedBlock === block.block}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isLive ? 'bg-gradient-to-br from-rose-400 to-rose-600' : 'bg-gradient-to-br from-amber-500 to-orange-600'
                  }`}>
                    <span className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                      {block.block}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                        Block {block.block}: {getBlockDateRange(block.gmtStart, block.gmtEnd, showSententralTime)}
                      </h4>
                      {isLive && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-rose-900/60 border border-rose-400/40 rounded-full text-xs text-rose-300 font-semibold">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                          </span>
                          LIVE
                        </span>
                      )}
                    </div>
                    <p className="text-amber-400 text-sm">
                      {showSententralTime 
                        ? `${block.centralStart} – ${block.centralEnd} Central`
                        : `${convertToLocal(block.gmtStart.slice(11, 16), block.gmtStart)} – ${convertToLocal(block.gmtEnd.slice(11, 16), block.gmtEnd)} Local`
                      }
                    </p>
                    <p className="text-slate-300 text-sm mt-1 md:hidden">
                      Hosted by <span className="text-white">{block.host}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <p className="text-slate-300 text-sm">Hosted by <span className="text-white font-medium">{block.host}</span></p>
                    <p className="text-slate-300 text-sm">{block.regions}</p>
                  </div>
                  <svg 
                    className={`w-6 h-6 text-slate-400 transition-transform ${expandedBlock === block.block ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Block Sessions */}
              {expandedBlock === block.block && (
                <div className="border-t border-slate-700/50">
                  {block.sessions.map((session, idx) => {
                    const badge = getTypeBadge(session.type);
                    const menuId = `block-${block.block}-${idx}`;
                    return (
                      <div 
                        key={idx} 
                        className={`px-4 sm:px-6 py-4 sm:py-5 ${idx !== block.sessions.length - 1 ? 'border-b border-slate-700/30' : ''} hover:bg-slate-700/20 transition-colors`}
                      >
                        <div className="flex flex-col md:flex-row md:items-start gap-2 sm:gap-4">
                          <div className="flex items-center gap-3 md:block md:flex-shrink-0 md:w-24">
                            <p className="text-amber-400 font-mono font-semibold text-sm sm:text-base">
                              {getDisplayTime(session.time, block)}
                            </p>
                            <span className={`md:hidden px-2 py-0.5 ${badge.bg} ${badge.text} text-xs font-semibold rounded-full`} style={badge.style || {}}>
                              {badge.label}
                            </span>
                            {session.additionalType && (() => {
                              const addBadge = getTypeBadge(session.additionalType);
                              return (
                                <span className={`md:hidden px-2 py-0.5 ${addBadge.bg} ${addBadge.text} text-xs font-semibold rounded-full`} style={addBadge.style || {}}>
                                  {addBadge.label}
                                </span>
                              );
                            })()}
                          </div>
                          <div className="flex-grow">
                            <div className="hidden md:flex flex-wrap items-center gap-2 mb-2">
                              <span className={`px-3 py-1 ${badge.bg} ${badge.text} text-xs font-semibold rounded-full`} style={badge.style || {}}>
                                {badge.label}
                              </span>
                              {session.additionalType && (() => {
                                const addBadge = getTypeBadge(session.additionalType);
                                return (
                                  <span className={`px-3 py-1 ${addBadge.bg} ${addBadge.text} text-xs font-semibold rounded-full`} style={addBadge.style || {}}>
                                    {addBadge.label}
                                  </span>
                                );
                              })()}
                              {session.country && (
                                <span className="text-slate-300 text-sm">
                                  {session.country}
                                </span>
                              )}
                            </div>
                            <h5 className="text-base sm:text-lg font-semibold text-white mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                              {session.title}
                            </h5>
                            <p className="text-sky-300 text-sm mb-2">
                              {session.speaker}
                              {session.country && <span className="md:hidden text-slate-300"> • {session.country}</span>}
                            </p>
                            {session.description && (
                              <p className="text-slate-300 text-base leading-relaxed">
                                {session.description}
                              </p>
                            )}
                            {/* Add to Calendar Dropdown */}
                            <div className="mt-3 relative calendar-dropdown">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCalendarMenuOpen(calendarMenuOpen === menuId ? null : menuId);
                                }}
                                className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-3 sm:py-2.5 text-sm text-slate-300 bg-slate-700/50 hover:bg-slate-600 active:bg-slate-500 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 min-h-[44px]"
                                aria-expanded={calendarMenuOpen === menuId}
                                aria-haspopup="true"
                                aria-label={`Add ${session.title} to calendar`}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Add to Calendar
                                <svg className={`w-4 h-4 transition-transform ${calendarMenuOpen === menuId ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              {calendarMenuOpen === menuId && (
                                <div className="absolute left-0 mt-2 w-56 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50" role="menu">
                                  <a
                                    href={getGoogleCalendarUrl(session, idx, block)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 active:bg-slate-600 rounded-t-lg transition-colors min-h-[44px]"
                                    role="menuitem"
                                    onClick={() => setCalendarMenuOpen(null)}
                                  >
                                    <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                    </svg>
                                    Google Calendar
                                    <span className="sr-only">(opens in new tab)</span>
                                  </a>
                                  <button
                                    onClick={() => {
                                      generateICS(session, idx, block);
                                      setCalendarMenuOpen(null);
                                    }}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 active:bg-slate-600 transition-colors min-h-[44px] text-left"
                                    role="menuitem"
                                  >
                                    <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                                    </svg>
                                    Apple Calendar (.ics)
                                  </button>
                                  <button
                                    onClick={() => {
                                      generateICS(session, idx, block);
                                      setCalendarMenuOpen(null);
                                    }}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 active:bg-slate-600 rounded-b-lg transition-colors min-h-[44px] text-left"
                                    role="menuitem"
                                  >
                                    <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                                    </svg>
                                    Outlook (.ics)
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                    {/* In the Arcade */}
                    {block.arcade && block.arcade.length > 0 && (
                      <div style={{ borderTop: '2px solid #047857', backgroundColor: 'rgba(4,120,87,0.08)' }}>
                        <div className="px-4 sm:px-6 pt-4 pb-2">
                          <h5 className="font-semibold" style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.125rem', color: '#34d399' }}>
                            In the Arcade
                          </h5>
                        </div>
                        {block.arcade.map((session, idx) => {
                          const badge = getTypeBadge(session.type);
                          const menuId = `arcade-${block.block}-${idx}`;
                          return (
                            <div 
                              key={idx} 
                              className={`px-4 sm:px-6 py-4 sm:py-5`}
                              style={idx !== block.arcade.length - 1 ? { borderBottom: '1px solid rgba(4,120,87,0.3)' } : {}}
                            >
                              <div className="flex flex-col md:flex-row md:items-start gap-2 sm:gap-4">
                                <div className="flex items-center gap-3 md:block md:flex-shrink-0 md:w-24">
                                  <p className="text-amber-400 font-mono font-semibold text-sm sm:text-base">
                                    {getDisplayTime(session.time, block)}
                                  </p>
                                  <span className={`md:hidden px-2 py-0.5 ${badge.bg} ${badge.text} text-xs font-semibold rounded-full`} style={badge.style || {}}>
                                    {badge.label}
                                  </span>
                                </div>
                                <div className="flex-grow">
                                  <div className="hidden md:flex flex-wrap items-center gap-2 mb-2">
                                    <span className={`px-3 py-1 ${badge.bg} ${badge.text} text-xs font-semibold rounded-full`} style={badge.style || {}}>
                                      {badge.label}
                                    </span>
                                  </div>
                                  <h5 className="text-base sm:text-lg font-semibold text-white mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                                    {session.title}
                                    {session.endTime && (
                                      <span className="text-slate-400 font-normal text-sm ml-2">
                                        {getSessionDuration(session.time, session.endTime)} minutes
                                      </span>
                                    )}
                                  </h5>
                                  <p className="text-sky-300 text-sm mb-2">
                                    {session.speaker}
                                  </p>
                                  {session.description && (
                                    <p className="text-slate-300 text-base leading-relaxed">
                                      {session.description}
                                    </p>
                                  )}
                                  {/* Calendar Dropdown */}
                                  <div className="mt-3 relative calendar-dropdown">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCalendarMenuOpen(calendarMenuOpen === menuId ? null : menuId);
                                      }}
                                      className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-3 sm:py-2.5 text-sm text-slate-300 bg-slate-700/50 hover:bg-slate-600 active:bg-slate-500 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 min-h-[44px]"
                                      aria-expanded={calendarMenuOpen === menuId}
                                      aria-haspopup="true"
                                      aria-label={`Add ${session.title} to calendar`}
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                      Add to Calendar
                                      <svg className={`w-4 h-4 transition-transform ${calendarMenuOpen === menuId ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>
                                    {calendarMenuOpen === menuId && (
                                      <div className="absolute left-0 mt-2 w-56 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50" role="menu">
                                        <a
                                          href={getGoogleCalendarUrl(session, idx, block)}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 active:bg-slate-600 rounded-t-lg transition-colors min-h-[44px]"
                                          role="menuitem"
                                          onClick={() => setCalendarMenuOpen(null)}
                                        >
                                          <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                          </svg>
                                          Google Calendar
                                          <span className="sr-only">(opens in new tab)</span>
                                        </a>
                                        <button
                                          onClick={() => {
                                            generateICS(session, idx, block);
                                            setCalendarMenuOpen(null);
                                          }}
                                          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 active:bg-slate-600 transition-colors min-h-[44px] text-left"
                                          role="menuitem"
                                        >
                                          <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                                          </svg>
                                          Apple Calendar (.ics)
                                        </button>
                                        <button
                                          onClick={() => {
                                            generateICS(session, idx, block);
                                            setCalendarMenuOpen(null);
                                          }}
                                          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 active:bg-slate-600 rounded-b-lg transition-colors min-h-[44px] text-left"
                                          role="menuitem"
                                        >
                                          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                                          </svg>
                                          Outlook (.ics)
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* In the Talent Exchange */}
                    {block.talentExchange && block.talentExchange.length > 0 && (
                      <div style={{ borderTop: '2px solid #4338ca', backgroundColor: 'rgba(67,56,202,0.08)' }}>
                        <div className="px-4 sm:px-6 pt-4 pb-2">
                          <h5 className="font-semibold" style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: '1.125rem', color: '#818cf8' }}>
                            In the Talent Exchange
                          </h5>
                        </div>
                        {block.talentExchange.map((session, idx) => {
                          const menuId = `te-${block.block}-${idx}`;
                          return (
                            <div 
                              key={idx} 
                              className={`px-4 sm:px-6 py-4 sm:py-5`}
                              style={idx !== block.talentExchange.length - 1 ? { borderBottom: '1px solid rgba(67,56,202,0.3)' } : {}}
                            >
                              <div className="flex flex-col md:flex-row md:items-start gap-2 sm:gap-4">
                                <div className="flex items-center gap-3 md:block md:flex-shrink-0 md:w-24">
                                  <p className="text-amber-400 font-mono font-semibold text-sm sm:text-base">
                                    {getDisplayTime(session.time, block)}
                                  </p>
                                </div>
                                <div className="flex-grow">
                                  <h5 className="text-base sm:text-lg font-semibold text-white mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                                    {session.title}
                                    {session.endTime && (
                                      <span className="text-slate-400 font-normal text-sm ml-2">
                                        {getSessionDuration(session.time, session.endTime)} minutes
                                      </span>
                                    )}
                                  </h5>
                                  {session.speaker && (
                                    <p className="text-sky-300 text-sm mb-2">
                                      {session.speaker}
                                    </p>
                                  )}
                                  {/* Calendar Dropdown */}
                                  <div className="mt-3 relative calendar-dropdown">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCalendarMenuOpen(calendarMenuOpen === menuId ? null : menuId);
                                      }}
                                      className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-3 sm:py-2.5 text-sm text-slate-300 bg-slate-700/50 hover:bg-slate-600 active:bg-slate-500 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 min-h-[44px]"
                                      aria-expanded={calendarMenuOpen === menuId}
                                      aria-haspopup="true"
                                      aria-label={`Add ${session.title} to calendar`}
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                      Add to Calendar
                                      <svg className={`w-4 h-4 transition-transform ${calendarMenuOpen === menuId ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>
                                    {calendarMenuOpen === menuId && (
                                      <div className="absolute left-0 mt-2 w-56 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50" role="menu">
                                        <a
                                          href={getGoogleCalendarUrl(session, idx, block)}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 active:bg-slate-600 rounded-t-lg transition-colors min-h-[44px]"
                                          role="menuitem"
                                          onClick={() => setCalendarMenuOpen(null)}
                                        >
                                          <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                          </svg>
                                          Google Calendar
                                          <span className="sr-only">(opens in new tab)</span>
                                        </a>
                                        <button
                                          onClick={() => {
                                            generateICS(session, idx, block);
                                            setCalendarMenuOpen(null);
                                          }}
                                          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 active:bg-slate-600 transition-colors min-h-[44px] text-left"
                                          role="menuitem"
                                        >
                                          <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                                          </svg>
                                          Apple Calendar (.ics)
                                        </button>
                                        <button
                                          onClick={() => {
                                            generateICS(session, idx, block);
                                            setCalendarMenuOpen(null);
                                          }}
                                          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 active:bg-slate-600 rounded-b-lg transition-colors min-h-[44px] text-left"
                                          role="menuitem"
                                        >
                                          <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                                          </svg>
                                          Outlook (.ics)
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                </div>
              )}
            </div>
          );
          })}
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-8 border-t border-slate-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-300 text-sm">
            © 2026 Sententia Gamification. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="https://www.sententiagamification.com/gamicon48v" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded">
              GamiCon48V Home<span className="sr-only"> (opens in new tab)</span>
            </a>
            <a href="https://www.linkedin.com/company/gamicon" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded">
              LinkedIn<span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
          <div className="text-slate-300 text-sm">
            #GameBasedLearning
          </div>
        </div>
      </footer>

    </div>
  );
}
