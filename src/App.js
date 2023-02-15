import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Currency from './components/pages/Currency';
import Landing from './components/pages/Landing';
import Landmarks from './components/pages/Landmarks';
import Translate from './components/pages/Translate';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='translate' element={<Translate />} />
        <Route path='currency' element={<Currency />} />
        <Route path='landmarks' element={<Landmarks />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
