import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import {
  PlayIcon,
  PauseIcon,
  SpeakerSimpleHighIcon,
  SpeakerSimpleXIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@phosphor-icons/react";

const HeroSection = () => {
  // const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [hideControlsTimeout, setHideControlsTimeout] = useState(null);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  const videoElementRef = useRef(null);

  // Video url
  const videoUrl = "https://youtu.be/CHSnz0bCaUk?si=N5zuFzijbGMQ6qHl";
  // const videoUrl = "/videos/Monarch_ Legacy_of_Monsters_Season_2.mp4";
  // const videoUrl = "/videos/Nothing_Beats_a_Jet2holiday.webm";

  // const handlePlayPause = () => {
  //   setPlaying(!playing);
  // };

  const handleMuteToggle = () => {
    setMuted(!muted);
  };

  const handleLogoToggle = () => {
    setShowLogo(!showLogo);
  };

  // const handleProgress = (state) => {
  //   console.log("handling onProgress");
  //   console.log(state);
  //   console.log("value", state.target.value);
  //   console.log("timestamp", state.timeStamp);
  //   console.log("currentTime", state.target.currentTime);
  //   console.log("duration", state.target.duration);
  //   const currentTime = state.target.currentTime;
  //   const duration = state.target.duration;
  //   const playedFraction = currentTime / duration;
  //   setPlayed(playedFraction);
  // };

  const handleSeek = (e) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    playerRef.current.seekTo(e.target.value); // Seek to the new position
  };

  const handleMouseMove = () => {
    setShowControls(true);

    // Clear existing timeout
    // if (hideControlsTimeout) {
    //   clearTimeout(hideControlsTimeout);
    // }

    // Set new timeout to hide controls after 3 seconds of inactivity
    // const timeout = setTimeout(() => {
    //   setShowControls(false);
    // }, 3000);
    // setHideControlsTimeout(timeout);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
    // if (hideControlsTimeout) {
    //   clearTimeout(hideControlsTimeout);
    // }
  };

  // useEffect(() => {
  //   return () => {
  //     if (hideControlsTimeout) {
  //       clearTimeout(hideControlsTimeout);
  //     }
  //   };
  // }, [hideControlsTimeout]);

  return (
    <section id="hero" className="relative h-[calc(50vh-32px)] w-full overflow-hidden bg-black md:h-[calc(75vh-80px)]">
      {/* Video Player */}
      <ReactPlayer
        ref={playerRef}
        src={videoUrl}
        playing={true}
        muted={muted}
        loop={true}
        controls={true}
        // onProgress={handleProgress}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        // config={{
        //   file: {
        //     controlsList: "nodownload",
        //     disablePictureInPicture: true,
        //   },
        // }}
      />

      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/30" /> */}

      {/* Logo Overlay */}
      {showLogo && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/25 dark:bg-black/25">
          <picture>
            <source srcset={`${import.meta.env.BASE_URL}logo_black.avif`} type="image/avif" />
            <source srcset={`${import.meta.env.BASE_URL}logo_black.webp`} type="image/webp" />
            <img
              src={`${import.meta.env.BASE_URL}logo_black.png`}
              alt="Brand Logo"
              className="h-auto w-full"
            />
          </picture>
        </div>
      )}

      {/* Top Right: Show/Hide Logo Button */}
      <div
        className={`absolute top-1/4 right-4 z-20 -translate-y-1/2 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-30"
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={handleLogoToggle}
          className="dark:hover:bg-black-800 dark:active:bg-black-800 cursor-pointer rounded-full bg-black/50 p-3 backdrop-blur-sm transition-all hover:bg-black/70 active:bg-black/70"
          aria-label={showLogo ? "Hide Logo" : "Show Logo"}
          title={showLogo ? "Hide Logo" : "Show Logo"}
        >
          {showLogo ? (
            <EyeSlashIcon size={24} className="text-white" weight="bold" />
          ) : (
            <EyeIcon size={24} className="text-white" weight="bold" />
          )}
        </button>
      </div>

      {/* Bottom Controls. */}
      {/* <div
        className={`absolute right-0 bottom-0 left-0 z-20 hidden transition-all duration-300 ${
          showControls
            ? "-translate-y-6 opacity-100"
            : "-translate-y-4 opacity-30"
        }`}
      > */}
      {/* Progress Bar */}
      {/* <div className="px-4 pb-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={played}
            onChange={handleSeek}
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/30 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            style={{
              background: `linear-gradient(to right, white ${played * 100}%, rgba(255, 4, 4, 1) ${played * 100}%)`,
            }}
          />
        </div> */}

      {/* Control Buttons */}
      {/* <div className="flex items-center justify-center gap-4 px-4"> */}
      {/* Play/Pause */}
      {/* <button
            onClick={handlePlayPause}
            className="dark:hover:bg-black-800 dark:active:bg-black-800 cursor-pointer rounded-full bg-black/50 p-3 backdrop-blur-sm transition-all hover:bg-black/70 active:bg-black/70"
            aria-label={playing ? "Pause" : "Play"}
            title={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <PauseIcon size={24} className="text-white" weight="bold" />
            ) : (
              <PlayIcon size={24} className="text-white" weight="bold" />
            )}
          </button> */}

      {/* Mute/Unmute */}
      {/* <button
            onClick={handleMuteToggle}
            className="dark:hover:bg-black-800 dark:active:bg-black-800 cursor-pointer rounded-full bg-black/50 p-3 backdrop-blur-sm transition-all hover:bg-black/70 active:bg-black/70"
            aria-label={muted ? "Unmute" : "Mute"}
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <SpeakerSimpleXIcon
                size={24}
                className="text-white"
                weight="bold"
              />
            ) : (
              <SpeakerSimpleHighIcon
                size={24}
                className="text-white"
                weight="bold"
              />
            )}
          </button>
        </div>
      </div> */}
    </section>
  );
};

export default HeroSection;
