import { Box, Image } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FC } from "react";

type HeaderProps = {
  setMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
  mobileNav: boolean;
};

export const Header: FC<HeaderProps> = ({ setMobileNav, mobileNav }) => {
  return (
    <Box
      display={{ base: "flex", sm: "flex", md: "flex", lg: "none" }}
      justifyContent={"space-between"}
      alignItems={"center"}
      bg={"rgba(55, 48, 107,1)"}
      p={"15px"}
    >
      <Image
        src="/name_logo.png"
        alt="logo_musicX"
        width={"20%"}
        cursor={"pointer"}
      />
      {mobileNav ? (
        <AiOutlineClose
          size={25}
          color="#fff"
          cursor="pointer"
          onClick={() => {
            setMobileNav(!mobileNav);
          }}
        />
      ) : (
        <FaBars
          size={25}
          color="#fff"
          cursor="pointer"
          onClick={() => {
            setMobileNav(!mobileNav);
          }}
        />
      )}
    </Box>
  );
};
