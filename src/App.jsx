import React, { useState, useEffect } from 'react';

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
    host: "John Chen",
    regions: "Western North America • Mexico • Central America",
    sessions: [
      { time: "18:00", speaker: "Artrell Williams & Jazmin Webster", title: "Intro Block", type: "intro", country: "USA" },
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

export default function GamiCon48VLanding() {
  const [showSententralTime, setShowSententralTime] = useState(false);
  const [userTimezone, setUserTimezone] = useState('');
  const [expandedBlock, setExpandedBlock] = useState(null);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(tz.replace(/_/g, ' '));
  }, []);

  const getDisplayTime = (gmtTime, block) => {
    if (showSententralTime) {
      return convertToCentral(gmtTime, block.gmtStart);
    }
    return convertToLocal(gmtTime, block.gmtStart);
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
          <div className="flex items-center">
            {/* Full GamiCon logo */}
            <img 
              src="/logo-light.jpeg" 
              alt="GamiCon48V 2026" 
              className="h-10 sm:h-12 w-auto"
            />
          </div>
          <a 
            href="https://www.sententiagamification.com/where-from" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg hover:shadow-amber-500/25 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Register Now
          </a>
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
            Join gamification experts, instructional designers, and learning innovators from around the globe.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href="https://www.sententiagamification.com/where-from" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-full hover:from-amber-400 hover:to-orange-400 transition-all shadow-xl hover:shadow-amber-500/30 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Register Now →
            </a>
            <a 
              href="https://www.sententiagamification.com/gamicon48v" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-slate-500 text-slate-300 font-semibold text-lg rounded-full hover:border-amber-400 hover:text-amber-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Learn More About GamiCon48V
            </a>
          </div>

        </div>
      </section>

      {/* Event Overview */}
      <section className="relative z-10 px-4 py-16 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            Reimagine Learning Through the Power of Play
          </h3>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            GamiCon48V is a <strong className="text-white">48-hour live online event</strong> for people who design learning. 
            It brings together gamification and game-based learning experts, instructional designers, corporate trainers, 
            and higher ed faculty from around the world.
          </p>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-slate-700/50 rounded-xl p-6">
              <div className="text-4xl font-bold text-amber-400 mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>8</div>
              <p className="text-slate-300">Global Blocks</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6">
              <div className="text-4xl font-bold text-amber-400 mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>35+</div>
              <p className="text-slate-300">Sessions</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6">
              <div className="text-4xl font-bold text-amber-400 mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>30+</div>
              <p className="text-slate-300">Speakers</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6">
              <div className="text-4xl font-bold text-amber-400 mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>12</div>
              <p className="text-slate-300">Playshops</p>
            </div>
          </div>
          <p className="text-slate-400 mt-8 text-lg">
            Across eight hosted blocks, you'll learn new approaches, join the audience for Throwdown Showcase, 
            connect with global leaders, and experience how gameful design transforms learning.
          </p>
        </div>
      </section>

      {/* Time Zone Toggle */}
      <section className="relative z-10 px-4 py-4 sm:py-8 sm:sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
              Session Schedule
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
          {scheduleData.map((block) => (
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
                  <svg 
                    className={`w-6 h-6 text-slate-400 transition-transform ${expandedBlock === block.block ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
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

      {/* Final CTA */}
      <section className="relative z-10 px-4 py-20 text-center bg-gradient-to-t from-slate-900 to-transparent">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            Ready to Play?
          </h3>
          <p className="text-xl text-slate-300 mb-8">
            Join learning designers from around the world for 48 hours of hands-on, playful exploration.
          </p>
          
          {/* Discount Code */}
          <div className="inline-block bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/30 rounded-2xl px-5 sm:px-8 py-4 mb-8">
            <p className="text-white text-base sm:text-lg">
              Use code <span className="font-mono font-bold text-emerald-300 bg-emerald-950 px-2 sm:px-3 py-1 rounded text-sm sm:text-base">CARRIANN48V</span>
              <br className="sm:hidden" />
              <span className="sm:inline"> for </span><strong>20% off US registration</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.sententiagamification.com/where-from" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg sm:text-xl rounded-full hover:from-amber-400 hover:to-orange-400 transition-all shadow-xl hover:shadow-amber-500/30 hover:scale-105 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Register Now →
            </a>
            <a 
              href="https://www.sententiagamification.com/gamicon48v" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 border-2 border-slate-500 text-slate-300 font-semibold text-lg sm:text-xl rounded-full hover:border-amber-400 hover:text-amber-400 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Learn More
            </a>
          </div>
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
