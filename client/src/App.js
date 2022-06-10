import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from "./Theme";
import { 
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache, 
  createHttpLink, 
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Start from './pages/Start';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Posts from './pages/Timeline';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Contact from './pages/Contact';
import About from './pages/About';
import FoodSearch from './components/FoodSearch';
import Meals from './pages/MealPlan';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
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
            path="/profile/edit"
            element={<EditProfile />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route 
            path="/posts"
            element={<Posts />}
          />
          <Route 
            path="/contact" 
            element={<Contact />} 
          />
          <Route 
            path="/about" 
            element={<About />} 
          />
          <Route 
            path="/food-search"
            element={<FoodSearch />}
          />
          <Route
            path="/meal-plan"
            element={<Meals />}
          />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
