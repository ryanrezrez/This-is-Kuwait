const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
const mobileContainer = document.querySelector(".mobile-container");

mobileMenuBtn.addEventListener("click", () => {
    if (mobileContainer.style.display === "flex") {
        mobileContainer.style.display = "none";
    } else {
        mobileContainer.style.display = "flex";
    }
});

const title = document.getElementById('title'); 
title.addEventListener('click', () => { window.location.href = '/'; });