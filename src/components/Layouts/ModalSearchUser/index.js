import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Input,
  Button,
  Flex,
  Stack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import UserSearched from "../SearchResult";

const ModalSearchUser = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Friend</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Flex gap={2}>
              <Input placeholder="email" />
              <Button>Search</Button>
            </Flex>

            <Stack mt={3}>
              <UserSearched />
            </Stack>
          </Box>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalSearchUser;

ModalSearchUser.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

ModalSearchUser.defaultProps = {
  isOpen: false,
  onClose: () => {},
};
