// footerlocation.js
const items = document.querySelectorAll(".location-item");
const centerIndex = 1;           // initial active index (on load)
let lastActiveIndex = centerIndex;

// helper to set active by index
function setActiveByIndex(index) {
    items.forEach((it, i) => {
        it.classList.toggle("active", i === index);
    });
}

// initialize
setActiveByIndex(lastActiveIndex);

// On hover, activate the hovered item and remember it.
// We DO NOT revert on mouseleave — last hovered remains active.
items.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
        lastActiveIndex = index;
        setActiveByIndex(index);
    });
});

// Optional: If you ever want to programmatically reset to center later,
// call setActiveByIndex(centerIndex);
