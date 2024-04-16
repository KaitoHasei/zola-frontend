import React, { useState, useMemo, useEffect } from "react";
import {
  VStack,
  Box,
  Text,
  HStack,
  Button,
  StackDivider,
  Avatar,
  Image,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  AvatarGroup,
  IconButton,
} from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";
import { get} from "#/axios";
const ConversationInfo = ({
  user,
  conversation,
  getConversationAvatar,
  formatConversationName,
  conversationId,
}) => {
  const [activeView, setActiveView] = useState("default");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const handleViewChange = (view) => {
    setActiveView(view);
  };
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    console.log("Minimize toggled", !isMinimized); // This should log the new state
  };
  
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (activeView === "media" && conversationId) {
      const fetchImages = async () => {
        try {
          const response = await get(`/conversations/${conversationId}/images`);
          const uniqueImages = Array.from(new Set(response.data));
          setImages(uniqueImages);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      };

      fetchImages();
    }
  }, [conversationId, activeView, isMinimized]);
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  const renderMediaView = () => {
    return (
      <Box width="100%" maxH="90vh" overflowY="auto">
        <Grid
          maxWidth={{ lg: "350px", xl: "400px" }}
          templateColumns="repeat(3, 1fr)"
          gap="3px"
        >
          {images.map((imageUrl, index) => (
            <GridItem
              key={index}
              width="100%"
              aspectRatio={1}
              overflow="hidden"
              cursor="pointer"
              onClick={() => handleImageClick(imageUrl)}
            >
              <Image
                src={imageUrl}
                alt={`Media ${index}`}
                objectFit="cover"
                width="100%"
                height="100%"
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    );
  };
  const renderConversationInfo = useMemo(() => {
    return (
      <VStack
        key={isMinimized} 
        width={isMinimized ? "5%" : "20%"}
        height="100%"
        padding={isMinimized ? "0.5rem" : "1rem"}
        borderLeft="solid lightgrey 1px"
        position="relative"
        overflow={isMinimized ? "hidden" : "auto"}
      >
      <IconButton
  icon={<Icon icon={isMinimized ? "icon-park-twotone:expand-left" : "iconoir:sidebar-collapse"} />}
  variant="ghost"
  position="absolute"
  top="2"
  right="2"
  onClick={toggleMinimize}
  zIndex="1"
  fontSize="24px"
/>
        {!isMinimized && activeView === "default" && (
          // ... render the rest of panel content only if not minimized
          <VStack width={"100%"}>
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {conversation?.isGroup ? (
                <AvatarGroup
                  size="sm"
                  width="100%"
                  flexWrap="wrap-reverse"
                  max={3}
                >
                  {getConversationAvatar(conversation, user.id)?.map(
                    (item, index) => (
                      <Avatar key={index} src={item} />
                    )
                  )}
                </AvatarGroup>
              ) : (
                <Avatar
                  src={getConversationAvatar(conversation, user.id)}
                  size="lg"
                  bg="gray.400"
                />
              )}
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

        {!isMinimized && activeView === "media" && (
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
            {renderMediaView()}
          </VStack>
        )}
        {!isMinimized && activeView === "link" && (
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
        {!isMinimized && activeView === "file" && (
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
      </VStack>
    );
  }, [user, conversation, activeView, images, isMinimized]);

  return (
    <>
      {renderConversationInfo}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Image
              src={selectedImage}
              alt="Selected media"
              maxW="100%"
              maxH="100%"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConversationInfo;
