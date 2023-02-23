import { Box, Text, Card, Image } from '@chakra-ui/react';
import currencyCardBg from './images/currencyCardBg.jpg';

import exchangeIcon from './icons/exchange.gif';

function CurrencyConversionCard({
  fromCurrency,
  toCurrency,
  amount,
  result,
  exRate,
  isLoading,
}) {
  const gradient =
    'radial-gradient(circle, rgba(130, 130, 130, 0.2) 0%, rgba(150, 150, 150, 0.7) 70%)';
  const bgImage = currencyCardBg;
  const cardBg = `${gradient}, url(${bgImage})`;

  return (
    <Card
      display='flex'
      justifyContent='space-around'
      minH='55%'
      minW='320px'
      mb='100'
      p={4}
      bgImage={cardBg}
      bgRepeat='no-repeat'
      bgPosition='center'
      bgSize='cover'
    >
      {result && (
        <Box>
          <Box>
            <Text fontWeight='bold' mb={2}>
              {fromCurrency} to {toCurrency}
            </Text>
            <Text fontSize='4xl' mb={4} fontWeight='black'>
              {result}
            </Text>
          </Box>
          <Box display='flex' justifyContent='space-between'>
            <Text fontSize='lg' fontWeight='semibold' mx={2}>
              {amount} {fromCurrency}
            </Text>
            <Text fontSize='lg' fontWeight='extrabold' mx={2} textAlign='end'>
              1 {fromCurrency} = {exRate} {toCurrency}
            </Text>
          </Box>
        </Box>
      )}
      {isLoading && (
        <Image
          alignSelf='center'
          justifySelf='center'
          height='100px'
          width='100px'
          src={exchangeIcon}
        />
      )}
    </Card>
  );
}

export default CurrencyConversionCard;
