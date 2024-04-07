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
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import _ from "lodash";

const Message = ({
  message,
  sender,
  isSender,
  previousSameUser,
  nextSameUser,
}) => {
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
      >
        <Avatar
          src={sender?.photoUrl || ""}
          size="sm"
          marginX="10px"
          height={nextSameUser && "0"}
          bg="gray.400"
        />
        {message?.typeMessage === "TEXT" ? (
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
        ) : (
          renderImageGrid
        )}
      </Flex>
    </>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.shape({
    userId: PropTypes.string,
    content: PropTypes.string,
    typeMessage: PropTypes.string,
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
