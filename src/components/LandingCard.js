
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button } from '@chakra-ui/react';

import { ExternalLinkIcon } from '@chakra-ui/icons';

function LandingCard(props) {

    const handleClick = (event) => {
        event.preventDefault();
        window.open(`${props.moreinfo}`, "_blank"); // open the link in a new tab
    };

    return (
        <Card maxW='sm' h="100%" borderRadius="lg" bg="whiteAlpha.600">
            <Image
                src={require(`.//images/${props.image}`)}
                alt={props.title}
                borderRadius='lg'
            />
            <CardBody>
                <Stack mt='1' spacing='3'>
                    <Heading size='md'>{props.title}</Heading>
                    <Text fontSize={["sm", "md", "lg"]}>{props.description}</Text>
                </Stack>
            </CardBody>
            <Divider color="blackAlpha.600" />
            <CardFooter>
                <Button p="5" variant='solid' colorScheme="twitter" onClick={handleClick}>
                    More Info
                    <ExternalLinkIcon position="absolute" right="3px" top="3px"></ExternalLinkIcon>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default LandingCard;