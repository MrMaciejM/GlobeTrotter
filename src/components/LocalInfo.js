import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spinner,
  Stack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import CitySearchResult from './CitySearchResult';
import emergencyNumbersData from '../data/List-Of-Emergency-Telephone-Numbers.json';

function LocalInfo() {
  const [storedSearchData, setStoredSearchData] = useState({});
  const [formInput, setFormInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('gt_city_search'));
    if (storedData === null) {
      return;
    }

    setStoredSearchData(storedData);
  }, []);

  const failedSearchToast = useToast();
  const showFailedSearchToast = () => {
    failedSearchToast({
      title: 'No Results Found',
      description: "Your input didn't match any city in our database",
      duration: 3000,
      isClosable: true,
      status: 'warning',
      position: 'top',
    });
  };

  const getEmergencyNumber = (countryCode) => {
    const countryObject = emergencyNumbersData.find(
      (obj) => obj.Country.ISOCode === countryCode
    );
    if (!countryObject) {
      return '123'; // default
    }
    // dispatch try
    if (countryObject.Dispatch && countryObject.Dispatch.All[0] !== null) {
      return countryObject.Dispatch.All[0];
    }
    // police try
    if (countryObject.Police && countryObject.Police.All[0] !== null) {
      return countryObject.Police.All[0];
    }
    // ambulance try
    if (countryObject.Ambulance && countryObject.Ambulance.All[0] !== null) {
      return countryObject.Ambulance.All[0];
    }
    // fire try
    if (countryObject.Fire && countryObject.Fire.All[0] !== null) {
      return countryObject.Fire.All[0];
    }
    return '123'; // if all else fails...
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStoredSearchData({});
    console.log(`form submitted with input: ${formInput}`);

    // async function to retrieve city data
    const getCityData = async () => {
      let cityObjToStore = {};
      try {
        // get location data
        const geoResponse = await axios.get(
          'https://api.openweathermap.org/geo/1.0/direct',
          {
            params: {
              appid: '0e8f67bf6ac0e37689d7edea5f37f808',
              limit: 1,
              q: formInput,
            },
          }
        );
        console.log('geoResponse', geoResponse.data);
        if (geoResponse.data.length === 0) {
          setIsLoading(false);
          showFailedSearchToast();
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
        console.log(
          'weatherAndTimeZoneResponse',
          weatherAndTimeZoneResponse.data
        );

        // get image data
        // uSplash API: https://api.unsplash.com/
        // Access key: 6fEh-7tXr4Bzr12yxHDIN93ZeDnhTWDnRIZ49nxMRtY
        // Secret Key: 6JpWEchohX37O7UTFdTJOSOzw-h2oWcJAMJ1MCvuL9Q
        const clientID = '6fEh-7tXr4Bzr12yxHDIN93ZeDnhTWDnRIZ49nxMRtY';
        const endpoint = `https://api.unsplash.com/search/photos?query=${formInput}&per_page=1&client_id=${clientID}&orientation=landscape`;
        const imageResponse = await axios.get(endpoint);
        console.log('getImageResponse', imageResponse.data);

        // get news data
        const newsResponse = await axios.get(
          'https://newsapi.org/v2/everything',
          {
            params: {
              q: geoResponse.data[0].name,
              apiKey: '66a24015f83f414aad84ea0d18eaaccd',
              sources: 'associated-press,cnn,bbc-news,reuters,time',
              pageSize: 10,
              language: 'en',
              sortBy: 'relevancy',
              searchIn: 'title,description,content',
            },
          }
        );
        console.log('newsResponse', newsResponse.data);

        // store data
        cityObjToStore = {
          cityName: geoResponse.data[0].name,
          countryCode: geoResponse.data[0].country,
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
          imageUrl: imageResponse.data.results[0].urls.regular,
          articles: newsResponse.data.articles,
          emergencyNumber: getEmergencyNumber(geoResponse.data[0].country),
        };
        localStorage.setItem('gt_city_search', JSON.stringify(cityObjToStore));
        setStoredSearchData(cityObjToStore);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    setIsLoading(true);
    getCityData();
    setFormInput('');
  };

  return (
    <Container as='section' maxW='100vw' p='10px' size='md'>
      <Stack>
        <Box>
          <form onSubmit={handleSubmit}>
            <Flex
              direction='column'
              justify='center'
              align='center'
              gap='20px'
              mb='20px'
            >
              <FormControl isRequired maxW='480px'>
                {/* <FormLabel requiredIndicator={''}>
                Get local info for any city in the world
              </FormLabel> */}
                <Input
                  type='text'
                  name='city'
                  placeholder='Enter city...'
                  value={formInput}
                  onChange={(event) => setFormInput(event.target.value)}
                />
                {/* <FormHelperText>
                  Add country code for greater specificity (e.g. 'Newcastle,
                  AU')
                </FormHelperText> */}
              </FormControl>

              <Button type='submit' colorScheme='twitter'>
                Search
              </Button>
            </Flex>
          </form>
        </Box>
        {isLoading && (
          <Flex justify='center'>
            <Spinner />
          </Flex>
        )}
        {Object.keys(storedSearchData).length > 0 && (
          <Flex justify='center'>
            <CitySearchResult
              storedSearchData={storedSearchData}
              setStoredSearchData={setStoredSearchData}
            />
          </Flex>
        )}
      </Stack>
    </Container>
  );
}

export default LocalInfo;
