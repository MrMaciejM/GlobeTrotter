import { useState } from 'react';
import { useForm } from 'react-hook-form';

import supportedlan from '../supportedLanguages.json';
import translationIcon from '../icons/translation.gif';
import { setLocalStorage_RecentTranslations } from '../helperFuncs/setLocalStorage';
import RecentTranslationsTable from '../RecentTranslationsTable';

import {
  Heading,
  SimpleGrid,
  Textarea,
  Box,
  Container,
  Button,
  Text,
  Card,
  CardHeader,
  CardBody,
  Center,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

console.log(supportedlan);
// setLocalStorage("test-text-?","test-lang-?", "test-?"); //debugging

function Translate() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [translatedText, setTranslatedText] = useState('');

  const [detectedLang, setDetectedLang] = useState('');

  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  const [tableData, setTableData] = useState(
    JSON.parse(localStorage.getItem('RecentTranslations')) || []
  );

  const onSubmit = (data) => {
    setIsLoadingBtn(true);

    console.log(data);

    const originalText = data.textRequired;

    const encodedParams = new URLSearchParams();
    encodedParams.append('q', data.textRequired);
    encodedParams.append('format', 'text');
    encodedParams.append('target', 'en');

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '48a0d43aa1mshab67cd21df07bc0p10c985jsn572f9f125bb3',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
      },
      body: encodedParams,
    };

    fetch(
      'https://google-translate1.p.rapidapi.com/language/translate/v2',
      options
    )
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);

        const resultObj = supportedlan.text.find(
          (obj) =>
            obj.code ===
            responseData.data.translations[0].detectedSourceLanguage
        );
        const supportedLanuage =
          resultObj.language || 'Unable to find language name';
        const returnedTranslation =
          responseData.data.translations[0].translatedText;
        const updatedTableData = setLocalStorage_RecentTranslations(
          originalText,
          supportedLanuage,
          returnedTranslation
        );

        setTimeout(() => {
          setTranslatedText(returnedTranslation);
          setDetectedLang(supportedLanuage);
          setIsLoadingBtn(false);
          setTableData(updatedTableData);
        }, 5000);
      })
      .catch((err) => console.error(err));
  };

  console.log(watch('textRequired'));

  return (
    <motion.Container
      size='md'
      p='10px'
      maxW='100vw'
      as='main'
      initial={{ opacity: 0, x: '-100vw' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, type: 'spring' }}
      mr='10px'
      bg='purple'
    >
      <Heading as='h2' mb='8' textAlign='center'>
        LingoLens
      </Heading>

      <SimpleGrid columns={[1, 2]} spacingX='40px'>
        <Box m='2'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              px='2'
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <Textarea
                size='md'
                maxW='400px'
                placeholder='Enter text here to translate'
                {...register('textRequired', { required: true })}
              />
              <Text
                whileHover={{ scale: 1 }}
                color='red'
                visibility={errors.textRequired ? 'visible' : 'hidden'}
              >
                You must provide some text to translate!
              </Text>
              <Button
                colorScheme='whiteAlpha'
                maxW='350px'
                isLoading={isLoadingBtn}
                loadingText='Retrieving data'
                spinnerPlacement='end'
                my='5'
                type='submit'
                value='Translate'
                spinner={
                  <img
                    style={{ maxHeight: '3ch' }}
                    src={translationIcon}
                    alt='loading'
                  />
                }
              >
                Translate
              </Button>
            </Box>
          </form>
        </Box>
        <Card
          mx='auto'
          w='100%'
          h='100%'
          maxW='500px'
          bg='whiteAlpha.700'
          display='flex'
          flexDirection='column'
          justifyContent='start'
          alignItems='center'
        >
          {translatedText ? (
            <>
              <CardHeader>
                <Heading size='md'>Detected language: {detectedLang}</Heading>
              </CardHeader>
              <CardBody>
                <Text>{translatedText}</Text>
              </CardBody>
            </>
          ) : (
            <CardBody>
              <Text>Enter some text to translate.</Text>
            </CardBody>
          )}
        </Card>
      </SimpleGrid>
      <Center mx='auto' my='10' maxW='800px'>
        <RecentTranslationsTable tableData={tableData} />
      </Center>
    </motion.Container>
  );
}

export default Translate;
