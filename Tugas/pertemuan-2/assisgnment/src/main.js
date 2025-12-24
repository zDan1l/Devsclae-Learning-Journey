import Typed from "typed.js";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const identityElement = document.querySelector(".text-indentity");

const typed = new Typed(identityElement, {
  strings: [
    "Fullstack Developer",
    "Software Engineer",
    "Junior Web Developer",
    "Tech Enthusiast",
  ],
  typeSpeed: 60,
  backSpeed: 60,
  loop: true,
});

window.addEventListener("DOMContentLoaded", async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      particles: {
        number: { value: 80 },
        color: { value: "#000000" },
        opacity: { value: 0.5 },
        zIndex: { value: -1 },
        size: { value: 3 },
        links: {
          enable: true,
          color: "#000000",
          opacity: 0.4,
        },
        move: { enable: true, speed: 1 },
      },
    },
  });
});
