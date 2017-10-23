var ideaName = document.querySelector('#title-input');
var ideaDetails = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');

ideaName.addEventListener('keyup', saveButtonEnabled);
ideaDetails.addEventListener('keyup', saveButtonEnabled);
saveButton.addEventListener('click', addIdea);

function saveButtonEnabled() {
  if (saveButton.disabled = true) {
  saveButton.removeAttribute('disabled', false);
  }
}

function addIdea() {
  var id = $.now();
  var ideaToStore = $(`<article id='${id}' class="idea-card">
        <h2>${ideaName.value}</h2>
        <button id="${id}" class="delete-idea-button"></button>
        <p class="idea-body">${ideaDetails.value}</p>
        <button id="${id}" class="up-vote-button"></button>
        <button id="${id}" class="down-vote-button"></button>
        <h3>quality: swill</h3>
      </article>`).appendTo('.idea-section');
  var stringifiedIdea = JSON.stringify(ideaToStore);
  localStorage.setItem('idea', stringifiedIdea);
  console.log('it gets here');
}
