import data from '../../../assets/pets.js';

/*-------------------------Slider start---------------------------*/

const petsList = document.querySelector('.our-friends__list');
const pets = document.querySelector('.our-friends');
const arrowPrev = document.querySelector('.our-friends__arrow--prev');
const arrowNext = document.querySelector('.our-friends__arrow--next');

const body = document.querySelector('body');
let cardArrSlider = [];
let countCard = 3;
let marginCard = 90;

const cardView = (insert, itemPx) => {
  for (let i = 0; i < countCard; i++) {
    let count = Math.floor(Math.random() * data.length);
    do {
      count = Math.floor(Math.random() * data.length);
    } while (cardArrSlider.indexOf(count) != -1)
    cardArrSlider.push(count);
    let card_slider = `
      <article class="our-friends__item" data-index=${count} style="margin-left: ${itemPx}px;">
      <img src=${data[count].img} class="our-friends__img" alt=${data[count].name}>
      <span class="our-friends__name">${data[count].name}</span>
      <a href="#" class="btn-link btn-link--js">Learn more</a>
      </article>
    `;
    petsList.insertAdjacentHTML(insert, card_slider);
  }
}

cardView('afterbegin', 0);

if (pets.offsetWidth > 1279) {
  countCard = 1;
  marginCard = 90;
}
else if (pets.offsetWidth > 768) {
  countCard = 1;
  marginCard = 40;
}
else {
  countCard = 1;
  marginCard = 40;
}

window.addEventListener('resize', () => {
  if (pets.offsetWidth > 1279) {
    marginCard = 90;
    countCard = 1;
  }
  else if (pets.offsetWidth > 768) {
    marginCard = 40;
    countCard = 1;
  }
  else {
    marginCard = 40;
    countCard = 1;
  }
});
/*-------------------------Slider end---------------------------*/

/*-------------------------Slider btn prev start---------------------------*/
arrowNext.addEventListener('click', () => {
  cardView('beforeend', 0);
  cardArrSlider = cardArrSlider.slice(countCard);
  const cardsv = document.querySelectorAll('.our-friends__item');
  setTimeout(() => {
    cardsv[0].style.marginLeft = -(270 + marginCard) + 'px';
    closeCardPrev(cardsv);
  }, 0);
});

function closeCardPrev(cardsv) {
  let i = 1;
  let timerId = setInterval(() => {
    if (i <= countCard - 1) {
      cardsv[i].style.marginLeft = -(270 + marginCard) + 'px';
      i++;
    }
    else {
      clearTimeout(timerId);
      for (let i = 0; i < countCard; i++) cardsv[i].remove();
    }
  }, 1800);
}
/*-------------------------Slider btn prev end---------------------------*/


/*-------------------------Slider btn next start---------------------------*/
arrowPrev.addEventListener('click', () => {
  cardView('afterbegin', -(270 + marginCard));
  cardArrSlider = cardArrSlider.slice(countCard);
  const cardsv = document.querySelectorAll('.our-friends__item');
  setTimeout(() => {
    cardsv[countCard - 1].style.marginLeft = 0 + 'px';
    closeCardNext(cardsv);
  }, 0);
});

function closeCardNext(cardsv) {
  let i = countCard - 2;
  let timerId = setInterval(() => {
    if (i >= 0) {
      cardsv[i].style.marginLeft = 0 + 'px';
      i--;
    }
    else {
      clearTimeout(timerId);
      for (let i = 0; i < countCard; i++) cardsv[cardsv.length - (i + 1)].remove();
    }
  }, 1800);
}
/*-------------------------Slider btn next end---------------------------*/

export default cardView;
