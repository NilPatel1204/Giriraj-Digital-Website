const tabs = document.querySelectorAll(".tabs-item");
const tabImage = document.getElementById("tab-image");

let currentIndex = 0;
const intervalTime = 7000; // 7 seconds
let autoplayInterval;

// Activate a tab by index
function activateTab(index) {
    currentIndex = index;

    tabs.forEach((tab, i) => {
        const progress = tab.querySelector(".tabs-progress");

        // Reset classes
        tab.classList.remove("active");
        tab.classList.add("opacity-70");

        // Reset progress bar instantly for all tabs
        progress.style.transition = "none";
        progress.style.width = "100%"; // keep inactive full width
        progress.style.backgroundColor = "rgba(44, 54, 58, 0.2)";
    });

    const activeTab = tabs[index];
    activeTab.classList.add("active");
    activeTab.classList.remove("opacity-70");

    // Update image
    tabImage.src = activeTab.dataset.image;

    // Animate active progress bar
    const activeProgress = activeTab.querySelector(".tabs-progress");

    // Start from 0% instantly
    activeProgress.style.transition = "none";
    activeProgress.style.width = "0%";
    activeProgress.style.backgroundColor = "#0FA1DB";

    // Trigger the transition after tiny delay
    setTimeout(() => {
        activeProgress.style.transition = `${intervalTime}ms linear`;
        activeProgress.style.width = "100%";
    }, 50); // 50ms ensures transition is applied
}

// Autoplay next tab
function nextTab() {
    currentIndex = (currentIndex + 1) % tabs.length;
    activateTab(currentIndex);
}

// Start autoplay
function startAutoplay() {
    autoplayInterval = setInterval(nextTab, intervalTime);
}

// Stop & restart autoplay on user click
tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        clearInterval(autoplayInterval);
        activateTab(index);
        startAutoplay();
    });
});

// Start first tab + autoplay
activateTab(0);
startAutoplay();
