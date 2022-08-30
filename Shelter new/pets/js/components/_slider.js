import pets from '../../../assets/pets.js';

/*-------------------------Slider start---------------------------*/
//-------------------------------формирование массива из 48 элементов

let dataArr = [];
let fullPetsList = []; // 48

fullPetsList = (() => {
  let tempArr = [];

  for (let i = 0; i < 6; i++) {
    const newPets = pets;

    for (let j = pets.length; j > 0; j--) {
      let randInd = Math.floor(Math.random() * j);
      const randElem = newPets.splice(randInd, 1)[0];
      newPets.push(randElem);
    }

    tempArr = [...tempArr, ...newPets];
  }
  return tempArr;
})();


const sortRecursively = (list) => {
  const length = list.length;

  for (let i = 0; i < (length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j);
      });

      if (duplicatedItem !== undefined) {
        const ind = (i * 6) + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sortRecursively(list);
      }
    }
  }

  return list;
}

const sortCard = (list) => {
  let uniqueList = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (let j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    uniqueList = [...uniqueList, ...uniqueStepList];
  }
  list = uniqueList;

  list = sortRecursively(list);

  return list;
}

fullPetsList = sortCard(fullPetsList);
dataArr = fullPetsList;
console.log(dataArr);

//------------------------------------------------------------------------------

const catalogLists = document.querySelector('.our-friend__lists');
const paginationNextOne = document.querySelector('.pagination__next');
const paginationNextEnd = document.querySelector('.pagination__next2');
const paginationItem = document.querySelector('.pagination__item');

const paginationPrevOne = document.querySelector('.pagination__prev2');
const paginationPrevEnd = document.querySelector('.pagination__prev');

let countCard = 8; //количество карточек на странице
let endCount = 0; //номер последней страницы
if (catalogLists.offsetWidth > 990) {
  countCard = 8;
  endCount = dataArr.length / countCard;
} else if (catalogLists.offsetWidth > 567) {
  countCard = 6;
  endCount = dataArr.length / countCard;
} else {
  countCard = 3;
  endCount = dataArr.length / countCard;
}

const cardView = (countCard, cardItems) => {
  for (let i = 0; i < countCard; i++) {
    let cardPoligation = `
      <article class="pets__item"  data-index=${cardItems[i].name}>
      <img src=${cardItems[i].img} class="pets__img" alt=${cardItems[i].name}>
      <span class="pets__name">${cardItems[i].name}</span>
      <a href="#" class="btn-link btn-link--pets btn-link--js">Learn more</a>
      </article>
    `;
    catalogLists.insertAdjacentHTML('afterbegin', cardPoligation);
  }
}

let cardItems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
cardView(countCard, cardItems);

let flag = 8;
window.addEventListener('resize', () => {
  if (catalogLists.offsetWidth > 990) {
    if (flag != 8) {
      catalogLists.textContent = '';
      flag = 8;
      countCard = 8;
      endCount = dataArr.length / countCard;

      if (paginationItem.textContent > endCount) { //если перед этим страница была открыта дальше, то открываем последнюю
        paginationItem.textContent = endCount;
        cardItems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
        cardView(countCard, cardItems);
        if(paginationNextOne.classList.contains("pagination__active")) {
          paginationNextOne.classList.remove("pagination__active");
          paginationNextEnd.classList.remove("pagination__active");
        }
        paginationNextEnd.setAttribute("disabled", "true");
        paginationNextOne.setAttribute("disabled", "true");
      }
      else {
        cardItems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
        cardView(countCard, cardItems);
        if(!paginationNextOne.classList.contains("pagination__active")) {
          paginationNextOne.classList.add("pagination__active");
          paginationNextEnd.classList.add("pagination__active");
          paginationNextEnd.removeAttribute("disabled");
          paginationNextOne.removeAttribute("disabled");
        }
      }
    }
    countCard = 8;
    endCount = dataArr.length / countCard;
  }
  else if (catalogLists.offsetWidth > 767) {
    if (flag != 6) {
      catalogLists.textContent = '';
      flag = 6;
      countCard = 6;
      endCount = dataArr.length / countCard;

      if (paginationItem.textContent > endCount) { //если перед этим страница была открыта дальше, то открываем последнюю
        paginationItem.textContent = endCount;
        cardItems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
        cardView(countCard, cardItems);
        if(paginationNextOne.classList.contains("pagination__active")) {
          paginationNextOne.classList.remove("pagination__active");
          paginationNextEnd.classList.remove("pagination__active");
        }
        paginationNextEnd.setAttribute("disabled", "true");
        paginationNextOne.setAttribute("disabled", "true");
      }
      else {
        cardItems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
        cardView(countCard, cardItems);
        if(!paginationNextOne.classList.contains("pagination__active")) {
          paginationNextOne.classList.add("pagination__active");
          paginationNextEnd.classList.add("pagination__active");
          paginationNextEnd.removeAttribute("disabled");
          paginationNextOne.removeAttribute("disabled");
        }
      }
    }
    countCard = 6;
    endCount = dataArr.length / countCard;
  }
  else {
    if (flag != 3) {
      catalogLists.textContent = '';
      flag = 3;
      countCard = 3;
      endCount = dataArr.length / countCard;

      if (paginationItem.textContent > endCount) { //если перед этим страница была открыта дальше, то открываем последнюю
        paginationItem.textContent = endCount;
        cardItems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
        cardView(countCard, cardItems);
        if(paginationNextOne.classList.contains("pagination__active")) {
          paginationNextOne.classList.remove("pagination__active");
          paginationNextEnd.classList.remove("pagination__active");
        }
        paginationNextEnd.setAttribute("disabled", "true");
        paginationNextOne.setAttribute("disabled", "true");
        if(!paginationNextOne.classList.contains("pagination__active")) {
          paginationNextOne.classList.add("pagination__active");
          paginationNextEnd.classList.add("pagination__active");
          paginationNextEnd.removeAttribute("disabled");
          paginationNextOne.removeAttribute("disabled");
        }
      }
      else {
        cardItems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
        cardView(countCard, cardItems);
        if(!paginationNextOne.classList.contains("pagination__active")) {
          paginationNextOne.classList.add("pagination__active");
          paginationNextEnd.classList.add("pagination__active");
          paginationNextEnd.removeAttribute("disabled");
          paginationNextOne.removeAttribute("disabled");
        }
      }
    }
    countCard = 3;
    endCount = dataArr.length / countCard;
  }
});
/*-------------------------Slider end---------------------------*/

