// ========= Year in footer =========
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ========= Mobile menu (accessible) =========
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

if (menuBtn && mainNav) {
  // Make the control relationship explicit for screen readers
  menuBtn.setAttribute("aria-controls", "mainNav");
  menuBtn.setAttribute("aria-expanded", "false");

  const setExpanded = (isOpen) => {
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    mainNav.classList.toggle("show", isOpen);
  };

  // Toggle on click
  menuBtn.addEventListener("click", () => {
    const nextState = !mainNav.classList.contains("show");
    setExpanded(nextState);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainNav.classList.contains("show")) {
      setExpanded(false);
      menuBtn.focus();
    }
  });

  // Close when a nav link is clicked (useful on mobile)
  mainNav.addEventListener("click", (e) => {
    if (e.target.closest("a") && mainNav.classList.contains("show")) {
      setExpanded(false);
    }
  });

  // Ensure menu closes when resizing back to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 600 && mainNav.classList.contains("show")) {
      setExpanded(false);
    }
  });
}

// ========= (Optional) Render projects dynamically =========
// On pages where you have a <div id="projectGrid"></div>, this will populate it.
// If you don't have that element, this block safely does nothing.
const grid = document.getElementById("projectGrid");
if (grid) {
  const projects = [
    {
      title: "Portfolio Site",
      summary: "This website: HTML/CSS/JS",
      meta: "Web · JS",
      link: "#",
    },
  ];

  grid.innerHTML = projects
    .map(
      (p) => `
      <article class="card">
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
        <p class="meta">${p.meta ?? ""}</p>
        <a class="link" href="${p.link}" target="_blank" rel="noopener noreferrer">
          View
        </a>
      </article>`
    )
    .join("");
}
