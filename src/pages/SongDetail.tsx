import { Flex, Image, Box, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";

interface SONGDETAIL {
  title: string;
  subtitle: string;
  image: string;
}

export const SongDetail: FC = () => {
  const { key } = useParams();
  const [lyrics, setLyrics] = useState<string[]>([]);
  const [SongDetail, setSongDetail] = useState<SONGDETAIL>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchSongDetails = async (): Promise<void> => {
    const url = "https://shazam.p.rapidapi.com/songs/get-details";
    setIsLoading(true);
    try {
      const res = await axios({
        url,
        headers: {
          "X-RapidAPI-Host": "shazam.p.rapidapi.com",
          "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        },
        params: {
          key,
          locale: "en-US",
        },
        method: "GET",
      });

      setIsLoading(false);

      if (res.data) {
        if (res.data.sections[1].type == "LYRICS") {
          setSongDetail({
            title: res.data.title,
            subtitle: res.data.subtitle,
            image: res.data.images.coverart,
          });
          setLyrics(res.data.sections[1].text);
        } else {
          setLyrics(["Lyrics not found!!"]);
        }
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSongDetails();
  }, [key]);

  if (isError) {
    return (
      <Error
        errorMessage={"Opps!! Something went wrong while loading song details"}
      />
    );
  }

  if (isLoading) {
    return <Loader message="Loading song details" />;
  }

  return (
    <Box
      minHeight="100vh"
      width="100%"
      marginLeft={{ base: "0", sm: "0", md: "0", lg: "15%" }}
      color="#fff"
      background="#5B0888"
      marginBottom={"80px"}
    >
      <Box>
        <Flex
          justifyContent={"space-between"}
          bg="rgba(229, 207, 247,0.19)"
          backdropFilter="blur(10px)"
          w={{ base: "95%", sm: "95%", md: "93%", lg: "60%" }}
          p="10px"
          m="10px"
          borderRadius="7px"
        >
          <Image
            src={SongDetail?.image}
            alt={SongDetail?.title}
            w={{ base: "22%", sm: "22%", md: "22%", lg: "18%" }}
            borderRadius="5px"
          />
          <Box w={{ base: "75%", sm: "75%", md: "75%", lg: "80%" }}>
            <Heading
              fontSize={{ base: "22px", sm: "22px", md: "28px", lg: "28px" }}
              color="white"
            >
              {SongDetail?.title}
            </Heading>
            <Text
              color="rgb(229, 207, 247)"
              fontSize={{ base: "18px", sm: "18px", md: "22px", lg: "22px" }}
            >
              {SongDetail?.subtitle}
            </Text>
          </Box>
        </Flex>

        <Box
          mx="10px"
          minH={"65%"}
          bg="rgba(229, 207, 247,0.19)"
          backdropFilter="blur(10px)"
          w={{ base: "95%", sm: "95%", md: "93%", lg: "60%" }}
          m="10px"
          p="10px"
          borderRadius="7px"
        >
          <Heading mb={"10px"}>Lyrics</Heading>
          <Box>
            {lyrics.map((line: string, i: number) => {
              return <Text key={i}>{line}</Text>;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
