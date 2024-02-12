import { Box } from "@chakra-ui/react";

import Conversation from "#/components/Conversation";
import { useContext } from "react";
import { GlobalContext } from "#/contexts/GlobalContext";

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
