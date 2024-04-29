import { Box, Avatar, Text, Button, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";

const UserSearched = ({ friendControls, isFriend, user, onClick }) => {
  return (
    <Box
      padding="10px"
      display="flex"
      alignItems="center"
      borderRadius="15px"
      _hover={{
        cursor: "pointer",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
      }}
      onClick={() => onClick(user)}
    >
      <Avatar src={user?.photoUrl ? user.photoUrl : ""} />
      <Box marginLeft="10px" flex={1}>
        <Text>{user?.displayName}</Text>
      </Box>
      {friendControls && (
        <Flex gap={1}>
          {!isFriend ? (
            <Button>Add</Button>
          ) : (
            <Button colorScheme="blue">Info</Button>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default UserSearched;

UserSearched.propTypes = {
  friendControls: PropTypes.bool,
  isFriend: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    photoUrl: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

UserSearched.defaultProps = {
  friendControls: false,
  isFriend: true,
  user: {
    id: "",
    displayName: "",
    photoUrl: "",
  },
  onClick: () => {},
};
