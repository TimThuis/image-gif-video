// Draggable.create(".box", {
//   type: "x,y",
//   bounds: ".main",
//   throwProps: true
// });


// variables
const doc = document.querySelector('#main');
const mainVideo = document.querySelector('.video-large video');
const mainImage = document.querySelector('.video-large img');
const circleTl = new ProgressBar.Circle('#container-svg', {
  color: '#86BC25',
  strokeWidth: 4,
});
let mainVideoClicked = false;


// event listeners
mainImage.addEventListener('click', startMainVideo)
mainVideo.addEventListener('ended', showVideos)

// functions
function startMainVideo() {
  mainVideoClicked = !mainVideoClicked;
  mainImage.style.opacity = 0;

  if (mainVideoClicked) {
    mainVideo.play()
    videoDuration = Math.round(((mainVideo.duration - mainVideo.currentTime) * 1000));
    circleTl.animate(1, {
      duration: videoDuration
    });

    TweenMax.to('#main-pause-icon', 0, {
      opacity: 0,
    })

    TweenMax.fromTo('#main-play-icon', 0.3, {
      scale: 1,
      opacity: 1,
    }, {
      scale: 1.2,
      opacity: 0,
    })

  } else {
    mainVideo.pause()
    circleTl.stop()

    TweenMax.fromTo('#main-pause-icon', 0.3, {
      scale: 1.2,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
    })
  }
}

function showVideos() {
  mainVideoClicked = !mainVideoClicked;
  TweenMax.to('#container-svg', 0.3, {
    scale: 0.97,
    opacity: 0.25,
    filter: 'grayscale(100%)'
  })
}

function scrollVideo(event, element) {
  if (event.buttons === 1 && mainVideo.paused) {
    let scrollPosition = event.offsetX / element.clientWidth;
    let videoPosition = Math.round(scrollPosition * mainVideo.duration);
    mainVideo.currentTime = videoPosition;
    circleTl.set(_.round(scrollPosition, 2))
  }
}

// function playSmallVideo(videoEl) {
//   const video = videoEl.querySelector('video');
//   if (video.paused) {
//     video.play();
//     TweenMax.to(videoEl, 1, {
//       width: '100vw',
//       height: '100vh',
//       borderRadius: '0%',
//       x: 0,
//       y: 0,
//     })
//   } else {
//     video.pause();
//     TweenMax.to(videoEl, 1, {
//       width: '128px',
//       height: '128px',
//       borderRadius: '50%',
//     })
//   }
// }
