
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Button,
    Flex,
} from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
import { HamburgerIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { ChakraProvider } from "@chakra-ui/provider";


function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    return (
        <>
            <Button bg="transparent" size="lg" p={1} variant="solid" onClick={onOpen} display='flex' alignItems='center'>
                <FontAwesomeIcon icon={faBars} />
            </Button>
            <Drawer isFullHeight={true} closeOnOverlayClick={true} closeOnEsc={true} size="md" isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent maxW="300px">
                    <Flex justifyContent="center" alignItems="center">
                    <DrawerCloseButton size="lg" />
                    <DrawerHeader fontSize="2xl" fontWeight="bold" color="teal">Navigation</DrawerHeader>
                    </Flex>
                    <DrawerBody pb="4">
                        <Flex mt={10} gap={10} flexDirection="column">
                            <Link to="/" onClick={onClose}>Home</Link>
                            <Link to="/translate" onClick={onClose}>Translate</Link>
                            <Link to="/currency" onClick={onClose}>Currency</Link>
                            <Link to="/landmarks" onClick={onClose}>Landmarks</Link>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default Sidebar;