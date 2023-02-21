import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Flex,
  Input,
  Button,
  Link,
  Heading,
  SimpleGrid,
  Center,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import WeatherIcon from 'react-open-weather-icons';
import { motion } from 'framer-motion';

import Clock from '../Clock.js';

import LandingCard from '../LandingCard.js';
import landingcarddata from '../landingCardsData.json';

const containerVariants = {
  hidden: {
    opacity: 0,
    y: '30px',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.2,
    },
  },
  exit: {
    x: '-100vw',
    transition: {
      ease: 'easeInOut',
    },
  },
};

function Landing() {
  const [storedData, setStoredData] = useState(null);
  const [searchData, setSearchData] = useState(''); // user input
  // URL to pull in single city image
  const [imgUrl, setImgUrl] = useState('');
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    if (storedData === null) {
      return;
    }
    const getNews = async () => {
      const newsResponse = await axios.get(
        'https://newsapi.org/v2/everything',
        {
          params: {
            q: storedData.cityName,
            apiKey: '66a24015f83f414aad84ea0d18eaaccd',
            sources:
              'associated-press,cnn,bbc-news,google-news,reuters,reddit-r-all,time',
            pageSize: 5,
            language: 'en',
            sortBy: 'relevancy',
            searchIn: 'title,description,content',
          },
        }
      );
      console.log('newsResponse', newsResponse.data);
      setNewsData(newsResponse.data.articles);
    };
    getNews();
  }, [storedData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('form submitted!');
    // if no text entered, do nothing
    if (searchData.length === 0) {
      console.log('no text entered!');
      return;
    }
    // async function to retieve city data
    const getCityData = async () => {
      try {
        // get city data
        const geoResponse = await axios.get(
          'https://api.openweathermap.org/geo/1.0/direct',
          {
            params: {
              appid: '0e8f67bf6ac0e37689d7edea5f37f808',
              limit: 1,
              q: searchData,
            },
          }
        );
        // if no response from api found, exit
        if (geoResponse.data.length === 0) {
          console.log('no result found!');
          return;
        }
        // get weather and timezone data
        const weatherAndTimeZoneResponse = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              appid: '0e8f67bf6ac0e37689d7edea5f37f808',
              lat: geoResponse.data[0].lat,
              lon: geoResponse.data[0].lon,
              units: 'metric',
            },
          }
        );
        console.log('weatherAndTimeZoneResponse', weatherAndTimeZoneResponse);
        // put retrieved data into state variable as object
        setStoredData({
          cityName: geoResponse.data[0].name,
          countryCode: geoResponse.data[0].country.toLowerCase(),
          lat: geoResponse.data[0].lat,
          lon: geoResponse.data[0].lon,
          timezone: weatherAndTimeZoneResponse.data.timezone,
          weatherIcon: weatherAndTimeZoneResponse.data.weather[0].icon,
          currentTemp: weatherAndTimeZoneResponse.data.main.temp,
          weatherDescription:
            weatherAndTimeZoneResponse.data.weather[0].description
              .charAt(0)
              .toUpperCase() +
            weatherAndTimeZoneResponse.data.weather[0].description.slice(1),
        });
      } catch (error) {
        console.log(error);
      }
    };
    // call async-await fetch function
    getCityData();

    // GET image of the city based on search input value
    // uSplash API: https://api.unsplash.com/
    //Access key: 6fEh-7tXr4Bzr12yxHDIN93ZeDnhTWDnRIZ49nxMRtY
    //Secret Key: 6JpWEchohX37O7UTFdTJOSOzw-h2oWcJAMJ1MCvuL9Q
    function getImage() {
      const citySearch = searchData;
      const clientID = '6fEh-7tXr4Bzr12yxHDIN93ZeDnhTWDnRIZ49nxMRtY';
      const endpoint = `https://api.unsplash.com/search/photos?query=${citySearch}&per_page=1&client_id=${clientID}`;

      fetch(endpoint)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          //console.log(data.results[0].urls.thumb);
          setImgUrl(data.results[0].urls.thumb);
        });
    }

    getImage();

    setSearchData('');
  };

  return (
    <motion.main
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      {/* <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='city'
          placeholder='Enter city...'
          value={searchData}
          onChange={(event) => setSearchData(event.target.value)}
        />
      </form> */}
      <Box maxW='1200px' mx='auto' px={4} my={4}>
        <Box w={{ base: '100%', md: '70%', lg: '60%' }} mx='auto'>
          <form onSubmit={handleSubmit}>
            <Flex alignItems='center'>
              <Input
                type='text'
                name='city'
                placeholder='Enter city...'
                value={searchData}
                onChange={(event) => setSearchData(event.target.value)}
              />
              <Button type='submit' ml={2}>
                Search
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>

      {storedData && (
        <Box maxW='1200px' mx='auto' px={4} my={4}>
          <p>
            {storedData.cityName + ', ' + storedData.countryCode.toUpperCase()}
          </p>
          <Clock timezone={storedData.timezone} />
          <WeatherIcon name={storedData.weatherIcon} className='weatherIcon' />
          <p>{storedData.weatherDescription}</p>
          <p>{Math.round(storedData.currentTemp) + '°C'}</p>
          <img alt='city' src={imgUrl} />
          {storedData && !newsData ? (
            <p>Fetching news...</p>
          ) : newsData.length === 0 ? (
            <p>No news</p>
          ) : (
            <div>
              <Heading as='h4' size='md'>
                Related news:
              </Heading>
              {newsData.map((article, i) => (
                <li key={i}>
                  {article.title}{' '}
                  <Link href={article.url} isExternal color='orange.500'>
                    Article <ExternalLinkIcon mx='2px' />
                  </Link>
                </li>
              ))}
            </div>
          )}
        </Box>
      )}

      <SimpleGrid
        mx='auto'
        maxW='1400px'
        p='2'
        minChildWidth='320px'
        spacing='10px'
      >
        {landingcarddata.map((data, i) => (
          <Center key={i}>
            <LandingCard
              title={data.title}
              description={data.description}
              image={data.image}
              moreinfo={data.moreinfo}
            />
          </Center>
        ))}
      </SimpleGrid>
    </motion.main>
  );
}

export default Landing;
