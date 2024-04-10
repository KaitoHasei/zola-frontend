import { get, post } from '#/axios';
import { Box, Flex, Text, Input, Button, Avatar } from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import CustomAlert from '#/CustomAlert';
import { useNavigate } from "react-router-dom";


const FriendRequest = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('time');
  const [data, setData] = useState([]);
  const [alt, setAlt] = useState(false);
  const [mess, setMess] = useState('');
  const [statusMess, setStatusMess] = useState('info');

  useEffect(() => {
    getFriendRequest();
  }, []);

  const getFriendRequest = async () => {
    try {
      const response = await get("/contacts/get-friends-request");
      if (response.status === 200) {
        setData(response.data);
        console.log("Data requested : ", response.data);
      }
    } catch (error) {
      console.log("Error get list friend requested : ", error);
    }
  }
  const handleAceptFriend = async (id) => {
    try {
      const response = await post("/contacts/acept-request", { id });
      console.log(response)
      if (response.status === 200) {
        setMess('Accept successfully !');
        setStatusMess('success');
        setAlt(true);
        setTimeout(() => {
          setAlt(false);
        }, 1000);
        setData(sortedData.filter(item => item.userId !== id))
      }
    } catch (error) {
      setMess('Error accept !');
      setStatusMess('error');
      setAlt(true);
      setTimeout(() => {
        setAlt(false);
      }, 1000);
    }
  }

  const filteredData = data.filter(item => {
    if (
      item.friend.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.friend.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'time') {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    } else if (sortBy === 'name') {
      return a.friend.displayName.localeCompare(b.friend.displayName);
    }
    return 0;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (type) => {
    setSortBy(type);
  };

  
  return (
    <div style={{ height: '100vh' }}>
      <Box style={{
        borderBottom: '1px solid gray'
      }}>
        <Flex align='center' h="60px" direction='row' color="black" p={5}>
          <Icon icon="mdi:email-plus-outline" width='40px' height='25px' />
          <Text as='b'>Friends request</Text>
        </Flex>
      </Box>
      <Box>
        <Flex align="center" h="60px" direction="row" color="black">
          <Icon icon="bytesize:search" style={{ color: '#fbf9f9' }} />
          <Input
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={handleSearchChange}
            ml={2}
            mr={4}
          />
          <Button
            variant={sortBy === 'time' ? 'solid' : 'outline'}
            onClick={() => handleSortChange('time')}
            mr={2}
          >Sort by time</Button>
          <Button
            variant={sortBy === 'name' ? 'solid' : 'outline'}
            onClick={() => handleSortChange('name')}
          >Sort by name</Button>
        </Flex>
      </Box>
      <Box overflowY="scroll" height="calc(100vh - 120px)">
        <Box bg='teal.20'>
          <Flex bg='teal.20' direction="row">
            {sortedData.length <= 0 ?
              (<Box w='100%' p={5}>
                <Flex justifyContent='center' alignContent='center' >
                  <Text textAlign='center'>Not exists new requirement !</Text>
                </Flex>
              </Box>) :
              (sortedData.map(item => (
                <Box key={item.id} p={4} mt={4} borderRadius="lg" boxShadow="md" bg="white" w='100%'>
                  <Flex justifyContent='center' mx={4}>
                    <Box>
                      <Avatar src={item.friend.photoUrl} style={{ border: '1px solid #008080', maxWidth: '48px', maxHeight: '48px' }} />
                    </Box>
                    <Box flex="1" ml={2}>
                      <Text fontSize="lg" fontWeight="bold">{item.friend.displayName}</Text>
                      <Text fontSize="sm" fontStyle="italic">Email: {item.friend.email}</Text>
                    </Box>
                    <Box flex="1" ml={2}>
                      <Text fontSize="sm" color="gray.500">Sent {moment(item.updatedAt).fromNow()}</Text>
                    </Box>
                    <Button onClick={() => handleAceptFriend(item.userId)} bg="teal.500" color="white" _hover={{ bg: 'teal.600' }}>
                      Acept
                    </Button>
                  </Flex>
                </Box>
              )))
            }
          </Flex>
        </Box>
        <Box px={3}
          style={{
            width: "100%",
            height: '55px',
            position: 'fixed',
            bottom: 0,
            right: '10px',
            zIndex: '9999'
          }}>
          {alt ? (<CustomAlert message={mess} status={statusMess} style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: '9999' }} />) : null}
        </Box>
      </Box>
    </div >
  )
}

export default FriendRequest