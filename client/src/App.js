import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';

// import { 
//   ApolloClient, 
//   ApolloProvider, 
//   InMemoryCache, 
//   createHttpLink, 
// } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Start from './pages/Start';
import Footer from './components/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Start />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
