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

function CitySearchResult({ storedSearchData, setStoredSearchData }) {
  const handleClear = () => {
    localStorage.removeItem('gt_city_search');
    setStoredSearchData({});
  };

  return (
    <Card overflow='hidden' maxW='960px'>
      <Flex flexDirection={{ base: 'column', md: 'row' }} align='center'>
        <Image
          objectFit='cover'
          objectPosition='center'
          width={{ base: '100%', md: '260px', lg: '300px' }}
          maxH={{ sm: '150px', md: '220px' }}
          src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
          alt='Caffe Latte'
        />
        <Stack
          px='20px'
          minW={{ base: '100%', sm: '400px' }}
          py={{ base: '20px', sm: '15px' }}
        >
          <Heading size='xl'>London, GB</Heading>
          <Flex justify='space-between' align='center'>
            <Box
              borderRadius='lg'
              borderWidth='1px'
              height='80px'
              width='80px'
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              11:47:34
            </Box>
            <Box
              borderRadius='lg'
              borderWidth='1px'
              height='80px'
              width='80px'
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <Text align='center'>Broken Clouds</Text>
            </Box>
            <Box
              borderRadius='lg'
              borderWidth='1px'
              height='80px'
              width='80px'
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
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
                  name='Reuters'
                  bg='gray.100'
                  src='/images/reuters.png'
                  size='xs'
                />
                <Text>The title of the article related to city</Text>
                <Link
                  href='https://chakra-ui.com'
                  isExternal
                  color='orange.500'
                >
                  Reuters <ExternalLinkIcon mx='2px' />
                </Link>
              </HStack>
            </Box>

            <Box>
              <HStack>
                <Avatar
                  name='Time'
                  bg='gray.100'
                  src='/images/time.png'
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
                  name='BBC'
                  bg='gray.100'
                  src='/images/bbc.svg'
                  size='xs'
                />
                <Text>The title of the article related to city</Text>
                <Link
                  href='https://chakra-ui.com'
                  isExternal
                  color='orange.500'
                >
                  BBC <ExternalLinkIcon mx='2px' />
                </Link>
              </HStack>
            </Box>
          </Stack>
        </CardBody>

        <CardFooter display='flex' justifyContent='flex-start' marginTop='0'>
          <Button
            size='xs'
            bg='orange.400'
            variant='solid'
            onClick={handleClear}
          >
            Clear Search
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default CitySearchResult;

// {storedData && (
//   <Box maxW='1200px' mx='auto' px={4} my={4}>
//     <p>
//       {storedData.cityName + ', ' + storedData.countryCode.toUpperCase()}
//     </p>
//     <Clock timezone={storedData.timezone} />
//     <WeatherIcon name={storedData.weatherIcon} className='weatherIcon' />
//     <p>{storedData.weatherDescription}</p>
//     <p>{Math.round(storedData.currentTemp) + '°C'}</p>
//     <img alt='city' src={imgUrl} />
//     {storedData && !newsData ? (
//       <p>Fetching news...</p>
//     ) : newsData.length === 0 ? (
//       <p>No news</p>
//     ) : (
//       <div>
//         <Heading as='h4' size='md'>
//           Related news:
//         </Heading>
//         {newsData.map((article, i) => (
//           <li key={i}>
//             {article.title}{' '}
//             <Link href={article.url} isExternal color='orange.500'>
//               Article <ExternalLinkIcon mx='2px' />
//             </Link>
//           </li>
//         ))}
//       </div>
//     )}
//   </Box>
// )}
