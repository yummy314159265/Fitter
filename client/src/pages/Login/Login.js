import React  from 'react';
import {
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

import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';
// would need to add import for forgot password

export default function SimpleCard() {
  const [login, { error}] = useMutation(LOGIN_USER);

  const formik =  useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    onSubmit: async (values) => {
      // funciton that happens on submit, will change to mutations when we have it set up  
       // alert(JSON.stringify(values, null, 2));    
      try {
        const { data } = await login({
          variables: { email: values.email, password: values.password },
        });
        Auth.login(data.login.token);

      } catch (e) {
        console.error(e);
      }
    }
  })

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Log in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
            {/* add link to homepage where features of site are listed */}
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            {/* Use this to make a form */}
            <form onSubmit={(e)=>{ 
              e.preventDefault(); 
              formik.handleSubmit(e);
            }}>
              <FormControl>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  variant='filled'
                  // use handlechange, variable name is same as variable above
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
                  <Link color={'darkgreen'}>Forgot password?</Link>
                  {/* forgot password option - no link yet - send user and email with password? */}
                </Stack>
                <Button
                // Need type='submit' here for formik
                  type='submit'
                  bg={'green'}
                  color={'white'}
                  _hover={{
                    bg: 'darkgreen',
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
                      <Text>Log in with Google</Text>
                    </Center>
                  </Button>
                </Stack>
              </Stack>
            </form>
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}