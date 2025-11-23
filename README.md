# maintenance-page

A single React component that renders an elegant, animated “Under Maintenance — Improvements Underway” page. Drop it into any Vite or CRA app. No backend or SSR required.

## Files
- `src/App.jsx` — default exported React component rendering the entire page
- `src/index.css` — all styling (CSS variables, grid/flex, keyframes)
- `public/maintenance-illustration.svg` — layered, clean SVG used in layout

## Props
- `estimatedTime: string` — displayed ETA text. Default: `December 1`
- `onNotify: (emailOrId: string) => void` — called when user taps “Notify me” (now opens WhatsApp)
- `brandName: string` — brand label in header. Default: `Campus Crafts`
- `accentColor: string` — primary accent hex (pairs with `#5B8CFF` for gradient). Default: `#6EE7B7`

Defaults are documented in the component source header.

## Accessibility
- Keyboard focusable controls with visible `:focus-visible` styles
- Semantic regions: header, main, aside, footer; labeled headline; inputs have labels
- `aria-live="polite"` announces subscription success
- Body text meets contrast >= 4.5:1 in both themes
- Logical DOM focus order

## Performance notes
- Animations use `transform` and `opacity` with `will-change`
- Pointer-driven parallax uses `requestAnimationFrame` and easing
- Respects `prefers-reduced-motion` and pauses non-essential animations

## Theme
A minimal light/dark toggle is included and persisted to `localStorage`. It switches CSS variables via `data-theme` on the root container.

## Optional Lottie
You can optionally replace the SVG with a Lottie animation. Keep it small and load via an external URL or JSON file. The default project uses pure SVG+CSS. If using Lottie, ensure `prefers-reduced-motion` is respected and provide a CSS fallback.

## JavaScript disabled fallback
Add this snippet to your app’s `index.html` to ensure a visible message when JS is disabled:
```
<noscript>
  <style>
    .noscript-fallback {
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell;
      background:#0E1A34;color:#EAF2FF;padding:16px;margin:24px;border-radius:12px
    }
    a { color:#6EE7B7; }
  </style>
  <div class="noscript-fallback">
    We’re upgrading things — back soon.
    Making improvements behind the scenes to serve you better.
    Need assistance? Email <a href="mailto:support@example.com">support@example.com</a>.
  </div>
 </noscript>
```

## Customization
- Change `accentColor` to align the gradient; secondary color remains `#5B8CFF`
- Tweak sizes and spacings via CSS variables in `index.css`
- Replace `public/maintenance-illustration.svg` with your own graphic if desired
- Use your logo: put the file into `public/` and set the `logoSrc` prop, e.g. `logoSrc="/Gemini_Generated_Image_7js2347js2347js2.png"`. The logo shows inside a circular ring beside the brand name.

## Usage
Import the component and mount it in your app. Vite example:

```jsx
// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; // if placed at project root src, adjust path accordingly
import "./index.css";

const onNotify = (email) => {
  // Stub: integration hook — send to your API if needed.
  // For this project, no network call is required.
  console.log("Notify request for:", email);
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App
      estimatedTime="December 1"
      brandName="Campus Crafts"
      accentColor="#6EE7B7"
      onNotify={onNotify}
    />
  </React.StrictMode>
);
```

CRA example:

```jsx
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App estimatedTime="December 1" onNotify={(id) => console.log(id)} />
  </React.StrictMode>,
  document.getElementById("root")
);
```

---

Usage quick-start:
- Copy all files into your app
- Ensure `public/maintenance-illustration.svg` is accessible at `/maintenance-illustration.svg`
- Import `App` and `index.css`, pass `estimatedTime` and `onNotify` as needed

If you also want a tailwind version, keep this CSS as a plain alternative to avoid adding dependencies.

--- Usage Example (quick copy) ---
import App from "./App.jsx";
import "./index.css";

const onNotify = (email) => console.log("notify:", email);

<App estimatedTime="December 1" onNotify={onNotify} brandName="Acme" accentColor="#6EE7B7" />

## WhatsApp actions
- “Notify me” opens WhatsApp chat to `+91 78456 89813` with a friendly pre-filled message and triggers a confetti burst.
- “Suggest ideas for improvement” opens WhatsApp with a pre-filled prompt so users can share feedback quickly.