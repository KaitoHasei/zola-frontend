import { useState, useEffect } from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { MdTimer } from 'react-icons/md';

const Countdown = () => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          clearInterval(intervalId);
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Flex align="center" justify="center" direction="column" marginBottom={50} marginTop={50}>
      <Icon as={MdTimer} boxSize={8} color="blue.500" />
      <Text fontSize="3xl" mt={2}>{seconds}s</Text>
      <Text marginBottom={50}>The verification link has been sent to your email.</Text>
    </Flex>
  );
};

export default Countdown;