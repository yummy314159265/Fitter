import React from 'react';
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';
import {
    ChakraProvider,
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Center,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { extendTheme } from '@chakra-ui/react';


// would need to add import for forgot password

const theme = extendTheme({
  colors: {
      green: "#9DE183",
      lightblue: "#62929E",
      darkblue: "#546A7B",
      grey: "#393D3F",
      black: "#000",
      white: "#FFF"
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
});

export default function SimpleCard() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  })

  return (
    <ChakraProvider theme={theme}>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            {/* add link to homepage where features of site are listed */}
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'grey')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  variant='filled'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input 
                  id='password'
                  name='password'
                  type='password'
                  variant='filled'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox 
                    id='remember'
                    name='remember'
                    onChange={formik.handleChange}
                    isChecked={formik.values.remember}
                  >
                    Remember me
                  </Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                  {/* forgot password option - no link yet - send user and email with password? */}
                </Stack>
                <Button
                  type='submit'
                  bg={'green'}
                  color={'black'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
                <Stack spacing={2} align={'center'} maxW={'md'} w={'full'}>
                  {/* Facebook */}
                  <Button w={'full'} colorScheme={'facebook'} leftIcon={<FaFacebook />}>
                    <Center>
                      <Text>Continue with Facebook</Text>
                    </Center>
                  </Button>

                  {/* Google */}
                  <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
                    <Center>
                      <Text>Sign in with Google</Text>
                    </Center>
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </ChakraProvider>
  );
}