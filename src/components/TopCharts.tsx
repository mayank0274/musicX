import { Box, Flex, Heading, Text, Image, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../redux/store";
import { setActiveSong, handlePlayPause } from "../redux/slices/playerSlice";
import { Track } from "../types/Track";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Loader } from "./Loader";
import { FC } from "react";
import { Error } from "./Error";
import { fetchSongs } from "../pages/Discover";
import { useQuery } from "@tanstack/react-query";

const TopSongs: FC<{
  song: Track;
  index: number;
  songs: Track[];
}> = ({ song, index, songs }) => {
  const { isPlaying, activeSong } = useSelector(
    (state: RootState) => state.player
  );

  const dispatch = useDispatch();

  const handlePlay = ({
    song,
    index,
    songs,
  }: {
    song: Track;
    index: number;
    songs: Track[];
  }): void => {
    dispatch(
      setActiveSong({
        song: song,
        index: index,
        currentSongs: songs,
      })
    );
    dispatch(handlePlayPause({ status: true }));
  };

  const handlePause = (): void => {
    dispatch(handlePlayPause({ status: !isPlaying }));
  };

  return (
    <Flex
      p="10px"
      cursor="pointer"
      justifyContent="space-between"
      alignItems="center"
      key={song.key}
    >
      <Box display="flex" w="90%">
        <Image
          src={song.images?.coverart}
          alt={song.title}
          w={"15%"}
          borderRadius="5px"
        />
        <Box px="10px">
          <Link to={`/songs/${song.key}`}>
            <Text color="#fff" fontSize={"18px"}>
              {song.title?.length! > 30
                ? `${song.title?.slice(0, 30)}...`
                : song.title}
            </Text>
          </Link>

          <Text color="rgb(229, 207, 247)" fontSize={"13px"}>
            {song.subtitle}
          </Text>
        </Box>
      </Box>

      <Box w="10%">
        {isPlaying && activeSong.key == song.key ? (
          <FaPauseCircle
            size={25}
            color="#fff"
            className="controls"
            onClick={() => {
              handlePause();
            }}
          />
        ) : (
          <FaPlayCircle
            size={25}
            color="#fff"
            className="controls"
            onClick={() => {
              handlePlay({ song, index, songs });
            }}
          />
        )}
      </Box>
    </Flex>
  );
};

export const TopCharts = () => {
  const {
    isLoading,
    error,
    data: songs,
  } = useQuery({
    queryKey: ["songs"],
    queryFn: fetchSongs,
    staleTime: 5 * 60 * 1000,
  });

  const topSongs: Track[] = songs?.tracks?.slice(0, 5) || [];

  if (error) {
    return <Error errorMessage="Songs not found or some error occured" />;
  }

  return (
    <Box
      width={{ base: "100%", sm: "100%", md: "100%", lg: "30%" }}
      backgroundColor="#5B0888"
      pr={"10px"}
      position={{ base: "static", sm: "static", md: "static", lg: "fixed" }}
      right={0}
      top={0}
      bottom={0}
      p="15px"
    >
      <Heading fontSize="25px" color="#fff">
        Top charts
      </Heading>

      {isLoading ? (
        <Loader message="Loading top songs" />
      ) : (
        <>
          <Flex direction="column" minH="46%">
            {topSongs.length > 0 ? (
              topSongs.map((song: Track, i: number) => {
                return (
                  <TopSongs
                    song={song}
                    key={song.key}
                    index={i}
                    songs={topSongs}
                  />
                );
              })
            ) : (
              <Text color="#fff">Songs not found</Text>
            )}
          </Flex>

          <Heading fontSize="25px" color="#fff">
            Top Artists
          </Heading>

          <Flex
            w="100%"
            overflowX="auto"
            sx={{
              "&::-webkit-scrollbar": {
                height: "6px",
                backgroundColor: ``,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: `rgba(229, 207, 247,0.19)`,
              },
            }}
          >
            {topSongs.length > 0 ? (
              topSongs.map((song: Track) => {
                return (
                  <Link
                    to={
                      song.artists ? `/artists/${song.artists[0].adamid}` : "/"
                    }
                    key={song.key}
                  >
                    <Avatar
                      src={song.share?.image}
                      size={"xl"}
                      m="10px"
                      key={song.key}
                      cursor="pointer"
                    />
                  </Link>
                );
              })
            ) : (
              <Text color="#fff">Artists not found</Text>
            )}
          </Flex>
        </>
      )}
    </Box>
  );
};
