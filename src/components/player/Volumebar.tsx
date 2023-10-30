import { Box } from "@chakra-ui/react";
import { FC } from "react";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";

interface VolumeBarProps {
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  volume: number;
}
export const Volumebar: FC<VolumeBarProps> = ({ setVolume, volume }) => {
  return (
    <Box
      w="20%"
      display={{ base: "none", sm: "none", md: "flex", lg: "flex", xl: "flex" }}
      justifyContent="space-evenly"
      alignItems="center"
    >
      {volume >= 0.5 && volume <= 1 && (
        <BsFillVolumeUpFill
          size={25}
          color="#fff"
          onClick={() => {
            setVolume(0);
          }}
          cursor="pointer"
        />
      )}
      {volume < 0.5 && volume > 0 && (
        <BsVolumeDownFill
          size={25}
          color="#fff"
          onClick={() => {
            setVolume(0);
          }}
          cursor="pointer"
        />
      )}
      {volume == 0 && (
        <BsFillVolumeMuteFill
          size={25}
          color="#fff"
          onClick={() => {
            setVolume(1);
          }}
          cursor="pointer"
        />
      )}

      <input
        type="range"
        style={{
          width: "70%",
        }}
        min={0}
        max={1}
        step={0.1}
        value={volume}
        onInput={(
          e: React.FormEvent<HTMLInputElement> & {
            target: HTMLInputElement;
          }
        ) => {
          setVolume(Number(e.target.value));
        }}
      />
    </Box>
  );
};
