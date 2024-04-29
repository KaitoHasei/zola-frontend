import { Box, Flex, Text } from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";

const ContactManagement = () => {
  return (
    <Box>
      <Flex
        alignItems="center"
        padding="20px"
        gap={5}
        _hover={{
          cursor: "pointer",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        }}
      >
        <Flex alignItems="center">
          <Icon style={{ fontSize: "24px" }} icon="mingcute:contacts-line" />
        </Flex>
        <Text fontSize="lg">Friend List</Text>
      </Flex>
      <Flex
        alignItems="center"
        padding="20px"
        gap={5}
        _hover={{
          cursor: "pointer",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        }}
      >
        <Flex alignItems="center">
          <Icon
            style={{ fontSize: "24px" }}
            icon="fluent-mdl2:public-contact-card-mirrored"
          />
        </Flex>
        <Text fontSize="lg">Friend Request</Text>
      </Flex>
    </Box>
  );
};

export default ContactManagement;
