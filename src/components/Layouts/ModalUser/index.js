import { useCallback, useContext, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  Box,
  Avatar,
  Editable,
  EditablePreview,
  Input,
  EditableInput,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";

import { patch } from "#/axios";
import { GlobalContext } from "#/contexts/GlobalContext";

import EditableControls from "#/components/EditableControls";

const ModalUser = ({ isOpen, user, onClose }) => {
  const toast = useToast();

  const { setUser } = useContext(GlobalContext);
  const avatarInputRef = useRef(null);

  const handleEditName = useCallback(
    (value) => {
      if (!value.trim()) return;

      patch("/users/me", { displayName: value })
        .then((response) => {
          if (response.status === 200)
            toast({
              title: "Update name success!",
              position: "top-right",
              status: "success",
              isClosable: true,
            });

          setUser(response.data);
        })
        .catch((error) => {
          toast({
            title: "Update name error!",
            position: "top-right",
            status: "error",
            isClosable: true,
          });
        });
    },
    [toast, setUser]
  );

  const handleClickChangeAvatar = () => {
    avatarInputRef.current.click();
  };

  const handlePickImage = (event) => {
    const _image = event.target.files[0];
    const formData = new FormData();

    event.target.value = "";

    formData.append("avatar", _image);

    patch("/users/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 200)
          toast({
            title: "Update name success!",
            position: "top-right",
            status: "success",
            isClosable: true,
          });

        setUser(response.data);
      })
      .catch((error) => {
        toast({
          title: "Update name error!",
          position: "top-right",
          status: "error",
          isClosable: true,
        });
      });
  };

  const renderEditName = useMemo(() => {
    return (
      <Editable
        key={user?.id}
        // textAlign="center"
        defaultValue={user?.displayName}
        // fontSize="2xl"
        isPreviewFocusable={false}
        submitOnBlur={false}
        onSubmit={handleEditName}
      >
        <Box textAlign="center">
          <EditablePreview />
          {/* Here is the custom input */}
          <Input as={EditableInput} padding="10px" />
          <EditableControls />
        </Box>
      </Editable>
    );
  }, [user, handleEditName]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack alignItems="center">
            <Box position="relative">
              <Avatar src={user?.photoUrl ? user.photoUrl : ""} />
              <IconButton
                position="absolute"
                right="-10px"
                bottom="-5px"
                size="sm"
                variant="unstyle"
                fontSize="25px"
                color="teal.500"
                borderRadius="100%"
                icon={<Icon icon="material-symbols-light:camera" />}
                onClick={handleClickChangeAvatar}
              />
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                hidden={true}
                onChange={handlePickImage}
              />
            </Box>
            <Box>{renderEditName}</Box>
          </Stack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUser;

ModalUser.propTypes = {
  isOpen: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    photoUrl: PropTypes.string,
  }),
  onClose: PropTypes.func,
};

ModalUser.defaultProps = {
  isOpen: false,
  user: {},
  onClose: () => {},
};
