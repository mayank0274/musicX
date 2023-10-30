import { Box, Input, InputGroup } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

export const SearchBar: FC<{ query?: string }> = ({ query }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <Box display={"block"} w="97%" m="10px">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          handleSubmit(e);
        }}
      >
        <InputGroup>
          <Input
            type="search"
            placeholder="Enter your Query"
            variant={"filled"}
            background={"#37306B"}
            color={"#fff"}
            w={{ base: "70%", sm: "75%", md: "89%", lg: "89%" }}
            sx={{
              ":focus": {
                bg: "#37306B",
                outline: "none",
                border: "none",
              },
              ":hover": {
                bg: "#37306B",
              },
            }}
            value={query ? query : searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </InputGroup>
      </form>
    </Box>
  );
};
