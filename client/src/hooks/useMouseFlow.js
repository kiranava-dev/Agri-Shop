import { useEffect } from "react";

const FLOW_SELECTOR = ".navbar, .navbar a, .card, .btn, .flow";

// Tracks mouse position over matched elements and exposes it as
// --mx / --my CSS variables, so CSS can use them for hover effects
// (e.g. radial-gradient(circle at var(--mx) var(--my), ...)).
export default function useMouseFlow() {
  useEffect(() => {
    function attachFlow(el) {
      if (el.dataset.flowAttached) return; // avoid double-binding
      el.dataset.flowAttached = "true";

      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--mx", x + "%");
        el.style.setProperty("--my", y + "%");
      });
      el.addEventListener("mouseleave", () => {
        el.style.setProperty("--mx", "50%");
        el.style.setProperty("--my", "50%");
      });
    }

    // Attach to elements already on the page
    document.querySelectorAll(FLOW_SELECTOR).forEach(attachFlow);

    // Watch for elements React adds/removes later (route changes, lists, etc.)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches && node.matches(FLOW_SELECTOR)) attachFlow(node);
          if (node.querySelectorAll) {
            node.querySelectorAll(FLOW_SELECTOR).forEach(attachFlow);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up when App unmounts (good practice, avoids leaks)
    return () => observer.disconnect();
  }, []);
}
