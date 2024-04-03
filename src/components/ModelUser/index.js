import { post, put } from "#/axios";
import { GlobalContext } from "#/contexts/GlobalContext";
import { Avatar, Box, Button, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

const ModelUser = () => {
  const {user, setUser} = useContext(GlobalContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newAvt, setNewAvt] = useState(null);
  const [edit, setEdit] = useState(false);
  const [avtUrl, setAvtUrl] = useState(user?.photoUrl || "");
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [dob, setDob] = useState(user?.dob);
  const [bio, setBio] = useState(user?.bio || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEdit(true);
  }, [avtUrl, displayName, dob, bio])

  const handleModelClose = () => {
    if (edit) {
      setAvtUrl(user?.photoUrl || "");
      setDisplayName(user?.displayName || "");
      setDob(user?.dob);
      setBio(user.bio);
      setEdit(false);
      onClose();
    }
  }
  const handleChangeAvt = (event) => {
    const selectedAvt = event.target.files[0];
    setNewAvt(selectedAvt);
    const tempAvtUrl = URL.createObjectURL(selectedAvt);
    setAvtUrl(tempAvtUrl);
  };

  const handleUpdateAvt = async () => {
    if(avtUrl !== user.photoUrl) {
      try {
        const response = await post('/users/avatar', newAvt);
        if(response?.status === 200) {
          setAvtUrl(response.photoUrl);
          return true;
        } else
          return false;
      } catch (error) {
        const code = error?.response?.data?.error?.code;
        const message = code ? code.replace("-", " ") : "something went wrong!";
        console.log("error : ", message);
        return false;
      }
    }
  }
  const handleUpdateUserInfo = async() => {
    const upImage = handleUpdateAvt();
    if(upImage) {
      try {
        const data = {
          photoUrl: avtUrl,
          displayName: displayName,
          dob: dob,
          bio: bio
        }
        console.log("Data form : ", data);
        const respone = await put('/users/me', data).finally(()=> {
          setLoading(false);
        })
        if(respone.status === 200) {
          setUser(respone.data.userUpdated);
          console.log("Update suscces : ", respone);
          console.log("New user  : ", respone.data.userUpdated);
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    } else {
      console.log("Error upload image")
    }
    /* onClose(); */
  };
  return (
    <>
      <Avatar src={user?.photoUrl || ""} onClick={onOpen} />
      <Modal isCentered
        onClose={handleModelClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
              <Avatar src={avtUrl} size='xl' style={{ border: '1px solid #008080' }} />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Tooltip label='Change your avatar' fontSize='md'>
                <label htmlFor='avatar-upload'>
                  <Button
                    as='span'
                    size='md'
                    height='25'
                    width='30'
                    colorScheme='gray'
                    borderRadius={3}
                    style={{
                      marginBottom: 5,
                    }}
                  >
                    upload
                  </Button>
                </label>
              </Tooltip>

              <input
                id='avatar-upload'
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleChangeAvt}
              />
            </Box>
            <Box mb={4} display="flex">
              <Text fontWeight="bold" minWidth={150}>Email :</Text>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  value={user?.email || ""}
                  readOnly={true}
                />
              </InputGroup>
            </Box>
            <Box mb={4} display="flex">
              <Text fontWeight="bold" minWidth={150}>Display Name :</Text>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </InputGroup>
            </Box>
            <Box mb={4} display="flex">
              <Text fontWeight="bold" minWidth={150}>Date of Birth :</Text>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  value={dob}
                  type="date"
                  onChange={(e) => setDob(e.target.value)}
                />
              </InputGroup>
            </Box>
            <Box>
              <Box display="flex" justifyContent="space-between" pr={7}>
                <Text fontWeight="bold">Bio:</Text>
              </Box>
              <Textarea
                value={bio}
                rows={3}
                border="1px solid gray"
                borderRadius="md"
                resize="none"
                onChange={(e) => setBio(e.target.value)}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' style={edit?{display:'hiden'}:{}} onClick={handleUpdateUserInfo}>Update profile</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModelUser