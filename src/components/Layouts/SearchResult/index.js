import { Box, Avatar, Text } from "@chakra-ui/react";

const UserSearched = ({ user, onAddFriend }) => {
  return (
    <Box
      padding="10px"
      margin="10px"
      display="flex"
      alignItems="center"
      borderRadius="15px"
      _hover={{
        cursor: "pointer",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
      }}
    >
      <Avatar src={user?.photoUrl ? user.photoUrl : ""} />
      <Box marginLeft="10px" flex={1}>
        <Text>{user?.displayName}</Text>
      </Box>
    </Box>
  );
};

export default UserSearched;
