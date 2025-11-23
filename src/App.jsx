import React, { useEffect, useRef, useState } from "react";
import "./index.css";

/*
Default props:
- estimatedTime: "~ 2 hours"
- onNotify: (email) => {}  // callback stub
- brandName: "YourBrand"
- accentColor: "#6EE7B7"   // primary accent; gradient pairs with #5B8CFF

Accessibility checklist:
- All interactive elements keyboard-focusable
- Visible :focus-visible outlines and logical focus order
- aria-live region announces subscription success
- Semantic structure: header, main, aside, footer, buttons, inputs with labels
- Color contrast >= 4.5:1 for body text
*/

export default function App({
  estimatedTime = "December 1",
  onNotify = () => {},
  brandName = "Campus Crafts",
  accentColor = "#6EE7B7",
  logoSrc = "/brand-logo.svg",
}) {
  const containerRef = useRef(null);
  const visualRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("maintenance-theme") || "dark";
    } catch {
      return "dark";
    }
  });

  const [confettiOn, setConfettiOn] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("maintenance-theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const el = visualRef.current;
    if (!el) return;

    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onPointerMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      targetX = dx * 12; // max px offset
      targetY = dy * 12;

      if (rafId == null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const layers = el.querySelectorAll("[data-depth]");
      layers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute("data-depth") || "1");
        layer.style.transform = `translate3d(${currentX * depth}px, ${currentY * depth}px, 0)`;
      });

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const host = containerRef.current || document;
    host.addEventListener("pointermove", onPointerMove);
    return () => {
      host.removeEventListener("pointermove", onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleToggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const waNumber = "917845689813";
  const openWhatsApp = (message) => {
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleNotifyClick = () => {
    const message = `Hi! Please notify me when you're back. We will be back for better and improvements. - Sent from ${brandName} maintenance page.`;
    onNotify(`whatsapp:${waNumber}`);
    setConfettiOn(true);
    openWhatsApp(message);
    setTimeout(() => setConfettiOn(false), 2200);
  };

  const handleIdeasClick = () => {
    const message = `Hi! I want to suggest an improvement for ${brandName}: [your idea here].`;
    setConfettiOn(true);
    openWhatsApp(message);
    setTimeout(() => setConfettiOn(false), 2000);
  };

  const confettiColors = [
    accentColor,
    "#5B8CFF",
    "#F59E0B",
    "#10B981",
    "#EC4899",
    "#22D3EE",
  ];

  const confettiOffsets = [-30, -20, -10, 0, 10, 20, 30, 15, -15, 25, -25, 5, -5, 35, -35, 0];

  return (
    <div
      ref={containerRef}
      className="page"
      data-theme={theme}
      style={{ "--accent": accentColor }}
    >
      <header className="topbar" aria-label="Theme and brand">
        <div className="brand-wrap">
          <span className="brand-logo-ring" aria-hidden="true">
            <img className="brand-logo" src={logoSrc} alt={`${brandName} logo`} />
          </span>
          <div className="brand">{brandName}</div>
        </div>
        <button
          className="theme-toggle"
          onClick={handleToggleTheme}
          aria-pressed={theme === "light"}
          title="Toggle light/dark theme"
        >
          <span className="toggle-knob" />
          <span className="visually-hidden">Toggle theme</span>
        </button>
      </header>

      <main className="card fade-in-up" role="main" aria-labelledby="headline">
        <aside className="visual" ref={visualRef} aria-hidden="true">
          <div className="particle-layer" />

          <img
            className="base-illustration"
            src="/maintenance-illustration.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
          />

          <div className="layer shape-ring" data-depth="0.3" />
          <div className="layer shape-square" data-depth="0.6" />
          <div className="layer shape-triangle" data-depth="0.9" />
        </aside>

      <section className="content">
          <h1 id="headline" className="headline">
            We’re upgrading things — back soon.
            <span className="headline-underline" aria-hidden="true" />
          </h1>

          <p className="subhead">
            Making improvements behind the scenes to serve you better. Thank you for your patience.
          </p>

          <p className="promise">We will be back for better and improvements.</p>

          <p className="eta" aria-label="Estimated time">
            <span className="eta-label">Estimated time:</span>{" "}
            <span className="eta-value">{estimatedTime}</span>
          </p>

          <div className="cta-row">
            <button
              className="cta"
              onClick={handleNotifyClick}
              aria-label="Open WhatsApp to get notified"
            >
              <span className="cta-label">Notify me</span>
            </button>
            <button
              className="cta secondary"
              onClick={handleIdeasClick}
              aria-label="Open WhatsApp to suggest ideas for improvement"
            >
              Suggest ideas for improvement
            </button>
          </div>

          <div className="progress" role="status" aria-label="Maintenance progress">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>

          <div className="status" role="status" aria-live="polite" />

          <footer className="microcopy">
            Follow status @yourhandle or contact support@example.com
          </footer>
        </section>

        {confettiOn && (
          <div className="confetti" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => {
              const left = 6 + i * (88 / 16);
              const color = confettiColors[i % confettiColors.length];
              const delay = (i % 8) * 0.06;
              const offsetX = confettiOffsets[i % confettiOffsets.length];
              return (
                <span
                  key={i}
                  className="confetti-piece"
                  style={{
                    left: `${left}%`,
                    backgroundColor: color,
                    animationDelay: `${delay}s`,
                    "--x": `${offsetX}px`,
                  }}
                />
              );
            })}
          </div>
        )}
      </main>

      <footer className="footer">
        <small>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</small>
      </footer>

      <noscript>
        <div className="noscript-fallback">
          We’re upgrading things — back soon.
          Making improvements behind the scenes to serve you better.
          If you need assistance, contact support@example.com or email{" "}
          <a href="mailto:support@example.com">support@example.com</a>.
        </div>
      </noscript>
    </div>
  );
}