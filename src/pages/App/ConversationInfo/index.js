import React, { useState, useMemo } from "react";
import {
  VStack,
  Box,
  Text,
  HStack,
  Button,
  StackDivider,
  Avatar,
} from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";

const ConversationInfo = ({
  user,
  conversation,
  getConversationAvatar,
  formatConversationName,
  // any other props you need to pass down
}) => {
  const [activeView, setActiveView] = useState("default");

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const renderConversationInfo = useMemo(() => {
    return (
      <VStack
        width="30%"
        height="100%"
        padding="1rem 0"
        borderLeft="solid lightgrey 1px"
      >
        {activeView === "default" && (
          <VStack width={"100%"}>
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                size="xl"
                src={getConversationAvatar(conversation, user.id)}
                bg="gray.400"
              />
              <Text fontSize="lg" fontWeight="bold" marginTop="2">
                {formatConversationName(conversation, user.id)}
              </Text>
            </Box>
            <VStack
              padding="0.5rem 0"
              borderTop="solid lightgrey 1px"
              divider={<StackDivider borderColor="gray.200" />}
              width="100%"
            >
              <Button
                onClick={() => handleViewChange("media")}
                leftIcon={<Icon icon="pajamas:media" />}
                justifyContent="flex-start"
                width="100%"
                variant="ghost"
                color="black"
                _hover={{ bg: "#ebedf0" }}
              >
                Media
              </Button>
              <Button
                onClick={() => handleViewChange("file")}
                leftIcon={<Icon icon="mdi:files" />}
                justifyContent="flex-start"
                width="100%"
                variant="ghost"
                color="black"
                _hover={{ bg: "#ebedf0" }}
              >
                Files
              </Button>
              <Button
                onClick={() => handleViewChange("link")}
                leftIcon={<Icon icon="dashicons:admin-links" />}
                justifyContent="flex-start"
                width="100%"
                variant="ghost"
                color="black"
                _hover={{ bg: "#ebedf0" }}
              >
                Links
              </Button>
            </VStack>
          </VStack>
        )}
        ;
        {activeView === "media" && (
          <VStack width={"100%"}>
            <HStack
              position="relative"
              display="flex"
              justifyContent="center"
              width="100%"
              alignItems="center"
            >
              <Box
                position="absolute"
                left="0"
                onClick={() => handleViewChange("default")}
                padding="0.5rem"
              >
                <Icon icon="humbleicons:arrow-go-back" width="1.5rem" />
              </Box>

              <Text fontSize="lg" fontWeight="bold">
                Media
              </Text>
            </HStack>
          </VStack>
        )}
        ;
        {activeView === "link" && (
          <VStack width={"100%"}>
            <HStack
              position="relative"
              display="flex"
              justifyContent="center"
              width="100%"
              alignItems="center"
            >
              <Box
                position="absolute"
                left="0"
                onClick={() => handleViewChange("default")}
                padding="0.5rem"
              >
                <Icon icon="humbleicons:arrow-go-back" width="1.5rem" />
              </Box>

              <Text fontSize="lg" fontWeight="bold">
                Links
              </Text>
            </HStack>
          </VStack>
        )}
        ;
        {activeView === "file" && (
          <VStack width={"100%"}>
            <HStack
              position="relative"
              display="flex"
              justifyContent="center"
              width="100%"
              alignItems="center"
            >
              <Box
                position="absolute"
                left="0"
                onClick={() => handleViewChange("default")}
                padding="0.5rem"
              >
                <Icon icon="humbleicons:arrow-go-back" width="1.5rem" />
              </Box>

              <Text fontSize="lg" fontWeight="bold">
                Files
              </Text>
            </HStack>
          </VStack>
        )}
        ;
      </VStack>
    );
  }, [user, conversation, activeView]);

  return <>{renderConversationInfo}</>;
};
export default ConversationInfo;
