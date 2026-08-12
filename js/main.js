/* ============================================================
   bewuka — portfolio | logika strony
   ============================================================ */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- renderowanie: projekty ---------- */
  const projectList = document.getElementById("projectList");
  if (projectList && typeof PROJECTS !== "undefined") {
    PROJECTS.forEach((p) => {
      const li = document.createElement("li");
      li.className = "card about-item reveal";
      li.innerHTML =
        "<h3>" + esc(p.title) + "</h3>" +
        "<p>" + esc(p.desc) + "</p>" +
        (p.tag ? "<span class=\"tag\">" + esc(p.tag) + "</span>" : "");
      projectList.appendChild(li);
    });
  }

  /* ---------- renderowanie: produkty ---------- */
  const productsGrid = document.getElementById("productsGrid");
  if (productsGrid && typeof PRODUCTS !== "undefined") {
    PRODUCTS.forEach((p) => {
      const article = document.createElement("article");
      article.className = "card product-card reveal";
      article.innerHTML =
        '<div class="product-top">' +
          "<h3>" + esc(p.name) + "</h3>" +
          '<span class="badge ' + esc(p.statusTone || "muted") + '">' + esc(p.status || "—") + "</span>" +
        "</div>" +
        "<p class=\"product-desc\">" + esc(p.tagline) + "</p>" +
        '<div class="product-foot">' +
          '<span class="product-price">' + esc(p.price || "—") + "</span>" +
          '<a class="btn btn-primary btn-sm" href="' + esc(p.link || "#") + '" target="_blank" rel="noopener">' +
            esc(p.linkLabel || "Dowiedz się więcej") +
            ' <span class="btn-arrow" aria-hidden="true">&nearr;</span>' +
          "</a>" +
        "</div>";
      productsGrid.appendChild(article);
    });
  }

  /* ---------- renderowanie: socials ---------- */
  const socialsGrid = document.getElementById("socialsGrid");
  if (socialsGrid && typeof SOCIALS !== "undefined") {
    SOCIALS.forEach((s) => {
      const a = document.createElement("a");
      a.className = "card contact-card reveal";
      a.href = s.url || "#";
      a.target = "_blank";
      a.rel = "noopener";
      if (s.copy) {
        a.dataset.copy = s.copy;
        a.href = "#contact";
        a.target = "";
        a.setAttribute("aria-label", "Skopiuj: " + s.copy);
      }
      a.innerHTML =
        '<span class="contact-label">' + esc(s.label) + "</span>" +
        '<span class="contact-value">' + esc(s.value) + "</span>" +
        '<span class="contact-hint">' +
          (s.copy ? "Kliknij, aby skopiować" : "Otwórz link") +
          ' <span class="arr" aria-hidden="true">&nearr;</span>' +
        "</span>";
      socialsGrid.appendChild(a);
    });
  }

  /* ---------- pomocniczy escape ---------- */
  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------- rok w stopce ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- navbar: tło po przewinięciu ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- menu mobilne ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function setMenu(open) {
    navLinks.classList.toggle("open", open);
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  }

  menuToggle.addEventListener("click", () => {
    setMenu(!navLinks.classList.contains("open"));
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) setMenu(false);
  });

  /* ---------- aktywna zakładka ---------- */
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const links = Array.from(document.querySelectorAll(".nav-link[data-section]"));

  const setActive = (id) => {
    links.forEach((l) => l.classList.toggle("active", l.dataset.section === id));
  };

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    setActive(sections[0].id);
  } else {
    links.forEach((l) => {
      l.addEventListener("click", () => setActive(l.dataset.section));
    });
  }

  /* ---------- pojawianie elementów ---------- */
  function setupReveals() {
    document.querySelectorAll(".reveal-group").forEach((group) => {
      const items = group.querySelectorAll(".reveal");
      items.forEach((el, i) => {
        if (!el.style.transitionDelay) el.style.transitionDelay = i * 80 + "ms";
      });
    });

    const revealEls = document.querySelectorAll(".reveal:not(.visible)");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- kopiowanie do schowka ---------- */
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
  }

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-copy]");
    if (!el) return;

    const text = el.dataset.copy;
    const done = () => showToast("Skopiowano: " + text);

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        done();
      } catch (_) {
        /* ignore */
      }
      document.body.removeChild(ta);
    }
  });

  /* ---------- start ---------- */
  document.addEventListener("DOMContentLoaded", setupReveals);
})();
