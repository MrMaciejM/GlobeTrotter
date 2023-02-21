<a name="top"></a>

# Globe Trotter

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white) ![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue) ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) <img alt='moment.js badge' src='https://shields.io/badge/Moment.js-grey?logo=appveyor&style=for-the-badge'> ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)

![Globe Trotter Homepage](./public/images/globe-trotter-home-nav.png)

## Description

Globe Trotter was created to be a companion app for travellers. It includes a currency conversion tool, a translation tool which detects the input language and converts to English,   and an information tool which allows users to search for cities and see various information, such as the current time, weather, emergency services number and third party links to a selection of news articles. 

## Table of contents

- [Getting Started](#getting-started)
- [What I Learned](#what-we-learned)
- [Selected Features](#selected-features)
- [Limitations and Future Enhancements](#limitations-and-future-enhancements)
- [Contribution](#contribution)
- [Credits](#credits)
- [Licence](#licence)

## Getting started

Download or clone the repository which can be found [here on GitHub](https://github.com/MrMaciejM/travel-planner) and run the following command to install required dependancies

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

![Translation Tool](./public/images/)  <!--- gif to be added once api call is fixed

The currency conversion tool allows users to input a numeric value and the currencies to convert from and too. One submitted the amount, vonverted value and exchange rate are displayed in tabular format.

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

If you have any questions or suggestions, feel free to contact me via [email](mailto:address@email.co).

## Credits

List of credits with links goes here

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