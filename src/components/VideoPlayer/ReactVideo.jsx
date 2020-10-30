/* eslint-disable no-console */
/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";
import videojs from "video.js";
import "./vjsSubSwitchButton";
import "./ReactVideo.sass";

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.seekTo = this.seekTo.bind(this);
    this.videoJsOptions = {
      controls: true,
      preload: "auto",
      responsive: true,
      playbackRates: [0.5, 1, 1.5, 2],
      textTrackDisplay: true,
      posterImage: true,
      textTrackSettings: true,
      language: "zh",
      languages: {
        zh: {
          "subtitles off": "字幕关",
        },
      },
      html5: {
        nativeTextTracks: false,
      },
      controlBar: {
        muteToggle: false,
        subsCapsButton: false,
        subtitlesButton: false,
        currentTimeDisplay: true,
        timeDivider: true,
        remainingTimeDisplay: false,
        durationDisplay: true,
        fullscreenToggle: true,
        pictureInPictureToggle: true,
        volumePanel: {
          inline: false,
        },
        playToggle: {
          replay: true,
        },
        progressControl: {
          keepTooltipsInside: false,
        },
        vjsSubSwitchButton: true,
      },
      userActions: {
        hotkeys(event) {
          event.preventDefault();
          // rewind
          if (event.which === 37) {
            this.currentTime(this.currentTime() - 5);
          }
          // forword
          if (event.which === 39) {
            this.currentTime(this.currentTime() + 5);
          }
        },
      },
    };
  }

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(
      this.videoNode,
      { ...this.props, ...this.videoJsOptions },
      function onPlayerReady() {
        document.addEventListener("keydown", (e) => {
          if (e.code === "Space") {
            e.preventDefault();
            if (this.paused()) {
              this.play();
            } else {
              this.pause();
            }
          }
        });

        const settings = this.textTrackSettings;
        settings.setValues({
          backgroundColor: "#000",
          backgroundOpacity: "0",
          edgeStyle: "dropshadow",
          color: "#fff",
        });
        settings.updateDisplay();

        console.log("onPlayerReady", this);
      },
    );

    const { vjsSubSwitchButton } = this.player.controlBar;
    vjsSubSwitchButton.addClass("vjs-control");
    vjsSubSwitchButton.addClass("vjs-sub-switch");
  }

  componentDidUpdate(prevProps) {
    // When a user moves from one title to the next, the VideoPlayer component will not be unmounted,
    // instead its properties will be updated with the details of the new video. In this case,
    // we can update the src of the existing player with the new video URL.
    const { sources, tracks } = this.props;
    if (sources[0].src !== prevProps.sources[0].src) {
      if (this.player) {
        this.player.src({
          src: sources[0].src,
        });
        const oldtrack = this.player.remoteTextTracks()[0];
        this.player.removeRemoteTextTrack(oldtrack);
        this.player.addRemoteTextTrack({ ...tracks[0] }, true);
      }
    }
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  seekTo(seconds) {
    return this.player.currentTime(seconds);
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player id="kengine-react-video-player">
        <video
          ref={(node) => {
            this.videoNode = node;
          }}
          className="video-js"
          id="kengine-react-video"
          playsInline=""
          webkit-playsinline=""
          x5-playsinline=""
        />
      </div>
    );
  }
}
