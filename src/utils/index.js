export const filterListParticipants = (conversation, userId) => {
  return conversation?.participants?.filter(
    (participant) => participant?.id !== userId
  );
};

export const formatConversationName = (conversation, userId) => {
  if (conversation.isGroup && conversation?.groupName)
    return conversation?.groupName;

  const listParticipants = filterListParticipants(conversation, userId);

  const conversationName = listParticipants
    ?.map((participant) => participant?.displayName)
    ?.join(", ");

  return conversationName;
};

export const getConversationAvatar = (conversation, userId) => {
  const participants = filterListParticipants(conversation, userId);

  if (conversation.isGroup) {
    if (conversation?.groupImage) return conversation.groupImage;

    return participants?.map((item) => item?.photoUrl || "");
  }

  return participants?.[0]?.photoUrl;
};
