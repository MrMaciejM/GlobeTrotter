import { useEffect, useState } from 'react';
import moment from 'moment';
import { Text, Stack } from '@chakra-ui/react';

function Clock({ timezone }) {
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const localTime = moment().utcOffset(timezone / 60);
    const timeString = localTime.format('HH:mm');
    const dateString = localTime.format('D MMM');
    setTimeString(timeString);
    setDateString(dateString);
    const timer = setInterval(() => {
      const localTime = moment().utcOffset(timezone / 60);
      const timeString = localTime.format('HH:mm');
      const dateString = localTime.format('D MMM');
      setTimeString(timeString);
      setDateString(dateString);
    }, 1000);

    return () => clearInterval(timer);
  });
  return (
    <Stack align='center'>
      <Text className='timeElement' fontSize='2xl'>
        {timeString}
      </Text>
      <Text className='timeElement' fontSize='sm'>
        {dateString}
      </Text>
    </Stack>
  );
}

export default Clock;
