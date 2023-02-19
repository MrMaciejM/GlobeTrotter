import axios from "axios";
import { useEffect, useState } from "react";

function Landing() {
  const [searchData, setSearchData] = useState(""); // user input
  const [geodata, setGeodata] = useState({}); //coords
  const [imageData, setImageData] = useState([]); // 5 images
  const [newsData, setNewsData] = useState([]); // 5 articles
  const [weatherData, setWeatherData] = useState({}); // info about right now
  const [countryData, setCountryData] = useState({}); // grabbing currency and language data

  // URL to pull in single city image
  const [imgUrl, setImgUrl] = useState("");

  // big useEffect hook for when geodata is grabbed
  useEffect(() => {
    // if there's no geodata, i.e. first render, then do nothing
    if (Object.keys(geodata).length === 0) {
      console.log("no geodata!");
      return;
    }

    // grab weather data
    const getWeatherData = async () => {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            appid: "0e8f67bf6ac0e37689d7edea5f37f808",
            lat: geodata.lat,
            lon: geodata.lon,
            units: "metric",
          },
        }
      );
      console.log("weatherResponse", response.data);
      setWeatherData({
        ...weatherData,
        ["icon"]: response.data.weather[0].icon,
        ["temp"]: response.data.main.temp,
        ["description"]: response.data.weather[0].description,
        ["timezone"]: response.data.timezone,
        ["timestamp"]: response.data.dt,
      });
    };

    getWeatherData();

    // grab country data
    const getCountryData = async () => {
      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${countryData.countryCode}`
      );
      console.log("getCountryDataResponse", response.data[0]);

      setCountryData({
        ...countryData,
        ["flagSvgUrl"]: response.data[0].flags.svg,
        ["language"]: Object.values(response.data[0].languages)[0],
        ["currencyCode"]: Object.keys(response.data[0].currencies)[0],
      });
    };

    getCountryData();

    // grab advisory data
    const capitalisedCountryCode = countryData.countryCode.toUpperCase();
    const getTravelAdvisoryData = async () => {
      const response = await axios.get(
        `https://www.travel-advisory.info/api?countrycode=${countryData.countryCode}`
      );
      console.log(
        "travelAdvisoryResponse",
        response.data.data[capitalisedCountryCode].advisory.score
      );
      setCountryData({
        ...countryData,
        ["travelAdvisoryScore"]:
          response.data.data[capitalisedCountryCode].advisory.score,
      });
    };

    getTravelAdvisoryData();

    // grab news data
    const getNews = async () => {
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: countryData.cityName,
          apiKey: "66a24015f83f414aad84ea0d18eaaccd",
          sources: "bbc-news,cnn",
          pageSize: 5,
          language: "en",
          sortBy: "relevancy",
          searchIn: "content",
        },
      });
      console.log("newsResponse", response.data);
      setNewsData(response.data.articles);
    };

    getNews();
  }, [geodata]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted!");

    if (searchData.length === 0) {
      console.log("no text entered!");
      return;
    }

    const getGeoData = async () => {
      const response = await axios.get(
        "https://api.openweathermap.org/geo/1.0/direct",
        {
          params: {
            appid: "0e8f67bf6ac0e37689d7edea5f37f808",
            limit: 1,
            q: searchData,
          },
        }
      );
      if (response.data.length === 0) {
        console.log("no result found!");
        return;
      }
      console.log(response.data[0]);
      setGeodata({
        ...geodata,
        ["lat"]: response.data[0].lat,
        ["lon"]: response.data[0].lon,
      });
      setCountryData({
        ...countryData,
        ["cityName"]: response.data[0].name,
        ["countryCode"]: response.data[0].country.toLowerCase(),
      });
    };

    console.log("searchData", searchData);

    getGeoData();

    console.log("geoData", geodata);

    // GET image of the city based on search input value
    // uSplash API: https://api.unsplash.com/
    //Access key: 6fEh-7tXr4Bzr12yxHDIN93ZeDnhTWDnRIZ49nxMRtY
    //Secret Key: 6JpWEchohX37O7UTFdTJOSOzw-h2oWcJAMJ1MCvuL9Q
    function getImage() {
      const citySearch = searchData;
      const clientID = "6fEh-7tXr4Bzr12yxHDIN93ZeDnhTWDnRIZ49nxMRtY";
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

    setSearchData("");
  };

  const handleChange = (event) => {
    setSearchData(event.target.value);
  };

  return (
    <main>
      <h1>Landing</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="city"
            placeholder="Enter city..."
            value={searchData}
            onChange={handleChange}
          />
        </form>
        <img alt="city" src={imgUrl} />
        <p>search input: {searchData}</p>
        <p>latitude: {geodata.lat}</p>
        <p>longitude: {geodata.lon}</p>
        <p>weather icon code: {weatherData.icon}</p>
        <p>weather current temp: {weatherData.temp}</p>
        <p>weather current description: {weatherData.description}</p>
        <p>weather timezone: {weatherData.timezone}</p>
        <p>weather timestamp: {weatherData.timestamp}</p>
        <p>city name: {countryData.cityName}</p>
        <p>country code: {countryData.countryCode}</p>
        <p>flag image: {countryData.flagSvgUrl}</p>
        <p>country language: {countryData.language}</p>
        <p>country currency: {countryData.currencyCode}</p>
        <p>country travel advisory score: {countryData.travelAdvisoryScore}</p>
        {newsData.length > 0 ? (
          <ul>
            {newsData.map((article, i) => (
              <li key={i}>
                {article.title}{" "}
                <a href={article.url} target="_blank">
                  link
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No articles</p>
        )}
      </div>
    </main>
  );
}

export default Landing;
