const appData = {
  Avery: {
    home: {
      streakDays: "14 days",
      goalsMet: "4 / 5",
      sleepHours: "7.5 h",
      stepsToday: "8,200",
      momentum: [58, 68, 74, 61, 80, 84, 72],
    },
    fitness: {
      weekly: [68, 54, 76, 64, 73, 82, 61],
      activities: ["Soccer drills", "Bike ride", "Family walk", "Yoga stretch"],
      calories: "420",
      focus: "Cardio + Mobility",
    },
    diet: {
      foodLog: ["Avocado toast", "Berry yogurt bowl", "Chicken wrap", "Salmon + rice"],
      waterCups: "6",
      veggieServings: "4",
      sugar: "Low",
      protein: "Moderate",
    },
    screen: {
      totalHours: "2.1 hrs",
      goalHours: "2.0 hrs",
      familyAvg: "2.4 hrs",
      weekly: [42, 58, 48, 52, 50, 46, 44],
    },
    goals: {
      streak: "9 days",
      progressPercent: 72,
      nextGoal: "Read 20 minutes",
    },
    profile: {
      family: [
        { name: "Jamie Parker", role: "Parent" },
        { name: "Avery Parker", role: "Child" },
        { name: "Jordan Parker", role: "Child" },
      ],
    },
  },
  Jordan: {
    home: {
      streakDays: "10 days",
      goalsMet: "3 / 5",
      sleepHours: "8.1 h",
      stepsToday: "6,900",
      momentum: [52, 60, 66, 58, 63, 75, 69],
    },
    fitness: {
      weekly: [52, 48, 70, 57, 61, 66, 59],
      activities: ["Basketball", "Jump rope", "Nature walk", "Dance cardio"],
      calories: "360",
      focus: "Endurance",
    },
    diet: {
      foodLog: ["Fruit smoothie", "Turkey sandwich", "Veggie pasta", "Nuts + apple"],
      waterCups: "5",
      veggieServings: "3",
      sugar: "Medium",
      protein: "Balanced",
    },
    screen: {
      totalHours: "1.8 hrs",
      goalHours: "2.0 hrs",
      familyAvg: "2.1 hrs",
      weekly: [38, 46, 40, 44, 41, 39, 37],
    },
    goals: {
      streak: "6 days",
      progressPercent: 58,
      nextGoal: "Stretch after school",
    },
    profile: {
      family: [
        { name: "Jamie Parker", role: "Parent" },
        { name: "Avery Parker", role: "Sibling" },
        { name: "Jordan Parker", role: "Child" },
      ],
    },
  },
};

const pageTitles = {
  home: "Healthy Habits",
  diet: "Diet",
  fitness: "Fitness",
  screen: "Screen Time",
  goals: "Goals",
  profile: "Profile & Family",
  menu: "Menu",
  login: "Login",
};

const state = {
  activePage: "home",
  activeChild: "Avery",
};

function getByPath(obj, path) {
  return path.split(".").reduce((current, key) => {
    if (!current || typeof current !== "object") return undefined;
    return current[key];
  }, obj);
}

function updateScalarFields(childData) {
  const fieldNodes = document.querySelectorAll("[data-field]");
  fieldNodes.forEach((node) => {
    if (node.classList.contains("mini-bar")) return;
    if (node.classList.contains("family-list")) return;
    if (node.classList.contains("progress-fill")) return;

    const fieldPath = node.dataset.field;
    if (!fieldPath) return;

    const value = getByPath(childData, fieldPath);
    if (value === undefined || Array.isArray(value) || typeof value === "object") return;
    node.textContent = String(value);
  });
}

function updateBars(childData) {
  const bars = document.querySelectorAll(".mini-bar[data-field][data-index]");
  bars.forEach((bar) => {
    const fieldPath = bar.dataset.field;
    const index = Number(bar.dataset.index);
    const series = getByPath(childData, fieldPath);
    if (!Array.isArray(series)) return;

    const value = Number(series[index]) || 0;
    bar.style.height = `${Math.max(14, Math.min(100, value))}%`;
  });
}

function updateLists(childData) {
  const listNodes = document.querySelectorAll("ul.list[data-field]");
  listNodes.forEach((list) => {
    const fieldPath = list.dataset.field;
    if (!fieldPath) return;

    const items = getByPath(childData, fieldPath);
    if (!Array.isArray(items)) return;

    list.innerHTML = items
      .map((item) => `<li>${item}</li>`)
      .join("");
  });
}

function updateFamily(childData) {
  const familyContainer = document.querySelector(".family-list[data-field]");
  if (!familyContainer) return;

  const family = getByPath(childData, "profile.family");
  if (!Array.isArray(family)) return;

  familyContainer.innerHTML = family
    .map(
      (member) => `
        <div class="family-card">
          <span>${member.name}</span>
          <small class="muted">${member.role}</small>
        </div>
      `
    )
    .join("");
}

function updateProgress(childData) {
  const progress = document.querySelector(".progress-fill[data-field='goals.progressPercent']");
  const value = Number(getByPath(childData, "goals.progressPercent"));
  if (!progress || Number.isNaN(value)) return;
  progress.style.width = `${Math.max(8, Math.min(100, value))}%`;
}

function applyChildData() {
  const childData = appData[state.activeChild];
  if (!childData) return;

  updateScalarFields(childData);
  updateBars(childData);
  updateLists(childData);
  updateFamily(childData);
  updateProgress(childData);
}

