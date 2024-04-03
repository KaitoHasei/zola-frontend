import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React from 'react'

const AccountInfoModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Thông tin các nhân</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Đây là modal thông tin các nhân</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AccountInfoModal