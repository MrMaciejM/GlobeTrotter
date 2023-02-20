import Sidebar from './Sidebar';

import { Flex, Spacer, Box, Heading } from '@chakra-ui/react';

function Header() {
  const stylesObj = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '2px 5px',
    },
    Sidebar: {
      padding: '5px',
    },
    h1: {},
  };

  return (
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
      <Heading as='h3' fontSize='30px'>
        Travel App
      </Heading>
    </Flex>
  );
}

export default Header;
