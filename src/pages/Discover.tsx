import { Box, Heading } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.ts";
import { fetchSongs, STATES } from "../redux/slices/songsSlice.ts";
import { FC, useEffect } from "react";
import { Loader } from "../components/Loader.tsx";
import { SongCard } from "../components/SongCard.tsx";
import { Track } from "../types/Track.ts";
import { SearchBar } from "../components/SearchBar.tsx";
import { Error } from "../components/Error.tsx";

export const Discover: FC = () => {
  const { songs, status } = useSelector((state: RootState) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs() as any);
  }, []);

  if (status == STATES.ERROR) {
    return (
      <Error
        errorMessage={"Opps!! Something went wrong while loading songs for you"}
      />
    );
  }

  return (
    <Box
      bg="#5B0888"
      w={{ base: "100%", sm: "100%", md: "100%", lg: "53%" }}
      justifyContent={"center"}
      overflowY={"hidden"}
      marginLeft={{ base: "0", sm: "0", md: "0", lg: "16%" }}
      minHeight={"100vh"}
      height={"max-content"}
      mb={"10px"}
      marginBottom={"50px"}
      overflow={"hidden"}
    >
      <SearchBar />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading mx="10px" color="#fff">
          Discover
        </Heading>
      </Box>

      {status == STATES.LOADING ? (
        <Loader message="Loading songs" />
      ) : (
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
          {songs.map((song: Track, i: number) => {
            return <SongCard key={song.key} song={song} i={i} />;
          })}
        </Box>
      )}
    </Box>
  );
};
