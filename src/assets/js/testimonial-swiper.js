document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("video-modal");
    const iframe = document.getElementById("youtube-frame");
    const closeBtn = document.getElementById("close-video");
    const playButtons = document.querySelectorAll(".play-video");
    const swiperEl = document.querySelector(".mySwiper2");

    let swiperInstance = null;

    // Get Swiper instance from web component
    if (swiperEl) {
        swiperEl.addEventListener("swiperinit", (e) => {
        swiperInstance = e.detail[0];
        });
    }

    playButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
        const videoUrl = btn.dataset.video;

        // Set iframe src
        iframe.src = videoUrl;

        // Show modal
        modal.classList.remove("hidden");
        modal.classList.add("flex");

        // Stop swiper autoplay
        if (swiperEl?.swiper?.autoplay) {
            swiperEl.swiper.autoplay.stop();
        }
        });
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.add("hidden");
        modal.classList.remove("flex");

        // Stop video
        iframe.src = "";

        // Restart swiper autoplay
        if (swiperEl?.swiper?.autoplay) {
        swiperEl.swiper.autoplay.start();
        }
    }
});
