const menuBtn = document.querySelector('.burger');
const menuBtnActive = document.querySelector('.burger__menu');
const logo = document.querySelector('.header__logo');
const bg = document.querySelector('.menu-bg');
const header = document.querySelector('.header');
const burgerLink = document.querySelectorAll('.burger__link');
const body = document.querySelector('body');

function closeBurger() {
  body.style.overflow = 'auto';
  menuBtnActive.classList.toggle("burger__active");
  bg.classList.toggle("modBg");
  menuBtn.classList.toggle("change");
  logo.style.opacity = '1';
  header.style.background = '#fff';
  window.scroll(0, 0);
}
burgerLink.forEach(buttonItem => {
  buttonItem.addEventListener("click", closeBurger);
});

header.style.background = '#fff';

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle("change");
  menuBtnActive.classList.toggle("burger__active");
  bg.classList.toggle("modBg");
  if (logo.style.opacity == '0') {
    logo.style.opacity = '1';
    header.style.background = '#fff';
    body.style.overflow = 'auto';
  } else {
    logo.style.opacity = '0';
    header.style.background = 'rgba(41, 41, 41, 0.1)';
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
      header.style.background = '#fff';
      body.style.overflow = 'auto';
    } else {
      logo.style.opacity = '0';
      header.style.background = 'rgba(41, 41, 41, 0.1)';
      body.style.overflow = 'hidden';
    }
  }
});

export default closeBurger;

