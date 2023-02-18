
import Sidebar from './Sidebar';

import { Flex, Spacer, Box, Heading } from '@chakra-ui/react'


function Header() {

  const stylesObj = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "2px 5px"
    },
    Sidebar: {
      padding: "5px"
    },
    h1: {

    }
  }

  return (
    <Flex as="header" align="center" p="1">
      <Box>
        <Sidebar />
      </Box>
      <Box flex="1" textAlign="center">
        <Heading>Travel App</Heading>
      </Box>
    </Flex>
  );
}

export default Header;
