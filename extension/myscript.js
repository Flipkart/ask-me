var SEARCH_DIV = 'searchDiv';

function showSearchButton() {
  var searchDiv = $("<div></div>").attr('id',SEARCH_DIV).appendTo('#fk-mainbody-id .fk-content');
  $.get(chrome.extension.getURL('/templates/search_div.html'), function(data) {
    $($.parseHTML(data)).appendTo('#'+SEARCH_DIV);
    $("#submit").on('click', function(event){
            var data = {
                "query" : {
                   "match" : {"name" : $("#search_input").val()}
                   }
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
            })
            event.preventDefault();
        });
  });
}

showSearchButton();

function getProductTitle() {
  var productTitle = $('.product-details .title-wrap h1')[0];
  console.log(productTitle.innerHTML);
  return productTitle.innerHTML;
}

function renderSearchResults(res, status, xhr, form) {
  $("#" + SEARCH_DIV).append(document.createTextNode( JSON.stringify(res) ));

}
