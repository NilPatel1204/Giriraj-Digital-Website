document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".faq-btn");

    // Animate height open/close
    function slideToggle(element, duration = 300) {
        if (element.classList.contains("hidden")) {
            // OPEN
            element.classList.remove("hidden");
            let height = element.scrollHeight;
            element.style.height = "0px";
            element.style.overflow = "hidden";

            requestAnimationFrame(() => {
                element.style.transition = `height ${duration}ms ease`;
                element.style.height = height + "px";
            });

            setTimeout(() => {
                element.style.height = "";
                element.style.overflow = "";
            }, duration);
        } else {
            // CLOSE
            let height = element.scrollHeight;
            element.style.height = height + "px";
            element.style.overflow = "hidden";

            requestAnimationFrame(() => {
                element.style.transition = `height ${duration}ms ease`;
                element.style.height = "0px";
            });

            setTimeout(() => {
                element.classList.add("hidden");
                element.style.height = "";
                element.style.overflow = "";
            }, duration);
        }
    }

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = document.querySelector(btn.dataset.target);

            // Close all others
            buttons.forEach(other => {
                if (other !== btn) {
                    const otherTarget = document.querySelector(other.dataset.target);
                    if (!otherTarget.classList.contains("hidden")) {
                        slideToggle(otherTarget);
                        other.querySelector(".icon-plus").classList.remove("hidden");
                        other.querySelector(".icon-minus").classList.add("hidden");
                    }
                }
            });

            // Toggle current
            slideToggle(target);

            const plusIcon = btn.querySelector(".icon-plus");
            const minusIcon = btn.querySelector(".icon-minus");
            plusIcon.classList.toggle("hidden");
            minusIcon.classList.toggle("hidden");
        });
    });
});
