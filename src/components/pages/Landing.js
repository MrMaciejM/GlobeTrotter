import { SimpleGrid, Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import LandingCard from '../LandingCard.js';
import landingcarddata from '../landingCardsData.json';
import CommunityLandingCard from '../CommunityLandingCard.js';
import '../../styles.css';
import HeroBanner from '../HeroBanner.js';
import LocalInfo from '../LocalInfo.js';

const containerVariants = {
  hidden: {
    opacity: 0,
    y: '30px',
  },
  visible: {
    opacity: 1,
    y: 1,
    transition: {
      delay: 0.3,
      duration: 0.2,
    },
  },
  exit: {
    x: '-100vw',
    transition: {
      ease: 'easeInOut',
    },
  },
};

function Landing() {
  return (
    <motion.main
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <Center>
        <HeroBanner />
      </Center>

      <SimpleGrid
        mx='auto'
        maxW='1600px'
        p='5'
        minChildWidth='290px'
        columns={[1, 2, 4]}
        spacingX='15px'
        spacingY='20px'
      >
        {landingcarddata.map((data, i) => (
          <Center key={i}>
            <LandingCard
              title={data.title}
              description={data.description}
              image={data.image}
              moreinfo={data.moreinfo}
            />
          </Center>
        ))}
        <CommunityLandingCard />
      </SimpleGrid>
      <LocalInfo />
    </motion.main>
  );
}

export default Landing;
