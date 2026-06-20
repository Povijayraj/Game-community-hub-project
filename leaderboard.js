document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");
    const mobileMenuButton = document.querySelector(".mobile-menu");
    const navigation = document.querySelector(".nav-links");

    const syncNavbarState = () => {
        navbar.classList.toggle("is-scrolled", window.scrollY > 50);
    };

    syncNavbarState();

    window.addEventListener("scroll", syncNavbarState, { passive: true });

    mobileMenuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("is-open");

        mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
        mobileMenuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("is-open");
            mobileMenuButton.setAttribute("aria-expanded", "false");
            mobileMenuButton.setAttribute("aria-label", "Open menu");
        });
    });

    window.addEventListener("resize", () => {
        if(window.innerWidth > 768){
            navigation.classList.remove("is-open");
            mobileMenuButton.setAttribute("aria-expanded", "false");
            mobileMenuButton.setAttribute("aria-label", "Open menu");
        }
    });

});

const ranges = {
  all: { label: "All", size: 10 },
  weekly: { label: "Today", size: 10 },
  monthly: { label: "Weekly", size: 10 }
};

// Sample players
const players = [
  { id: 1, name: "Vijay", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=power", allScore: 980, TodayScore: 420, weeklyScore: 760 },
  { id: 2, name: "Rajini", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aarav", allScore: 955, TodayScore: 415, weeklyScore: 745 },
  { id: 3, name: "Kamal", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kabir", allScore: 910, TodayScore: 390, weeklyScore: 700 },
  { id: 4, name: "Vikram", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera", allScore: 880, TodayScore: 355, weeklyScore: 670 },
  { id: 5, name: "Ajith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kabir", allScore: 865, TodayScore: 365, weeklyScore: 640 },
  { id: 6, name: "SK", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sana", allScore: 840, TodayScore: 340, weeklyScore: 620 },
  { id: 7, name: "Dhanush", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan", allScore: 820, TodayScore: 330, weeklyScore: 600 },
  { id: 8, name: "Anirudh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anil", allScore: 800, TodayScore: 500, weeklyScore: 580 },
  { id: 9, name: "Arjun Das", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adhi", allScore: 790, TodayScore: 650, weeklyScore: 570 },
  { id: 10, name: "Rolex", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anaya", allScore: 770, TodayScore: 400, weeklyScore: 555 },
  { id: 11, name: "Suriya", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aadhi", allScore: 755, TodayScore: 600, weeklyScore: 540 },
  { id: 12, name: "Raghav", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoya", allScore: 740, TodayScore: 300, weeklyScore: 530 }
];

function getScore(p, range) {
  if (range === "Today") return p.TodayScore;
  if (range === "Weekly") return p.weeklyScore;
  return p.allScore;
}

function formatNumber(n) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
}

function renderTop3(sorted, range) {
  const top3 = sorted.slice(0, 3);

  const container = document.getElementById("top3");
  container.innerHTML = "";

  top3.forEach((p, idx) => {
    const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉";

    // Each card glow
    const colorClass =
      idx === 0 ? "from-indigo-500/30 via-indigo-500/10 to-transparent" : idx === 1 ? "from-slate-400/25 via-slate-400/10 to-transparent" : "from-fuchsia-500/25 via-fuchsia-500/10 to-transparent";

    const score = getScore(p, range);
    const maxScore = getScore(sorted[0], range) || score;
    const pct = Math.max(0, Math.min(100, Math.round((score / maxScore) * 100)));

    const wrapper = document.createElement("div");
    wrapper.className =
      "relative overflow-hidden rounded-3xl border border-slate-700/60 glass p-4 flex flex-col gap-3 " +
      (idx === 0 ? "bg-indigo-500/10" : idx === 1 ? "bg-slate-500/10" : "bg-fuchsia-500/10");

    wrapper.innerHTML = `
      <div class="absolute inset-0 -z-0">
        <div class="absolute inset-0 bg-gradient-to-b ${colorClass}"></div>
        <div class="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-white/5 blur-2xl"></div>
      </div>

      <div class="flex items-center gap-4">
        <div class="h-12 w-12 rounded-2xl bg-slate-900/45 border border-slate-700/60 flex items-center justify-center text-2xl">
          ${medal}
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <img class="h-10 w-10 rounded-full border border-slate-700/60" src="${p.avatar}" alt="${p.name}" />
            <div class="font-semibold truncate">${p.name}</div>
          </div>
          <div class="mt-1 text-sm text-slate-300">
            #<span class="font-semibold text-slate-100">${idx + 1}</span>
            <span class="text-slate-500">•</span>
            <span class="font-semibold text-slate-100">${formatNumber(score)}</span> pts
          </div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Momentum</span>
          <span class="font-semibold text-slate-300">${pct}%</span>
        </div>
        <div class="h-2.5 rounded-full bg-slate-800/60 overflow-hidden">
          <div
            class="h-full rounded-full bg-gradient-to-r ${
              idx === 0
                ? "from-indigo-400 to-indigo-600"
                : idx === 1
                  ? "from-slate-300 to-slate-500"
                  : "from-fuchsia-400 to-fuchsia-600"
            }"
            style="width:${pct}%; transition: width 700ms ease"
          ></div>
        </div>
      </div>

      <div class="text-xs text-slate-400">
        <span class="font-semibold text-slate-300">Creative tag:</span>
        ${idx === 0 ? "Unstoppable" : idx === 1 ? "On Fire" : "Rising"}
      </div>
    `;


    // tiny CSS-in-JS for animation safety (works without editing HTML)
    const bar = wrapper.querySelector(".animate-fill");
    // Trigger reflow so animation runs reliably
    if (bar) {
      bar.style.transition = "width 700ms ease";
    }

    container.appendChild(wrapper);
  });
}


function renderRows(sorted, range) {
  const rows = document.getElementById("rows");
  rows.innerHTML = "";

  const rangeSize = ranges[range]?.size ?? 10;
  const toShow = sorted.slice(0, rangeSize);

  toShow.forEach((p, idx) => {
    const score = getScore(p, range);
    const rank = idx + 1;

    const row = document.createElement("button");
    row.type = "button";
    row.className =
      "w-full text-left grid grid-cols-12 gap-2 items-center px-1 rounded-xl hover:bg-slate-800/30 transition" +
      (idx % 2 === 0 ? " bg-slate-900/10" : "");
    row.setAttribute("data-player-id", String(p.id));

    // Normal mode: #, Player, Rank label, Score
    row.innerHTML = `
      <div class="col-span-1 text-slate-300 font-semibold">${rank}</div>
      <div class="col-span-5 flex items-center gap-3 min-w-0">
        <img class="h-9 w-9 rounded-full border border-slate-700/60" src="${p.avatar}" alt="${p.name}" />
        <span class="truncate">${p.name}</span>
      </div>
      <div class="col-span-3 text-slate-300 text-sm">${rank <= 3 ? "Top" : "Challenger"}</div>
      <div class="col-span-3 text-right font-semibold">${formatNumber(score)} pts</div>
    `;

    rows.appendChild(row);
  });
}





function computeAndRender(range) {
  const sorted = [...players]
    .map(p => ({ p, score: getScore(p, range) }))
    .sort((a, b) => b.score - a.score)
    .map(x => x.p);

  renderTop3(sorted, range);
  renderRows(sorted, range);

  // Update active tab style
  document.querySelectorAll(".tab").forEach(btn => {
    const isActive = btn.getAttribute("data-range") === range;
    btn.classList.toggle("bg-indigo-500/20", isActive);
    btn.classList.toggle("border-indigo-400/40", isActive);
    if (isActive) btn.dataset.active = "true";
    else delete btn.dataset.active;
  });
}



function showModalForPlayer(player, range, rank) {
  const modal = document.getElementById("playerModal");
  const avatar = document.getElementById("modalAvatar");
  const name = document.getElementById("modalName");
  const meta = document.getElementById("modalMeta");
  const status = document.getElementById("modalStatus");
  const friendBtn = document.getElementById("friendRequestBtn");

  if (!modal) return;

  avatar.src = player.avatar;
  name.textContent = player.name;
  meta.textContent = `Rank #${rank} • Score ${formatNumber(getScore(player, range))} pts`;

  status.textContent = "";

  // bind friend request 
  if (friendBtn) {
    friendBtn.onclick = () => {
      status.textContent = "Friend request sent!";
    };
  }

  modal.classList.remove("hidden");
}


function init() {
  // Tabs
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      const range = btn.getAttribute("data-range");
      computeAndRender(range);
    });
  });

  // Modal close
  const modal = document.getElementById("playerModal");
  const closeBtn = document.getElementById("closeModalBtn");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (!modal) return;
      modal.classList.add("hidden");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }

  // Click player row -> open modal
  const rows = document.getElementById("rows");
  if (rows) {
    rows.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-player-id]");
      if (!btn) return;

      const id = Number(btn.getAttribute("data-player-id"));
      const player = players.find(p => p.id === id);
      if (!player) return;

      // get active range 
      const tabs = document.querySelectorAll(".tab[data-active='true']");
      const activeTab = tabs[0];
      const range = activeTab ? activeTab.getAttribute("data-range") : "all";

      // rank shown (position in current view)
      const rankTextEl = btn.querySelector(".col-span-1");
      const rankInView = rankTextEl ? Number(rankTextEl.textContent.trim()) : 1;

      // Calculate true position within this range (no search filtering)
      const sortedAll = [...players]
        .map(p => ({ p, score: getScore(p, range) }))
        .sort((a, b) => b.score - a.score)
        .map(x => x.p);

      const trueRank = sortedAll.findIndex(p => p.id === player.id) + 1;

      showModalForPlayer(player, range, trueRank || rankInView);
    });
  }



  // Default
  computeAndRender("all");
}


document.addEventListener("DOMContentLoaded", init);



