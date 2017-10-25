var ideaName = $('#title-input');
var ideaDetails = $('#body-input');
var saveButton = $('#save-button');

window.onload = loadStoredIdeas();

ideaName.on('keyup', saveButtonEnabled);
ideaDetails.on('keyup', saveButtonEnabled);
saveButton.on('click', newIdea);

function saveButtonEnabled() {
  if (saveButton.disabled = true) {
  saveButton.removeAttr('disabled', false);
  }
}

function IdeaObject(title, body, quality, id) {
  this.title = title;
  this.body = body;
  this.quality = 'Swill';
  this.id = id;
}

function createCardObjects(title, body, quality, id) {
  var cardObject = $(`<article id='${id}' class="idea-card">
        <h2>${title}</h2>
        <button class="delete-idea-button"></button>
        <p class="idea-body">${body}</p>
        <button class="up-vote-button"></button>
        <button class="down-vote-button"></button>
        <h3>Quality: <span class="quality">${quality}</span></h3>
      </article>`);
  cardObject.prependTo('.idea-section');
}

function newIdea(title, body, quality, id) {
  event.preventDefault();
  var id = $.now();
  var newIdea = new IdeaObject(ideaName.val(), ideaDetails.val(), quality, id);
  storeIdea(ideaName.val(), ideaDetails.val(), quality, id);
  inputReset();
}

function storeIdea(name, detail, quality, id) {
  var idea = new IdeaObject(name, detail, quality, id);
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem(id, stringifiedIdea);
  ideaArchive(id);
}

function ideaArchive(id) {
  var retrievedIdea = localStorage.getItem(id);
  var parsedIdea = JSON.parse(retrievedIdea);
  createCardObjects(parsedIdea.title, parsedIdea.body, parsedIdea.quality, id);
}

function loadStoredIdeas() {
  var ideaArray = Object.keys(localStorage)
  for (var i = 0; i < ideaArray.length; i++) {
    var storedIdea = localStorage.getItem(ideaArray[i]);
    var reParseIdea = JSON.parse(storedIdea);
    createCardObjects(reParseIdea['title'], reParseIdea['body'], reParseIdea['quality'], reParseIdea['id']);
  }
}

function inputReset() {
  $(ideaName).val('');
  $(ideaDetails).val('');
  $(ideaName).focus();
  saveButton.disabled = true;
}

function removeFromStorage(id) {
  localStorage.removeItem(id);
}

$('.idea-section').on('click', function (e) {
  var id = $(e.target).parent().attr('id')
  if ($(e.target).hasClass('up-vote-button')) {
    if($(e.target).siblings('h3').text() === 'Quality: Swill'){
      $(e.target).siblings('h3').text('Quality: Plausible'); 
      savingQualityModifier(id, 'Plausible');
    }
    else if($(e.target).siblings('h3').text() === 'Quality: Plausible'){
      $(e.target).siblings('h3').text('Quality: Genius'); 
      savingQualityModifier(id, 'Genius');
    }
  }
  else if ($(e.target).hasClass('down-vote-button')) {
    if($(e.target).siblings('h3').text() === 'Quality: Genius'){
      $(e.target).siblings('h3').text('Quality: Plausible'); 
      savingQualityModifier(id, 'Plausible');
    }
    else if($(e.target).siblings('h3').text() === 'Quality: Plausible'){
      $(e.target).siblings('h3').text('Quality: Swill'); 
      savingQualityModifier(id, 'Swill');
    }
  } 
  else if ($(e.target).hasClass('delete-idea-button')) {
    $(e.target).parent().fadeOut(1000, function (){
    $(e.target).parent().remove();
    removeFromStorage(id);
    })
  }
})

function savingQualityModifier(id, quality) {
  var pullStoredIdea = localStorage.getItem(id);
  var parsePulledIdea = JSON.parse(pullStoredIdea);
  parsePulledIdea.quality = quality;
  var stringifiedChangedQuality = JSON.stringify(parsePulledIdea);
  localStorage.setItem(id, stringifiedChangedQuality);
}