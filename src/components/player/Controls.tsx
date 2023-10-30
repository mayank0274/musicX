import { Box } from "@chakra-ui/react";
import { FC } from "react";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

interface ControlsProps {
  playPause: () => void;
  nextSong: () => void;
  prevSong: () => void;
  isPlaying: boolean;
  setSeekTime: React.Dispatch<React.SetStateAction<number>>;
  setShuffleMode: React.Dispatch<React.SetStateAction<boolean>>;
  shuffleMode: boolean;
}

export const Controls: FC<ControlsProps> = ({
  playPause,
  nextSong,
  prevSong,
  isPlaying,
  setSeekTime,
  setShuffleMode,
  shuffleMode,
}) => {
  return (
    <Box
      w="70%"
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <BsArrowRepeat
        size={20}
        color="#fff"
        className="controls controlsHidden"
        onClick={() => {
          setSeekTime(0);
        }}
      />
      <MdSkipPrevious
        size={30}
        color="#fff"
        className="controls"
        onClick={() => {
          prevSong();
        }}
      />
      {isPlaying ? (
        <BsFillPauseFill
          size={45}
          color="#fff"
          className="controls"
          onClick={() => {
            playPause();
          }}
        />
      ) : (
        <BsFillPlayFill
          size={45}
          color="#fff"
          className="controls"
          onClick={() => {
            playPause();
          }}
        />
      )}
      <MdSkipNext
        size={30}
        color="#fff"
        onClick={() => {
          nextSong();
        }}
        className="controls"
      />
      <BsShuffle
        size={20}
        color={shuffleMode ? "rgb(16 185 129)" : "#fff"}
        className="controls controlsHidden"
        onClick={() => {
          setShuffleMode(!shuffleMode);
        }}
      />
    </Box>
  );
};
