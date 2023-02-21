import { Center } from '@chakra-ui/layout';
import LandingCard from './LandingCard';

import { onValue } from '@firebase/database';
import { getData } from './helperFuncs/readData';
import { useEffect, useState } from 'react';

function CommunityLandingCard() {
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    onValue(
      getData,
      (snap) => {
        const dataMessage = snap.val();
        console.log(dataMessage);
        setCurrentMessage(dataMessage);
      },
      []
    );
  });

  return (
    <Center>
      <LandingCard
        title='Latest pick from our users!'
        description={currentMessage}
        image='lostInTheJungle.jpg'
        moreinfo=''
        footerinfo='Powered by Firebase Realtime Database'
      />
    </Center>
  );
}

export default CommunityLandingCard;
