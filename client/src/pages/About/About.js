import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
  
const Feature = ({ text, icon, iconBg }) => {
    return (
      <Stack direction={'row'} align={'center'}>
        <Flex
          w={8}
          h={8}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bg={iconBg}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
};
  
export default function SplitWithImage() {
    return (
      <Container maxW={'5xl'} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Heading>About</Heading>
            <Text color={'black'} fontSize={'lg'}>
              Meet the Team
            </Text>
{/* Need to add personal statements */}
            <UnorderedList spacing={4} padding={6}>
                <ListItem>Alex Blanke: super fun and interesting sentence goes here</ListItem>
                <ListItem>Rodin Grajo: super fun and interesting sentence goes here</ListItem>
                <ListItem>Koki Hara: super fun and interesting sentence goes here</ListItem>
                <ListItem>Melissa Hookey: super fun and interesting sentence goes here</ListItem>
                <ListItem>Mayur Patel: super fun and interesting sentence goes here</ListItem>
            </UnorderedList>
          </Stack>
          <Flex>
            <Image
              rounded={'md'}
              alt={'feature image'}
              src={'.../working.jpg'}
              objectFit={'cover'}
            />
          </Flex>
        </SimpleGrid>
      </Container>
    );
}