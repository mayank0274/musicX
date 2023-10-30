import { Box } from "@chakra-ui/react";
import { Track } from "../../types/Track";
import { FC, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { handlePlayPause } from "../../redux/slices/playerSlice";

interface AudioPlayerProps {
  activeSong: Track;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  setPassedDuration: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  seekTime: number;
  nextSong: () => void;
  volume: number;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({
  activeSong,
  setDuration,
  setPassedDuration,
  isPlaying,
  seekTime,
  nextSong,
  volume,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatch = useDispatch();

  if (audioRef.current) {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }

  useEffect(() => {
    audioRef.current!.currentTime = seekTime;
  }, [seekTime]);

  useEffect(() => {
    audioRef.current!.volume = volume;
  }, [volume]);

  return (
    <Box display="none">
      <audio
        ref={audioRef}
        src={activeSong?.hub?.actions[1]?.uri}
        onLoadedData={(
          e: React.SyntheticEvent<HTMLAudioElement, Event> & {
            target: HTMLAudioElement;
          }
        ) => {
          const { target } = e;
          setDuration(target.duration);
          target.play();
          dispatch(handlePlayPause({ status: true }));
        }}
        onTimeUpdate={(
          e: React.SyntheticEvent<HTMLAudioElement, Event> & {
            target: HTMLAudioElement;
          }
        ) => {
          const { target } = e;
          setPassedDuration(target.currentTime);
        }}
        onEnded={() => {
          nextSong();
        }}
      />
    </Box>
  );
};
