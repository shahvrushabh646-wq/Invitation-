# Nemin & Heta — Luxury Interactive Gujarati Wedding Invitation

A premium, mobile-first digital wedding invitation website with cinematic palace-door opening, interactive scratch-to-reveal date, live countdown, RSVP, and elegant Gujarati wedding aesthetics.

## Quick Start

1. Open `index.html` in a modern browser (Chrome, Safari, Firefox, Edge).
2. Or serve locally for best results:

```bash
# From this folder
npx serve .
# or
python3 -m http.server 8080
```

Then visit `http://localhost:3000` (or the port shown).

## Customisation (Single Config File)

**Edit only `config.js`** to update all wedding details:

| Field | Description |
|-------|-------------|
| `groom` / `bride` | English & Gujarati names |
| `weddingDate` | ISO date string e.g. `"2027-02-14T18:00:00"` — powers countdown & scratch reveal |
| `events[]` | Mehendi, Haldi, Wedding, Reception — dates, times, venues |
| `venue` | Main venue name, address, Google Maps link |
| `family` | Parents’ names & blessing message |
| `rsvp.whatsappNumber` | Country code + number (no `+`), e.g. `"919876543210"` |
| `music` | Set `enabled: true` and place an MP3 at `assets/wedding-instrumental.mp3` |
| `story.text` | Our Story paragraph |
| `thankYouMessage` | Closing message |

### Adding Couple Photographs

Place images in the `images/` folder and update the story section in `index.html` or extend `config.js` + JS to inject them into `.photo-frame`.

### Google Maps / Directions

Set `venue.mapLink` to a full Google Maps URL (Share → Copy link). The “Get Directions” button will open it.

### WhatsApp RSVP

1. Set `rsvp.whatsappNumber` in `config.js`.
2. Guests fill the form → on submit a WhatsApp chat opens with a pre-filled RSVP message.

## Design Notes

- **Opening experience**: Full-screen palace doors + golden seal. Tap the seal → doors open with 3D perspective, revealing a moonlit courtyard, then the invitation.
- **Scratch card**: Real canvas-based scratching (touch + mouse). Reveal threshold ~45%.
- **Colours**: Blush / pastel pink, champagne gold, ivory, deep burgundy.
- **Typography**: Great Vibes (script), Playfair Display / Cormorant Garamond (serif), Noto Sans Gujarati.
- **Accessibility**: Respects `prefers-reduced-motion`. Semantic structure and ARIA labels on key controls.
- **No autoplay music**: Music only starts after the guest taps the music button.

## Deployment (Vercel / Netlify / any static host)

This is a pure static site (HTML + CSS + JS).

```bash
# Example Vercel
npx vercel

# Or drag-and-drop the entire folder onto Netlify Drop
```

Share the resulting URL via WhatsApp.

## File Structure

```
nemin-heta-wedding/
├── index.html          # Main invitation
├── config.js           # ★ All editable content lives here
├── css/styles.css      # Full design system
├── js/app.js           # Doors, scratch, countdown, RSVP, etc.
├── assets/             # Optional music file
├── images/             # Couple & venue photos
└── README.md
```

## Important

- No reference video was attached to the original request; the experience was built from the detailed written specification (palace doors, moonlit welcome, scratch heart, countdown, events, destinations, family, RSVP, thank-you).
- All unconfirmed details (exact dates, venues, family names, maps) are left as editable placeholders in `config.js`.
- Do not hard-code real personal data into multiple places — keep everything in `config.js`.

---

With love for Nemin & Heta.
