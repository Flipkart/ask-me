var SEARCH_DIV = 'searchDiv';
var SEARCH_RESPONSE_CLASS = 'review_search_response';
var SEARCH_RESPONSE_WRAPPER= 'search_response_wrapper';
var SCROLL_BUTTON = 'scroll_button';

function showSearchButton() {
  var searchDiv = $("<div></div>").attr('id',SEARCH_DIV).appendTo('#fk-mainbody-id .fk-content');
  $.get(chrome.extension.getURL('/templates/search_div.html'), function(data) {
    $($.parseHTML(data)).appendTo('#'+SEARCH_DIV);
    searchDiv.find("#submit").on('click', searchSubmitHandler);
    attachHideButton();
    searchDiv.hover(
      function () {
        searchDiv.css("opacity",1);
      },
      function () {
        if($("#" + SEARCH_DIV + " ." + SEARCH_RESPONSE_WRAPPER).css('display') == 'none'){
          searchDiv.css("opacity",0.5)
        }
      }
    );

  });
}


function searchSubmitHandler(event){
  var data = {
    "product_name" : getProductTitle(),
    "query" : $("#"+ SEARCH_DIV + " #search_input").val()
  };
  $.ajax({
    url: 'http://172.20.165.104:3000/data',
    type : "POST",
    dataType : 'json',
    data : JSON.stringify(data),
    success : renderSearchResults,
    error: function(xhr, resp, text) {
      console.log(xhr, resp, text);
    }
  });
  event.preventDefault();
}

function getProductTitle() {
  var productTitle = $('.product-details .title-wrap h1')[0];
  return productTitle.innerHTML;
}

function renderSearchResults(res, status, xhr, form) {
  animateResultValue(res);
}


function attachHideButton() {
  $("#" + SEARCH_DIV + " ." + SCROLL_BUTTON).click(function() {
    slideUpResult();
  });
}

function slideUpResult(){
  $("#" + SEARCH_DIV + " ." + SEARCH_RESPONSE_WRAPPER).slideUp( "fast", function() {
    $("#" + SEARCH_DIV).css("opacity",0.5);
  });
}

function animateResultValue(res){
  $("#" + SEARCH_DIV + " ." + SEARCH_RESPONSE_WRAPPER).fadeOut(200, function() {
    $(this).find("." + SEARCH_RESPONSE_CLASS).text(res.answer);
    if(res.highlight) {
      $(this).find("." + SEARCH_RESPONSE_CLASS).removeHighlight().highlight(res.highlight);
    }
    $(this).fadeIn(300);
  });

}

function loadFonts(){
  var fa = document.createElement('style');
  fa.type = 'text/css';
  fa.textContent = '@font-face { font-family: FontAwesome; src: url("'
    + chrome.extension.getURL('fonts/fontawesome-webfont.woff?v=4.0.3')
    + '"); }';
  document.head.appendChild(fa);
}

loadFonts();
showSearchButton();
