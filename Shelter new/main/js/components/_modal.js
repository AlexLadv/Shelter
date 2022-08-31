import data from '../../../assets/pets.js';

const petsList = document.querySelector('.our-friends__list');
console.log(petsList);
const body = document.querySelector('body');

petsList.addEventListener('click', popupView);

function popupView(e) {
  if (e.target.parentElement.classList == 'our-friends__item' || e.target.classList == 'our-friends__item') {
    e.preventDefault();
    let card = '';
    if (e.target.parentElement.classList == 'our-friends__item') {
      card = e.target.parentElement;
    } else card = e.target;
    const index = card.dataset.index;
    const modal = `
      <div class="modal">
      <div class="modal__blog">
        <button class="modal__btn-close"></button>
        <div class="modal__img"><img src=${data[index].img} alt=${data[index].name}></div>
        <div class="modal__info">
          <h2 class="modal__info-title">${data[index].name}</h2>
          <p class="modal__info-rase">${data[index].type} - ${data[index].breed}</p>
          <p class="modal__info-description">${data[index].description}</p>
          <ul class="modal__info-skill">
            <li><span class="modal__info-skill-dots">•</span><b class="test">Age:</b> ${data[index].age}</li>
            <li><span class="modal__info-skill-dots">•</span><b>Inoculations:</b> ${data[index].inoculations.join(', ')}</li>
            <li><span class="modal__info-skill-dots">•</span><b>Diseases:</b> ${data[index].diseases.join(', ')}</li>
            <li><span class="modal__info-skill-dots">•</span><b>Parasites:</b> ${data[index].parasites.join(', ')}</li>
          </ul>
        </div>
      </div>
    </div>
    `;
    petsList.insertAdjacentHTML('afterbegin', modal);
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
