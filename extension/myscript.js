var SEARCH_DIV = 'searchDiv';
var SEARCH_RESPONSE_CLASS = 'review_search_response';


function showSearchButton() {
  var searchDiv = $("<div></div>").attr('id',SEARCH_DIV).appendTo('#fk-mainbody-id .fk-content');
  $.get(chrome.extension.getURL('/templates/search_div.html'), function(data) {
    $($.parseHTML(data)).appendTo('#'+SEARCH_DIV);
    searchDiv.find("#submit").on('click', searchSubmitHandler);
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
  console.log(productTitle.innerHTML);
  return productTitle.innerHTML;
}

function renderSearchResults(res, status, xhr, form) {
  $("#" + SEARCH_DIV + " ." + SEARCH_RESPONSE_CLASS).html( JSON.stringify(res) );
}

showSearchButton();
