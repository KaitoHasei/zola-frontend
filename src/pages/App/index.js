import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Box,
  Flex,
  Stack,
  Avatar,
  Input,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";
import _ from "lodash";

import { get, post } from "#/axios";
import { formatConversationName } from "#/utils";

import { GlobalContext } from "#/contexts/GlobalContext";

import FeedLayout from "#/components/Layouts/FeedLayout";
import Message from "#/components/Message";

import "./App.scss";

function App() {
  const { user, conversationId } = useContext(GlobalContext);
  const inputRef = useRef(null);
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (conversationId) {
      get(`/conversations/${conversationId}`).then((res) =>
        setConversation(res?.data)
      );
      get(`/conversations/${conversationId}/messages`).then((res) =>
        setMessages(res?.data?.message || [])
      );
    }
  }, [conversationId]);

  const handleSendMessage = useCallback(() => {
    const message = inputRef.current.value.trim();

    if (!message) return;

    setMessages((prev) => [
      ...prev,
      {
        content: message,
      },
    ]);

    inputRef.current.value = "";

    return post(`/conversations/${conversationId}/messages`, {
      content: message,
    });
  }, [conversationId]);

  const renderTitle = useMemo(() => {
    return (
      <Flex padding="10px">
        <Flex alignItems="center">
          <Avatar size="sm" />
          <Text as="b" noOfLines={1} maxWidth="250px" marginLeft="10px">
            {formatConversationName(conversation, user.id)}
          </Text>
        </Flex>
      </Flex>
    );
  }, [user, conversation]);

  const renderFeedChild = useMemo(() => {
    const _getSender = (userId) => {
      return _.find(conversation?.participants, (participant) => {
        return participant?.id === userId;
      });
    };

    return (
      <Stack height="100%">
        <Stack flex={1}>
          {messages.map((item, index) => {
            const previousSameUser =
              index !== 0
                ? messages[index - 1].userId === messages[index].userId
                : false;

            const nextSameUser =
              index !== messages.length - 1
                ? messages[index + 1].userId === messages[index].userId
                : false;
            return (
              <Message
                key={index}
                isSender={item?.userId === user.id}
                sender={_getSender(item?.userId)}
                message={item}
                previousSameUser={previousSameUser}
                nextSameUser={nextSameUser}
              />
            );
          })}
        </Stack>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Flex padding="10px">
            <Input ref={inputRef} placeholder="Aa" />
            <IconButton
              isRound={true}
              aria-label="Send"
              icon={<Icon icon="mingcute:send-fill" />}
              variant="ghost"
              fontSize="25px"
              onClick={handleSendMessage}
            />
          </Flex>
        </form>
      </Stack>
    );
  }, [user, conversation, messages, handleSendMessage]);

  return (
    <>
      {!conversationId ? (
        <Box height="100%" display="flex">
          <Text fontSize="2xl" fontWeight="600" margin="auto">
            Select or start conversation
          </Text>
        </Box>
      ) : (
        <FeedLayout height="100%" title={renderTitle}>
          {renderFeedChild}
        </FeedLayout>
      )}
    </>
  );
}

export default memo(App);
