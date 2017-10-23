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
        <button id='${id}' class="delete-idea-button"><img src="images/delete.svg" alt="delete button" height='80'></button>
        <p class="idea-body">${ideaDetails.value}</p>
        <button id='${id}' class="up-vote-button"><img src="images/upvote.svg" alt="up vote button" height='80'></button>
        <button id='${id}' class="down-vote-button"><img src="images/downvote.svg" alt="down vote button" height="80"></button>
        <h3>quality: swill</h3>
      </article>`).appendTo('.idea-section');
  var stringifiedIdea = JSON.stringify(ideaToStore);
  localStorage.setItem('idea', stringifiedIdea);
  console.log('it gets here');
}
