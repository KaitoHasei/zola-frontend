import { Box, Avatar, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

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
          <Text as="b" noOfLines={1}>
            {formatConversationName(conversation, user.id)}
          </Text>
          <Text fontSize="sm" color="#65676b">
            Latest message
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Conversation;

Conversation.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.string,
    participants: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        displayName: PropTypes.string,
        photoUrl: PropTypes.string,
      })
    ),
    name: PropTypes.string,
    image: PropTypes.string,
    userSeen: PropTypes.arrayOf(PropTypes.string),
    message: PropTypes.arrayOf(PropTypes.any),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  onclick: PropTypes.func,
};

Conversation.defaultProps = {
  conversation: {},
  onClick: () => {},
};
