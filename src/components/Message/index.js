import { Avatar, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Message = ({
  message,
  sender,
  isSender,
  previousSameUser,
  nextSameUser,
}) => {
  return (
    <Flex
      justifyContent={isSender ? "end" : "start"}
      alignItems="center"
      flexDirection={isSender ? "row-reverse" : "row"}
    >
      <Avatar
        src={sender?.photoUrl}
        size="sm"
        marginX="10px"
        height={nextSameUser && "0"}
      />
      <Text
        maxW="50%"
        padding="10px"
        borderRadius={
          isSender
            ? previousSameUser === nextSameUser
              ? "18px 4px 4px 18px"
              : previousSameUser && !nextSameUser
              ? "18px 4px 18px 18px"
              : "18px 18px 4px 18px"
            : previousSameUser === nextSameUser
            ? "4px 18px 18px 4px"
            : previousSameUser && !nextSameUser
            ? "4px 18px 18px 18px"
            : "18px 18px 18px 4px"
        }
        bg={isSender ? "teal.500" : "blackAlpha.200"}
        color={isSender ? "white" : "black"}
        fontSize="md"
      >
        {message?.content}
      </Text>
    </Flex>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.shape({
    userId: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
  }),
  sender: PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    photoUrl: PropTypes.string,
  }),
  isSender: PropTypes.bool,
  previousSameUser: PropTypes.bool,
  nextSameUser: PropTypes.bool,
};

Message.defaultProps = {
  message: {},
  sender: {},
  isSender: false,
  previousSameUser: false,
  nextSameUser: false,
};
