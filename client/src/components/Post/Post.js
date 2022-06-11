import {
  Box,
  Center,
  Heading,
  HStack,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Button
} from '@chakra-ui/react';

export default function Post({
  postAuthor, 
  message,
  likes,
  exercises,
  meals,
  tags,
  comments,
  createdAt,
  image
}) {
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        {image &&
          <Box
            h={'210px'}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}>
              <Image
                src={image}
                layout={'fill'}
              />
          </Box>
        }
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            Post
          </Text>
          {/* <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            Boost your conversion rate
          </Heading> */}
          <Text color={'gray.500'}>
            {message}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
            alt={'Author'}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{postAuthor}</Text>
            <Text color={'gray.500'}>{createdAt}</Text>
            <HStack>
              {tags?.map((tag,index) =><Text key={index} color={'blue'}>{tag}</Text>)}
            </HStack>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
};