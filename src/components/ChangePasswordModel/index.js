import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React from 'react'

const ChangePasswordModel = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tài khoản - Mật khẩu</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Đây là modal thông tin tài khoản - mật khẩu</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModel