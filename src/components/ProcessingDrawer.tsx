import React, { useState, useRef } from "react";
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, VStack, Text, Progress, useToast, List, ListItem, IconButton, Flex, Badge, Alert, AlertIcon, HStack } from "@chakra-ui/react";
import { Upload, X, File, FolderOpen } from "lucide-react";
interface ProcessingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProcessingComplete?: (success: number, failed: number) => void;
}
interface FileUpload {
  file: File;
  progress: number;
  status: "waiting" | "uploading" | "processing" | "completed" | "failed";
}
export const ProcessingDrawer = ({
  isOpen,
  onClose,
  onProcessingComplete
}: ProcessingDrawerProps) => {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newUploads = Array.from(files).map(file => ({
        file,
        progress: 0,
        status: "waiting" as const
      }));
      setUploads(prev => [...prev, ...newUploads]);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const newUploads = Array.from(files).map(file => ({
      file,
      progress: 0,
      status: "waiting" as const
    }));
    setUploads(prev => [...prev, ...newUploads]);
  };
  const handleUploadAndProcess = async () => {
    setIsProcessing(true);
    for (let i = 0; i < uploads.length; i++) {
      setUploads(prev => prev.map((upload, index) => index === i ? {
        ...upload,
        status: "uploading"
      } : upload));
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploads(prev => prev.map((upload, index) => index === i ? {
          ...upload,
          progress
        } : upload));
      }
      setUploads(prev => prev.map((upload, index) => index === i ? {
        ...upload,
        status: "processing"
      } : upload));
    }
    toast({
      title: "파일 처리가 백그라운드에서 진행됩니다.",
      description: "처리 현황은 문서 관리 페이지에서 확인하실 수 있습니다.",
      status: "info",
      duration: 5000,
      isClosable: true
    });
    onClose();
  };
  const removeFile = (index: number) => {
    setUploads(prev => prev.filter((_, i) => i !== index));
  };
  return <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">문서 등록</DrawerHeader>
        <DrawerBody>
          <VStack spacing={6} py={4}>
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <Box fontSize="sm">
                <Text fontWeight="medium" mb={1}>
                  지원되는 문서 유형
                </Text>
                <Text>• PDF, DOCX 파일 업로드가 가능합니다.</Text>
                <Text>
                  • 폴더 선택 시 폴더 내의 모든 PDF, DOCX 파일이 자동으로
                  불러와집니다.
                </Text>
              </Box>
            </Alert>
            <Box w="100%" h="200px" border="2px" borderColor="gray.200" borderStyle="dashed" borderRadius="lg" display="flex" alignItems="center" justifyContent="center" onDrop={handleDrop} onDragOver={e => e.preventDefault()} bg="gray.50" _hover={{
            borderColor: "blue.500"
          }} transition="all 0.2s">
              <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple accept=".pdf,.docx" hidden />
              <VStack spacing={4}>
                <VStack spacing={2}>
                  <Upload size={24} />
                  <Text>문서를 드래그하여 업로드하거나</Text>
                </VStack>
                <HStack spacing={2}>
                  <Button size="sm" colorScheme="blue" leftIcon={<File size={14} />} onClick={() => fileInputRef.current?.click()}>
                    문서 선택
                  </Button>
                  <Button size="sm" colorScheme="blue" variant="outline" leftIcon={<FolderOpen size={14} />} onClick={() => fileInputRef.current?.click()}>
                    폴더 선택
                  </Button>
                </HStack>
              </VStack>
            </Box>
            {uploads.length > 0 && <List spacing={3} width="100%">
                {uploads.map((upload, index) => <ListItem key={index} borderWidth="1px" p={3} borderRadius="md">
                    <Flex justify="space-between" align="center" mb={2}>
                      <Flex align="center" gap={2}>
                        <File size={16} />
                        <Text fontSize="sm">{upload.file.name}</Text>
                      </Flex>
                      {upload.status === "waiting" && <IconButton aria-label="Remove file" icon={<X size={16} />} size="sm" variant="ghost" onClick={() => removeFile(index)} />}
                    </Flex>
                    <Flex align="center" gap={2}>
                      <Progress value={upload.progress} size="sm" width="100%" borderRadius="full" />
                      <Badge colorScheme={upload.status === "completed" ? "green" : upload.status === "failed" ? "red" : upload.status === "processing" ? "yellow" : "blue"}>
                        {upload.status}
                      </Badge>
                    </Flex>
                  </ListItem>)}
              </List>}
          </VStack>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            취소
          </Button>
          <Button colorScheme="blue" isDisabled={uploads.length === 0 || isProcessing} onClick={handleUploadAndProcess}>
            {isProcessing ? "처리 중..." : "등록 확정"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>;
};