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
  if (conversation?.participants?.length === 2) {
    return participants?.[0]?.photoUrl;
  }

  const groupImage = participants?.map((item) => item?.photoUrl || "");

  return groupImage;
};
