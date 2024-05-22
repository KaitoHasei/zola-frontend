import { Avatar, AvatarGroup } from "@chakra-ui/react";
import _ from "lodash";

import { getConversationAvatar } from "#/utils";

const ConversationAvatar = ({ conversation, user }) => {
  const conversationAvatar = getConversationAvatar(conversation, user.id);

  return (
    <>
      {conversation.isGroup ? (
        <>
          {_.isArray(conversationAvatar) ? (
            <AvatarGroup
              size="sm"
              width="fit-content"
              flexWrap="wrap-reverse"
              max={3}
            >
              {conversationAvatar.map((item, index) => (
                <Avatar key={index} src={item} />
              ))}
            </AvatarGroup>
          ) : (
            <Avatar src={conversationAvatar} bg="gray.400" />
          )}
        </>
      ) : (
        <Avatar src={conversationAvatar} bg="gray.400" />
      )}
    </>
  );
};

export default ConversationAvatar;
