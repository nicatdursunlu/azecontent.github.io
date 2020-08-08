(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
            var item = store[results[i].ref];
   
	        	var item_url = item.url ;
		        var item_video_link = item.video_link;
		        var item_title = item.title;
		        //console.log(item_url);
		        console.log(item);
            if(item_video_link){
              appendString += '<div class="col-lg-4 col-sm-6 mb-4"><article class="card shadow h-100 card-lift"> <a href="' +  item.url   +  '"><img class="rounded card-img-top" src="https://img.youtube.com/vi/' + item.video_link + '/mqdefault.jpg" style="height: 10rem;">  </a> <div class="card-body" > <a href=" ' + item.url   + '"> <h4 class="card-title font-weight-bold line-clamp module">' +  item.title  + '</h4> </a>  </div> </article></div>'
              console.log(appendString);
            }else{
              //console.log(appendString);
              //console.log("here");
              appendString += '<div class="col-lg-4 col-sm-6 mb-4"><article class="card shadow h-100 card-lift "> <a href="' +  item.url   +  '"><img class="rounded card-img-top" src="' + item.background + '" style="height: 10rem;">  </a> <div class="card-body" > <a href=" ' + item.url   + '"> <h4 class="card-title font-weight-bold line-clamp module">' +  item.title  + '</h4> </a>  </div> </article></div>'
            }	
      
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('content');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'author': window.store[key].author,
        'category': window.store[key].category,
        'content': window.store[key].content
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store); // We'll write this in the next section
    }
  }
})();
