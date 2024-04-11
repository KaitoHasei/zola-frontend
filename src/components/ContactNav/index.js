<<<<<<< HEAD
<<<<<<< HEAD
import { CONTACT_LIST_FRIEND, CONTACT_LIST_FRIEND_REQUEST, CONTACT_LIST_GROUP, CONTACT_LIST_REQUESTED } from '#/constances/Active'
=======
import { CONTACT_LIST_FRIEND, CONTACT_LIST_FRIEND_REQUEST, CONTACT_LIST_GROUP } from '#/constances/Active'
>>>>>>> 14f6023530e8d0c1b7768df3b6babff47183d768
=======
import { CONTACT_LIST_FRIEND, CONTACT_LIST_FRIEND_REQUEST, CONTACT_LIST_GROUP, CONTACT_LIST_REQUESTED } from '#/constances/Active'
>>>>>>> dcbe203ea87d4e75bf037e6d8aea4ca302ff8b20
import { Box, Flex, Text } from '@chakra-ui/react'
import { Icon } from '@iconify-icon/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function ContactNav() {
  const [active, setActive] = useState(CONTACT_LIST_FRIEND)

  return (
    <div>
      <Link to='/list-friend'>
        <Box onClick={() => setActive(CONTACT_LIST_FRIEND)} cursor='pointer'>
          <Flex align='center' h="60px" direction='row' color="black" bg={active === CONTACT_LIST_FRIEND ? "rgba(0, 0, 0, 0.05)" : 'null'} p={5}>
<<<<<<< HEAD
<<<<<<< HEAD
            <Icon icon="mingcute:contacts-line" width='40px' height='25px' style={{ color: "#23b3a9" }} />
            <Text >Friends List</Text>
          </Flex>
        </Box>
      </Link>
      <Link to='/list-friend-request'>
        <Box onClick={() => setActive(CONTACT_LIST_FRIEND_REQUEST)} cursor='pointer'>
          <Flex align='center' h="60px" direction='row' color="black" bg={active === CONTACT_LIST_FRIEND_REQUEST ? "rgba(0, 0, 0, 0.05)" : 'null'} p={5}>
            <Icon icon="mdi:email-plus-outline" width='40px' height='25px' style={{ color: "#23b3a9" }} />
            <Text >Pending Friend Requests</Text>
          </Flex>
        </Box>
      </Link>
      <Link to='/list-sented-friend'>
        <Box onClick={() => setActive(CONTACT_LIST_REQUESTED)} cursor='pointer'>
          <Flex align='center' h="60px" direction='row' color="black" bg={active === CONTACT_LIST_REQUESTED ? "rgba(0, 0, 0, 0.05)" : 'null'} p={5}>
            <Icon icon="material-symbols-light:schedule-send-outline-rounded" width='40px' height='25px' style={{ color: "#23b3a9" }} />
            <Text>Sent Friend Requests List</Text>
=======
            <Icon icon="mingcute:contacts-line" width='40px' height='25px'  style={{color: "#23b3a9"}}/>
            <Text >Danh sách bạn bè</Text>
>>>>>>> 14f6023530e8d0c1b7768df3b6babff47183d768
          </Flex>
        </Box>
      </Link>
      <Link to='/list-group'>
        <Box onClick={() => setActive(CONTACT_LIST_GROUP)} cursor='pointer'>
          <Flex align='center' h="60px" direction='row' color="black" bg={active === CONTACT_LIST_GROUP ? "rgba(0, 0, 0, 0.05)" : 'null'} p={5}>
<<<<<<< HEAD
            <Icon icon="iconoir:group" width='40px' height='25px' style={{ color: "#23b3a9" }} />
            <Text >Friends group list</Text>
=======
            <Icon icon="iconoir:group" width='40px' height='25px'  style={{color: "#23b3a9"}}/>
            <Text >Danh sách nhóm</Text>
=======
            <Icon icon="mingcute:contacts-line" width='40px' height='25px' style={{ color: "#23b3a9" }} />
            <Text >Friends List</Text>
>>>>>>> dcbe203ea87d4e75bf037e6d8aea4ca302ff8b20
          </Flex>
        </Box>
      </Link>
      <Link to='/list-friend-request'>
        <Box onClick={() => setActive(CONTACT_LIST_FRIEND_REQUEST)} cursor='pointer'>
          <Flex align='center' h="60px" direction='row' color="black" bg={active === CONTACT_LIST_FRIEND_REQUEST ? "rgba(0, 0, 0, 0.05)" : 'null'} p={5}>
<<<<<<< HEAD
            <Icon icon="mdi:email-plus-outline" width='40px' height='25px'  style={{color: "#23b3a9"}}/>
            <Text >Lời mời kết bạn</Text>
>>>>>>> 14f6023530e8d0c1b7768df3b6babff47183d768
=======
            <Icon icon="mdi:email-plus-outline" width='40px' height='25px' style={{ color: "#23b3a9" }} />
            <Text >Pending Friend Requests</Text>
          </Flex>
        </Box>
      </Link>
      <Link to='/list-sented-friend'>
        <Box onClick={() => setActive(CONTACT_LIST_REQUESTED)} cursor='pointer'>
          <Flex align='center' h="60px" direction='row' color="black" bg={active === CONTACT_LIST_REQUESTED ? "rgba(0, 0, 0, 0.05)" : 'null'} p={5}>
            <Icon icon="material-symbols-light:schedule-send-outline-rounded" width='40px' height='25px' style={{ color: "#23b3a9" }} />
            <Text>Sent Friend Requests List</Text>
          </Flex>
        </Box>
      </Link>
      <Link to='/list-group'>
        <Box onClick={() => setActive(CONTACT_LIST_GROUP)} cursor='pointer'>
          <Flex align='center' h="60px" direction='row' color="black" bg={active === CONTACT_LIST_GROUP ? "rgba(0, 0, 0, 0.05)" : 'null'} p={5}>
            <Icon icon="iconoir:group" width='40px' height='25px' style={{ color: "#23b3a9" }} />
            <Text >Friends group list</Text>
>>>>>>> dcbe203ea87d4e75bf037e6d8aea4ca302ff8b20
          </Flex>
        </Box>
      </Link>
    </div>
  )
}

export default ContactNav