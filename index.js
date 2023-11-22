const apiUrl = 'https://5dd1894f15bbc2001448d28e.mockapi.io/playlist';

function fetchSongs() {
  $.ajax({
    url: apiUrl,
    method: 'GET',
    success: function(data) {
      // Call a function to handle the data
      handleSongs(data);
    },
    error: function(error) {
      console.log('Error fetching songs:', error);
    }
  });
}

function handleSongs(data) {
  const playlist = $('#playList');
  const audioPlayer = $('#audioPlayer');
  const albumArt = $('#album-art');
  const songTitle = $('#song-title');
  const artist = $('#artist');
  

  // Loop through the data and append songs to the playlist
  for (let i = 0; i < data.length; i++) {
    const song = data[i];

    // Create a new <li> element for each song
    const listItem = $('<li>').text(song.track);

    // Attach click event to play the selected song
    listItem.click(function() {
      audioPlayer.attr('src', song.file);
      albumArt.css('background-image', `url(${song.albumCover})`);
      songTitle.text(song.track);
      artist.text(song.artist);

      // Play the audio when a user clicks on a song
      audioPlayer[0].play();
    });

    // Append the listItem to the playlist
    playlist.append(listItem);
  }
}

// Call the fetchSongs function to initiate the API request
fetchSongs();

$(document).ready(function() {
  // Your existing JavaScript code for button click events and progress update

  // Adjusted button click events
  $('#playBtn').click(function() {
    $('#audioPlayer')[0].play();
  });

  $('#pausebutton').click(function() {
    $('#audioPlayer')[0].pause();
  });

  $('#restartbtn').click(function() {
    $('#audioPlayer')[0].currentTime = 0;
  });

  $('#forwrad').click(function() {
    $('#audioPlayer')[0].currentTime += 10;
  });

  $('#backward').click(function() {
    $('#audioPlayer')[0].currentTime -= 10;
  });

  const audioPlayer = $('#audioPlayer');
    const progressBar = $('#progress-bar');

    audioPlayer.on('timeupdate', function () {
        const currentTime = audioPlayer[0].currentTime;
        const duration = audioPlayer[0].duration;

        const progressPercentage = (currentTime / duration) * 100;
        progressBar.css('width', progressPercentage + '%');

        // Adjust the color based on progress
        if (progressPercentage < 30) {
            progressBar.css('background-color', 'red');
        } else if (progressPercentage < 70) {
            progressBar.css('background-color', 'yellow');
        } else {
            progressBar.css('background-color', 'green');
        }
    });

  // ... Add other button click events as needed
});

