"use client";

import { useState } from "react";
import {
  Modal,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalHeading,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  useOverlayState,
} from "@heroui/react";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm",
  message = "Are you sure you want to proceed?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
}: ConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const state = useOverlayState({
    isOpen,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
  });

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch {
      // Error handled by caller
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal state={state}>
      <ModalBackdrop />
      <ModalContainer>
        <ModalDialog>
          <ModalHeader>
            <ModalHeading>{title}</ModalHeading>
          </ModalHeader>
          <ModalBody>
            <p className="text-default-600">{message}</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="tertiary" onPress={onClose}>
              {cancelLabel}
            </Button>
            <Button
              className={destructive ? "bg-danger text-danger-foreground" : ""}
              isDisabled={isLoading}
              variant={destructive ? "danger" : "primary"}
              onPress={handleConfirm}
            >
              {isLoading && <Spinner className="mr-2" size="sm" />}
              {confirmLabel}
            </Button>
          </ModalFooter>
        </ModalDialog>
      </ModalContainer>
    </Modal>
  );
}
