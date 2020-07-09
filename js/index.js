function loadChirp() {
  $.getJSON("https://yacdn.org/serve/https://e4cef76face8dc93e2dccd784e431322.balena-devices.com/status-json.xsl",
    function (data) {
      if (!data.icestats) return null;
      var songTitle = data.icestats.source.title;
      $('.song-title').html(songTitle.split(' - ')[1]);
      $('.song-band').html(songTitle.split(' - ')[0]);
      $.getJSON(`https://api.discogs.com/database/search?q=${encodeURIComponent(songTitle)}&{?type,title,release_title,credit,artist}&key=ficfXrWkDgtojPpvYiwS&secret=jvVGkUCRaHlPQAiaSZorLmdSyHpMoFIR`,
        function (data) {
          var artwork;
          if (data.results[0]) {
            artwork = data.results[0].thumb;
          } else {
            artwork = "https://i.imgur.com/lXVbeR2.png";
          }
          $('#artwork').css("background-image", `url('${artwork}')`);

        });
    });
  setTimeout("loadChirp()", 5000);
}

loadChirp();
