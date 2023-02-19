
import { Container, Heading } from "@chakra-ui/layout";

import { onValue } from "@firebase/database";

import ShareASuggestion from "../ShareASuggestion";

import { getData } from "../helperFuncs/readData";

import lostImage from "../images/lostInTheJungle.jpg"

import { useEffect, useState } from "react";
import { Card } from "@chakra-ui/card";

function PageNotFound() {

    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        onValue(getData, (snap) => {
            const dataMessage = snap.val();
            console.log(dataMessage);
            setCurrentMessage(dataMessage);
        }, []);
    });

    const gradient = 'radial-gradient(circle, rgba(188, 232, 233, 0.2) 0%, rgba(162, 217, 249, 0.5) 70%)';
    const bgImage = lostImage;
    const cardBg = `${gradient}, url(${bgImage})`;


    return (
        <Card
        p="2"
        bgImage={cardBg}
        bgRepeat="no-repeat"
        bgPosition="center"
        bgSize="cover"
        minW="100%"
        minH="100%"
        display="flex"
        alignitems="center"
        justifyContent="space-evenly"
        textAlign="center">
            <Heading fontWeight="extrabold" as="i" >{currentMessage && currentMessage}</Heading>
            <ShareASuggestion />
        </Card>
    )
}

export default PageNotFound;