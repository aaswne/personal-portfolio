(function () {
  "use strict";

  // ------ LIGHT MODE TOGGLE ------
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const currentTheme = localStorage.getItem("theme") || "dark";
  body.setAttribute("data-theme", currentTheme);
  updateThemeText(currentTheme);

  function updateThemeText(theme) {
    themeToggle.textContent = theme === "dark" ? "🌙 Dark" : "☀️ Light";
  }

  themeToggle.addEventListener("click", () => {
    const theme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeText(theme);
  });

  // ------ PROJECTS DATA ------
  // Added: caseStudy for each project (you can change links later)
  const projects = [
    {
      title: "ecommerce-app",
      major: true,
      featured: true,
      description: "modern e-commerce UI with product listing and cart flow",
      github: "https://github.com/aaswne/ecommerce-app",
      live: "https://github.com/aaswne/ecommerce-app",
      caseStudy: "ecommerse.html",
      tags: ["HTML", "Context API", "JavaScript", "ecommerce"],
      date: "2024-02",
    },
    {
      title: "Netflix-Clone",
      description: "streaming UI clone with custom hooks, video carousel",
      github: "https://github.com/aaswne/Netflix-Clone",
      live: "https://aaswne.github.io/Netflix-Clone/",
      caseStudy: "netflix.html",
      tags: ["React", "API", "styled-components"],
      date: "2023-11",
    },
    {
      title: "backbenchers-website",
      description: "college project hub, responsive team site",
      github: "https://github.com/aaswne/backbenchers-website",
      live: "https://aaswne.github.io/backbenchers-website/",
      caseStudy: "backbencheres.html",
      tags: ["Bootstrap", "HTML", "CSS"],
      date: "2023-05",
    },
    {
      title: "drive-line-landing-page",
      description: "car rental landing with bento layout",
      github: "https://github.com/aaswne/drive-line-landing-page",
      live: "https://aaswne.github.io/drive-line-landing-page/",
      caseStudy: "driveline.html",
      tags: ["CSS", "JavaScript", "HTML", "UI"],
      date: "2024-01",
    },
   {
  title: "Apple Official Store Clone",
  description: "A modern Apple store clone built with React + Vite, featuring product listings, dynamic data rendering, and a clean premium UI inspired by Apple's official website.",
  github: "https://github.com/aaswne/apple-websiteclone/apple-clone",
  live: "#", 
  caseStudy: "appleclone.html", 
  tags: ["React", "Vite", "JavaScript", "CSS"],
  date: "2026-02",
},

  ];

  const projectsGrid = document.getElementById("projectsGrid");

  function renderProjects(filterText = "", filterTag = "all", sortBy = "featured") {
    let filtered = [...projects];

    if (filterText) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(filterText.toLowerCase()) ||
          p.description.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    if (filterTag !== "all") {
      filtered = filtered.filter((p) =>
        p.tags.some((t) => t.toLowerCase().includes(filterTag.toLowerCase()))
      );
    }

    if (sortBy === "featured") {
      filtered.sort((a, b) =>
        a.title === "ecommerce-app" ? -1 : b.title === "ecommerce-app" ? 1 : 0
      );
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => (a.date > b.date ? -1 : 1));
    }

    let html = "";

    filtered.forEach((p) => {
      const featuredClass = p.title === "ecommerce-app" ? "featured" : "";
      const majorChip = p.major
        ? '<span class="chip" style="background: var(--accent); color:white;">⭐ Major Project</span>'
        : "";

      const caseStudyBtn = p.caseStudy
        ? `<a href="${p.caseStudy}" class="btn" style="padding: 0.5rem 1.2rem; border: 1px solid var(--accent);">
            📖 Case Study
          </a>`
        : "";

      html += `
        <div class="project-card ${featuredClass} fade-in">
          <div style="display:flex; justify-content: space-between; align-items:center;">
            <h3 style="font-weight:700; font-size:1.25rem;">${p.title}</h3>
            ${majorChip}
          </div>

          <p style="color: var(--text-secondary); margin: var(--space-1) 0 var(--space-2);">
            ${p.description}
          </p>

          <div class="tech-tags">
            ${p.tags.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
          </div>

          <div style="display:flex; gap: var(--space-2); margin-top: var(--space-2); flex-wrap:wrap;">
            <a href="${p.github}" target="_blank" class="btn" style="padding: 0.5rem 1.2rem;">GitHub</a>
            <a href="${p.live}" target="_blank" class="btn btn-primary" style="padding: 0.5rem 1.2rem;">Live Demo</a>
            ${caseStudyBtn}
          </div>
        </div>
      `;
    });

    projectsGrid.innerHTML =
      html ||
      '<p style="grid-column:1/-1; color: var(--text-secondary);">No projects match</p>';

    observeFadeIn();
  }

  // Filter interactions
  const searchInput = document.getElementById("projectSearch");
  const filterChips = document.querySelectorAll(".filter-chip");
  const sortSelect = document.getElementById("sortProjects");

  let currentFilter = "all";
  let currentSearch = "";
  let currentSort = "featured";

  function updateAll() {
    renderProjects(currentSearch, currentFilter, currentSort);
  }

  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    updateAll();
  });

  filterChips.forEach((chip) => {
    chip.addEventListener("click", function () {
      filterChips.forEach((c) => c.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.dataset.filter;
      updateAll();
    });
  });

  sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    updateAll();
  });

  renderProjects("", "all", "featured");

  // ------ ACTIVE NAVIGATION ------
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    const scrollY = window.scrollY;

    sections.forEach((sec) => {
      if (!sec.id) return;

      const sectionTop = sec.offsetTop - 80;
      const sectionBottom = sectionTop + sec.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sec.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // FADE-IN
  function observeFadeIn() {
    const fadeElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    fadeElements.forEach((el) => observer.observe(el));
  }

  observeFadeIn();

  // CONTACT FORM VALIDATION + MAILTO
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;
    document.querySelectorAll(".error-msg").forEach((el) => (el.innerHTML = ""));

    if (!name) {
      document.querySelector("#name + .error-msg").innerHTML = "Name required";
      isValid = false;
    }

    if (!email) {
      document.querySelector("#email + .error-msg").innerHTML = "Email required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      document.querySelector("#email + .error-msg").innerHTML = "Invalid email";
      isValid = false;
    }

    if (!message) {
      document.querySelector("#message + .error-msg").innerHTML =
        "Message cannot be blank";
      isValid = false;
    }

    if (isValid) {
      const mailtoLink = `mailto:aswinchristy1234@gmail.com?subject=Portfolio contact from ${name}&body=${encodeURIComponent(
        message
      )}%0A%0AFrom: ${name} - ${email}`;

      window.location.href = mailtoLink;

      formFeedback.innerHTML = "✅ Redirecting to mail app... (Formspree ready)";
      formFeedback.style.color = "var(--accent)";
    } else {
      formFeedback.innerHTML = "⚠️ fix errors above";
      formFeedback.style.color = "#ff6b6b";
    }
  });

  setActiveLink();
})();
