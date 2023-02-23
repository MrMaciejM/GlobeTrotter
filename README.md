<a name="top"></a>

# GlobeTrotter

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white) ![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue) ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) <img alt='moment.js badge' src='https://shields.io/badge/Moment.js-grey?logo=appveyor&style=for-the-badge'> ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)

![Globe Trotter Homepage](./public/images/globe-trotter-home-nav.png)

## Description

Globe Trotter was created to be a companion app for travellers. It includes a currency conversion tool, a translation tool which detects the input language and converts to English,   and an information tool which allows users to search for cities and see various information, such as the current time, weather, emergency services number and third party links to a selection of news articles. 

## Table of contents


- [User Story](#User-Story)
- [Acceptance Criteria](#Acceptance-Criteria)
- [Getting Started](#getting-started)
- [What I Learned](#what-we-learned)
- [Selected Features](#selected-features)
- [Limitations and Future Enhancements](#limitations-and-future-enhancements)
- [Contribution](#contribution)
- [Credits](#credits)
- [Licence](#licence)

## User Story

```
As a travel enthusiast, I want convenient access to resources that simplify my journey, so that I can have a stress-free holiday experience and be well prepared for any disruptions.
```

## Acceptance Criteria

```
GIVEN a travel-oriented web application

WHEN the page loads
THEN I am presented with the following with a polished and responsive UI:
An inspiring banner that gives me confidence in the app
The ability to search for a city
Information about the city I recently searched and the ability to clear searched city
Get some popular travel ideas
The ability to navigate easily between pages

WHEN I search for a city
THEN the city is saved and I am presented with the following information:
City name and country
Current weather
Current time and date
Local emergency services number
News relating to the city

WHEN I navigate to the translation page
THEN I am presented with a form that will allow me to submit  text in a foreign language and receive the english translation and what language the original text is in. The recent translation details also have to persist between page loads.

WHEN I navigate to the currency convertor page
THEN I am presented with a form that will allow me to submit the amount and currencies to convert, and receive the converted amount and the conversion rate. This data along with the date of the information has to be stored on my device and persist between page loads for recent queries.

WHEN I try to access a page that does not exist
THEN I am informed that the page does not exist, but also feel more connected with the application’s branding.

```

## Getting started

Download or clone the repository which can be found [here on GitHub](https://github.com/MrMaciejM/GlobeTrotter) and run the following command to install required dependancies

```
npm i
```

If you are new to React it is recommended to review the [React README](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md). 

To access the deployed application visit the [Globe Trotter app](https://globetrotterreact.netlify.app/) 


## Selected Features

### Translation tool

![Translation Tool](./public/images/translation.gif)

The translation tool allows users to input words or phrases for translation. The app detects the language of the text and translates to English. Previous searches are saved to local storage and displayed in a tabular format. 

### Currency Conversion

![Translation Tool](./public/images/currency.gif)

The currency conversion tool allows users to input a numeric value and the currencies to convert from and too. One submitted the amount, vonverted value and exchange rate are displayed in tabular format.

### City Search

![City Search](./public/images/city-search.gif)

The city search tool allows users to input a city name and retrieve information such as the local time, weather and emergency services phone number as well as an image related to the city and a selection of third party links to news articles.

## Limitations and Future Enhancements

### Current Limitations

- Currency converter tool will only return results if a recognised short form currency code is used (e.g. USD)
- Translation tool currently only translates into English

### Future Enhancements

- Allow users to search using the country name if they do not know the country's currency
- Allow translation from English to a user selected language

## Contribution

If you're excited about this project and want to get involved, that'd be awesome! Here are a few ways you can contribute:

1. Fork the repository and create a pull request with your changes.
2. Submit an issue to report bugs or request new features.
3. Help improve the documentation.

Please follow the guidelines for contributions:

- Make sure your code is well-documented and follows the same style as the rest of the codebase.
- Keep pull requests small and focused on a single change.
- Include test cases for any new features or changes.

If you have any questions or suggestions, feel free to contact us via [email](mailto:example@email.com).

## Credits

## Licence

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


Copyright (c) 2023 React Wizards
<p align="right">
  <a href="#top">Back to top</a>
</p>