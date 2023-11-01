import {
  Card,
  CardBody,
  Image,
  Text,
  Heading,
  Stack,
  Box,
} from "@chakra-ui/react";
import { Track } from "../types/Track";
import { Link } from "react-router-dom";
import { PlayPause } from "./PlayPause";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { setActiveSong, handlePlayPause } from "../redux/slices/playerSlice";
import { BsHeartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { fetchSongs } from "../pages/Discover.tsx";
import { useQuery } from "@tanstack/react-query";

export const SongCard: React.FC<{
  song: Track;
  i: number;
  songsData?: Track[];
  setSongs?: React.Dispatch<React.SetStateAction<Track[] | undefined>>;
}> = ({ song, i, songsData, setSongs }) => {
  const dispatch = useDispatch();
  const { isPlaying, activeSong } = useSelector(
    (state: RootState) => state.player
  );

  const { data: allSongs } = useQuery({
    queryKey: ["songs"],
    queryFn: fetchSongs,
    staleTime: 10 * 60 * 1000,
  });

  const songs = allSongs?.tracks;
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  useEffect(() => {
    let favouriteSongs: Track[] = JSON.parse(
      localStorage.getItem("musicx-favourites") || "{}"
    ) as Track[];

    if (favouriteSongs.length > 0) {
      let alreadyAdded = favouriteSongs.filter((elem: Track) => {
        return elem.key == song.key;
      });

      if (alreadyAdded.length > 0) {
        setIsFavourite(true);
      }
    }
  }, [isFavourite]);

  const handlePlay = (): void => {
    dispatch(
      setActiveSong({
        song: song,
        index: i,
        currentSongs: songsData ? songsData : songs,
      })
    );
    dispatch(handlePlayPause({ status: true }));
  };

  const handlePause = (): void => {
    dispatch(handlePlayPause({ status: !isPlaying }));
  };

  const handleFavourites = () => {
    let favouriteSongs: Track[] = Array.from(
      JSON.parse(localStorage.getItem("musicx-favourites") || "{}") as Track[]
    );

    if (favouriteSongs.length > 0) {
      let alreadyAdded = favouriteSongs.filter((elem: Track) => {
        return elem.key == song.key;
      });

      if (alreadyAdded.length > 0) {
        let filteredArray = favouriteSongs.filter((elem: Track) => {
          return elem.key != song.key;
        });

        localStorage.setItem(
          "musicx-favourites",
          JSON.stringify(filteredArray)
        );

        favouriteSongs = Array.from(
          JSON.parse(
            localStorage.getItem("musicx-favourites") || "{}"
          ) as Track[]
        );
      } else {
        localStorage.setItem(
          "musicx-favourites",
          JSON.stringify([...favouriteSongs, song])
        );

        favouriteSongs = Array.from(
          JSON.parse(
            localStorage.getItem("musicx-favourites") || "{}"
          ) as Track[]
        );
      }
    } else {
      localStorage.setItem(
        "musicx-favourites",
        JSON.stringify([...favouriteSongs, song])
      );

      favouriteSongs = Array.from(
        JSON.parse(localStorage.getItem("musicx-favourites") || "{}") as Track[]
      );
    }

    if (setSongs) {
      setSongs(favouriteSongs);
    }
  };

  return (
    <Card
      my="5px"
      mx="5px"
      maxW="31.5%"
      maxH="21.5%"
      minW={{ base: "40%", sm: "35%", md: "25%", lg: "30%" }}
      bg="rgba(229, 207, 247,0.19)"
      backdropFilter="blur(10px)"
      cursor="pointer"
    >
      <CardBody>
        <Box position="relative">
          <Box
            position="absolute"
            w="100%"
            h="100%"
            borderRadius="8px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              _hover: {
                bg: "rgba(0,0,0,0.5)",
                zIndex: 9999,
                opacity: 1,
              },
            }}
            bg={activeSong?.title == song.title ? "rgba(0,0,0,0.5)" : "none"}
            opacity={activeSong?.title == song.title ? "1" : "0"}
          >
            <PlayPause
              handlePlay={handlePlay}
              handlePause={handlePause}
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              key={song.key}
            />
            <BsHeartFill
              style={{
                color: isFavourite ? "red" : "#fff",
                fontSize: "30px",
              }}
              onClick={() => {
                handleFavourites();
                setIsFavourite(!isFavourite);
              }}
            />
          </Box>
          <Image
            src={song.images?.coverart}
            alt={song.title}
            borderRadius="lg"
            objectFit="contain"
            sx={{
              _hover: {
                zIndex: -1,
              },
            }}
            loading="lazy"
          />
        </Box>

        <Stack mt="6" spacing="3">
          <Heading size="md" color="white">
            <Link to={`/songs/${song.key}`}>{song.title}</Link>
          </Heading>
          <Text color="rgb(229, 207, 247)">
            <Link
              to={song.artists ? `/artists/${song.artists[0].adamid}` : "/"}
            >
              {song.subtitle}
            </Link>
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};
