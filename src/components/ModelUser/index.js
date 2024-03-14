import { useNavigate } from "react-router-dom"

const { Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Image, Avatar, Box, Text, Textarea } = require("@chakra-ui/react")

const ModelUser = ({ user }) => {
  const navigate = useNavigate()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const SwitchToUpdateProfile = () => {
    /* update user */
  }
  return (
    <>
      <Avatar src={user?.photoUrl || ""} onClick={onOpen} />
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
              <Avatar src={user?.photoUrl || ""} size="lg" />
            </Box>
            <Box mb={4} display="flex">
              <Text fontWeight="bold" minWidth={150}>Display name:</Text>
              <Text>{user?.displayName || ""}</Text>
            </Box>
            <Box mb={4} display="flex">
              <Text fontWeight="bold" minWidth={150}>Email :</Text>
              <Text>{user?.email || ""}</Text>
            </Box>
            <Box mb={4} display="flex">
              <Text fontWeight="bold" minWidth={150}>Date of Birth :</Text>
              <Text>{user?.dob || "**/**/****"}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Bio:</Text>
              <Textarea
              value={user?.bio || ""}
              rows={3}
              border="1px solid gray"
              borderRadius="md"
              resize="none"
              readOnly
            />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={SwitchToUpdateProfile}>Update profile</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModelUser