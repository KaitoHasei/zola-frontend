import { CONTACT_LIST_FRIEND, CONTACT_LIST_FRIEND_REQUEST, CONTACT_LIST_GROUP } from '#/constances/Active'
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
            <Icon icon="mingcute:contacts-line" width='40px' height='25px'  style={{color: "#23b3a9"}}/>
            <Text >Danh sách bạn bè</Text>
          </Flex>
        </Box>
      </Link>
      <Link to='/list-group'>
        <Box onClick={() => setActive(CONTACT_LIST_GROUP)} cursor='pointer'>
          <Flex align='center' h="60px" direction='row' color="black" bg={active === CONTACT_LIST_GROUP ? "rgba(0, 0, 0, 0.05)" : 'null'} p={5}>
            <Icon icon="iconoir:group" width='40px' height='25px'  style={{color: "#23b3a9"}}/>
            <Text >Danh sách nhóm</Text>
          </Flex>
        </Box>
      </Link>
      <Link to='/list-friend-request'>
        <Box onClick={() => setActive(CONTACT_LIST_FRIEND_REQUEST)} cursor='pointer'>
          <Flex align='center' h="60px" direction='row' color="black" bg={active === CONTACT_LIST_FRIEND_REQUEST ? "rgba(0, 0, 0, 0.05)" : 'null'} p={5}>
            <Icon icon="mdi:email-plus-outline" width='40px' height='25px'  style={{color: "#23b3a9"}}/>
            <Text >Lời mời kết bạn</Text>
          </Flex>
        </Box>
      </Link>
    </div>
  )
}

export default ContactNav