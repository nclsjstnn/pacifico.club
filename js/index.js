function loadChirp(){
    var uuid = "022b126876d7082bdf5f4b1569f2a54c";
    $.getJSON("http://cors-proxy.htmldriven.com/?url=http://" + uuid + ".resindevice.io:8000/status-json.xsl", 
        function(data) {
            var radioInfo = JSON.parse(data.body)
            var songTitle = radioInfo.icestats.source.title;
            $('.song-title').html(songTitle.split(' - ')[1]);
            $('.song-band').html(songTitle.split(' - ')[0]);
            // $.getJSON(`https://itunes-artwork.glitch.me/find/search?term=${encodeURIComponent(songTitle)}&country=us`,
            $.getJSON(`https://api.discogs.com/database/search?q=${encodeURIComponent(songTitle)}&{?type,title,release_title,credit,artist}&key=ficfXrWkDgtojPpvYiwS&secret=jvVGkUCRaHlPQAiaSZorLmdSyHpMoFIR`, 
                function(data) {
                    var artwork;
                    if (data.results[0]) {
                        artwork = data.results[0].thumb;
                    } else {
                        artwork = "https://www.deliciousseeds.com/media/catalog/product/cache/6/image/600x600/9df78eab33525d08d6e5fb8d27136e95/m/e/mexican-sativa-photo_3.jpg";
                    }
                    $('#artwork').css("background-image", `url('${artwork}')`);  
                                      
            });           
        }); 
    setTimeout("loadChirp()",5000);
}

loadChirp();
