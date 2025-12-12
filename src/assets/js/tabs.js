const tabs = document.querySelectorAll(".tabs-item");
const tabImage = document.getElementById("tab-image");
let currentIndex = 0;
const intervalTime = 7000;
let autoplayInterval;

function activateTab(index) {
    currentIndex = index;

    tabs.forEach(tab => {
        const progresses = tab.querySelectorAll(".tabs-progress");
        const mobileImage = tab.querySelector(".mobile-image");

        tab.classList.remove("active");
        tab.classList.add("opacity-70");

        // Hide mobile image if tab is inactive
        if (mobileImage) mobileImage.style.display = "none";

        // Reset progress bars
        progresses.forEach(p => {
            p.style.transition = "none";
            p.style.width = "100%";
            p.style.backgroundColor = "rgba(44, 54, 58, 0.2)";
        });
    });

    const activeTab = tabs[index];
    activeTab.classList.add("active");
    activeTab.classList.remove("opacity-70");

    // Show mobile image for active tab
    const activeMobileImage = activeTab.querySelector(".mobile-image");
    if (activeMobileImage) activeMobileImage.style.display = "block";

    // Update desktop image
    if (tabImage) tabImage.src = activeTab.dataset.image;

    // Animate progress bars
    const activeProgresses = activeTab.querySelectorAll(".tabs-progress");
    activeProgresses.forEach(progress => {
        progress.style.transition = "none";
        progress.style.width = "0%";
        progress.style.backgroundColor = "#0FA1DB";
        setTimeout(() => {
            progress.style.transition = `${intervalTime}ms linear`;
            progress.style.width = "100%";
        }, 50);
    });
}

// Autoplay
function nextTab() {
    currentIndex = (currentIndex + 1) % tabs.length;
    activateTab(currentIndex);
}

function startAutoplay() {
    autoplayInterval = setInterval(nextTab, intervalTime);
}

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        clearInterval(autoplayInterval);
        activateTab(index);
        startAutoplay();
    });
});

// Initial activation
activateTab(0);
startAutoplay();

// Handle viewport changes
let isDesktop = window.innerWidth >= 1024;
window.addEventListener("resize", () => {
    const nowDesktop = window.innerWidth >= 1024;
    if (nowDesktop !== isDesktop) {
        isDesktop = nowDesktop;
        activateTab(currentIndex);
    }
});