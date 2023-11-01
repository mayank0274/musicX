import { Box, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Loader } from "../components/Loader.tsx";
import { SongCard } from "../components/SongCard.tsx";
import { Track, AllTracksRes } from "../types/Track.ts";
import { SearchBar } from "../components/SearchBar.tsx";
import { Error } from "../components/Error.tsx";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const fetchSongs = async (): Promise<AllTracksRes> => {
  const res = await axios({
    url: "https://shazam.p.rapidapi.com/charts/track",
    headers: {
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
    },
    params: {
      locale: "en-US",
      pageSize: "24",
      startFrom: "20",
    },
    method: "GET",
  });

  return res.data as AllTracksRes;
};

export const Discover: FC = () => {
  const {
    isLoading,
    error,
    data: songs,
  } = useQuery({
    queryKey: ["songs"],
    queryFn: fetchSongs,
    staleTime: 5 * 60 * 1000,
  });

  if (error) {
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

      {isLoading ? (
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
          {songs != undefined && songs?.tracks ? (
            songs.tracks.map((song: Track, i: number) => {
              return <SongCard key={song.key} song={song} i={i} />;
            })
          ) : (
            <Text color="#fff">Songs not found</Text>
          )}
        </Box>
      )}
    </Box>
  );
};
