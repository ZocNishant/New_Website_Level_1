"use strict";

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

// select 3 element, apply mousemove, location of mouse x and y position, show image and move the image in mouse location, rotate image

document.querySelectorAll(".element").forEach(function (element) {
  let roatate = 0;
  let difference = 0;

  element.addEventListener("mouseleave", function (details) {
    gsap.to(element.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    });
  });

  element.addEventListener("mousemove", function (details) {
    let diff = details.clientY - element.getBoundingClientRect().top;
    difference = details.clientX - roatate;
    roatate = details.clientX;

    gsap.to(element.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, difference),
    });
  });
});