function navigateTo(pageName) {
  const page = pageName in pageTitles ? pageName : "home";
  state.activePage = page;

  document.querySelectorAll(".page").forEach((section) => {
    section.classList.toggle("is-active", section.dataset.page === page);
  });

  document.querySelectorAll("[data-nav]").forEach((node) => {
    const isNavItem = node.classList.contains("nav-link") || node.classList.contains("mobile-tab");
    if (isNavItem) {
      node.classList.toggle("is-active", node.dataset.nav === page);
    }
  });

  const titleNode = document.querySelector("[data-page-title]");
  if (titleNode) {
    titleNode.textContent = pageTitles[page];
  }

  document.body.classList.remove("menu-open");
}

function wireNavigation() {
  document.addEventListener("click", (event) => {
    const navTarget = event.target.closest("[data-nav]");
    if (navTarget) {
      const pageName = navTarget.dataset.nav;
      if (pageName) navigateTo(pageName);
    }
  });

  const menuToggle = document.querySelector("[data-menu-toggle]");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
    });
  }
}

function wireChildSelector() {
  document.querySelectorAll(".child-pill[data-child]").forEach((pill) => {
    pill.addEventListener("click", () => {
      const nextChild = pill.dataset.child;
      if (!nextChild || !appData[nextChild]) return;

      state.activeChild = nextChild;
      document.querySelectorAll(".child-pill").forEach((node) => {
        node.classList.toggle("is-active", node.dataset.child === nextChild);
      });
      applyChildData();
    });
  });
}

const aiPromptsByAlt = {
  Fitness:
    "family friendly fitness training session with kids running outdoors, natural light, modern lifestyle photography",
  Diet:
    "healthy salad bowl and balanced meal on table, vibrant natural colors, realistic food photography",
  "Screen Time":
    "child using tablet with parent nearby, balanced screen time at home, realistic candid photo",
  Goals:
    "goal planning notebook with checklist and pen on clean desk, soft daylight, realistic photography",
  Soccer:
    "kids soccer practice on green field, action moment, realistic sports photography",
  Yoga:
    "family yoga in calm home studio, peaceful mood, realistic photo",
  Running:
    "young runner training on track, dynamic movement, realistic photo",
  "Meal Ideas":
    "healthy grain bowl meal close-up, appetizing and colorful, realistic food photo",
  "Snack Ideas":
    "healthy snacks with fruit and yogurt on plate, clean composition, realistic photo",
  "Family Cooking":
    "family cooking healthy dinner together in bright kitchen, realistic photo",
  "Goal board":
    "vision board with healthy habit goals and sticky notes, modern desk setup, realistic photo",
  Celebration:
    "family celebrating achievement at home, joyful candid moment, realistic photo",
  Planner:
    "kid writing in daily habit planner notebook, warm natural light, realistic photo",
  "Family planning together":
    "family planning wellness routine together at table, modern home interior, realistic photo",
};

function buildAiImageUrl(prompt, seed) {
  const params = new URLSearchParams({
    width: "960",
    height: "640",
    model: "flux",
    seed: String(seed),
    nologo: "true",
    enhance: "true",
  });
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params.toString()}`;
}

function buildAiImageUrlAlt(prompt, seed) {
  const params = new URLSearchParams({
    width: "960",
    height: "640",
    seed: String(seed),
  });
  return `https://pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params.toString()}`;
}

function buildGeneratedFallback(label) {
  const safeLabel = (label || "Healthy Habits").replace(/[<>&"]/g, "");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ddf3e8" />
          <stop offset="100%" stop-color="#89cfad" />
        </linearGradient>
      </defs>
      <rect width="960" height="640" rx="30" fill="url(#g)" />
      <rect x="44" y="44" width="872" height="552" rx="24" fill="rgba(255,255,255,0.25)" />
      <text x="86" y="132" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="46" font-weight="700" fill="#123126">${safeLabel}</text>
      <text x="86" y="196" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="30" font-weight="500" fill="rgba(18,49,38,0.75)">AI image temporarily unavailable</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function applyAiImageSet() {
  document.querySelectorAll("img").forEach((img, index) => {
    const label = img.alt || "Healthy Habits";
    const prompt = aiPromptsByAlt[label] || `realistic healthy habits app illustration for ${label}`;
    const sources = [
      buildAiImageUrl(prompt, 300 + index),
      buildAiImageUrlAlt(prompt, 900 + index),
    ];

    img.loading = "lazy";
    img.decoding = "async";
    img.referrerPolicy = "no-referrer";
    img.dataset.aiSourceIndex = "0";
    img.src = sources[0];

    img.onerror = () => {
      const currentIndex = Number(img.dataset.aiSourceIndex || "0");
      const nextIndex = currentIndex + 1;
      if (nextIndex < sources.length) {
        img.dataset.aiSourceIndex = String(nextIndex);
        img.src = sources[nextIndex];
        return;
      }
      img.onerror = null;
      img.src = buildGeneratedFallback(label);
    };
  });
}

function removeAllImages() {
  document.querySelectorAll("img").forEach((img) => {
    img.remove();
  });
}

function init() {
  removeAllImages();
  wireNavigation();
  wireChildSelector();
  applyChildData();
  navigateTo(state.activePage);
}

init();
