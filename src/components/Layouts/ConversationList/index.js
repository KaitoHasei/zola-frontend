import { useContext } from "react";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { GlobalContext } from "#/contexts/GlobalContext";

import Conversation from "#/components/Conversation";

const ConversationList = ({ conversations }) => {
  const { setConversationId } = useContext(GlobalContext);

  const handleClickConversation = (conversationId) => {
    setConversationId(conversationId);
  };

  return (
    <Box flex={1} overflowY="scroll">
      {conversations.map((item, index) => (
        <Conversation
          key={index}
          conversation={item}
          onClick={handleClickConversation}
        />
      ))}
    </Box>
  );
};

export default ConversationList;

ConversationList.propTypes = {
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};

ConversationList.defaultProps = {
  conversations: [],
};
