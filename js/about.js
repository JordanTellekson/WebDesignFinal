document.addEventListener("DOMContentLoaded", () => {
    const cardImages = document.querySelectorAll(".card img");

    // Hover Effect
    cardImages.forEach((image) => {
        image.addEventListener("mouseover", () => {
            image.classList.add("hover-scale");
        });

        image.addEventListener("mouseout", () => {
            image.classList.remove("hover-scale");
        });
    });
});