/*-------------------------Slider btn prev start---------------------------*/
paginationPrevOne.addEventListener('click', () => {
  if (paginationItem.textContent ==  endCount) {
    paginationNextOne.classList.toggle("pagination__active");
    paginationNextEnd.classList.toggle("pagination__active");
    paginationNextEnd.removeAttribute("disabled");
    paginationNextOne.removeAttribute("disabled");
  }
  if (paginationItem.textContent != 1) {
    catalogLists.textContent = '';
    paginationItem.textContent = +paginationItem.textContent -1;
    cardItems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
    cardView(countCard, cardItems);
    if (paginationItem.textContent == 1) {
      paginationPrevOne.classList.toggle("pagination__active");
      paginationPrevEnd.classList.toggle("pagination__active");
      paginationPrevEnd.setAttribute("disabled", "true");
      paginationPrevOne.setAttribute("disabled", "true");
    }
  }
})

paginationPrevEnd.addEventListener('click', () => {
  paginationNextOne.classList.add("pagination__active");
  paginationNextEnd.classList.add("pagination__active");
  paginationNextOne.removeAttribute("disabled");
  paginationNextEnd.removeAttribute("disabled");

  catalogLists.textContent = '';
  paginationItem.textContent = 1;
  cardItems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
  cardView(countCard, cardItems);
  paginationPrevOne.classList.toggle("pagination__active");
  paginationPrevEnd.classList.toggle("pagination__active");
  paginationPrevEnd.setAttribute("disabled", "true");
  paginationPrevOne.setAttribute("disabled", "true");
})
/*-------------------------Slider btn prev end---------------------------*/


/*-------------------------Slider btn next start---------------------------*/
paginationNextOne.addEventListener('click', () => {
  if (paginationItem.textContent != endCount) {
    catalogLists.textContent = '';
    if ( paginationItem.textContent == 1) {
      paginationPrevOne.classList.toggle("pagination__active");
      paginationPrevOne.removeAttribute("disabled");
      paginationPrevEnd.classList.toggle("pagination__active");
      paginationPrevEnd.removeAttribute("disabled");
    }
    paginationItem.textContent = +paginationItem.textContent + 1;
    cardItems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
    cardView(countCard, cardItems);
    if (paginationItem.textContent == endCount) {
      paginationNextOne.classList.toggle("pagination__active");
      paginationNextEnd.classList.toggle("pagination__active");
      paginationNextEnd.setAttribute("disabled", "true");
      paginationNextOne.setAttribute("disabled", "true");
    }
  }
});

paginationNextEnd.addEventListener('click', () => {
  catalogLists.textContent = '';
  paginationItem.textContent = endCount;
  cardItems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
  cardView(countCard, cardItems);
  paginationNextOne.classList.toggle("pagination__active");
  paginationNextEnd.classList.toggle("pagination__active");
  paginationNextEnd.setAttribute("disabled", "true");
  paginationNextOne.setAttribute("disabled", "true");

  if(!paginationPrevOne.classList.contains("pagination__active")) {
    paginationPrevOne.classList.add("pagination__active");
    paginationPrevEnd.classList.add("pagination__active");
    paginationPrevOne.removeAttribute("disabled");
    paginationPrevEnd.removeAttribute("disabled");
  }
})
/*-------------------------Slider btn next end---------------------------*/

export default cardView;
