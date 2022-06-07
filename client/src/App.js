import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import Login from './pages/Login';
import Signup from './pages/Signup';
import Posts from './pages/Timeline';
import Profile from './pages/Profile';
import CreateExercisePlan from './components/CreateExercisePlan';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={<Start />} 
          />
          <Route 
            path="/login" 
            element={<Login />} 
          />
          <Route 
            path="/signup" 
            element={<Signup />} 
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/createWorkout"
            element={<CreateExercisePlan />}
          />
          <Route 
            path="/posts"
            element={<Posts />}
            />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
    
  );
}

export default App;
