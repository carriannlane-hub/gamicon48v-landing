# GamiCon48V 2026 Landing Page

A responsive, accessible landing page for GamiCon48V 2026 - a 48-hour live online gamification conference.

## Features

- 🌍 **Time Zone Toggle** - Switch between local time and "Sententral Time" (Central US)
- 📱 **Mobile-First Design** - Fully responsive from 320px up
- ♿ **WCAG 2.2 AA Compliant** - Proper contrast ratios and keyboard navigation
- 🎨 **On-Brand Styling** - Uses GamiCon brand colors and Josefin Sans typography
- 📅 **Collapsible Schedule** - 8 blocks with 35+ sessions

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Deploy to Vercel

**Option 1: Via Vercel CLI**
```bash
npm install -g vercel
vercel
```

**Option 2: Via GitHub**
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite and deploy

## Project Structure

```
gamicon48v-landing/
├── public/
│   ├── logo-light.jpeg    # Light version of logo (for dark backgrounds)
│   ├── logo-dark.jpeg     # Dark version of logo (for light backgrounds)
│   └── imaginarium.jpg    # Event venue image
├── src/
│   ├── App.jsx           # Main landing page component
│   ├── main.jsx          # React entry point
│   └── index.css         # Tailwind CSS directives
├── index.html            # HTML template with meta tags
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Customization

### Updating Session Data

Edit the `scheduleData` array in `src/App.jsx`. Each block contains:
- `block`: Block number (1-8)
- `date`: Display date
- `centralStart`/`centralEnd`: Time range in Central Time
- `gmtStart`/`gmtEnd`: ISO datetime for time zone conversion
- `host`: Block host name
- `regions`: Prime time regions
- `sessions`: Array of session objects

### Updating Links

- **Registration**: Search for `sententiagamification.com/where-from`
- **Learn More**: Search for `sententiagamification.com/gamicon48v`
- **Discount Code**: Search for `CARRIANN48V`

## Tech Stack

- **React 18** - UI framework
- **Vite 5** - Build tool
- **Tailwind CSS 3.4** - Styling
- **Vercel** - Hosting

## License

© 2026 Sententia Gamification. All rights reserved.
