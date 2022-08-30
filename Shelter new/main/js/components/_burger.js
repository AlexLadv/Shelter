const body = document.querySelector('body');
const logo = document.querySelector('.header__logo');
const burgerLink = document.querySelectorAll('.burger__link');
const menuBtn = document.querySelector('.burger');
const menuBtnActive = document.querySelector('.burger__menu');
const bg = document.querySelector('.menu-bg');

function closeBurger() {
  menuBtn.classList.toggle("change");
  menuBtnActive.classList.toggle("burger__active");
  bg.classList.toggle("modBg");
  logo.style.opacity = '1';
  window.scroll(0, 0);
  body.style.overflow = 'auto';
}
burgerLink.forEach(buttonItem => {
buttonItem.addEventListener("click", closeBurger);
});

menuBtn.addEventListener('click', () => {
menuBtn.classList.toggle("change");
menuBtnActive.classList.toggle("burger__active");
bg.classList.toggle("modBg");
if (logo.style.opacity == '0') {
  logo.style.opacity = '1';
  body.style.overflow = 'auto';
} else {
  logo.style.opacity = '0';
  body.style.overflow = 'hidden';
}
});

bg.addEventListener('click', (e) => {
if (e.target.classList[1] == 'modBg') {
  menuBtn.classList.toggle("change");
  menuBtnActive.classList.toggle("burger__active");
  bg.classList.toggle("modBg");
  if (logo.style.opacity == '0') {
    logo.style.opacity = '1';
    body.style.overflow = 'auto';
  } else {
    logo.style.opacity = '0';
    body.style.overflow = 'hidden';
  }
}
});

export default closeBurger;

