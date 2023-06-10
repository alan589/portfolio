function typeWriter() {
  const textoArray = textos[contador].split("");
  textoElement.innerHTML = "";
  setTimeout(() => {
    textoArray.forEach((letra, i) => {
      setTimeout(() => {
        textoElement.innerHTML += letra;
        if (i === textoArray.length - 1) {
          typeWriterReverse(textos[contador]);
        }
      }, 50 * i);
    });
  }, 200);
}

function typeWriterReverse(texto) {
  const textoArray = texto.split("");
  setTimeout(() => {
    textoArray.forEach((letra, i) => {
      setTimeout(() => {
        const remainingText = textoArray
          .slice(0, textoArray.length - 1 - i)
          .join("");
        textoElement.innerHTML = remainingText;
        if (i === textoArray.length - 1) {
          contador += 1;
          if (contador === textos.length) contador = 0;
          typeWriter();
        }
      }, 10 * i);
    });
  }, 1000);
}

// load particle effect
particlesJS.load("particles-container", "particlesjs-config.json");

const textoElement = document.querySelector("#texto");
// const textos = [
//   "Sou um desenvolvedor front-end. Estudante de análise de sistemas.",
//   "Sou apaixonado por tecnologia. Tenho feito diversos cursos na área de programação.",
// ];

const textos = [
  "Sou um desenvolvedor front-end",
  "Estudante de análise de sistemas",
  "Sou apaixonado por tecnologia",
  "Já fiz diversos cursos na área de programação"
];
let contador = 0;
typeWriter();

///////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    // const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    // logo.style.opacity = this;
  }
};
const nav = document.querySelector(".nav");
// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const changeStyle = function (transSecond, height) {
  nav.style.transform = `translateY(${height}px)`;
  nav.style.transition = `transform ${transSecond}s`;
  nav.style.marginTop = `-${height}px`;
};

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    changeStyle(0.5, navHeight);
    nav.classList.add("sticky");
  } else {
    changeStyle(0, 0);
    nav.classList.remove("sticky");
  }
};

///////////////////////////////////////
// function to create a observer
const createObserver = function (element, callbackFunc, options) {
  new IntersectionObserver(callbackFunc, options).observe(element);
};

createObserver(header, stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
