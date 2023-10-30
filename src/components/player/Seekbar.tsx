import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

interface SeekbarProps {
  duration: number;
  passedTime: number;
  setSeekTime: React.Dispatch<React.SetStateAction<number>>;
}

export const getTime = (time: number): string => {
  return `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;
};

export const Seekbar: FC<SeekbarProps> = ({
  duration,
  passedTime,
  setSeekTime,
}) => {
  return (
    <Box
      display={{ base: "none", sm: "none", md: "flex", lg: "flex", xl: "flex" }}
      alignItems="center"
      w="70%"
    >
      <FaMinusCircle
        size={13}
        color="#fff"
        onClick={() => {
          setSeekTime(passedTime - 5);
        }}
        cursor="pointer"
        className="controlsHidden"
      />
      <Text color="#fff" fontSize="13px" mx="5px">
        {getTime(passedTime)}
      </Text>

      <input
        type="range"
        min={0}
        max={duration}
        value={passedTime}
        onInput={(
          e: React.FormEvent<HTMLInputElement> & {
            target: HTMLInputElement;
          }
        ) => {
          setSeekTime(Number(e.target.value));
        }}
      />

      <Text color="#fff" fontSize="13px" mx="5px">
        {getTime(duration)}
      </Text>
      <FaPlusCircle
        size={13}
        color="#fff"
        onClick={() => {
          setSeekTime(passedTime + 5);
        }}
        cursor="pointer"
        className="controlsHidden"
      />
    </Box>
  );
};
