
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Button,
    Flex,
    IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ChakraProvider } from "@chakra-ui/provider";


function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    return (
        <ChakraProvider>
            <Button size="lg" p={5} leftIcon={<FontAwesomeIcon icon={faBars} />} variant="solid" onClick={onOpen}>YouTube</Button>
            <Drawer colorScheme="purple" closeOnOverlayClick={true} closeOnEsc={true} size="md" isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay bg="rgba(0, 0, 0, 0.5)" />
                <DrawerContent maxW="300px" bg="white">
                <IconButton
            aria-label="Close drawer"
            icon={<CloseIcon boxSize={20} bg="none"/>}
            size="lg"
            variant="ghost"
            position="absolute"
            right={5}
            top={5}
            _focus={{ outline: "none" }}
            outline="none"
            onClick={onClose}
            _hover={{ color: "teal" }}
          />                    <DrawerHeader mt="4" mb="8" fontSize="2xl" fontWeight="bold" color="teal">Navigation</DrawerHeader>
                    <DrawerBody h="100%" bg="#9999" pb="4">
                    <Flex mt={100} flexDirection="column">
                    <Button colorScheme="blue" as={Link} to="/">Home</Button>
                        <Button colorScheme="blue" as={Link} to="/translate">Translate</Button>
                        <Button colorScheme="blue" as={Link} to="/currency">currency</Button>
                        <Button colorScheme="blue" as={Link} to="/landmarks">landmarks</Button>
                    </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </ChakraProvider>
    );
}

export default Sidebar;