import React, { useState, useEffect, useMemo } from 'react';

// Schedule data organized by block
const scheduleData = [
  {
    block: 1,
    date: "Sat Mar 21 – Sun Mar 22",
    centralStart: "7:00 PM",
    centralEnd: "1:00 AM",
    gmtStart: "2026-03-22T00:00:00Z",
    gmtEnd: "2026-03-22T06:00:00Z",
    host: "James Bishop",
    regions: "East Asia • Southeast Asia • Oceania",
    sessions: [
      { time: "00:00", speaker: "James Bishop", title: "Intro to Event", type: "intro", country: "Hong Kong" },
      { time: "00:30", speaker: "Monica Cornetti", title: "Kickoff Keynote", type: "keynote", country: "USA" },
      { time: "01:00", speaker: "Bernardo Letayf", title: "BlueRabbit", type: "sponsor", country: "Mexico" },
      { time: "01:30", speaker: "James Bishop", title: "How to Get Away with Murder at a Conference!", type: "talk", country: "Hong Kong", 
        description: "AI-powered design in action: Learn how a resilience conference was transformed into an 80-person murder mystery—designed 80% with AI in under 3 hours." },
      { time: "02:30", speaker: "Tim Hamons", title: "Sketch Your Game: Visual Tools to Design Engagement, Flow, and Player Motivation", type: "playshop", country: "Singapore",
        description: "Draw your way to better game design. Use simple visual frameworks to clarify player goals, storyboard learning journeys, and map engagement flow." },
      { time: "04:30", speaker: "Dannie Jeffries", title: "Māori-Centred Gamification: Small Shifts, Meaningful Differences", type: "talk", country: "New Zealand",
        description: "Discover how cultural worldviews shape gamified systems. Learn key Māori values and design principles that create more inclusive, impactful experiences." },
      { time: "05:00", speaker: "Beatrice Chu", title: "Bringing University Programs to Life Through Gamification", type: "talk", country: "Hong Kong",
        description: "How one university onboarded 900 teaching assistants through playful, meaningful gamified programs. See real campus implementations in action." }
    ]
  },
  {
    block: 2,
    date: "Sun Mar 22",
    centralStart: "1:00 AM",
    centralEnd: "7:00 AM",
    gmtStart: "2026-03-22T06:00:00Z",
    gmtEnd: "2026-03-22T12:00:00Z",
    host: "Moe Ash & Zunara",
    regions: "Middle East • South Asia • East Africa",
    sessions: [
      { time: "06:00", speaker: "Moe Ash", title: "Intro Block", type: "intro", country: "UAE" },
      { time: "06:30", speaker: "Ritika Datta", title: "How to Make Words Your Strongest Game Mechanic", type: "talk", country: "Singapore",
        description: "Words aren't just instructions—they're mechanics. Learn how language choices drive behavior change that lasts beyond the session." },
      { time: "07:00", speaker: "Rakshith Bhagavath", title: "Beads of Intent: A Decision Tool Rooted in Ancient Indian Insight", type: "playshop", country: "India",
        description: "Use a simple bead-based activity to uncover your decision-making patterns. Discover avoidance, impulse, and intention through play and reflection." },
      { time: "08:00", speaker: "Darwin Sy Antipolo", title: "WANTED: Games for Developing Future(s)-ready Leaders", type: "talk", country: "Philippines",
        description: "Respond to the call! Explore how game principles and mechanics can build futures-thinking capabilities in leaders facing uncertainty." },
      { time: "08:30", speaker: "Zunara Nauman", title: "Session TBA", type: "talk", country: "Pakistan" },
      { time: "09:00", speaker: "Janet Livingstone", title: "Naming, Framing, and Gaming: The Multiplicity Inside", type: "talk", country: "USA/Slovakia",
        description: "Discover Internal Family Systems (IFS) as a gamified leadership development tool. Learn visualization techniques for exploring your inner multiplicity." },
      { time: "10:00", speaker: "Rihan Mustapha", title: "GameFrame in Action: Bringing Purpose, Play, and Progress to Adult Learning", type: "playshop", country: "Saudi Arabia",
        description: "Experience the GameFrame model firsthand. Blend coaching, gamification, and emotional intelligence to create meaningful adult learning." }
    ]
  },
  {
    block: 3,
    date: "Sun Mar 22",
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
      { time: "14:30", speaker: "Alina Tudorache", title: "The Gamification Layer Every Profitable DAO Needs in 2026", type: "talk", country: "Romania",
        description: "Most DAOs die of apathy, not tech failure. Discover the missing behavior layer that turns ghost-town communities into thriving ecosystems." },
      { time: "15:00", speaker: "Claudio Guz", title: "Vibe Game Coding: Creating Games at the Speed of Imagination", type: "talk", country: "Argentina",
        description: "Create games through conversation, not code. Watch ideas become mechanics instantly through real-time AI collaboration." },
      { time: "16:00", speaker: "Joshua Yavelberg", title: "The Clockwork Prototype Lab: Gamifying Be AI-gile", type: "playshop", country: "USA",
        description: "Enter a steampunk-inspired design bay. Build a playable prototype in 90 minutes while learning the Be AI-gile framework through play." }
    ]
  },
  {
    block: 4,
    date: "Sun Mar 22",
    centralStart: "1:00 PM",
    centralEnd: "7:00 PM",
    gmtStart: "2026-03-22T18:00:00Z",
    gmtEnd: "2026-03-23T00:00:00Z",
    host: "TBA",
    regions: "Western North America • Mexico • Central America",
    sessions: [
      { time: "18:00", speaker: "TBA", title: "Intro Block", type: "intro", country: "" },
      { time: "18:30", speaker: "Rebecca Arnett", title: "Hidden Gems: Free & Cheap Tools to Level Up Your Training", type: "playshop", country: "USA",
        description: "Stop paying for expensive platforms. Discover free game engines, design tools, and collaborative platforms that make gamification accessible to everyone." },
      { time: "20:00", speaker: "Steve Abrams", title: "Making the Story Move Us: Connecting Story Archetypes to Game Mechanics", type: "playshop", country: "USA" },
      { time: "21:30", speaker: "Sam Liberty", title: "Ethical Gamification", type: "talk", country: "USA",
        description: "When gamification crosses the line into manipulation, everyone loses. Learn the ETHIC framework for designing experiences that respect players." },
      { time: "22:00", speaker: "Bret Wardle", title: "Play with Purpose: Remembering Games Through Empathetic Notes", type: "playshop", country: "USA",
        description: "Bridge experience and insight. Learn a structured note-taking approach to capture emotional responses and synthesize them into better designs." }
    ]
  },
  {
    block: 5,
    date: "Sun Mar 22 – Mon Mar 23",
    centralStart: "7:00 PM",
    centralEnd: "1:00 AM",
    gmtStart: "2026-03-23T00:00:00Z",
    gmtEnd: "2026-03-23T06:00:00Z",
    host: "Jimbo Clark",
    regions: "East Asia • Oceania",
    sessions: [
      { time: "00:00", speaker: "Jimbo Clark", title: "Intro Block", type: "intro", country: "Australia" },
      { time: "00:30", speaker: "Carriann Lane", title: "Build It Live: Creating Simple Apps Without Writing Code", type: "playshop", country: "USA",
        description: "What if you could create and build an app in 90 minutes without writing code? Together, we'll build an accessible branching scenario you can deploy anywhere using free, simple tools." },
      { time: "02:00", speaker: "TBA", title: "Funding Panel", type: "panel", country: "" },
      { time: "03:00", speaker: "Shireen Chua, PhD", title: "When Cultures Clash, Immunities Surface: Game-Based Action Inquiry for Adaptive Leadership", type: "talk", country: "New Zealand",
        description: "Explore how game-based experiences reveal hidden commitments and cultural immunity to change. Design for breakthrough, not just engagement." },
      { time: "04:00", speaker: "Meike Sauerwein", title: "From Farm to Fridge: The Milk Life Cycle Challenge", type: "game", country: "Hong Kong",
        description: "Play a sustainability game that makes carbon accounting fun. Compete to design the lowest-impact milk production lifecycle using real data." },
      { time: "05:00", speaker: "Maytwin Pitipornvivat", title: "The Premium Human Play: Gamification Design for 'Premium Human' Skill", type: "talk", country: "Thailand",
        description: "In the age of AI, being human has become premium. Explore design techniques for developing the 7 core human skills through gamification." }
    ]
  },
  {
    block: 6,
    date: "Mon Mar 23",
    centralStart: "1:00 AM",
    centralEnd: "7:00 AM",
    gmtStart: "2026-03-23T06:00:00Z",
    gmtEnd: "2026-03-23T12:00:00Z",
    host: "Moe Ash & Ercan Altuğ Yılmaz",
    regions: "Middle East • South Asia • East Africa",
    sessions: [
      { time: "06:00", speaker: "Moe Ash & Ercan Altuğ Yılmaz", title: "Intro Block", type: "intro", country: "UAE/Türkiye" },
      { time: "06:30", speaker: "Carol Lim", title: "When Axiom Walks Into a Library: Reimagining the Futures of Learning Ecosystems through Play", type: "talk", country: "Singapore",
        description: "What if gamified learning isn't about adding mechanics, but reimagining spaces where learning happens? A foresight practitioner's perspective." },
      { time: "07:00", speaker: "Sufiz Suffian", title: "The Hidden System in Play", type: "talk", country: "Malaysia",
        description: "Every game contains an underlying system that shapes what players learn, feel, and do. Discover the invisible architecture of gamified experiences." },
      { time: "08:00", speaker: "Namitha Vijayakumar", title: "Designing Card Games for Learning", type: "talk", country: "India",
        description: "From engineer to behavioral skills trainer—learn practical techniques for designing card-based learning games." },
      { time: "09:00", speaker: "Bhaskar Thyagarajan", title: "Don't Wing It! When Games Tell the Truth: Data-based Debriefing for High-Impact Behavioral Learning", type: "playshop", country: "India",
        description: "Move beyond subjective facilitation. Learn breakthrough techniques for data-driven debriefing that proves learning impact." },
      { time: "10:30", speaker: "Ayman Elarby", title: "Feedback Marvels", type: "talk", country: "Egypt",
        description: "Give and receive professional feedback through a board game designed with game-based learning principles." }
    ]
  },
  {
    block: 7,
    date: "Mon Mar 23",
    centralStart: "7:00 AM",
    centralEnd: "1:00 PM",
    gmtStart: "2026-03-23T12:00:00Z",
    gmtEnd: "2026-03-23T18:00:00Z",
    host: "Isobel Wallace (Thinking Cap)",
    regions: "Europe • Americas • Africa",
    sessions: [
      { time: "12:30", speaker: "Monica Cornetti, Marigo Raftopoulos, David Metcalf, Rasha Morsi", title: "Panel: Future of Gamification", type: "panel", country: "Global" },
      { time: "14:00", speaker: "Alan Mattiassi", title: "Beyond Fun: A Novel Psychological Framework for Games and Behavioral Change", type: "talk", country: "Italy",
        description: "Current research is fragmented. Discover an integrated psychological framework that unifies motivation, engagement, and design into testable principles." },
      { time: "16:00", speaker: "Julia Allen & Frank Parker", title: "Worldbuilding in GoBrunch: Enhancing User Experiences Through Design Concepts", type: "playshop", country: "USA",
        description: "Turn virtual platforms into story-rich environments. Hands-on exploration of world-building that surprises and delights." }
    ]
  },
  {
    block: 8,
    date: "Mon Mar 23",
    centralStart: "1:00 PM",
    centralEnd: "7:00 PM",
    gmtStart: "2026-03-23T18:00:00Z",
    gmtEnd: "2026-03-24T00:00:00Z",
    host: "Ginnie Cappozzi",
    regions: "Western North America • Mexico • Central America • Oceania",
    sessions: [
      { time: "18:00", speaker: "Ginnie Cappozzi", title: "Intro Block", type: "intro", country: "USA" },
      { time: "18:30", speaker: "Jesse Sanderson", title: "We Speak! Addressing Classroom Language Barriers in Under-Resourced Global Regions through Game-Based Learning", type: "talk", country: "USA",
        description: "A student project that became a movement. Learn how game-based learning addresses dropout rates caused by language barriers in Tanzania." },
      { time: "19:00", speaker: "David Chandross", title: "Gamified Problem-Based Learning in Compassion-Based Gameworlds", type: "talk", country: "Canada",
        description: "Build problem-based learning for online training using AI prompts. Design gameworlds rooted in compassion research." },
      { time: "20:30", speaker: "Javier Velasquez", title: "100 Victory Points for Designing Great Point Systems that Teach!", type: "playshop", country: "Colombia",
        description: "Identify point types, understand their psychological value, and design meaningful point systems that actually drive learning." },
      { time: "22:30", speaker: "Keith Lillico", title: "Session TBA", type: "talk", country: "Canada" }
    ]
  }
];

