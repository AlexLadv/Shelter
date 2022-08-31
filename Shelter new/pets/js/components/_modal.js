import pets from '../../../assets/pets.js';

const catalogLists = document.querySelector('.our-friends__list');
const body = document.querySelector('body');

catalogLists.addEventListener('click', popupView);

function popupView(e) {
    if (e.target.parentElement.classList == 'pets__item' || e.target.classList == 'pets__item') {
      e.preventDefault();
      let card = '';
      if (e.target.parentElement.classList == 'pets__item') {
        card = e.target.parentElement;
      } else card = e.target;
    const index = dataArr.findIndex(item => item.name == card.dataset.index);

    const modal = `
      <div class="modal">
      <div class="modal__blog">
        <button class="modal__btn-close">X</button>
        <div class="modal__img"><img src=${dataArr[index].img} alt=${dataArr[index].name}></div>
        <div class="modal__info">
          <h2 class="modal__info-title">${dataArr[index].name}</h2>
          <p class="modal__info-rase">${dataArr[index].type} - ${dataArr[index].breed}</p>
          <p class="modal__info-description">${dataArr[index].description}</p>
          <ul class="modal__info-skill">
            <li><span class="modal__info-skill-dots">•</span><b>Age:</b> ${dataArr[index].age}</li>
            <li><span class="modal__info-skill-dots">•</span><b>Inoculations:</b> ${dataArr[index].inoculations.join(', ')}</li>
            <li><span class="modal__info-skill-dots">•</span><b>Diseases:</b> ${dataArr[index].diseases.join(', ')}</li>
            <li><span class="modal__info-skill-dots">•</span><b>Parasites:</b> ${dataArr[index].parasites.join(', ')}</li>
          </ul>
        </div>
      </div>
    </div>
    `;
    catalogLists.insertAdjacentHTML('afterbegin', modal);
    body.style.overflow = 'hidden';
    document.addEventListener('click', (e) => {
      if (e.target.classList == 'modal__btn-close' || e.target.classList == 'modal') {
        let modal = document.querySelector('.modal');
        modal.remove();
        body.style.overflow = 'auto';
      }
    });
  }
}

export default popupView;
