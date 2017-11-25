
// Event Listeners
window.onload = loadStoredIdeas();
$('#title-input').on('keyup', saveButtonEnabled);
$('#body-input').on('keyup', saveButtonEnabled);
$('#save-button').on('click', newIdea);
$('.idea-section').on('click', cardHandler)
$('.idea-section').on('keyup', editCard)
$('#search-input').on('keyup', search)

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


function cardHandler(e) {
 var id = $(e.target).closest('article').attr('id')
 var obj = getObject(id)
 if ($(e.target).hasClass('up-vote-button')){
 upVoteButton(e, obj);
}else if ($(e.target).hasClass('down-vote-button')){
 downVoteButton(e, obj);
}else if ($(e.target).hasClass('delete-idea-button')){
 deleteIdeaButton(e, obj);
}
}

function upVoteButton(e, obj) {
  var qualityArray = ['Swill', 'Plausible', 'Genius']
  var index = qualityArray.indexOf(obj.quality);
  if(index <= 1){
    index++
    obj.quality = qualityArray[index]
    $(e.target).siblings('h3').text('Quality ' + qualityArray[index]); 
    saveObject(obj);
  }
}

function downVoteButton(e, obj) {
  var qualityArray = ['Swill', 'Plausible', 'Genius']
  var index = qualityArray.indexOf(obj.quality);
  if(index >= 1){
    index--
    obj.quality = qualityArray[index]
    $(e.target).siblings('h3').text('Quality ' + qualityArray[index]); 
    saveObject(obj);
  }
}

function deleteIdeaButton(e, obj) {
  $(e.target).closest('article').fadeOut(1000, function (){
    $(e.target).closest('article').remove();
    localStorage.removeItem(obj.id);
    })
}

function getObject(id) {
  var pullStoredIdea = localStorage.getItem(id);
  var obj = JSON.parse(pullStoredIdea);
  return obj
}

function saveObject(obj){
  var stringifiedChangedObject = JSON.stringify(obj);
  localStorage.setItem(obj.id, stringifiedChangedObject);
}

function editCard (e) {
  var id = $(e.target).closest('article').attr('id')
  var obj = getObject(id)
  if ($(e.target).hasClass('title')) {
    var titleText = $(e.target).text();
    obj.title = titleText
    saveObject(obj);
  }
  else if ($(e.target).hasClass('idea-body')) {
    var bodyText = $(e.target).text();
    obj.body = bodyText
    saveObject(obj);
  }
}

// function search (e) {
//   var searchText = $('#search-input').val().toUpperCase();
//   var searchArray = Object.values(localStorage)
//   searchArray.forEach(function (v, i){
//     if (v.includes(searchText)) {
//       $().closest('article').show()
//     } else {
//       $(e.target).closest('article').hide()
//     }
//   });
// }



function search (e){
  var allTitles = $('.title');
  var allBodies = $('.idea-body');
  var allIdeas = $('article');
  // var allQualities = $('.quality')
  var searchText = $('#search-input').val().toUpperCase();
  for(var i = 0; i < allIdeas.length; i++) {
    if($(allTitles[i]).text().toUpperCase().includes(searchText) || $(allBodies[i]).text().toUpperCase().includes(searchText)) {
      $(allIdeas[i]).show();
    // }else if ($(allQualities[i]).text().toUpperCase().includes(searchText)){
    //   $(allIdeas[i]).show();
    }else{
      $(allIdeas[i]).hide();
    }
  }
}

