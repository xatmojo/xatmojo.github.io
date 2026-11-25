(() => {
  "use strict";
  const root = document.documentElement;
  const btn = document.getElementById("theme");
  if (!btn) return;
  const systemDark = () => window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  const current = () => root.dataset.theme || (systemDark() ? "dark" : "light");
  btn.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("xatmojo-theme", next); } catch (_) { /* storage diblokir: tema berlaku sementara */ }
  });
})();
