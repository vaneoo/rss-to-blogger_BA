function getFeed(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(url), true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      callback(response);
    } else {
      console.log('Erreur de récupération du flux RSS: ', xhr.statusText);
    }
  };
  xhr.onerror = function() {
    console.log('Erreur de récupération du flux RSS');
  };
  xhr.send();
}

function publishPosts(posts) {
  var numPosts = posts.length;
  for (var i = 0; i &lt; numPosts; i++) {
    var request = gapi.client.blogger.posts.insert({
      blogId: '6049813233836300192',
      isDraft: true,
      kind: 'blogger#post',
      title: posts[i].title,
      content: posts[i].description
    });
    request.execute(function(response) {
      console.log('Article publié avec succès : ', response);
    });
  }
}

function fetchPosts() {
  gapi.client.setApiKey('AIzaSyCnbPS_ITSJVc3IDpeFY1kUr2kmwDNcEko');
  getFeed('https://politepol.com/fd/dlEZNZrhanSs', function(response) {
    var posts = response.items;
    publishPosts(posts);
  });
}
