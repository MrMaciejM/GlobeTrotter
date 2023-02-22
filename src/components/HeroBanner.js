import { Card } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Box, Grid, Heading } from "@chakra-ui/layout";

import herobanner from "./images/herobanner.jpg";

function HeroBanner() {

    const gradient = 'radial-gradient(circle, rgba(188, 232, 233, 0.2) 0%, var(--cardsBackground) 70%)';
    const bgImage = herobanner;
    const cardBg = `${gradient}, url(${bgImage})`;

    return (
        <Card p="5" variant="unstyled" bg="none" maxW="1600px">

            <Grid templateColumns="repeat(2, 1fr)" templateRows="repeat(2, 1fr)" gap={0} >
                <Image
                    minH="400px"
                    src={herobanner}
                    display="block"
                    objectFit="cover"
                    filter= "brightness(0.4)"
                    borderRadius="lg"
                    gridColumn="1 / 3"
                    gridRow="1 / 3"
                    alt="Person standing on a hill with view of water and horizon in the distance under cloud cover on the hero banner"
                ></Image>

                <Box
                    p="3"
                    gridColumn="1 / 2"
                    gridRow="1 / 3"
                    zIndex={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Heading
                        as="h1"
                        fontSize={["3xl", "4xl", "6xl"]}
                        textAlign="center"
                        textShadow="rgba(0, 9, 30, 0.6) 0px 1px 2px"
                        color="whiteAlpha.700"
                        fontWeight="hairline"
                        fontFamily="Crimson Pro, sans-serif"
                    >
                        Embark on your next adventure with confidence
                    </Heading>
                </Box>
            </Grid>

        </Card>
    )
}

export default HeroBanner;