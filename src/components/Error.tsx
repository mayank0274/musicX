import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const Error: FC<{ errorMessage: string }> = ({ errorMessage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <Box
      w={{ base: "60%", sm: "60%", md: "80%", lg: "45%" }}
      margin={{ base: "0", sm: "5%", md: "10%", lg: "16%" }}
      overflowY={"hidden"}
      minH={"70vh"}
      display={"block"}
      m={"auto"}
    >
      <Box>
        <Text color={"#fff"} fontSize={"25px"}>
          {errorMessage}
        </Text>
        <Flex>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Go home
          </Button>
          <Button
            onClick={() => {
              if (searchParams.get("query")) {
                window.location.href = `${window.location.protocol}//${
                  window.location.host
                }${window.location.pathname}?query=${searchParams.get(
                  "query"
                )}`;
              } else {
                window.location.reload();
              }
            }}
            bg={"transparent"}
            border={"2px solid white"}
            color={"#fff"}
            mx="4px"
            sx={{
              _hover: {
                bg: "transparent",
              },
            }}
          >
            Reload Page
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
