import {
  useEditableControls,
  Flex,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";

const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center">
      <IconButton
        font="md"
        variant="ghost"
        icon={<Icon icon="bi:check" />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        size="md"
        variant="ghost"
        icon={<Icon icon="iconamoon:close-fill" />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <IconButton
      position="absolute"
      top={0}
      right="-35px"
      size="md"
      variant="unset"
      textColor="teal.500"
      icon={<Icon icon="iconamoon:edit" />}
      {...getEditButtonProps()}
    />
  );
};

export default EditableControls;
