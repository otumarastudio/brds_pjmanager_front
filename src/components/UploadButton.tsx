import React, { useState } from "react";
import { Button, Menu, MenuButton, MenuList, MenuItem, Text, Badge, Spinner, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, VStack, Divider } from "@chakra-ui/react";
import { Upload, ChevronDown, RefreshCw } from "lucide-react";
interface ProcessingFile {
  id: string;
  filename: string;
  status: "uploading" | "processing" | "completed" | "failed";
  errorMessage?: string;
}
interface UploadButtonProps {
  onClick: () => void;
  isProcessing: boolean;
  processingFiles: ProcessingFile[];
  onRetryFile?: (fileId: string) => void;
}
export const UploadButton = ({
  onClick,
  isProcessing,
  processingFiles,
  onRetryFile
}: UploadButtonProps) => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure();
  const getStatusColor = (status: ProcessingFile["status"]) => {
    switch (status) {
      case "completed":
        return "green";
      case "failed":
        return "red";
      case "processing":
        return "yellow";
      case "uploading":
        return "blue";
    }
  };
  const getStatusText = (status: ProcessingFile["status"]) => {
    switch (status) {
      case "completed":
        return "완료";
      case "failed":
        return "실패";
      case "processing":
        return "처리중";
      case "uploading":
        return "업로드중";
    }
  };
  if (isProcessing) {
    return <>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDown size={16} />} colorScheme="blue" variant="outline">
            <HStack>
              <Spinner size="sm" />
              <Text>전처리 중...</Text>
            </HStack>
          </MenuButton>
          <MenuList>
            {processingFiles.map(file => <MenuItem key={file.id}>
                <HStack justify="space-between" width="100%">
                  <Text fontSize="sm" noOfLines={1}>
                    {file.filename}
                  </Text>
                  <Badge colorScheme={getStatusColor(file.status)}>
                    {getStatusText(file.status)}
                  </Badge>
                </HStack>
              </MenuItem>)}
            <Divider my={2} />
            <MenuItem onClick={onOpen}>
              <Text fontSize="sm" color="blue.500">
                로그 보기
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>전처리 로그</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack align="stretch" spacing={4}>
                {processingFiles.map(file => <HStack key={file.id} justify="space-between" p={3} bg={file.status === "failed" ? "red.50" : "gray.50"} borderRadius="md">
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="medium">{file.filename}</Text>
                      {file.errorMessage && <Text color="red.500" fontSize="sm">
                          {file.errorMessage}
                        </Text>}
                    </VStack>
                    <HStack>
                      <Badge colorScheme={getStatusColor(file.status)}>
                        {getStatusText(file.status)}
                      </Badge>
                      {file.status === "failed" && onRetryFile && <Button size="sm" leftIcon={<RefreshCw size={14} />} colorScheme="blue" variant="ghost" onClick={() => onRetryFile(file.id)}>
                          재처리
                        </Button>}
                    </HStack>
                  </HStack>)}
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>;
  }
  return <Button leftIcon={<Upload size={16} />} colorScheme="blue" onClick={onClick}>
      파일 등록
    </Button>;
};