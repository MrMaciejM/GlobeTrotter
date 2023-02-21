import { ExternalLinkIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  Flex,
  Box,
  CardHeader,
  StackDivider,
  HStack,
  Avatar,
  AvatarBadge,
  Link,
} from '@chakra-ui/react';

function CitySearchResult() {
  return (
    <Card
      // direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      maxW='960px'
    >
      <Flex
        flexDirection={{ base: 'column', sm: 'row' }}
        align='center'
        gap='20px'
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
          alt='Caffe Latte'
        />
        <Stack>
          <Heading size='xl'>London, GB</Heading>
          <Flex justify='space-between' align='center' gap='20px'>
            <Box>11:47:34</Box>
            <Box>Broken Clouds</Box>
            <Box>
              <PhoneIcon /> 999
            </Box>
          </Flex>
        </Stack>
      </Flex>

      <Stack>
        <CardBody>
          <Stack divider={<StackDivider />}>
            <Heading size='sm'>News</Heading>

            <Box>
              <HStack>
                <Avatar
                  name='T'
                  bg='purple.300'
                  src='/img/mario.png'
                  size='xs'
                />
                <Text>The title of the article related to city</Text>
                <Link
                  href='https://chakra-ui.com'
                  isExternal
                  color='orange.500'
                >
                  Time <ExternalLinkIcon mx='2px' />
                </Link>
              </HStack>
            </Box>

            <Box>
              <HStack>
                <Avatar
                  name='T'
                  bg='purple.300'
                  src='/img/mario.png'
                  size='xs'
                />
                <Text>The title of the article related to city</Text>
                <Link
                  href='https://chakra-ui.com'
                  isExternal
                  color='orange.500'
                >
                  Time <ExternalLinkIcon mx='2px' />
                </Link>
              </HStack>
            </Box>

            <Box>
              <HStack>
                <Avatar
                  name='B B C'
                  bg='purple.300'
                  src='/img/mario.png'
                  size='xs'
                />
                <Text>The title of the article related to city</Text>
                <Link
                  href='https://chakra-ui.com'
                  isExternal
                  color='orange.500'
                >
                  Time <ExternalLinkIcon mx='2px' />
                </Link>
              </HStack>
            </Box>
          </Stack>
        </CardBody>

        <CardFooter>
          <Button size='xs' bg='orange.600' variant='solid' colorScheme='blue'>
            Clear Search
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default CitySearchResult;
