import { Box, Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";

const FeedLayout = ({ title, children, ...rest }) => {
  return (
    <Stack gap="0" {...rest}>
      <Box minHeight="56px" border="1px solid #e5e5e5">
        {title}
      </Box>
      <Box flex={1}>{children}</Box>
    </Stack>
  );
};

export default FeedLayout;

FeedLayout.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

FeedLayout.defaultProps = {
  title: <></>,
  children: <></>,
};
