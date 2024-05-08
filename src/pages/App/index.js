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
  AvatarGroup,
  Text,
  IconButton,
  HStack,
  Textarea,
  VStack,
  Button,
} from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";
import _ from "lodash";

import { del, get, post } from "#/axios";
import { getSocket } from "#/socket";
import { formatConversationName, getConversationAvatar } from "#/utils";

import { GlobalContext } from "#/contexts/GlobalContext";

import FeedLayout from "#/components/Layouts/FeedLayout";
import Message from "#/components/Message";

import "./App.scss";
import { SocketContext } from "#/contexts/SocketContext";
import PreviewImageUpload from "#/components/PreviewImageUpload";
import ConversationInfo from "./ConversationInfo";
import EmojiPicker from "emoji-picker-react";


function App() {
  const { user, conversationId } = useContext(GlobalContext);
  const { socket, setSocket } = useContext(SocketContext);

  const inputRef = useRef(null);
  const selectImageRef = useRef(null);

  const [conversation, setConversation] = useState([]);
  const [images, setImages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const handleStartCall = () => {
    window.location.href = `/call/${conversationId}`;
  };
  // Function to find the sender based on userId
  const _getSender = (userId) => {
    return _.find(conversation?.participants, (participant) => {
      return participant?.id === userId;
    });
  };

  const startReply = (message) => {
    const sender = _getSender(message.userId);
    setReplyTo({
      ...message,
      sender: sender // Now the sender object is included
    });
  };

  const cancelReply = () => {
    setReplyTo(null);
  };

  const sendReply = (newMessageContent) => {
    // Here you would eventually integrate with your backend
    const newMessage = {
      userId: user.id,
      content: newMessageContent,
      repliedTo: replyTo ? {
        userId: replyTo.userId,
        displayName: replyTo.sender.displayName,
        content: replyTo.content
      } : null,
      // ...other message properties
    };
    console.log(
      `Replying to ${replyTo.content} with new message: ${newMessageContent}`
    );
    // Add the new message to your messages array
    setMessages(prevMessages => [...prevMessages, newMessage]);
    // After integrating with your backend, you would clear the replyTo state
    setReplyTo(null);
  };

  const ReplyPreview = ({ replyTo, onCancelReply }) => {
    if (!replyTo) return null;

    // Ensure replyTo.sender is an object before trying to access its properties
    const senderDisplayName = replyTo.sender ? replyTo.sender.displayName : "Unknown";

    return (
      <Box
        borderWidth="1px"
        borderColor="gray.300"
        p={2}
        borderRadius="lg"
        mb={2}
        width="100%"
        position="relative"
        background="gray.300"
      >
        <Text fontSize="sm">Replying to {senderDisplayName}</Text>
        <Text fontSize="xs">{replyTo.content}</Text>
        <IconButton
          variant="ghost"
          icon={<Icon icon="icons8:cancel" />}
          fontSize="24px"
          onClick={onCancelReply}
          position="absolute"
          top="2px" right="2px"
        />
      </Box>
    );
  };

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
      get(`/conversations/${conversationId}`).then((res) => {
        setConversation(res?.data)
        console.log("res call : ", res?.data);
      }
      );
      get(`/conversations/${conversationId}/messages?pageSize=20`).then(
        (res) => {
          setMessages(res?.data?.message || []);
        }
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
    const onRevokeMessage = (message) => {
      const _message = [...messages];
      const indexOfMessage = _message.findIndex(
        (item) => item.cuid === message.cuid
      );

      _message.splice(indexOfMessage, 1);

      setMessages(_message);
    };

    socket.chatSocket?.on("sent_message", onNewMessage);
    socket.chatSocket?.on("revoke_message", onRevokeMessage);

    return () => {
      socket.chatSocket?.off("sent_message", onNewMessage);
      socket.chatSocket?.off("revoke_message", onRevokeMessage);
    };
  }, [socket.chatSocket, messages, setMessages]);

  const handleClickEmoji = (emojiObject) => {
    const cursor = inputRef.current.selectionStart;
    const inputMessage = inputRef.current.value;
    const message =
      inputMessage.slice(0, cursor) +
      emojiObject.emoji +
      inputMessage.slice(cursor);
    inputRef.current.value = message;
  };

  const handleSendMessage = useCallback(() => {
    const message = inputRef.current.value.trim();
    if (replyTo) {
      // Add logic to create a new message object with repliedTo data
      sendReply(message);
      // Send newMessage to backend or add it to the state
      // ...

      setReplyTo(null); // Clear the reply after sending
    }
    inputRef.current.value = "";
    setReplyTo(null);
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
  }, [replyTo, conversationId, images]);

  const handleRevokeMessage = (messageCuid) => {
    if (!messageCuid) return;

    return del(`/conversations/${conversationId}/messages/${messageCuid}`);
  };

  const handleClickSelectImage = () => {
    selectImageRef.current.click();
  };

  const handleChangeFile = (event) => {
    const _images = [...event.target.files];
    event.target.value = "";
    setImages(_images.slice(0, 6));
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
      <Flex padding="10px" justifyContent="space-between">
        <Flex alignItems="center">
          <Box>
            {conversation?.isGroup ? (
              <AvatarGroup size="sm" max={3}>
                {getConversationAvatar(conversation, user.id)?.map(
                  (item, index) => (
                    <Avatar key={index} src={item} />
                  )
                )}
              </AvatarGroup>
            ) : (
              <Avatar
                src={getConversationAvatar(conversation, user.id)}
                size="sm"
                bg="gray.400"
              />
            )}
          </Box>
          <Text as="b" noOfLines={1} maxWidth="250px" marginLeft="10px">
            {formatConversationName(conversation, user.id)}
          </Text>
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <Button backgroundColor="transparent" _hover={{ border: "1px", borderColor: "teal", backgroundColor: "transparent" }} onClick={handleStartCall}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="teal"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-video"
            >
              <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
              <rect x={2} y={6} width={14} height={12} rx={2} />
            </svg>
          </Button>
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
                onRevoke={handleRevokeMessage}
                startReply={startReply}
                repliedTo={item.repliedTo}
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
          <Flex padding="10px" alignItems="end" position="relative">
            <Box display={!_.isEmpty(images) && "none"} padding="10px">
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
              <Flex alignItems="center">
                <VStack flex="1">

                  <ReplyPreview replyTo={replyTo} onCancelReply={cancelReply} />
                  <HStack width="100%">
                    <Textarea
                      flex="1"
                      ref={inputRef}
                      minHeight="auto"
                      size="sm"
                      variant="unstyled"
                      resize="none"
                      placeholder="Aa"
                      _focus={{ borderColor: "unset", boxShadow: "unset" }}
                      onKeyDown={(keydown) => {
                        if (!keydown.shiftKey && keydown.code === "Enter")
                          handleSendMessage();
                      }}
                    />
                    <EmojiPicker
                      style={{ position: "absolute", top: "-445px", right: "50px" }}
                      open={openEmojiPicker}
                      onEmojiClick={handleClickEmoji}
                    />
                    <IconButton
                      variant="ghost"
                      icon={<Icon icon="uil:smile" />}
                      fontSize="24px"
                      onClick={() => {
                        if (!openEmojiPicker) return setOpenEmojiPicker(true);

                        return setOpenEmojiPicker(false);
                      }}
                    />
                  </HStack>
                </VStack>
              </Flex>
            </Box>
            <Box padding="10px">
              <IconButton
                isRound={true}
                aria-label="Send"
                icon={<Icon icon="mingcute:send-fill" />}
                variant="ghost"
                fontSize="25px"
                onClick={handleSendMessage}
              />
            </Box>
          </Flex>
        </form>
      </Stack>
    );
  }, [
    user,
    openEmojiPicker,
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
        <HStack height="100%" gap="0">
          <FeedLayout height="100%" title={renderTitle} flex="1">
            {renderFeedChild}
          </FeedLayout>
          <ConversationInfo
            user={user}
            conversation={conversation}
            getConversationAvatar={getConversationAvatar}
            formatConversationName={formatConversationName}
            conversationId={conversationId}
          />
        </HStack>
      )}
    </>
  );
}

export default memo(App);
