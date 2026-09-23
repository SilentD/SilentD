"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initializeProjectFilters();
  initializeProjectLinks();
});

function initializeProjectFilters() {
  const filterButtons = document.querySelectorAll("[data-project-filter]");

  const projectItems = document.querySelectorAll("[data-project-category]");

  if (!filterButtons.length || !projectItems.length) {
    return;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.getAttribute("data-project-filter");

      filterButtons.forEach((filterButton) => {
        filterButton.classList.remove("active");
      });

      button.classList.add("active");

      projectItems.forEach((project) => {
        const category = project.getAttribute("data-project-category");

        const shouldShow =
          selectedFilter === "all" || category === selectedFilter;

        project.classList.toggle("d-none", !shouldShow);
      });
    });
  });
}

function initializeProjectLinks() {
  const projectLinks = document.querySelectorAll("[data-project-link]");

  if (!projectLinks.length) {
    return;
  }

  projectLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") {
      link.addEventListener("click", (event) => {
        event.preventDefault();
      });
    }
  });
}
