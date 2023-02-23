import Sidebar from "./Sidebar";

import { Flex, Spacer, Heading, Img } from "@chakra-ui/react";
import { motion } from "framer-motion";

function Header() {
  const stylesObj = {
    // backgroundImage: "linear-gradient(350deg, var(--customBlue), var(--customPurple))",
    backgroundColor: "var(--mainBackground)",
    opacity: "1",
    position: "fixed",
    width: "100vw",
    zIndex: "2"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={stylesObj}
    >
      <Flex
        as="header"
        alignItems="center"
        justifyContent="space=between"
        p="3"
      >

        <Sidebar />

        <Spacer></Spacer>

        <Heading as="h1" fontFamily="Poppins" textAlign="center">
          <Flex>
            Gl
            <Img
              className="globeImg"
              src={require(`./icons/globe.gif`)}
              width="2ch"
              height="2ch"
              alt="gif of a globe spin which replaces the first o in Globetrotter in the header"
            ></Img>
            beTrotter
          </Flex>
        </Heading>

        <Spacer></Spacer>

      </Flex>
    </motion.div>
  );
}

export default Header;
