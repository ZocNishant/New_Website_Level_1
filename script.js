"use script";

// Locomotive for smooth scrolling
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// Animation for the first page
function firstPageAnimation() {
  let tl = gsap.timeline();
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingElement", {
      y: "0",
      duration: 2,
      ease: Expo.easeInOut,
      delay: -1,
      stagger: 0.2,
    })
    .from("#heroFooter", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
      delay: -1,
      //   stagger: 0.2,
    });
}

// The circle that follows the mouse pointer while moving and making the cirlce oval while following the mouse pointer
let timeout;

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (details) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${details.clientX}px , ${details.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

function circleOval() {
  let xscale = 1;
  let yscale = 1;
  let xprevious = 0;
  let yprevious = 0;
  window.addEventListener("mousemove", function (details) {
    clearTimeout(timeout);

    let xdifference = details.clientX - xprevious;
    let ydifference = details.clientY - yprevious;

    xscale = gsap.utils.clamp(0.8, 1.2, xdifference);
    yscale = gsap.utils.clamp(0.8, 1.2, ydifference);

    xprevious = details.clientX;
    yprevious = details.clientY;

    circleMouseFollower(xscale, yscale);
    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${details.clientX}px , ${details.clientY}px) scale(1 , 1)`;
    }, 100);
  });
}

circleOval();
circleMouseFollower();
firstPageAnimation();
