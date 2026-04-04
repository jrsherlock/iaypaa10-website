# IAYPAA X Conference Website — Implementation Plan

## Context

Build a standalone conference website for **IAYPAA X** — the 10th Annual Iowa Young People in Alcoholics Anonymous conference, August 2026 in Iowa City, Iowa. The site will be hosted independently (Vercel/Netlify) and linked from the existing iaypaa.org WordPress site. Hotel and exact dates are TBD.

The theme is **"Primordial Ooze"** with a full B-movie horror aesthetic: dripping slime, horror fonts, dark backgrounds, neon green accents, retro monster-movie vibe. The goal is to stand out as unique and memorable among YPAA conference websites, which tend toward clean/corporate designs.

---

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS 3+
- **Animations**: CSS animations + Framer Motion for scroll-triggered effects and ooze animations
- **Fonts**: Google Fonts — `Creepster` (horror headings), `Inter` or `Space Grotesk` (body text)
- **Deployment**: Vercel (free tier, instant deploys, perfect for Next.js)
- **Package manager**: npm

---

## Design System

### Color Palette
| Token | Hex | Use |
|-------|-----|-----|
| `ooze-green` | `#39FF14` | Primary accent, CTAs, glowing text |
| `slime-green` | `#00FF41` | Secondary accent, hover states |
| `dark-ooze` | `#0A1F0A` | Deep background tint |
| `void-black` | `#0D0D0D` | Primary background |
| `toxic-green` | `#1B4D1B` | Card/section backgrounds |
| `bone-white` | `#E8E6E1` | Body text |
| `blood-red` | `#8B0000` | Danger/alert accents |
| `film-grain` | `rgba(255,255,255,0.03)` | Texture overlay |

### Visual Effects
- **Dripping slime**: CSS `@keyframes` drip animation on section borders and dividers
- **Bubbling ooze**: Animated SVG blobs in hero and footer backgrounds
- **Film grain overlay**: Subtle animated noise texture across the whole page
- **Glowing text**: CSS `text-shadow` with green glow on key headings
- **VHS scanlines**: Pseudo-element scanline overlay on hero section
- **Ooze cursor**: Custom CSS cursor (green drip) on desktop

### Typography
- **Headings**: `Creepster` — classic horror/drip font
- **Subheadings**: `Space Grotesk` bold — modern contrast
- **Body**: `Space Grotesk` regular — clean readability
- **Accent/dates**: Monospace (`JetBrains Mono`) for countdown/dates

---

## Pages & Sections

### 1. Home (`/`)
- **Hero**: Full-viewport dark section with the Primordial Ooze poster art as background, animated dripping slime from top, conference name in glowing Creepster font, "Iowa City, Iowa | August 2026" subtitle
- **Countdown**: Animated countdown timer to August 1, 2026 (placeholder date) with ooze-styled digits
- **Quick Info Cards**: 3 cards — "Register" (placeholder), "Hotel Info" (TBD), "Get Involved"
- **Theme Teaser**: Brief atmospheric text about the Primordial Ooze theme with parallax ooze background
- **What is IAYPAA?**: Short intro paragraph with CTA to About page
- **Footer**: Links, contact, social icons, dripping slime top border

### 2. About (`/about`)
- **What is IAYPAA**: History and mission of Iowa Young People in AA
- **About IAYPAA X**: This year's conference — 10th annual, the theme, what to expect
- **What to Expect**: Grid of conference highlights (speakers, workshops, fellowship, fun)
- **First-Timers**: Dedicated section for newcomers to YPAA conferences

### 3. Registration (`/registration`)
- **Coming Soon**: Prominent "Registration Opening Soon" with animated ooze drip reveal
- **Email Signup**: Simple form to capture email for notifications when reg opens
- **Pricing Preview**: Placeholder card showing "Early Bird / Standard / At-the-Door" tiers
- **Scholarship Info**: Note about scholarship availability (7th Tradition aligned)

### 4. Schedule (`/schedule`)
- **TBD State**: Stylized "Schedule Coming Soon" with ooze-themed placeholder
- **Template Layout**: Pre-built day-by-day accordion structure ready for content (Friday/Saturday/Sunday)
- **Expected Sections**: Speakers, Panels, Workshops, Fellowship Events, Meetings

### 5. Hotel & Venue (`/hotel`)
- **TBD State**: "Hotel Announcement Coming Soon" hero
- **Iowa City Info**: Section about Iowa City as a destination — what to do, how to get there
- **Travel Tips**: Nearest airports (CID — Eastern Iowa Airport), driving directions
- **Placeholder**: Room rate card, booking link placeholder

### 6. Speakers (`/speakers`)
- **Coming Soon Grid**: Placeholder speaker cards with "?" silhouettes in ooze-green
- **Call for Speakers**: Info about how to submit or nominate speakers
- **Past Highlights**: Brief mention of memorable past speakers (if available)

### 7. Merchandise (`/merch`)
- **Coming Soon**: "Merch Dropping Soon" with animated ooze drip
- **Preview Cards**: Placeholder product cards (T-shirt, Sticker, Hat mockups in ooze theme)
- **Email Notify**: Signup for merch drop notification

### 8. Past Conferences (`/past-conferences`)
- **Timeline**: Visual timeline of IAYPAA I through IX with year, location, theme
- **Gallery**: Photo placeholders for each year
- **Legacy Section**: How far the conference has come in 10 years

