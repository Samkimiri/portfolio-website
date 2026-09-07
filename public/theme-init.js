// Applied before paint to avoid a flash of the wrong theme. Lives as an
// external file (not an inline <script>) so the CSP doesn't need
// 'unsafe-inline' for script-src.
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
})();
