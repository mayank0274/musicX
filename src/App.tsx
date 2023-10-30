import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { MusicPlayer } from "./components/player/MusicPlayer";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "./redux/store";
import { SideBar } from "./components/SideBar";
import { TopCharts } from "./components/TopCharts";
import { Flex } from "@chakra-ui/react";
import { Discover } from "./pages/Discover";
import { SongDetail } from "./pages/SongDetail";
import { ArtistDetail } from "./pages/ArtistDetail";
import { Header } from "./components/Header";
import { useState } from "react";
import { FavouriteSongs } from "./pages/FavouriteSongs";
import { Search } from "./pages/Search";

function App() {
  const { isActive, isPlaying } = useSelector(
    (state: RootState) => state.player
  );
  const [isMobileNav, setMobileNav] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <Header setMobileNav={setMobileNav} mobileNav={isMobileNav} />
      <Flex
        direction={{
          base: "column-reverse",
          sm: "column-reverse",
          md: "column-reverse",
          lg: "row",
        }}
        bg="#5B0888"
      >
        <SideBar mobileNav={isMobileNav} setMobileNav={setMobileNav} />
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/songs/:key" element={<SongDetail />} />
          <Route path="/artists/:key" element={<ArtistDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favourites" element={<FavouriteSongs />} />
        </Routes>
        <TopCharts />
      </Flex>
      {(isPlaying || isActive) && <MusicPlayer />}
    </BrowserRouter>
  );
}

export default App;
