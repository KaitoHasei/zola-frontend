<<<<<<< HEAD
import { Box,Avatar,Textarea,Input,InputGroup, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, VStack } from "@chakra-ui/react";

const FriendModal = ({ isOpen, onClose, friend }) => {
  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      {friend ?
        (<>
          <ModalOverlay />
          <ModalContent pb={5}>
            <ModalHeader>User profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
                <Avatar src={friend.photoUrl} size='xl' style={{ border: '1px solid #008080' }} />
              </Box>
              <Box mb={4} display="flex">
                <Text fontWeight="bold" minWidth={150}>Email :</Text>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    value={friend.email || ""}
                    readOnly={true}
                  />
                </InputGroup>
              </Box>
              <Box mb={4} display="flex">
                <Text fontWeight="bold" minWidth={150}>Display Name :</Text>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    value={friend.displayName}
                    readOnly
                  />
                </InputGroup>
              </Box>
              <Box mb={4} display="flex">
                <Text fontWeight="bold" minWidth={150}>Date of Birth :</Text>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    value={friend.dob}
                    type="date"
                    readOnly
                  />
                </InputGroup>
              </Box>
              <Box>
                <Box display="flex" justifyContent="space-between" pr={7}>
                  <Text fontWeight="bold">Bio:</Text>
                </Box>
                <Textarea
                  value={friend.bio}
                  rows={3}
                  border="1px solid gray"
                  borderRadius="md"
                  resize="none"
                  readOnly
                />
              </Box>
            </ModalBody>
          </ModalContent>
        </>
        ) :
        (<>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Friend Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Text>Không có dữ liệu</Text>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </>
        )
      }
    </Modal>)
=======
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, VStack } from "@chakra-ui/react";

const FriendModal = ({ friend, onClose }) => {
  return (
    <Modal size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Friend Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Text><strong>Name:</strong> {friend.displayName}</Text>
            <Text><strong>Email:</strong> {friend.email}</Text>
            {friend.photoUrl && <Text><strong>Photo URL:</strong> {friend.photoUrl}</Text>}
            {friend.bio && <Text><strong>Bio:</strong> {friend.bio}</Text>}
            {friend.dob && <Text><strong>Date of Birth:</strong> {friend.dob}</Text>}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
>>>>>>> dcbe203ea87d4e75bf037e6d8aea4ca302ff8b20
};

export default FriendModal;
