import { useContext, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import _ from "lodash";

import { GlobalContext } from "#/contexts/GlobalContext";

import { get } from "#/axios";
import { rootSocket } from "#/socket";

import Conversation from "#/components/Conversation";

const ConversationList = () => {
  const { user, conversationId, setConversationId } = useContext(GlobalContext);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    get("/conversations")
      .then((res) => {
        setConversations(res?.data?.list);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const onConversationUpdated = (data) => {
      if (_.isEmpty(data)) return;

      const indexOfConversation = conversations.findIndex(
        (element) => element.id === data?.id
      );

      if (indexOfConversation !== -1) {
        return setConversations((prev) => {
          const _conversations = _.cloneDeep(prev);

          _conversations.splice(indexOfConversation, 1);

          return [data, ..._conversations];
        });
      }

      return setConversations((prev) => [data, ...prev]);
    };

    rootSocket.on("conversation_updated", onConversationUpdated);

    return () => {
      rootSocket.off("conversation_updated", onConversationUpdated);
    };
  }, [conversations, setConversations]);

  const handleClickConversation = (conversationId) => {
    setConversationId(conversationId);
  };

  return (
    <Box flex={1} overflowY="scroll">
      {conversations.map((item, index) => {
        const isRead = item?.userSeen.includes(user.id);

        return (
          <Conversation
            key={index}
            conversation={item}
            isRead={isRead}
            isSelect={conversationId === item?.id}
            onClick={handleClickConversation}
          />
        );
      })}
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
