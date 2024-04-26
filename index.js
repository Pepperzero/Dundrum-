//alert("connected");

/////// SWIPER
$(".team-swiper_component").each(function (index) {
  const swiper = new Swiper($(this).find(".swiper")[0], {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 500,
    centerInsufficientSlides: true,
    loop: true,
    // autoplay: {
    //   delay: 6000,
    //   disableOnInteraction: false,
    // },
    breakpoints: {
      // when it gets bigger than 478px
      478: {
        slidesPerView: 4,
        //slidesPerGroup: 2,
        spaceBetween: 16,
      },
    },
    pagination: {
      el: $(this).find(".swiper-bullet-wrapper")[0],
      bulletActiveClass: "is-active",
      bulletClass: "swiper-bullet",
      bulletElement: "div",
      clickable: true,
    },
    navigation: {
      nextEl: $(this).find(".swiper-next")[0],
      prevEl: $(this).find(".swiper-prev")[0],
      disabledClass: "is-disabled",
    },
  });
});

////// GSAP

//Menu animation
window.addEventListener("DOMContentLoaded", (event) => {
  let navButton = $(".nav_button");
  let menuWrap = $(".menu_wrap");
  let menuBackground = $(".menu_background");
  let lines = $(".nav_button_line");

  let showMainMenu = gsap.timeline({
    paused: true,
    defaults: { duration: 0.5 },
    onReverseComplete: () => {
      navButton.attr("aria-label", "Open Main Menu");
    },
    onComplete: () => {
      menuWrap.find("button").first().focus();
      navButton.attr("aria-label", "Close Main Menu");
    },
  });
  showMainMenu.set(menuWrap, { display: "block" });
  showMainMenu.to("html", { "--navbar--text": "#131936" }, "<");
  showMainMenu.set(menuBackground, { display: "block" }, "<");
  showMainMenu.from(menuWrap, { y: "-100%" }, "<");
  showMainMenu.from(menuBackground, { opacity: 0 }, "<");
  showMainMenu.to(lines.eq(0), { y: 4, rotate: 45 }, "<");
  showMainMenu.to(lines.eq(1), { y: -4, rotate: -45 }, "<");

  navButton.on("click", function () {
    if (showMainMenu.progress() === 0) {
      showMainMenu.play();
    } else {
      showMainMenu.reverse();
      navButton.attr("aria-label", "Open Main Menu");
    }
  });

  menuBackground.on("click", function () {
    showMainMenu.reverse();
  });
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") showMainMenu.reverse();
  });
});

// Scrolltrigger animation
gsap.registerPlugin(ScrollTrigger);

// Function to animate elements
function animateElements(elements) {
  gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  });
}

// Function to check if an element has the 'animate' attribute
function hasAnimateAttribute(element) {
  return element.getAttribute("animate") !== null;
}

// Find all elements with the 'animate' attribute
const animateContainers = document.querySelectorAll("[animate]");

// Loop through each animate container and set up ScrollTrigger
animateContainers.forEach((container) => {
  const elementsToAnimate = container.children;
  //animateElements(elementsToAnimate);

  ScrollTrigger.create({
    trigger: container,
    start: "top 80%", // Adjust as needed
    //markers: true,
    onEnter: () => animateElements(elementsToAnimate),
    //onLeaveBack: () => animateElements(elementsToAnimate).restart(),
  });
});
