// Wait until the page is fully loaded
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");

    // After 1.5 seconds, fade out the loading screen
    setTimeout(() => {
        loadingScreen.style.opacity = 0; // Fade out the screen
        setTimeout(() => {
            loadingScreen.style.display = "none"; // Hide the screen completely after fading
        }, 500); // Wait 500ms for the fade-out transition
    }, 1500); // Wait 1.5 seconds before starting the fade-out
});


// Smooth Scrolling for "Learn More" button
// When the "Learn More" button is clicked
document.getElementById("learn-more").addEventListener("click", () => {
    // Scroll smoothly to the "dynamic-intro" section
    document.getElementById("dynamic-intro").scrollIntoView({ behavior: "smooth" });
});


// Fun Facts Loader with Rotation
const funFacts = [
    "I love coding challenges!",
    "Seafood is my favorite cuisine.",
    "I’m a car enthusiast!",
    "Gaming fuels my creativity.",
    "I enjoy solving complex problems!",
    "Teamwork makes the dream work!",
];

let factIndex = 0;

// Function to rotate fun facts
const rotateFunFacts = () => {
    const factElements = document.querySelectorAll(".fact");
    // Update each fact element with the next fun fact
    factElements.forEach((fact, index) => {
        fact.textContent = funFacts[(factIndex + index) % funFacts.length];
    });
    // Move to the next fact in the array, cycling back to the start
    factIndex = (factIndex + 1) % funFacts.length;
};

// Rotate fun facts every 10 seconds
setInterval(rotateFunFacts, 10000);

// Immediately load the first set of fun facts when the page is ready
document.addEventListener("DOMContentLoaded", rotateFunFacts);


// Slider Reveal for Dynamic Intro Section
const sliderOverlay = document.getElementById("slider-overlay");
const sliderHandle = document.getElementById("slider-handle");

let isDragging = false;

// Prevent slider from opening when clicked
const startDragging = (event) => {
    isDragging = true;
    document.body.style.cursor = "ew-resize";
    event.preventDefault(); // Prevent text selection and accidental opening on click
};

// Handle dragging and slider resizing
const handleDrag = (event) => {
    if (isDragging) {
        const sectionWidth = sliderOverlay.parentElement.offsetWidth;
        const mouseX = event.clientX || event.touches[0].clientX; // For touch support

        // Calculate overlay width based on mouse or touch position
        let newWidth = mouseX;

        // Ensure overlay width stays within bounds
        if (newWidth < 0) newWidth = 0; // Prevent going past the left
        if (newWidth > sectionWidth) newWidth = sectionWidth; // Prevent going past the right

        sliderOverlay.style.width = `${newWidth}px`; // Adjust overlay width
    }
};

// Stop dragging and finalize the slider position
const stopDragging = () => {
    if (isDragging) {
        const sectionWidth = sliderOverlay.parentElement.offsetWidth;
        const currentWidth = parseFloat(sliderOverlay.style.width) || 0;
        const revealThreshold = sectionWidth * 0.5; // Threshold for revealing

        if (currentWidth <= revealThreshold) {
            // Fully open the overlay if past 50%
            sliderOverlay.style.width = `${sectionWidth}px`;

            // Hide the slider handle and overlay once fully opened
            setTimeout(() => {
                sliderOverlay.style.display = "none"; // Hide the overlay
                sliderHandle.style.display = "none"; // Hide the slider handle
            }, 300); // Small delay for smooth transition
        } else {
            // If not past 50%, leave overlay
            sliderOverlay.style.width = "100";
        }
    }

    // Check if slider has been fully opened and hide it
    const sectionWidth = sliderOverlay.parentElement.offsetWidth;
    const currentWidth = parseFloat(sliderOverlay.style.width) || 0;
    if (currentWidth === sectionWidth) {
        // If slider is fully open (width is same as section), hide it
        sliderOverlay.style.display = "none"; // Hide the slider
        sliderHandle.style.display = "none"; // Hide the handle
    }

    isDragging = false;
    document.body.style.cursor = "default";
};

// Mouse events for desktop
sliderHandle.addEventListener("mousedown", startDragging);
document.addEventListener("mousemove", handleDrag);
document.addEventListener("mouseup", stopDragging);

// Touch events for mobile
sliderHandle.addEventListener("touchstart", startDragging, { passive: false });
document.addEventListener("touchmove", handleDrag, { passive: false });
document.addEventListener("touchend", stopDragging);