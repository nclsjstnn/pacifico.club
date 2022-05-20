function getArtwork(data) {
  if (data && data.results[0]) {
    return data.results[0].thumb;
  } else {
    return "https://i.imgur.com/lXVbeR2.png";
  }
};

function loadSongData() {
  $.getJSON("https://7c99f882722a1845eb104b83eeccbaf8.balena-devices.com/status-json.xsl",
    function(data) {
      if (!data.icestats) return $('.song-band').html("No hay datos de artista");
      var songTitle = data.icestats.source.title;
      $('.song-title').html(songTitle.split(' - ')[1]);
      $('.song-band').html(songTitle.split(' - ')[0]);
      $.getJSON(`https://api.discogs.com/database/search?q=${encodeURIComponent(songTitle)}&{?type,title,release_title,credit,artist}&key=ficfXrWkDgtojPpvYiwS&secret=jvVGkUCRaHlPQAiaSZorLmdSyHpMoFIR`,
        function(data) {
          $('#artwork').css("background-image", `url('${getArtwork(data)}')`);
        });
      })
      .fail(function() {
        $('#artwork').css("background-image", `url('${getArtwork()}')`);
        $('.song-title').html("Lo sentimos");
        $('.song-band').html("Perdimos conexión con la estación. Mientras tanto escucha nuestro <a target='_blank' href='https://open.spotify.com/playlist/0Eq6K7tirWTUfPEX1UHqmk?si=RCviQVjDQsSjpUt_mlD8oQ'>playlist en Spotify</a>");
      });
    setTimeout("loadSongData()", 5000);
}

loadSongData();
