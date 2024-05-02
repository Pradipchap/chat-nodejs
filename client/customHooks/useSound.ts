import { useEffect, useState } from "react";

export default function useSound(src: string) {
  const [isAudioPlaying, setisAudioPlaying] = useState(false);
  const audio = new Audio(src);

  useEffect(() => {
		
	}, []);

  function play() {
    setisAudioPlaying(true);
    // audio.play();
  }
  function pause() {
    setisAudioPlaying(false);
    // audio.pause();
  }
  return [play, pause];
}