// Event start and end times in UTC
const EVENT_START = new Date("2026-03-22T00:00:00Z");
const EVENT_END = new Date("2026-03-24T00:00:00Z");

// Get session start time as Date object
function getSessionStartTime(session, block) {
  const [hours, minutes] = session.time.split(':').map(Number);
  const date = new Date(block.gmtStart);
  date.setUTCHours(hours, minutes, 0, 0);
  return date;
}

// Get session end time (start of next session, or block end)
function getSessionEndTime(session, sessionIndex, block) {
  const sessions = block.sessions;
  if (sessionIndex < sessions.length - 1) {
    return getSessionStartTime(sessions[sessionIndex + 1], block);
  }
  return new Date(block.gmtEnd);
}

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

// Format time for display
function formatTimeForDisplay(date, showSententralTime) {
  if (showSententralTime) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/Chicago' });
  }
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

// Get type badge styling
function getTypeBadge(type) {
  const styles = {
    playshop: { bg: 'bg-amber-500', text: 'text-white', label: 'Playshop' },
    keynote: { bg: 'bg-red-500', text: 'text-white', label: 'Keynote' },
    panel: { bg: 'bg-purple-600', text: 'text-white', label: 'Panel' },
    talk: { bg: 'bg-sky-600', text: 'text-white', label: 'Talk' },
    game: { bg: 'bg-emerald-500', text: 'text-white', label: 'Game' },
    sponsor: { bg: 'bg-orange-500', text: 'text-white', label: 'Sponsor' },
    intro: { bg: 'bg-slate-500', text: 'text-white', label: 'Welcome' }
  };
  return styles[type] || styles.talk;
}

