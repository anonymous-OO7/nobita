import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import UpdateProfilePage from "@/components/forms/UpdateProfilePage";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  type: string;
  loading: boolean;
}

export default function CommonModal({
  isOpen,
  onOpenChange,
  onClose,
  type, // eslint-disable-line
  loading, // eslint-disable-line
}: Props) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        scrollBehavior={"inside"}
        size="2xl"
      >
        <ModalContent>
          {(
            onClose, // eslint-disable-line
          ) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Profile
              </ModalHeader>
              <ModalBody>
                <UpdateProfilePage />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
