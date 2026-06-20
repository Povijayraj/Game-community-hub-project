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




const $ = (id) => document.getElementById(id);

function openModal() {
  const modal = $("editProfileModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const modal = $("editProfileModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

(() => {
  function init() {
    const btnEdit = $("btnEditProfile");
    const btnClose = $("btnCloseEdit");
    const btnCancel = $("btnCancelEdit");
    const form = $("editProfileForm");
    const modal = $("editProfileModal");

    if (btnEdit) btnEdit.addEventListener("click", openModal);
    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (btnCancel) btnCancel.addEventListener("click", closeModal);
    

    // Close on submit as well
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        closeModal();
      });
    }

    // Click outside closes
    if (modal) {
      modal.addEventListener("click", (ev) => {
        if (ev.target === modal) closeModal();
      });
    }

    // Favorite games switcher 
    const btnToggleFavorite = $("btnToggleFavorite");
    const favoriteGamesText = $("favoriteGamesText");
    

    const gameSets = [
      "Valorant • Apex • CS2",
      "Fortnite • Overwatch 2 • Rocket League",
      "Dota 2 • PUBG • R6 Siege",
    ];
    let setIndex = 0;

    if (btnToggleFavorite && favoriteGamesText) {
      btnToggleFavorite.addEventListener("click", () => {
        setIndex = (setIndex + 1) % gameSets.length;
        favoriteGamesText.textContent = gameSets[setIndex];
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();



