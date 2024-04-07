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
import { getSocket } from "#/socket";
import { formatConversationName, getConversationAvatar } from "#/utils";

import { GlobalContext } from "#/contexts/GlobalContext";

import FeedLayout from "#/components/Layouts/FeedLayout";
import Message from "#/components/Message";

import "./App.scss";
import { SocketContext } from "#/contexts/SocketContext";
import PreviewImageUpload from "#/components/PreviewImageUpload";

function App() {
  const { user, conversationId } = useContext(GlobalContext);
  const { socket, setSocket } = useContext(SocketContext);

  const inputRef = useRef(null);
  const selectImageRef = useRef(null);

  const [conversation, setConversation] = useState([]);
  const [images, setImages] = useState([]);
  const [messages, setMessages] = useState([]);

  // connect with chat socket
  useEffect(() => {
    const chatSocket = getSocket("/chats", {
      autoConnect: false,
      forceNew: true,
      query: {
        conversationId,
      },
    });

    if (conversationId) {
      chatSocket.connect();
      setSocket((prev) => {
        return {
          ...prev,
          chatSocket,
        };
      });
    }

    return () => {
      chatSocket.disconnect();
    };
  }, [conversationId, setSocket]);

  // call api get data of conversation
  useEffect(() => {
    if (conversationId) {
      get(`/conversations/${conversationId}`).then((res) =>
        setConversation(res?.data)
      );
      get(`/conversations/${conversationId}/messages?pageSize=20`).then((res) =>
        setMessages(res?.data?.message || [])
      );
    }
  }, [conversationId]);

  // handle event chat socket
  useEffect(() => {
    const onNewMessage = (newMessage) => {
      if (!_.isEmpty(newMessage)) {
        setMessages((prev) => [newMessage.message, ...prev]);
      }
    };

    socket.chatSocket?.on("sent_message", onNewMessage);

    return () => {
      socket.chatSocket?.off("sent_message", onNewMessage);
    };
  }, [socket.chatSocket, setMessages]);

  const handleSendMessage = useCallback(() => {
    const message = inputRef.current.value.trim();

    inputRef.current.value = "";

    if (!_.isEmpty(images)) {
      const formData = new FormData();

      images.forEach((item) => {
        formData.append("images", item);
      });

      post(`/conversations/${conversationId}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImages([]);
    }

    if (!message) return;

    return post(`/conversations/${conversationId}/messages`, {
      content: message,
    });
  }, [conversationId, images]);

  const handleClickSelectImage = () => {
    selectImageRef.current.click();
  };

  const handleChangeFile = (event) => {
    const _images = [...event.target.files];
    event.target.value = "";
    setImages(_images.slice(0, 6));
    console.log(event);
  };

  const handleAddImage = (images) => {
    setImages((prev) => {
      const combineImages = [...prev, ...images];
      return combineImages.slice(0, 6);
    });
  };

  const handleRemoveImage = useCallback(
    (image) => {
      const _images = [...images];
      const indexOfImage = _images.findIndex((item) => {
        return item.name === image.image.name;
      });

      _images.splice(indexOfImage, 1);
      setImages(_images);
    },
    [images]
  );

  const renderTitle = useMemo(() => {
    return (
      <Flex padding="10px">
        <Flex alignItems="center">
          <Avatar
            size="sm"
            src={getConversationAvatar(conversation, user.id)}
            bg="gray.400"
          />
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
        <Stack flex={1} flexDirection="column-reverse" overflowY="scroll">
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
          <Flex padding="10px" alignItems="end">
            <Box display={!_.isEmpty(images) && "none"} marginRight="10px">
              <IconButton
                aria-label="send-pic"
                icon={<Icon icon="icon-park-solid:add-pic" />}
                backgroundColor="unset"
                borderRadius="100%"
                fontSize="25px"
                color="teal.500"
                _hover={{ backgroundColor: "#e0e2e7" }}
                onClick={handleClickSelectImage}
              />
              <input
                ref={selectImageRef}
                style={{ display: "none" }}
                type="file"
                multiple
                accept="image/png, image/jpeg"
                onChange={handleChangeFile}
              />
            </Box>
            <Box
              padding="8px"
              flex={1}
              backgroundColor="#edf2f7"
              borderRadius="18px"
            >
              {!_.isEmpty(images) && (
                <PreviewImageUpload
                  images={images}
                  onAddImage={handleAddImage}
                  onRemoveImage={handleRemoveImage}
                />
              )}
              <Input
                ref={inputRef}
                variant="unstyled"
                placeholder="Aa"
                _focus={{ borderColor: "unset", boxShadow: "unset" }}
              />
            </Box>
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
  }, [
    user,
    conversation,
    images,
    messages,
    handleSendMessage,
    handleRemoveImage,
  ]);

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
