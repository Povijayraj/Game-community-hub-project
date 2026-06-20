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


let games = document.querySelectorAll(".games-images")

let searchBox = document.getElementById("searchBox")

searchBox.addEventListener("input", searchGames);

function searchGames(){

    let enteredValue = searchBox.value.toUpperCase();

    games.forEach(function(game){

        let gameName = game.querySelector(".game-name").textContent.toUpperCase();

         if(gameName.includes(enteredValue)){


        game.style.display = "block";

    }

    else{

        game.style.display = "none";


    }


    });


}


let categories = document.querySelectorAll(".category-btn");

categories.forEach(function(category){

category.addEventListener("click", filterGames);


});

function filterGames(event){

categories.forEach(function(category){

category.classList.remove("active");

});

event.target.classList.add("active");

    let selectedCategory = event.target.textContent.toUpperCase();

let games = document.querySelectorAll(".games-images");

games.forEach(function(game){

let category = game.querySelector(".cat").textContent.toUpperCase();


if(category === selectedCategory){

game.style.display = "block";

}

else if(selectedCategory === "ALL"){


game.style.display = "block";


}

else{

game.style.display = "none";

}

});

}










