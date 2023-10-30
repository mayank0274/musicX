import { Box, Image, Text, keyframes } from "@chakra-ui/react";
import { Track } from "../../types/Track";
import { FC } from "react";

interface TrackProps {
  activeSong: Track;
  isPlaying: boolean;
  isActive: boolean;
}

const animationKeyframes = keyframes`
  0% { transform: rotate(0deg) }
  25% { transform: rotate(90deg) }
  50% { transform: rotate(180deg) }
  75% { transform: rotate(270deg) }
  100% { transform: rotate(360deg) }
`;

const animation = `${animationKeyframes} 4s linear infinite`;

export const PlayerTrack: FC<TrackProps> = ({
  activeSong,
  isPlaying,
  isActive,
}) => {
  return (
    <Box display="flex" w="33%" px={"10px"}>
      <Image
        src={activeSong.images?.coverart}
        alt={activeSong.title}
        borderRadius={"50%"}
        width="10%"
        mx="20px"
        animation={isPlaying && isActive ? animation : ""}
        display={{ base: "none", sm: "none", md: "block", lg: "block" }}
      />
      <Box>
        <Text color="white" fontWeight="bold">
          {activeSong.title?.length! > 20
            ? `${activeSong.title?.slice(0, 17)}...`
            : activeSong.title}
        </Text>
        <Text color="rgb(229, 207, 247)" fontSize="13px">
          {activeSong.subtitle?.length! > 18
            ? `${activeSong.subtitle?.slice(0, 16)}...`
            : activeSong.subtitle}
        </Text>
      </Box>
    </Box>
  );
};
