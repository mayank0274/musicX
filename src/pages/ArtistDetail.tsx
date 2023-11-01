import { Flex, Image, Box, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { RELATEDSONGSTYPE } from "../types/relatedSongTypes";
import { ArtistDetailType } from "../types/ArtistDetail";
import { useQuery } from "@tanstack/react-query";

export const ArtistDetail: FC = () => {
  const { key } = useParams();

  async function fetchArtistDetails<T>(url: string): Promise<T> {
    const res = await axios({
      url,
      headers: {
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
      },
      method: "GET",
    });

    return res.data as T;
  }

  const {
    isLoading: loadingArtist,
    error: artistLoadError,
    data: artistDetail,
  } = useQuery({
    queryKey: ["artist", key],
    queryFn: async () => {
      return await fetchArtistDetails<ArtistDetailType>(
        `https://shazam.p.rapidapi.com/artists/get-details?id=${key}`
      );
    },
  });

  const {
    isLoading: loadingSongs,
    error: songsLoadError,
    data: relatedSongs,
  } = useQuery<RELATEDSONGSTYPE>({
    queryKey: ["artistSongs", key],
    queryFn: async () => {
      return await fetchArtistDetails<RELATEDSONGSTYPE>(
        `https://shazam.p.rapidapi.com/artists/get-top-songs?id=${key}`
      );
    },
  });

  if (songsLoadError || artistLoadError) {
    return (
      <Error
        errorMessage={
          "Opps!! Something went wrong while loading artist details"
        }
      />
    );
  }

  if (loadingArtist || loadingSongs) {
    return <Loader message="Laoding artist detail" />;
  }

  return (
    <Box
      minHeight="100vh"
      width="100%"
      marginLeft={{ base: "0", sm: "0", md: "0", lg: "15%" }}
      color="#fff"
      background="#5B0888"
      marginBottom={"80px"}
      overflow={"hidden"}
    >
      {artistDetail != undefined ? (
        <>
          <Box>
            <Flex
              justifyContent={"space-between"}
              bg="rgba(229, 207, 247,0.19)"
              backdropFilter="blur(10px)"
              w={{ base: "95%", sm: "95%", md: "90%", lg: "60%" }}
              p="10px"
              m="10px"
              borderRadius="7px"
            >
              <Image
                src={artistDetail?.data[0].attributes.url}
                alt={artistDetail?.data[0].attributes.name}
                w={{ base: "22%", sm: "22%", md: "22%", lg: "18%" }}
                borderRadius="5px"
              />
              <Box w={{ base: "75%", sm: "75%", md: "75%", lg: "80%" }}>
                <Heading
                  fontSize={{
                    base: "22px",
                    sm: "22px",
                    md: "28px",
                    lg: "28px",
                  }}
                  color="white"
                >
                  {artistDetail?.data[0].attributes.name}
                </Heading>
                <Text
                  color="rgb(229, 207, 247)"
                  fontSize={{
                    base: "18px",
                    sm: "18px",
                    md: "22px",
                    lg: "22px",
                  }}
                >
                  {artistDetail?.data[0].attributes.genreNames[0]}
                </Text>
              </Box>
            </Flex>
          </Box>

          <Flex direction={"column"} m="10px" p="10px" w="100%">
            {relatedSongs != undefined && <Heading>Related Songs</Heading>}
            {relatedSongs!?.data.map((elem) => {
              let imgUrl = elem.attributes.artwork.url.toString();
              let finalUrl = `${imgUrl.slice(0, imgUrl.lastIndexOf("/"))}/${
                elem.attributes.artwork.width
              }x${elem.attributes.artwork.height}bb.jpg`;
              return (
                <Box
                  display={"flex"}
                  w={{ base: "95%", sm: "95%", md: "90%", lg: "60%" }}
                  alignItems={"center"}
                  my="8px"
                  p="8px"
                  borderRadius={"5.5px"}
                  cursor={"pointer"}
                  bg="rgba(229, 207, 247,0.19)"
                  backdropFilter="blur(10px)"
                  key={elem.id}
                >
                  <Image
                    src={finalUrl}
                    alt={elem.attributes.albumName}
                    w={{ base: "15%", sm: "15%", md: "10%", lg: "8%" }}
                    borderRadius={"8px"}
                  />
                  <Link to={`/search?query=${elem.attributes.name}`}>
                    <Text
                      mx={"15px"}
                    >{`${elem.attributes.name} (Album : ${elem.attributes.albumName})`}</Text>
                  </Link>
                </Box>
              );
            })}
          </Flex>
        </>
      ) : (
        <Text color={"#fff"} textAlign={"center"} m="5px">
          Artist details not found
        </Text>
      )}
    </Box>
  );
};
