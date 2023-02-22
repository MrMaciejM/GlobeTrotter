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
  StackDivider,
  HStack,
  Avatar,
  Link,
  Tooltip,
  Hide,
} from '@chakra-ui/react';
import { useState } from 'react';
import WeatherIcon from 'react-open-weather-icons';

import Clock from './Clock';

// associated-press,cnn,bbc-news,reuters,time
const newsSourceMappings = {
  'associated-press': 'AP',
  cnn: 'CNN',
  'bbc-news': 'BBC',
  reuters: 'Reuters',
  time: 'Time',
};

const truncateTitle = (title) => {
  if (title.length > 60) {
    return title.slice(0, 50) + '...';
  }
  return title;
};

function CitySearchResult({ storedSearchData, setStoredSearchData }) {
  const [numArticlesToShow, setNumArticlesToShow] = useState(3);

  const handleToggle = () => {
    if (numArticlesToShow === 3) {
      setNumArticlesToShow(10);
      return;
    }
    setNumArticlesToShow(3);
  };

  const handleClear = () => {
    localStorage.removeItem('gt_city_search');
    setStoredSearchData({});
  };

  return (
    <Card overflow='hidden' maxW='960px' bg='whiteAlpha.600'>
      <Flex flexDirection={{ base: 'column', md: 'row' }} align='center'>
        <Image
          objectFit='cover'
          objectPosition='center'
          width={{ base: '100%', md: '260px', lg: '300px' }}
          maxH={{ sm: '150px', md: '220px' }}
          src={storedSearchData.imageUrl}
          alt={storedSearchData.cityName}
        />
        <Stack
          px='20px'
          minW={{ base: '100%', sm: '400px' }}
          py={{ base: '20px', sm: '15px' }}
        >
          <Heading size='xl' mb='5px'>
            {storedSearchData.cityName + ', ' + storedSearchData.countryCode}
          </Heading>
          <Flex justify='space-between' align='center'>
            <Box
              borderRadius='lg'
              borderWidth='1px'
              height='80px'
              width='80px'
              display='flex'
              justifyContent='center'
              alignItems='center'
              bg='whiteAlpha.500'
            >
              <Clock timezone={storedSearchData.timezone} />
            </Box>
            <Box
              borderRadius='lg'
              borderWidth='1px'
              height='80px'
              width='80px'
              display='flex'
              justifyContent='flex-end'
              alignItems='flex-end'
              bg='whiteAlpha.500'
              position='relative'
            >
              <Tooltip label={storedSearchData.weatherDescription}>
                <Box align='center'>
                  <WeatherIcon
                    name={storedSearchData.weatherIcon}
                    className='weatherIcon'
                  />
                </Box>
              </Tooltip>
              <Text
                position='absolute'
                top='5px'
                left='10px'
                className='tempElement'
              >
                {Math.round(storedSearchData.currentTemp)}°
              </Text>
            </Box>
            <Box
              borderRadius='lg'
              borderWidth='1px'
              height='80px'
              width='80px'
              display='flex'
              justifyContent='center'
              alignItems='center'
              bg='whiteAlpha.500'
              className='emergencyNumberBox'
            >
              <Tooltip label='Emergency number'>
                <Link
                  textDecoration='none'
                  href={`tel:${storedSearchData.emergencyNumber}`}
                  className='emergencyNumber'
                  fontSize='xl'
                >
                  <PhoneIcon /> {storedSearchData.emergencyNumber}
                </Link>
              </Tooltip>
            </Box>
          </Flex>
        </Stack>
      </Flex>

      {storedSearchData.articles.length > 0 && (
        <Stack>
          <CardBody>
            <Stack divider={<StackDivider borderColor='blackAlpha.400' />}>
              <Heading size='sm'>
                News related to {storedSearchData.cityName}
              </Heading>
              {storedSearchData.articles
                .slice(0, numArticlesToShow)
                .map((article) => (
                  <Box key={article.title}>
                    <HStack>
                      <Hide below='md'>
                        <Avatar
                          name={newsSourceMappings[article.source.Id]}
                          bg='gray.100'
                          src={`images/${article.source.Id}.svg`}
                          size='xs'
                        />
                      </Hide>
                      <Text
                        fontSize={{
                          base: '14px',
                          sm: '16px',
                        }}
                      >
                        {truncateTitle(article.title)}
                      </Text>
                      <Link
                        href={article.url}
                        isExternal
                        color='orange.500'
                        fontSize={{
                          base: '14px',
                          sm: '16px',
                        }}
                        width='80px'
                      >
                        {newsSourceMappings[article.source.Id]}
                        <ExternalLinkIcon mx='2px' />
                      </Link>
                    </HStack>
                  </Box>
                ))}
            </Stack>
          </CardBody>

          <CardFooter display='flex' justifyContent='space-between'>
            {storedSearchData.articles.length > 3 && (
              <Button size='xs' onClick={handleToggle}>
                {numArticlesToShow === 3
                  ? 'Show more articles'
                  : 'Show fewer articles'}
              </Button>
            )}
            <Button
              size='xs'
              bg='orange.300'
              variant='solid'
              onClick={handleClear}
            >
              Clear Search
            </Button>
          </CardFooter>
        </Stack>
      )}
    </Card>
  );
}

export default CitySearchResult;