### 9. Outreach (`/outreach`)
- **Downloadable Flyer**: PDF flyer download (primordial ooze themed)
- **Social Media Links**: Instagram, etc.
- **Share Tools**: Pre-built social share cards/images
- **Committee Info**: How to get involved, join the committee

### 10. Contact / FAQ (`/faq`)
- **FAQ Accordion**: Common questions styled with ooze drip dividers
- **Contact Form**: Simple name/email/message form (Formspree or similar for backend)
- **Committee Email**: Direct contact info

---

## Project Structure

```
iaypaa-website/
  src/
    app/
      layout.tsx          # Root layout with fonts, metadata, global styles
      page.tsx            # Home page
      about/page.tsx
      registration/page.tsx
      schedule/page.tsx
      hotel/page.tsx
      speakers/page.tsx
      merch/page.tsx
      past-conferences/page.tsx
      outreach/page.tsx
      faq/page.tsx
      globals.css         # Tailwind directives + custom ooze animations
    components/
      layout/
        Navbar.tsx        # Sticky nav with ooze drip bottom border
        Footer.tsx        # Site footer with slime top border
        MobileMenu.tsx    # Hamburger menu with ooze slide-in
      ui/
        OozeButton.tsx    # Primary CTA button with drip effect
        SlimeDivider.tsx  # Section divider with animated drip
        GlowText.tsx      # Heading component with green glow
        CountdownTimer.tsx # Animated countdown to conference
        ComingSoon.tsx     # Reusable "coming soon" placeholder
        FAQAccordion.tsx   # Expandable FAQ items
      effects/
        FilmGrain.tsx     # Fullscreen grain overlay
        BubblingOoze.tsx  # Animated SVG ooze blobs
        DrippingSlime.tsx # CSS drip animation component
        Scanlines.tsx     # VHS scanline overlay
      sections/
        Hero.tsx          # Home hero section
        QuickInfoCards.tsx
        ThemeTeaser.tsx
        EmailSignup.tsx
    lib/
      constants.ts        # Conference data, dates, content strings
    assets/
      primordial-ooze-poster.jpg  # The poster image provided
  public/
    fonts/                # Any local font files if needed
    images/               # Static images
    og-image.png          # Social share image
  tailwind.config.ts      # Extended theme with ooze colors
  next.config.ts
  package.json
  tsconfig.json
```

---

## Implementation Order

### Phase 1: Scaffolding
1. Initialize Next.js project with TypeScript + Tailwind
2. Configure `tailwind.config.ts` with custom ooze color palette and fonts
3. Set up `globals.css` with custom keyframe animations (drip, bubble, glow, scanlines)
4. Create root `layout.tsx` with font loading (Creepster, Space Grotesk) and metadata
5. Place the poster image in `public/images/`

### Phase 2: Core Components
6. Build `Navbar` — sticky dark nav with logo, page links, ooze drip bottom border, mobile hamburger
7. Build `Footer` — links, social, slime top border
8. Build shared UI: `OozeButton`, `SlimeDivider`, `GlowText`, `ComingSoon`
9. Build effects: `FilmGrain`, `Scanlines`, `DrippingSlime`, `BubblingOoze`

### Phase 3: Home Page
10. Build Hero section with poster background, animated title, countdown timer
11. Build QuickInfoCards, ThemeTeaser, intro sections
12. Assemble home page

### Phase 4: Inner Pages
13. About page
14. Registration page (placeholder + email signup)
15. Schedule page (TBD placeholder)
16. Hotel page (Iowa City info + TBD)
17. Speakers page (placeholder grid)
18. Merchandise page (placeholder)
19. Past Conferences page (timeline)
20. Outreach page (flyer download + social)
21. FAQ/Contact page

### Phase 5: Polish
22. Responsive testing and mobile optimization
23. SEO metadata and Open Graph tags
24. Accessibility pass (contrast, screen readers, keyboard nav)
25. Performance optimization (image optimization, lazy loading)

---

## Key Differentiators vs. Other YPAA Sites

Based on research of ICYPAA, EACYPAA, SERCYPAA, SWACYPAA, EURYPAA, and existing IAYPAA sites:

1. **Immersive theme execution** — Most YPAA sites use the theme as a tagline only. This site makes the theme the entire visual experience with animations, textures, and atmosphere.
2. **Animated countdown** — No current YPAA site has a live countdown timer. Ours will have ooze-dripping animated digits.
3. **B-movie horror aesthetic** — Completely unique in the YPAA space. Every other site uses clean corporate/nonprofit design. This breaks the mold.
4. **Custom CSS effects** — Film grain, scanlines, dripping slime, bubbling ooze — no other YPAA site has this level of visual craft.
5. **Past conferences timeline** — Most state YPAAs don't showcase their history. A visual timeline of all 10 years tells a powerful story.
6. **Performance** — Next.js with static generation will load faster than any Wix/WordPress YPAA site.

---

## Verification

1. **Dev server**: `npm run dev` — verify all pages render, navigation works, animations play
2. **Preview tool**: Use Claude Preview MCP to visually inspect each page
3. **Mobile**: Test at mobile/tablet/desktop breakpoints via preview resize
4. **Lighthouse**: Run lighthouse audit for performance, accessibility, SEO
5. **Links**: Verify all internal navigation links work
6. **Forms**: Test email signup form submission
7. **Images**: Verify poster image loads and displays correctly
8. **Build**: `npm run build` succeeds with no errors
