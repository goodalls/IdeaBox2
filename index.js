// var $('#title-input') = $('#title-input');
// var $('#body-input') = $('#body-input');
// var $('#save-button') = $('#save-button');

// Event Listeners
window.onload = loadStoredIdeas();
$('#title-input').on('keyup', saveButtonEnabled);
$('#body-input').on('keyup', saveButtonEnabled);
$('#save-button').on('click', newIdea);

function saveButtonEnabled() {
  if ($('#title-input').val() === '' || $('#body-input').val() === ''){
    $('#save-button').prop('disabled', true) 
  }else{
    $('#save-button').prop('disabled', false) 
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
        <div class="card-line-1"><h2 class="title" contenteditable="true">${title}</h2>
        <button class="delete-idea-button"></button></div>
        <p class="idea-body" contenteditable="true">${body}</p>
        <button class="up-vote-button"></button>
        <button class="down-vote-button"></button>
        <h3>Quality: <span class="quality">${quality}</span></h3>
      </article>`);
  cardObject.prependTo('.idea-section');
}

function newIdea(title, body, quality, id) {
  event.preventDefault();
  var id = $.now();
  var newIdea = new IdeaObject($('#title-input').val(), $('#body-input').val(), quality, id);
  createCardObjects($('#title-input').val(), $('#body-input').val(), newIdea.quality, newIdea.id);
  storeIdea($('#title-input').val(), $('#body-input').val(), quality, id);
  inputReset();
}

function storeIdea(name, detail, quality, id) {
  var idea = new IdeaObject(name, detail, quality, id);
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem(id, stringifiedIdea);
}

function loadStoredIdeas() {
  var ideaArray = Object.keys(localStorage)
  ideaArray.forEach(function (v) {
    var storedIdea = localStorage.getItem(v);
    var reParseIdea = JSON.parse(storedIdea);
    createCardObjects(reParseIdea.title, reParseIdea.body, reParseIdea.quality, reParseIdea.id);
  })
}

function inputReset() {
  $($('#title-input')).val('');
  $($('#body-input')).val('');
  $($('#title-input')).focus();
  $('#save-button').prop('disabled', true);
}

function removeFromStorage(id) {
  localStorage.removeItem(id);
}

$('.idea-section').on('click', function (e) {
  var id = $(e.target).closest('article').attr('id')
  if ($(e.target).hasClass('up-vote-button')) {
    if($(e.target).siblings('h3').text() === 'Quality: Swill'){
      $(e.target).siblings('h3').text('Quality: Plausible'); 
      saveObjectUpdateQuality(id, 'Plausible');
    }
    else if($(e.target).siblings('h3').text() === 'Quality: Plausible'){
      $(e.target).siblings('h3').text('Quality: Genius'); 
      saveObjectUpdateQuality(id, 'Genius');
    }
  }
  else if ($(e.target).hasClass('down-vote-button')) {
    if($(e.target).siblings('h3').text() === 'Quality: Genius'){
      $(e.target).siblings('h3').text('Quality: Plausible'); 
      saveObjectUpdateQuality(id, 'Plausible');
    }
    else if($(e.target).siblings('h3').text() === 'Quality: Plausible'){
      $(e.target).siblings('h3').text('Quality: Swill'); 
      saveObjectUpdateQuality(id, 'Swill');
    }
  } 
  else if ($(e.target).hasClass('delete-idea-button')) {
    $(e.target).closest('article').fadeOut(1000, function (){
    $(e.target).closest('article').remove();
    removeFromStorage(id);
    })
  }
})

$('.idea-section').on('focusout', function(e) {
  if ($(e.target).hasClass('title')) {
    var id = $(e.target).parent().parent().attr('id');
    var titleText = $(e.target);
    titleText = titleText.text();
    saveObjectUpdateTitle(id, titleText);
  }
  else if ($(e.target).hasClass('idea-body')) {
    var id = $(e.target).parent().attr('id');
    var bodyText = $(e.target);
    bodyText = bodyText.text();
    saveObjectUpdateBody(id, bodyText);
  }
})

$('#search-input').on('keyup', function(e) {
  var searchText = $(e.target).val();
  var allTitles = $('.title');
  var allBodies = $('.idea-body');
  var allIdeas = $('article');
  for(var i = 0; i < allIdeas.length; i++) {
    if($(allTitles[i]).text().includes(searchText) || $(allBodies[i]).text().includes(searchText)) {
      $(allIdeas[i]).show();
    }
    else {
      $(allIdeas[i]).hide();
    }
  }
})

// function saveObjectUpdate(id, quality, title, body){
//   var pullStoredIdea = localStorage.getItem(id);
//   var parsePulledIdea = JSON.parse(pullStoredIdea);
//   if (quality !== undefined){
//   parsePulledIdea.quality = quality
// }else if (title !== undefined){
//   parsePulledIdea.title = title
// } else if (body !== undefined){
//   parsePulledIdea.body = body
// }
//   var stringifiedChangedObject = JSON.stringify(parsePulledIdea);
//   localStorage.setItem(id, stringifiedChangedObject);
// }

function saveObjectUpdateQuality(id, quality) {
  var pullStoredIdea = localStorage.getItem(id);
  var parsePulledIdea = JSON.parse(pullStoredIdea);
  parsePulledIdea.quality = quality;
  var stringifiedChangedQuality = JSON.stringify(parsePulledIdea);
  localStorage.setItem(id, stringifiedChangedQuality);
}

function saveObjectUpdateTitle(id, titleText) {
  var pullStoredIdea = localStorage.getItem(id);
  var parsePulledIdea = JSON.parse(pullStoredIdea);
  parsePulledIdea.title = titleText;
  var stringifiedChangedQuality = JSON.stringify(parsePulledIdea);
  localStorage.setItem(id, stringifiedChangedQuality);  
}

function saveObjectUpdateBody(id, bodyText) {
  var pullStoredIdea = localStorage.getItem(id);
  var parsePulledIdea = JSON.parse(pullStoredIdea);
  parsePulledIdea.body = bodyText;
  var stringifiedChangedQuality = JSON.stringify(parsePulledIdea);
  localStorage.setItem(id, stringifiedChangedQuality);  
}
