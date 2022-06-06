import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  );
}

export default App;
