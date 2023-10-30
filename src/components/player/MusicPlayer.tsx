import { Box, Flex, Text } from "@chakra-ui/react";
import { PlayerTrack } from "./PlayerTrack";
import { RootState } from "../../redux/store";
import { Controls } from "./Controls";
import { Seekbar, getTime } from "./Seekbar";
import { FC, useState } from "react";
import { AudioPlayer } from "./AudioPlayer";
import { useDispatch, useSelector } from "react-redux";
import { handleNextSong, handlePrevSong } from "../../redux/slices/playerSlice";
import { handlePlayPause } from "../../redux/slices/playerSlice";
import { Volumebar } from "./Volumebar";

export const MusicPlayer: FC = () => {
  const { isActive, isPlaying, activeSong, currentIndex, currentSongs } =
    useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();

  const [duration, setDuration] = useState<number>(0);
  const [passedDuration, setPassedDuration] = useState<number>(0);
  const [seekTime, setSeekTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.3);
  const [shuffleMode, setShuffleMode] = useState<boolean>(false);

  const nextSong = (): void => {
    if (currentIndex == currentSongs.length - 1) {
      dispatch(handleNextSong(0));
    } else if (shuffleMode) {
      dispatch(handleNextSong(Math.ceil(Math.random() * currentSongs.length)));
    } else {
      dispatch(handleNextSong(currentIndex + 1));
    }
  };

  const prevSong = (): void => {
    if (currentIndex == 0) {
      dispatch(handlePrevSong(currentSongs.length - 1));
    } else if (shuffleMode) {
      dispatch(handlePrevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(handlePrevSong(currentIndex - 1));
    }
  };

  const playPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(handlePlayPause({ status: false }));
    } else {
      dispatch(handlePlayPause({ status: true }));
    }
  };

  return (
    <Flex
      w="full"
      position="fixed"
      bottom="0"
      left={0}
      right={0}
      h="70px"
      justifyContent={{
        sm: "space-around",
        base: "space-around",
        md: "center",
        lg: "center",
        xl: "center",
      }}
      alignItems="center"
      bg="rgba(113, 58, 190, 0.3)"
      backdropFilter="blur(14px)"
      zIndex={999}
      margin={0}
      padding={0}
      sx={{
        contain: "paint",
      }}
    >
      <PlayerTrack
        isActive={isActive}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />

      <Text
        color={"#fff"}
        width={"33%"}
        display={{
          base: "block",
          sm: "block",
          md: "none",
          lg: "none",
          xl: "none",
        }}
      >
        {getTime(passedDuration)} - {getTime(duration)}
      </Text>

      <Box flexDirection="column" w="33%">
        <Controls
          playPause={playPause}
          nextSong={nextSong}
          prevSong={prevSong}
          isPlaying={isPlaying}
          setShuffleMode={setShuffleMode}
          setSeekTime={setSeekTime}
          shuffleMode={shuffleMode}
        />
        <Seekbar
          duration={duration}
          passedTime={passedDuration}
          setSeekTime={setSeekTime}
        />
      </Box>
      <AudioPlayer
        isPlaying={isPlaying}
        activeSong={activeSong}
        setDuration={setDuration}
        setPassedDuration={setPassedDuration}
        seekTime={seekTime}
        nextSong={nextSong}
        volume={volume}
      />

      <Volumebar setVolume={setVolume} volume={volume} />
    </Flex>
  );
};
