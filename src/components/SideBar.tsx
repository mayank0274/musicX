import { Box, VStack } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { TbMusicHeart } from "react-icons/tb";
import { IconType } from "react-icons";
import { FC } from "react";

interface LINK {
  title: string;
  path: string;
  iconName: IconType;
}

const Links: LINK[] = [
  {
    title: "Discover",
    path: "/",
    iconName: FaHome,
  },
  {
    title: "Favourites",
    path: "/favourites",
    iconName: TbMusicHeart,
  },
];

export const SideBar: FC<{
  mobileNav: boolean;
  setMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ mobileNav, setMobileNav }) => {
  const { pathname } = useLocation();

  return (
    <Box
      width={{ base: "60%", sm: "50%", md: "35%", lg: "15%", xl: "15%" }}
      bg="#37306B"
      position={"fixed"}
      zIndex={100}
      // position={{ base: "static", sm: "static", md: "static", lg: "fixed" }}
      left={0}
      top={0}
      bottom={0}
      transform={{
        base: mobileNav ? "translateX(0%)" : "translateX(-150%)",
        sm: mobileNav ? "translateX(0%)" : "translateX(-150%)",
        md: mobileNav ? "translateX(0%)" : "translateX(-150%)",
        lg: "translateX(0)",
      }}
      transition="transform ease-in .4s"
    >
      <img
        src="/logo_music.png"
        alt="musicX logo"
        style={{
          width: "100%",
        }}
      />
      <VStack>
        {Links.map((elem: LINK) => {
          return (
            <NavLink
              to={elem.path}
              key={elem.path}
              className="navLink"
              onClick={() => {
                setMobileNav(false);
              }}
              style={{
                color: pathname == elem.path ? "hsl(180, 100%, 50%)" : "#fff",
              }}
            >
              <elem.iconName
                style={{
                  padding: "4px",
                  fontSize: "25px",
                }}
              />
              {elem.title}
            </NavLink>
          );
        })}
      </VStack>
    </Box>
  );
};
