var SEARCH_DIV = 'searchDiv';

function showSearchButton() {
  var searchDiv = $("<div></div>").attr('id',SEARCH_DIV).appendTo('#fk-mainbody-id .fk-content');
  $.get(chrome.extension.getURL('/templates/search_div.html'), function(data) {
    $($.parseHTML(data)).appendTo('#'+SEARCH_DIV);
    setupForm();

  });
}

showSearchButton();



function getProductTitle() {
  var productTitle = $('.product-details .title-wrap h1')[0];
  console.log(productTitle.innerHTML);
  return productTitle.innerHTML;
}

function setupForm() {
  $("#review_search").ajaxForm({url: 'http://localhost:3000/data', type: 'post', success: renderSearchResults})
}

function renderSearchResults(res, status, xhr, form) {
  console.log(res);
  $("#" + SEARCH_DIV).append(document.createTextNode( JSON.stringify(res) ));

}
