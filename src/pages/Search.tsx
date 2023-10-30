import { Box, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { Track } from "../types/Track";
import { SongCard } from "../components/SongCard";

export const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [song, setSong] = useState<Track>({});

  const fetchSong = async (): Promise<void> => {
    const url = `https://shazam.p.rapidapi.com/search/?term=${searchParams.get(
      "query"
    )}`;

    setIsLoading(true);
    try {
      const res = await axios({
        url,
        headers: {
          "X-RapidAPI-Host": "shazam.p.rapidapi.com",
          "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        },
        method: "GET",
      });

      if (res.data.tracks) {
        setSong(res.data.tracks.hits[0].track);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchSong();
  }, []);

  if (isError) {
    return (
      <Error
        errorMessage={"Opps!! Something went wrong while loading song details"}
      />
    );
  }

  if (isLoading) {
    return <Loader message="Fetching song" />;
  }

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
          Search Results for "{searchParams.get("query")}"
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
        {song.key ? (
          <SongCard key={song?.key} song={song} i={1} songsData={[song]} />
        ) : (
          <Text color={"#fff"} p={"8px"}>
            No songs found for your search query "{searchParams.get("query")}"
          </Text>
        )}
      </Box>
    </Box>
  );
};