export default function GamiCon48VSchedule() {
  const [showSententralTime, setShowSententralTime] = useState(false);
  const [userTimezone, setUserTimezone] = useState('');
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Initialize timezone and set up auto-refresh
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(tz.replace(/_/g, ' '));

    // Auto-refresh every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Calculate event status and current/next sessions
  const eventStatus = useMemo(() => {
    const now = currentTime;
    
    // Before event starts
    if (now < EVENT_START) {
      return { status: 'before', message: 'Event starts soon!' };
    }
    
    // After event ends
    if (now >= EVENT_END) {
      return { status: 'after', message: 'Thanks for attending GamiCon48V 2026!' };
    }

    // During event - find current and next sessions
    let currentSession = null;
    let currentBlock = null;
    let currentSessionIndex = null;
    let nextSession = null;
    let nextBlock = null;

    // Flatten all sessions with their block info
    const allSessions = [];
    scheduleData.forEach(block => {
      block.sessions.forEach((session, idx) => {
        allSessions.push({
          session,
          block,
          sessionIndex: idx,
          startTime: getSessionStartTime(session, block),
          endTime: getSessionEndTime(session, idx, block)
        });
      });
    });

    // Sort by start time
    allSessions.sort((a, b) => a.startTime - b.startTime);

    // Find current and next sessions
    for (let i = 0; i < allSessions.length; i++) {
      const item = allSessions[i];
      
      if (now >= item.startTime && now < item.endTime) {
        currentSession = item.session;
        currentBlock = item.block;
        currentSessionIndex = item.sessionIndex;
        
        // Next session is the one after current
        if (i + 1 < allSessions.length) {
          nextSession = allSessions[i + 1].session;
          nextBlock = allSessions[i + 1].block;
        }
        break;
      } else if (now < item.startTime) {
        // We're in a gap between sessions
        nextSession = item.session;
        nextBlock = item.block;
        break;
      }
    }

    return {
      status: 'during',
      currentSession,
      currentBlock,
      currentSessionIndex,
      nextSession,
      nextBlock,
      allSessions
    };
  }, [currentTime]);

  // Filter blocks to only show those with remaining sessions
  const filteredScheduleData = useMemo(() => {
    if (eventStatus.status !== 'during') return scheduleData;

    const now = currentTime;
    
    return scheduleData.map(block => {
      const filteredSessions = block.sessions.filter((session, idx) => {
        const endTime = getSessionEndTime(session, idx, block);
        return now < endTime; // Keep sessions that haven't ended
      });

      return {
        ...block,
        sessions: filteredSessions
      };
    }).filter(block => block.sessions.length > 0); // Only keep blocks with remaining sessions
  }, [currentTime, eventStatus.status]);

  const getDisplayTime = (gmtTime, block) => {
    if (showSententralTime) {
      return convertToCentral(gmtTime, block.gmtStart);
    }
    return convertToLocal(gmtTime, block.gmtStart);
  };

  // Render a session card (reusable for Happening Now, Up Next, and schedule)
  const renderSessionCard = (session, block, isHighlighted = false, highlightLabel = '') => {
    const badge = getTypeBadge(session.type);
    
    return (
      <div 
        className={`rounded-2xl overflow-hidden border shadow-xl ${
          isHighlighted 
            ? 'bg-gradient-to-br from-amber-900/50 to-orange-900/30 border-amber-500/50' 
            : 'bg-slate-800/70 border-slate-700/50'
        }`}
      >
        {highlightLabel && (
          <div className={`px-6 py-3 ${
            highlightLabel === 'Happening Now' 
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600' 
              : 'bg-gradient-to-r from-amber-600 to-orange-600'
          }`}>
            <p className="text-white font-bold text-sm uppercase tracking-wider" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
              {highlightLabel}
            </p>
          </div>
        )}
        <div className="px-6 py-5">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex items-center gap-3 md:block md:flex-shrink-0 md:w-28">
              <p className="text-amber-400 font-mono font-semibold text-lg">
                {getDisplayTime(session.time, block)}
              </p>
              <span className={`md:hidden px-2 py-0.5 ${badge.bg} ${badge.text} text-xs font-semibold rounded-full`}>
                {badge.label}
              </span>
            </div>
            <div className="flex-grow">
              <div className="hidden md:flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-3 py-1 ${badge.bg} ${badge.text} text-xs font-semibold rounded-full`}>
                  {badge.label}
                </span>
                {session.country && (
                  <span className="text-slate-300 text-sm">
                    {session.country}
                  </span>
                )}
                <span className="text-slate-400 text-sm">
                  • Block {block.block}
                </span>
              </div>
              <h5 className="text-xl font-semibold text-white mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                {session.title}
              </h5>
              <p className="text-sky-400 text-sm mb-2">
                {session.speaker}
                {session.country && <span className="md:hidden text-slate-300"> • {session.country}</span>}
              </p>
              {session.description && (
                <p className="text-slate-300 text-base leading-relaxed">
                  {session.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Stair-step icon */}
            <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {/* Bottom row blocks */}
              <rect x="0" y="44" width="18" height="14" rx="2" fill="#c45c4a"/>
              <rect x="20" y="44" width="18" height="14" rx="2" fill="#85b1ce"/>
              {/* Middle row blocks */}
              <rect x="20" y="28" width="18" height="14" rx="2" fill="#f5e6c8"/>
              <rect x="40" y="28" width="18" height="14" rx="2" fill="#4b6176"/>
              {/* Top row block */}
              <rect x="40" y="12" width="18" height="14" rx="2" fill="#c45c4a"/>
              {/* Circle on bottom-left block - blue */}
              <circle cx="9" cy="40" r="3" fill="#85b1ce"/>
              {/* Circle on middle-left block - red */}
              <circle cx="29" cy="24" r="3" fill="#c45c4a"/>
              {/* Star at the very top */}
              <polygon points="49,4 50.5,7.5 54,8 51.5,10.5 52,14 49,12.5 46,14 46.5,10.5 44,8 47.5,7.5" fill="#f59e0b"/>
            </svg>
            {/* Text */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                GamiCon<span className="text-amber-400">48V</span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm">2026</p>
            </div>
          </div>
          {/* Live indicator */}
          {eventStatus.status === 'during' && (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-900/50 border border-emerald-500/50 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-300 font-semibold text-sm" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>LIVE</span>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-amber-400 uppercase tracking-widest text-xs sm:text-sm mb-4" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            March 22–24, 2026 • Live Online
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            48 Hours of<br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Playful Learning
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            This is not a motivational event—it's a <strong className="text-white">PLAYFUL</strong> one. 
            Join gamification experts, instructional designers, and learning innovators from around the globe to <strong className="text-white">reimagine learning through the power of play</strong>.
          </p>
        </div>
      </section>

      {/* Event Status Messages */}
      {eventStatus.status === 'after' && (
        <section className="relative z-10 px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/40 border border-emerald-500/20 rounded-2xl p-8 text-center shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                🎉 Thanks for Attending!
              </h3>
              <p className="text-lg text-slate-300 mb-4">
                GamiCon48V 2026 has concluded. We hope you had an amazing 48 hours of playful learning!
              </p>
              <p className="text-slate-400">
                Stay tuned for recordings and next year's event.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Live Schedule Section - Only show during event */}
      {eventStatus.status === 'during' && (
        <>
          {/* Prominent Schedule Heading */}
          <section className="relative z-10 px-4 py-8">
            <div className="max-w-6xl mx-auto text-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                📅 Live Schedule
              </h3>
              <p className="text-slate-400 text-sm">
                Auto-updates every minute • Last updated: {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </section>

          {/* Happening Now */}
          {eventStatus.currentSession && (
            <section className="relative z-10 px-4 pb-6">
              <div className="max-w-6xl mx-auto">
                {renderSessionCard(eventStatus.currentSession, eventStatus.currentBlock, true, 'Happening Now')}
              </div>
            </section>
          )}

          {/* Gap between sessions message */}
          {!eventStatus.currentSession && eventStatus.nextSession && (
            <section className="relative z-10 px-4 pb-6">
              <div className="max-w-6xl mx-auto">
                <div className="bg-slate-800/70 border border-slate-700/50 rounded-2xl p-6 text-center">
                  <p className="text-slate-300 text-lg">
                    Next session begins at{' '}
                    <strong className="text-amber-400">
                      {getDisplayTime(eventStatus.nextSession.time, eventStatus.nextBlock)}
                    </strong>
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Up Next */}
          {eventStatus.nextSession && (
            <section className="relative z-10 px-4 pb-8">
              <div className="max-w-6xl mx-auto">
                {renderSessionCard(eventStatus.nextSession, eventStatus.nextBlock, true, 'Up Next')}
              </div>
            </section>
          )}
        </>
      )}

      {/* Time Zone Toggle */}
      <section className="relative z-10 px-4 py-4 sm:py-8 sm:sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
              {eventStatus.status === 'during' ? 'Remaining Sessions' : 'Session Schedule'}
            </h4>
            <p className="text-slate-400 text-sm">
              {showSententralTime ? 'Sententral Time (Central US)' : `Your local time (${userTimezone})`}
            </p>
          </div>
          <button
            onClick={() => setShowSententralTime(!showSententralTime)}
            className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            aria-pressed={showSententralTime}
            aria-label={showSententralTime ? 'Switch to local time' : 'Switch to Sententral Time'}
          >
            <span className={`text-xs sm:text-sm font-medium ${!showSententralTime ? 'text-amber-400' : 'text-slate-400'}`}>
              Local
            </span>
            <div className="relative w-12 sm:w-14 h-6 sm:h-7 bg-slate-600 rounded-full">
              <div 
                className={`absolute top-1 w-4 sm:w-5 h-4 sm:h-5 bg-amber-400 rounded-full transition-all duration-300 ${
                  showSententralTime ? 'left-6 sm:left-8' : 'left-1'
                }`}
              ></div>
            </div>
            <span className={`text-xs sm:text-sm font-medium ${showSententralTime ? 'text-amber-400' : 'text-slate-400'}`}>
              Sententral
            </span>
          </button>
        </div>
      </section>

      {/* Schedule Blocks */}
      <section className="relative z-10 px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {(eventStatus.status === 'during' ? filteredScheduleData : scheduleData).map((block) => (
            <div 
              key={block.block} 
              className="bg-slate-800/70 rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl"
            >
              {/* Block Header */}
              <button
                onClick={() => setExpandedBlock(expandedBlock === block.block ? null : block.block)}
                className="w-full px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-700/30 transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400"
                aria-expanded={expandedBlock === block.block}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                      {block.block}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                      Block {block.block}: {block.date}
                    </h4>
                    <p className="text-amber-400 text-sm">
                      {showSententralTime 
                        ? `${block.centralStart} – ${block.centralEnd} Central`
                        : `${convertToLocal(block.gmtStart.slice(11, 16), block.gmtStart)} – ${convertToLocal(block.gmtEnd.slice(11, 16), block.gmtEnd)} Local`
                      }
                    </p>
                    <p className="text-slate-400 text-sm mt-1 md:hidden">
                      Hosted by <span className="text-slate-300">{block.host}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <p className="text-slate-300 text-sm">Hosted by <span className="text-white font-medium">{block.host}</span></p>
                    <p className="text-slate-400 text-sm">{block.regions}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-sm">{block.sessions.length} sessions</span>
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
                </div>
              </button>

              {/* Block Sessions */}
              {expandedBlock === block.block && (
                <div className="border-t border-slate-700/50">
                  {block.sessions.map((session, idx) => {
                    const badge = getTypeBadge(session.type);
                    const isCurrentSession = eventStatus.status === 'during' && 
                      eventStatus.currentSession === session && 
                      eventStatus.currentBlock.block === block.block;
                    
                    return (
                      <div 
                        key={idx} 
                        className={`px-4 sm:px-6 py-4 sm:py-5 ${idx !== block.sessions.length - 1 ? 'border-b border-slate-700/30' : ''} ${
                          isCurrentSession ? 'bg-emerald-900/20 border-l-4 border-l-emerald-500' : 'hover:bg-slate-700/20'
                        } transition-colors`}
                      >
                        <div className="flex flex-col md:flex-row md:items-start gap-2 sm:gap-4">
                          <div className="flex items-center gap-3 md:block md:flex-shrink-0 md:w-24">
                            <p className="text-amber-400 font-mono font-semibold text-sm sm:text-base">
                              {getDisplayTime(session.time, block)}
                            </p>
                            <span className={`md:hidden px-2 py-0.5 ${badge.bg} ${badge.text} text-xs font-semibold rounded-full`}>
                              {badge.label}
                            </span>
                            {isCurrentSession && (
                              <span className="md:hidden px-2 py-0.5 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                                NOW
                              </span>
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="hidden md:flex flex-wrap items-center gap-2 mb-2">
                              <span className={`px-3 py-1 ${badge.bg} ${badge.text} text-xs font-semibold rounded-full`}>
                                {badge.label}
                              </span>
                              {isCurrentSession && (
                                <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full animate-pulse">
                                  LIVE NOW
                                </span>
                              )}
                              {session.country && (
                                <span className="text-slate-300 text-sm">
                                  {session.country}
                                </span>
                              )}
                            </div>
                            <h5 className="text-base sm:text-lg font-semibold text-white mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                              {session.title}
                            </h5>
                            <p className="text-sky-400 text-sm mb-2">
                              {session.speaker}
                              {session.country && <span className="md:hidden text-slate-300"> • {session.country}</span>}
                            </p>
                            {session.description && (
                              <p className="text-slate-300 text-base leading-relaxed">
                                {session.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-8 border-t border-slate-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-sm">
            © 2026 Sententia Gamification. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/company/gamicon" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded">
              LinkedIn
            </a>
            <a href="https://www.facebook.com/GamiCon" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded">
              Facebook
            </a>
          </div>
          <div className="text-slate-400 text-sm">
            #GameBasedLearning
          </div>
        </div>
      </footer>

    </div>
  );
}
