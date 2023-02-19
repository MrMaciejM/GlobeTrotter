import axios from 'axios';
import { useEffect, useState } from 'react';

function Landing() {
  const [storedData, setStoredData] = useState({});
  const [searchData, setSearchData] = useState(''); // user input
  // URL to pull in single city image
  const [imgUrl, setImgUrl] = useState('');
  const [newsData, setNewsData] = useState(null);

  // useEffect(() => {
  //   if (Object.keys(storedData).length === 0) {
  //     return;
  //   }
  //   const getNews = async () => {
  //     const newsResponse = await axios.get(
  //       'https://newsapi.org/v2/everything',
  //       {
  //         params: {
  //           q: storedData.cityName,
  //           apiKey: '66a24015f83f414aad84ea0d18eaaccd',
  //           sources: 'bbc-news,cnn',
  //           pageSize: 5,
  //           language: 'en',
  //           sortBy: 'relevancy',
  //           searchIn: 'content',
  //         },
  //       }
  //     );
  //     console.log('newsResponse', newsResponse.data);
  //     setNewsData(newsResponse.data.articles);
  //   };
  //   getNews();
  // }, [storedData]);

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
            weatherAndTimeZoneResponse.data.weather[0].description,
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
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='city'
          placeholder='Enter city...'
          value={searchData}
          onChange={(event) => setSearchData(event.target.value)}
        />
      </form>
      <img alt='city' src={imgUrl} />
      {/* {newsData.length > 0 ? (
        <ul>
          {newsData.map((article, i) => (
            <li key={i}>
              {article.title}{' '}
              <a href={article.url} target='_blank'>
                link
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles</p>
      )} */}
    </main>
  );
}

export default Landing;
