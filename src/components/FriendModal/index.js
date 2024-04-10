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
};

export default FriendModal;
