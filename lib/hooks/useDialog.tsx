import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export interface ModalProps {
  title: string;
  children: JSX.Element;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  head?: boolean;
  type?: string;
}
const useDialog = () => {
  const [showModal, setModal] = useState(false);

  const setShowModal: boolean | any = (state: boolean) => setModal(state);
  const closeModal = () => setModal(false);

  const Dialog: React.FC<ModalProps> = ({ title, children, size, type }) => {
    return (
      <>
        <Modal
          blockScrollOnMount={false}
          isCentered
          motionPreset="slideInBottom"
          isOpen={showModal}
          onClose={closeModal}
        >
          <ModalOverlay />
          <ModalContent className="">
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>{children}</div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return { Dialog, showModal, setShowModal };
};

export default useDialog;
