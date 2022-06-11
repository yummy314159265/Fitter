import React, { useState } from 'react';

import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Stack,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    VStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
  } from '@chakra-ui/react';
  import {
    MdEmail,
    MdLocationOn,
    MdFace,
  } from 'react-icons/md';
  import { validateEmail } from '../../utils/helpers'

  export default function Contact() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const validateIsName = () => {
      if(!name) {
        setErrorMessage('name is required!');
      }
    }
    const validateIsEmail = () => {
      if (!validateEmail(email)) {
        setErrorMessage('Your email is Invalid!');
      }
    }
    const validateIsMessage = () => {
      if(!message) {
        setErrorMessage('message is required!');
      }
    }
    const handleFormSubmit = (e) => {    
      e.preventDefault();
      
      // validate form
      if(!name) {
        setErrorMessage('name is required!');
        return;
      }
      if (!validateEmail(email)) {
        setErrorMessage('Your email is Invalid!');
        return;
      }
      if(!message) {
        setErrorMessage('message is required!');
        return;
      }
      // successful
      setName('');
      setEmail('');
      setMessage('');
      setErrorMessage('');
      setSuccessMessage('Thank you for reaching out.');
    }  
    return (
      <Container bg="lightgrey" maxW="full" mt={0} centerContent overflow="hidden">
        <Flex>
          <Box
            bg="lightgreen"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}>
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Heading >Contact Us</Heading>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="black">
                      Fill out the form below to contact
                    </Text>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack pl={0} spacing={3} alignItems="flex-start">
                        <Button
                          size="md"
                          height="48px"
                          width="300px"
                          variant="solid"
                          bg="white"
                          color="black"
                          _hover={{ border: '2px solid darkgreen' }}
                          leftIcon={<MdEmail color="black" size="20px" />}>
                          Project3Fitness@gmail.com
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="300px"
                          variant="solid"
                          bg="white"
                          color="black"
                          _hover={{ border: '2px solid darkgreen' }}
                          leftIcon={<MdLocationOn color="black" size="20px" />}>
                          Austin, Texas
                        </Button>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={8} color="#0B0E3F">
                      <VStack spacing={5}>
                      <form onSubmit={handleFormSubmit}>
                        <FormControl id="name">
                          <FormLabel>Your Name</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<MdFace color="black"
                            />}
                            />
                            <Input type="text"
                            id="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}    
                            size="md" />
                          </InputGroup>
                        
                        
                          <FormLabel name="email">Email</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<MdEmail color="black"
                            />}
                            />
                            <Input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size="md" />
                          </InputGroup>
                        
                        
                          <FormLabel name="message">Message</FormLabel>
                          <Textarea
                            borderColor="gray.300"
                            _hover={{
                              borderRadius: 'gray.300',
                            }}
                            placeholder=" "
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            id="message" 
                          />
                        </FormControl>
{/* need to add onsubmit for send message btn */}
                        <FormControl id="name" float="right">
                          <Button
                            mt={3}
                            type='submit'
                            variant="solid"
                            bg="darkgreen"
                            color="white"
                            _hover={{}}>
                            Send Message
                          </Button>
                        </FormControl>
                        </form>
                        {errorMessage && (
                        <Stack spacing={3}>
                            <Alert status='error'>
                            <AlertIcon />
                            {errorMessage}
                          </Alert>
                          </Stack>  
                          )} 
                          {successMessage && (
                        <Stack spacing={3}>
                            <Alert status='success'>
                            <AlertIcon />
                            {successMessage}
                          </Alert>
                          </Stack>  
                          )} 
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
    );
}