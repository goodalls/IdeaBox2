
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

function IdeaObject(title, body, id) {
  this.title = title;
  this.body = body;
  this.quality = 'Swill';
  this.id = id;
}

function createCardObjects(obj) {
  var cardObject = $(`<article id='${obj.id}' class="idea-card">
        <div class="card-line-1"><h2 class="title" contenteditable="true">${obj.title}</h2>
        <button class="delete-idea-button"></button></div>
        <p class="idea-body" contenteditable="true">${obj.body}</p>
        <button class="up-vote-button"></button>
        <button class="down-vote-button"></button>
        <h3>Quality: <span class="quality">${obj.quality}</span></h3>
      </article>`);
  cardObject.prependTo('.idea-section');
}

function newIdea() {
  event.preventDefault();
  var id = $.now();
  var newIdea = new IdeaObject($('#title-input').val(), $('#body-input').val(), id);
  createCardObjects(newIdea);
  saveObject(newIdea)
  inputReset();
}

function loadStoredIdeas() {
  var ideaArray = Object.keys(localStorage)
  ideaArray.forEach(function (id) {
    var obj = getObject(id)
    createCardObjects(obj);
  })
}

function inputReset() {
  $($('#title-input')).val('');
  $($('#body-input')).val('');
  $($('#title-input')).focus();
  $('#save-button').prop('disabled', true);
}

$('.idea-section').on('click', function (e) {
  var qualityArray = ['Swill', 'Plausible', 'Genius']
  var id = $(e.target).closest('article').attr('id')
  var obj = getObject(id)
  var index = qualityArray.indexOf(obj.quality);
  
  if ($(e.target).hasClass('up-vote-button')) {
    if(index <= 1){
      index++
      obj.quality = qualityArray[index]
      $(e.target).siblings('h3').text('Quality ' + qualityArray[index]); 
      saveObject(obj);
    }
  }
 
  else if ($(e.target).hasClass('down-vote-button')) {
    if(index >= 1){
      index--
      obj.quality = qualityArray[index]
      $(e.target).siblings('h3').text('Quality ' + qualityArray[index]); 
      saveObject(obj);
    }
  }
     
  else if ($(e.target).hasClass('delete-idea-button')) {
    $(e.target).closest('article').fadeOut(1000, function (){
    $(e.target).closest('article').remove();
    localStorage.removeItem(id);
    })
  }
})

function getObject(id) {
  var pullStoredIdea = localStorage.getItem(id);
  var obj = JSON.parse(pullStoredIdea);
  return obj
}

function saveObject(obj){
  var stringifiedChangedObject = JSON.stringify(obj);
  localStorage.setItem(obj.id, stringifiedChangedObject);
}

$('.idea-section').on('keyup', function(e) {
  if ($(e.target).hasClass('title')) {
    var id = $(e.target).parent().parent().attr('id');
    var titleText = $(e.target).text();
    var obj = getObject(id)
    obj.title = titleText
    saveObject(obj);
  }
  else if ($(e.target).hasClass('idea-body')) {
    var id = $(e.target).parent().attr('id');
    var bodyText = $(e.target).text();
    var obj = getObject(id)
    obj.body = bodyText
    saveObject(obj);
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

