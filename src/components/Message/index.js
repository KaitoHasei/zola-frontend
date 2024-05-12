import { useMemo } from "react";
import {
  Box,
  Grid,
  GridItem,
  Avatar,
  Flex,
  Stack,
  Text,
  Image,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Icon } from "@iconify-icon/react";
import { convertTime } from "#/utils";

const Message = ({
  message,
  sender,
  isSender,
  previousSameUser,
  nextSameUser,
  onRevoke,
  startReply,
  repliedTo,
}) => {
  const handleClickRevoke = () => {
    onRevoke(message.cuid);
  };

  const renderImageGrid = useMemo(() => {
    const images = message?.content?.split(",");

    return (
      <Box
        borderRadius={
          isSender
            ? previousSameUser && nextSameUser
              ? "18px 8px 8px 18px"
              : !previousSameUser && !nextSameUser
              ? "18px"
              : !previousSameUser && nextSameUser
              ? "18px 4px 18px 18px"
              : "18px 18px 4px 18px"
            : previousSameUser && nextSameUser
            ? "8px 18px 18px 8px"
            : !previousSameUser && !nextSameUser
            ? "18px"
            : !previousSameUser && nextSameUser
            ? "4px 18px 18px 18px"
            : "18px 18px 18px 4px"
        }
        overflow="hidden"
      >
        {!_.isEmpty(images) && images.length > 2 ? (
          <Grid
            maxWidth={{ lg: "350px", xl: "400px" }}
            templateColumns="repeat(3, 1fr)"
            gap="3px"
          >
            {!_.isEmpty(images) &&
              images.map((image, index) => (
                <GridItem
                  key={index}
                  width="100%"
                  aspectRatio={1}
                  overflow="hidden"
                >
                  <Image
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    src={image}
                  />
                </GridItem>
              ))}
          </Grid>
        ) : (
          <Stack maxWidth="200px" gap="5px">
            {images.map((image, index) => (
              <Box key={index}>
                <Image src={image} />
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    );
  }, [message, isSender, previousSameUser, nextSameUser]);

  return (
    <>
      <Flex
        justifyContent={isSender ? "end" : "start"}
        alignItems="start"
        flexDirection={isSender ? "row-reverse" : "row"}
        role="group"
      >
        <Avatar
          src={sender?.photoUrl || ""}
          size="sm"
          marginX="10px"
          height={nextSameUser && "0"}
          bg="gray.400"
        />
        {repliedTo && (
          <Box mb={2} p={2} backgroundColor="gray.200" borderRadius="md">
            <Text fontSize="xs">Replied to {repliedTo.displayName}</Text>
            <Text fontSize="sm">{repliedTo.content}</Text>
          </Box>
        )}
        {message?.typeMessage === "TEXT" && (
          <Text
            maxW="50%"
            padding="10px"
            borderRadius={
              isSender
                ? previousSameUser && nextSameUser
                  ? "18px 8px 8px 18px"
                  : !previousSameUser && !nextSameUser
                  ? "18px"
                  : !previousSameUser && nextSameUser
                  ? "18px 4px 18px 18px"
                  : "18px 18px 4px 18px"
                : previousSameUser && nextSameUser
                ? "8px 18px 18px 8px"
                : !previousSameUser && !nextSameUser
                ? "18px"
                : !previousSameUser && nextSameUser
                ? "4px 18px 18px 18px"
                : "18px 18px 18px 4px"
            }
            bg={isSender ? "teal.500" : "blackAlpha.200"}
            color={isSender ? "white" : "black"}
            fontSize="md"
          >
            {message?.content}
          </Text>
        )}
        {message?.typeMessage === "IMAGE" && renderImageGrid}
        {message?.typeMessage === "CALL" && (
          <Text
            maxW="50%"
            padding="10px"
            borderRadius={
              isSender
                ? previousSameUser && nextSameUser
                  ? "18px 8px 8px 18px"
                  : !previousSameUser && !nextSameUser
                  ? "18px"
                  : !previousSameUser && nextSameUser
                  ? "18px 4px 18px 18px"
                  : "18px 18px 4px 18px"
                : previousSameUser && nextSameUser
                ? "8px 18px 18px 8px"
                : !previousSameUser && !nextSameUser
                ? "18px"
                : !previousSameUser && nextSameUser
                ? "4px 18px 18px 18px"
                : "18px 18px 18px 4px"
            }
            bg={isSender ? "teal.500" : "blackAlpha.200"}
            color={isSender ? "white" : "black"}
            fontSize="md"
          >
            <Flex direction="row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-video"
                style={{ marginRight: 20 }}
              >
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                <rect x={2} y={6} width={14} height={12} rx={2} />
              </svg>
              <Text>{message?.content}</Text>
            </Flex>
            <br />
            <Text fontSize="sm" textAlign="right">
              {`At: ${convertTime(message?.createdAt)}`}{" "}
            </Text>
          </Text>
        )}
        <Flex
          display="none"
          _groupHover={{ display: "flex" }}
          margin="0 20px"
          height="100%"
          alignItems="center"
        >
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Icon icon="ri:more-2-fill" />}
              variant="ghost"
              fontSize="20px"
              borderRadius="100%"
              _hover={{ cursor: "pointer" }}
            />
            <MenuList margin="-10px 0 0 0">
              {isSender && (
                <MenuItem
                  icon={<Icon icon="tabler:trash" />}
                  onClick={handleClickRevoke}
                >
                  Revoke
                </MenuItem>
              )}
              {/* creating reply item to reply message */}
              <MenuItem
                icon={<Icon icon="ph:quotes-bold" />}
                onClick={() => startReply(message)}
              >
                Reply
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.shape({
    cuid: PropTypes.string,
    userId: PropTypes.string,
    content: PropTypes.string,
    typeMessage: PropTypes.string,
    isRevoke: PropTypes.bool,
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
