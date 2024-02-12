import { Box, Avatar, Text } from "@chakra-ui/react";

import { formatConversationName } from "#/utils";
import { useContext } from "react";
import { GlobalContext } from "#/contexts/GlobalContext";

const Conversation = ({ conversation, onClick }) => {
  const { user } = useContext(GlobalContext);

  const handleClick = () => {
    onClick(conversation.id);
  };

  return (
    <>
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
        onClick={handleClick}
      >
        <Avatar />
        <Box marginLeft="10px" flex={1}>
          <Text as="b">{formatConversationName(conversation, user.id)}</Text>
          <Text fontSize="sm" color="#65676b">
            Latest message
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Conversation;
