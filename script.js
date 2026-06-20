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