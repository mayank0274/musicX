import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { SongCard } from "../components/SongCard.tsx";
import { Track } from "../types/Track.ts";
import { BsHeartFill } from "react-icons/bs";

export const FavouriteSongs: FC = () => {
  const [songs, setSongs] = useState<Track[] | undefined>();
  const favouriteSongsComponent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let favouriteSongs: Track[] = JSON.parse(
      localStorage.getItem("musicx-favourites") || "{}"
    ) as Track[];

    if (favouriteSongs.length > 0) {
      setSongs(favouriteSongs);
    }

    if (favouriteSongsComponent.current) {
      favouriteSongsComponent.current.scrollIntoView(true);
    }
  }, []);

  const FavouritesNotFound = () => {
    return (
      <Box marginLeft={"13px"}>
        <Text color={"#fff"} fontSize={"25px"}>
          It seems you have'nt added any songs to favourites!!
        </Text>
        <Flex color={"#fff"} fontSize={"25px"}>
          Click on
          <BsHeartFill
            size={45}
            style={{
              padding: "10px",
              color: "red",
            }}
          />{" "}
          icon in songcard to add to favourites
        </Flex>
      </Box>
    );
  };

  return (
    <Box
      bg="#5B0888"
      w={{ base: "100%", sm: "100%", md: "100%", lg: "55%" }}
      overflowY={"hidden"}
      marginLeft={{ base: "0", sm: "0", md: "0", lg: "16%" }}
      mb={"10px"}
      marginBottom={"50px"}
      overflow={"hidden"}
      height={"max-content"}
      minH={"100vh"}
      ref={favouriteSongsComponent}
      as="div"
    >
      <Box
        display="flex"
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
        }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading mx="10px" color="#fff">
          Favourites Songs
        </Heading>
      </Box>
      <Box
        display={"flex"}
        flexDirection="row"
        flexWrap="wrap"
        my="20px"
        justifyContent={{
          base: "space-evenly",
          sm: "Space-evenly",
          md: "normal",
        }}
      >
        {(!songs || songs.length == 0) && <FavouritesNotFound />}
        {songs &&
          songs.map((song: Track, i: number) => {
            return (
              <SongCard
                key={song.key}
                song={song}
                i={i}
                songsData={songs}
                setSongs={setSongs}
              />
            );
          })}
      </Box>
    </Box>
  );
};
