import { post } from "#/axios";
import { GlobalContext } from "#/contexts/GlobalContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Stack,
  CheckboxGroup,
  Checkbox,
  Avatar,
  Text,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";

const AddUserGroup = ({ isOpen, conversation, onClose, setConversation }) => {
  const { listFriend } = useContext(GlobalContext);

  const [remainingFriends, setRemainingFriends] = useState([]);
  const [userSearched, setUserSearched] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
    const _listFriend = _.cloneDeep(listFriend);
    const _groupMemberExistId = conversation.participants?.map(({ id }) => id);

    _.remove(
      _listFriend,
      (friend) => _groupMemberExistId?.indexOf(friend.id) >= 0
    );

    setRemainingFriends(_listFriend);
    setUserSearched(_listFriend);
  }, [listFriend, conversation]);

  const handleLiveSearch = (event) => {
    const { value } = event?.target;

    if (!value.trim()) {
      setUserSearched([...remainingFriends]);
      return;
    }

    const filteredData = remainingFriends?.filter((item) => {
      if (
        item?.displayName.toLowerCase().includes(value?.toLowerCase()) ||
        item?.email.toLowerCase().includes(value?.toLowerCase())
      ) {
        return true;
      }
      return false;
    });

    setUserSearched(filteredData);
  };

  const handleSelectUser = (data) => {
    setSelectedUser(data);
  };

  const handleClickAddUser = async () => {
    const response = await post(
      `/conversations/${conversation.id}/group-member`,
      { participantIds: selectedUser }
    );
    const conversationAdded = response.data;

    setConversation(conversationAdded);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box marginBottom="10px">
              <Box>
                <InputGroup>
                  <InputLeftElement pointerEvents={"none"}>
                    <Icon icon="radix-icons:magnifying-glass" />
                  </InputLeftElement>
                  <Input
                    placeholder="Enter name or email"
                    onChange={handleLiveSearch}
                  />
                </InputGroup>
              </Box>
            </Box>
            <Box>
              <Stack maxHeight="350px" padding="0 5px" overflowY="scroll">
                <CheckboxGroup colorScheme="teal" onChange={handleSelectUser}>
                  {userSearched.map((item, index) => (
                    <Checkbox value={item.id}>
                      <Box
                        key={index}
                        padding="10px"
                        display="flex"
                        alignItems="center"
                        _hover={{
                          cursor: "pointer",
                        }}
                      >
                        <Avatar
                          size="sm"
                          src={item?.photoUrl ? item.photoUrl : ""}
                        />
                        <Box marginLeft="10px" flex={1}>
                          <Text>{item?.displayName}</Text>
                        </Box>
                      </Box>
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button ml={3} onClick={handleClickAddUser}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddUserGroup;
