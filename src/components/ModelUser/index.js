import { useState } from "react"
import { MdEditSquare } from "react-icons/md";
import { MdOutlineEditOff } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { get, post, put } from "#/axios";
const { Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Avatar, Box, Text, Textarea, Input, InputGroup, InputRightElement } = require("@chakra-ui/react")

const ModelUser = ({ user }) => {

  const [edit, setEdit] = useState(false)
  const [avtUrl, setAvtUrl] = useState(user?.photoUrl || "")
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [dob, setDob] = useState(user?.dob || "**/**/****")
  const [bio, setBio] = useState(user?.bio || "")

  const { isOpen, onOpen, onClose } = useDisclosure()

  const updateUser = async (userId, dataChange) =>{
    try {
      const res = await post(`/users/${userId}`, dataChange);
      return res.data;
    } catch(error) {
      throw error;
    }
  }
  const UpdateProfile = async () => {
    const userChange = {
      id: user.id,
      displayName: displayName,
      dob: dob || "**/**/****",
      bio: bio || ""
    }
    updateUser(user.id, userChange)
    .then((res)=> {
      console.log("update succes user : ", res);
      isOpen(false)
    })
    .catch((error)=> {
      console.log("Error update user : ", error)
    })
  }
  const ChangeDisplayName = (envent) => {
    setDisplayName(envent.target.value)
  }
  const ChangeDob = (envent) => {
    setDob(envent.target.value)
  }
  const ChangeBio = (envent) => {
    setBio(envent.target.value)
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
              <Avatar src={avtUrl} size="lg" />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                size='md'
                height='25'
                width='30'
                style={{
                  marginBottom: 5
                }}
              >
                Change
              </Button>
            </Box>
            <Box mb={4} display="flex">
              <Text fontWeight="bold" minWidth={150}>Email :</Text>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  value={user?.email || ""}
                  readOnly={true}
                />
                <InputRightElement width='4.5rem'>
                  {edit ? <MdOutlineEditOff /> : null}
                </InputRightElement>
              </InputGroup>
            </Box>
            <Box mb={4} display="flex">
              <Text fontWeight="bold" minWidth={150}>Display Name :</Text>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  value={displayName}
                  readOnly={!edit}
                  onChange={ChangeDisplayName}
                />
                <InputRightElement width='4.5rem'>
                  {edit ? <CiEdit color="blue" /> : null}
                </InputRightElement>
              </InputGroup>
            </Box>
            <Box mb={4} display="flex">
              <Text fontWeight="bold" minWidth={150}>Date of Birth :</Text>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  value={dob}
                  type={edit ? "date" : "text"}
                  readOnly={!edit}
                  onChange={ChangeDob}
                />
                <InputRightElement width='4.5rem'>
                  {edit ? <CiEdit color="blue" /> : null}
                </InputRightElement>
              </InputGroup>
            </Box>
            <Box>
              <Box display="flex" justifyContent="space-between" pr={7}>
                <Text fontWeight="bold">Bio:</Text>
                {edit ? <CiEdit color="blue" /> : null}
              </Box>
              <Textarea
                value={bio}
                rows={3}
                border="1px solid gray"
                borderRadius="md"
                resize="none"
                readOnly={!edit}
                onChange={ChangeBio}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button backgroundColor="teal.500">
              <MdEditSquare />
              <Text marginLeft={2} verticalAlign="center" onClick={() => { setEdit(!edit) }}>Edit</Text>
            </Button>
            <Button variant='ghost' onClick={UpdateProfile}>Update profile</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModelUser