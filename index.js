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
        <h3 class="quality">quality: swill</h3>
      </article>`).appendTo('.idea-section');
  var stringifiedIdea = JSON.stringify(ideaToStore);
  localStorage.setItem('idea', stringifiedIdea);
  console.log('it gets here');
}

$('.idea-section').on('click', function (e) {
  if ($(e.target).hasClass('up-vote-button')) {
    console.log('qualityUp clicked')
  } else if ($(e.target).hasClass('down-vote-button')) {
    console.log('quality Down Clicked')
  } else if ($(e.target).hasClass('delete-idea-button')) {
    console.log('delete-idea-button Clicked')
    $(e.target).parent().fadeOut(1000, function (){
    $(e.target).parent().remove();
  });
  }
});

// function cardHandler (e){
//   var elParent = $(e.target).parent();
//   if($(e.target).hasClass('delete-button')){
//     $(e.target).parent().fadeOut(2000, function (){
//       $(e.target).parent().remove();
//     });
//     setTimeout( function (){
//       totalCard();
//       totalCardRead();
//       totalCardUnread();
//     },2010)
//   } else if ($(e.target).hasClass('read-button')){
//     if (elParent.hasClass('read')) {
//       elParent.removeClass('read');
//     } else {
//       elParent.addClass('read');
//     }
//     totalCardRead();
//     totalCardUnread();
//   }
// }