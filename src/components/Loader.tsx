import { Flex, Spinner, Text } from "@chakra-ui/react";
import { FC } from "react";

export const Loader: FC<{ message: string }> = ({ message }) => {
  return (
    <Flex
      bg="#5B0888"
      w="55%"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginLeft={"15%"}
    >
      <Text color={"#fff"} mr={"10px"}>
        {message}
      </Text>
      <Spinner size="lg" color="#fff" />
    </Flex>
  );
};
