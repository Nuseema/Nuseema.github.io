const projects = [
  {
    title: "The Challenge",
    description: "The Challenge was my first semester project. Our group worked on the problem of ghost nets and built a solution that combined software, hardware and security.",
    imageUrl: "https://raw.githubusercontent.com/Nuseema/Nuseema.github.io/d6b1698d505411318ccf1d7eb69eaabbe878c6f9/sdg-14-fl.png.webp",
    repoUrl: "https://github.com/AbedRNDD/netfree_Seaguard",
    repoText: "github.com/AbedRNDD/netfree_Seaguard",
    semester: 1
  },
  {
    title: "Hotel Simulator",
    description: "Building a hotel simulation was the project in the second semester. We connected external libraries to run hotel scenarios and built the logic in Java.",
    imageUrl: "https://raw.githubusercontent.com/Nuseema/Nuseema.github.io/main/Schermafbeelding%202026-09-17%20144751.png",
    repoUrl: "https://github.com/danjazhang/SE2",
    repoText: "github.com/danjazhang/SE2",
    semester: 2
  }
];

const renderProjects = (list) => {
  const container = document.querySelector("#projects-container");
  if (!container) return;
  container.innerHTML = "";
  list.forEach((project) => {
    const article = document.createElement("article");
    article.className = "project-row";

    const img = document.createElement("img");
    img.src = project.imageUrl;
    img.alt = project.title;

    const info = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.textContent = project.title;

    const p = document.createElement("p");
    p.textContent = project.description;

    const repoP = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = "Repository:";
    const link = document.createElement("a");
    link.href = project.repoUrl;
    link.textContent = project.repoText;
    link.className = "repo-link";

    repoP.appendChild(strong);
    repoP.appendChild(document.createTextNode(" "));
    repoP.appendChild(link);

    info.appendChild(h3);
    info.appendChild(p);
    info.appendChild(repoP);

    article.appendChild(img);
    article.appendChild(info);

    container.appendChild(article);
  });
};

const setupProjectPage = () => {
  const container = document.querySelector("#projects-container");
  if (!container) return;
  renderProjects(projects);

  const sortNameButton = document.querySelector("#sort-name");
  const sortSemesterButton = document.querySelector("#sort-semester");

  if (sortNameButton) {
    sortNameButton.addEventListener("click", () => {
      const sorted = [...projects].sort((a, b) => a.title.localeCompare(b.title));
      renderProjects(sorted);
    });
  }

  if (sortSemesterButton) {
    sortSemesterButton.addEventListener("click", () => {
      const sorted = [...projects].sort((a, b) => a.semester - b.semester);
      renderProjects(sorted);
    });
  }
};

const velden = [
  { id: "naam", boodschap: "Please enter at least 2 characters." },
  { id: "email", boodschap: "Please enter a valid e-mail address." },
  { id: "bericht", boodschap: "Please write at least 10 characters." }
];

const valideerVeld = (veld) => {
  const input = document.querySelector(`#${veld.id}`);
  const foutmelding = document.querySelector(`#${veld.id}-error`);
  if (!input || !foutmelding) return false;
  const geldig = input.checkValidity();
  input.setAttribute("aria-invalid", String(!geldig));
  foutmelding.textContent = geldig ? "" : veld.boodschap;
  return geldig;
};

const setupContactForm = () => {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const status = document.querySelector("#form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const resultaten = velden.map(valideerVeld);
    const alleGeldig = resultaten.every((value) => value);

    if (!status) return;

    if (!alleGeldig) {
      status.textContent = "There are still errors in the form.";
      return;
    }

    status.textContent = "Message sent! Thank you.";
    form.reset();
    velden.forEach((veld) => {
      const input = document.querySelector(`#${veld.id}`);
      const foutmelding = document.querySelector(`#${veld.id}-error`);
      if (input) input.setAttribute("aria-invalid", "false");
      if (foutmelding) foutmelding.textContent = "";
    });
  });
};

const setupBlogPage = () => {
  const buttons = document.querySelectorAll(".toggle-blog");
  if (!buttons.length) return;
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.previousElementSibling;
      if (!content) return;
      const hidden = content.classList.toggle("hidden");
      button.textContent = hidden ? "Read more" : "Read less";
    });
  });
};

const loadApiData = async () => {
  const section = document.querySelector("#api-content");
  const status = document.querySelector("#api-status");
  if (!section || !status) return;

  status.textContent = "Loading tech fact...";
  section.innerHTML = "";

  const url = "https://www.drivebird.com/api/tech-facts/today";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.data) {
      const item = data.data;

      const titleP = document.createElement("p");
      titleP.textContent = item.title;

      const factP = document.createElement("p");
      factP.textContent = item.fact;

      section.appendChild(titleP);
      section.appendChild(factP);

      status.textContent = "";
    } else {
      status.textContent = "Could not load tech fact.";
    }
  } catch (error) {
    status.textContent = "Could not load tech fact. Please try again later.";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setupProjectPage();
  setupContactForm();
  setupBlogPage();
  loadApiData();
});
