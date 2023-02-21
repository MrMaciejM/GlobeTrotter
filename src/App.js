import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

import Currency from './components/pages/Currency';
import Landing from './components/pages/Landing';
import Landmarks from './components/pages/Landmarks';
import Translate from './components/pages/Translate';
import PageNotFound from './components/pages/PageNotFound';

import { ChakraProvider } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <>
      <ChakraProvider>
        <Header />
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.key}>
            <Route path='/' element={<Landing />} />
            <Route path='translate' element={<Translate />} />
            <Route path='currency' element={<Currency />} />
            <Route path='landmarks' element={<Landmarks />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default App;
