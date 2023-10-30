import { Flex } from "@chakra-ui/react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { Track } from "../types/Track";
import { FC } from "react";

interface PlayPauseProps {
  handlePlay: () => void;
  handlePause: () => void;
  activeSong: Track;
  isPlaying: boolean;
  song: Track;
}

export const PlayPause: FC<PlayPauseProps> = ({
  handlePlay,
  handlePause,
  activeSong,
  isPlaying,
  song,
}) => {
  return (
    <Flex
      justifyContent={"space-around"}
      w={{ base: "40%", sm: "40%", md: "20%" }}
    >
      {isPlaying && activeSong?.title == song.title ? (
        <FaPauseCircle
          style={{ color: "#fff", fontSize: "30px" }}
          onClick={() => {
            handlePause();
          }}
        />
      ) : (
        <FaPlayCircle
          style={{ color: "#fff", fontSize: "30px" }}
          onClick={() => {
            handlePlay();
          }}
        />
      )}
    </Flex>
  );
};
