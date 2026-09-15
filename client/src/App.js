/* =========================================================
   PAGE TRANSITION WRAPPER
   ========================================================= */
.page {
  animation: fadeUp 450ms cubic-bezier(0.4, 0, 0.2, 1) both;
  min-height: 60vh;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* =========================================================
   AMBIENT BACKGROUND — floating leaves & crops
   ========================================================= */
.ambient {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

.ambient__leaf {
  position: absolute;
  font-size: 2rem;
  opacity: 0.18;
  filter: blur(0.4px) saturate(1.2);
  animation: floatLeaf 18s ease-in-out infinite;
  user-select: none;
}

.ambient__leaf--1 {
  top: 12%;
  left: 6%;
  font-size: 2.4rem;
  animation-duration: 22s;
  animation-delay: -2s;
}
.ambient__leaf--2 {
  top: 30%;
  right: 8%;
  font-size: 2rem;
  animation-duration: 26s;
  animation-delay: -6s;
}
.ambient__leaf--3 {
  bottom: 22%;
  left: 12%;
  font-size: 1.8rem;
  animation-duration: 20s;
  animation-delay: -10s;
}
.ambient__leaf--4 {
  bottom: 10%;
  right: 14%;
  font-size: 2.2rem;
  animation-duration: 24s;
  animation-delay: -4s;
}

@keyframes floatLeaf {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  25% {
    transform: translate3d(20px, -18px, 0) rotate(8deg);
  }
  50% {
    transform: translate3d(-10px, -30px, 0) rotate(-6deg);
  }
  75% {
    transform: translate3d(14px, -12px, 0) rotate(4deg);
  }
  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
}

/* On small screens, reduce leaf clutter */
@media (max-width: 600px) {
  .ambient__leaf { opacity: 0.10; font-size: 1.4rem; }
  .ambient__leaf--3 { display: none; }
}

/* =========================================================
   FOOTER
   ========================================================= */
.footer {
  margin-top: var(--space-2xl);
  padding: var(--space-lg) var(--space-md);
  text-align: center;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(58, 125, 68, 0.06) 40%,
    rgba(232, 163, 61, 0.08)
  );
  color: var(--color-text-soft);
  font-size: 0.9rem;
  border-top: 1px solid var(--color-border);
  position: relative;
}

.footer::before {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--color-primary),
    var(--color-accent),
    var(--color-earth-light),
    var(--color-primary)
  );
  background-size: 300% 100%;
  animation: ribbon 8s linear infinite;
  border-radius: var(--radius-pill);
}

.footer p { margin: 0; }

.footer__leaf {
  display: inline-block;
  animation: sway 3s ease-in-out infinite;
  transform-origin: bottom center;
}

/* =========================================================
   FOCUSED / ACTIVE ROUTE HELPER (optional)
   ========================================================= */
.page:focus { outline: none; }

/* =========================================================
   REDUCED MOTION
   ========================================================= */
@media (prefers-reduced-motion: reduce) {
  .page,
  .ambient__leaf,
  .footer::before,
  .footer__leaf {
    animation: none !important;
  }
}
