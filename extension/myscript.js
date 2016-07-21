var productTitle = $('.product-details .title-wrap h1')[0];
console.log(productTitle.innerHTML);

function showSearchButton() {
  var searchDiv = $("<div></div>").attr('id','searchDiv').appendTo('#fk-mainbody-id .fk-content');
  // searchDiv.load("search_div.html");
  $.get(chrome.extension.getURL('/templates/search_div.html'), function(data) {
    $($.parseHTML(data)).appendTo('#searchDiv');
    // Or if you're using jQuery 1.8+:
    // $($.parseHTML(data)).appendTo('body');
  });
}

showSearchButton();
