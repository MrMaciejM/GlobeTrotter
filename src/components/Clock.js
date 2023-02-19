import { useEffect, useState } from 'react';
import moment from 'moment';
import { Text } from '@chakra-ui/react';

function Clock({ timezone }) {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const localTime = moment().utcOffset(timezone / 60);
    const timeString = localTime.format('D MMM, HH:mm:ss');
    setTimeString(timeString);
    const timer = setInterval(() => {
      const localTime = moment().utcOffset(timezone / 60);
      const timeString = localTime.format('D MMM, HH:mm:ss');
      setTimeString(timeString);
    }, 1000);

    return () => clearInterval(timer);
  });
  return <Text fontSize='2xl'>{timeString}</Text>;
}

export default Clock;
