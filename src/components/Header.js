import Sidebar from "./Sidebar";


import { Flex, Spacer, Box, Heading, Img } from '@chakra-ui/react';
import { motion } from 'framer-motion';


function Header() {
  const stylesObj = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "2px 5px",
    },
    Sidebar: {
      padding: "5px",
    },
    h1: {},
  };

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Flex
        as='header'
        alignItems='center'
        justifyContent='center'
        p='1'
        position='relative'
        m={2}
      >
        <Box ml={2} position='absolute' left='5px'>
          <Sidebar />
        </Box>
        <Heading as='h1' fontSize='30px'>
          <Flex>

            Gl
            <Img
              src={require(`./icons/globe.gif`)}
              width="2ch"
              height="2ch"
            ></Img>
            beTrotter

          </Flex>
        </Heading>
      </Flex>
    </motion.div>

  );
}

export default Header;
