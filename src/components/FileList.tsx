import React, { useState, useRef } from "react";
import { Box, Button, HStack, useDisclosure, Table, Thead, Tbody, Tr, Th, Td, Text, Badge, IconButton, Menu, MenuButton, MenuList, MenuItem, Spinner, Checkbox, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { MoreVertical, Upload, Eye, RefreshCw, Trash2, History, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { ProcessingLogModal } from "./ProcessingLogModal";
import { useProcessing } from "../contexts/ProcessingContext";
import { DocumentDetailDrawer } from "./DocumentDetailDrawer";
interface FileListProps {
  onUploadClick: () => void;
}
const mockFiles = [{
  id: "file-001",
  filename: "Indorama_T3_Specification.pdf",
  filepath: "/files/Indorama_T3_Specification.pdf",
  filesize: 25600000,
  upload_time: "2024-01-20T10:00:00Z",
  processing_time: "2024-01-20T10:05:00Z",
  page_count: 45,
  chunk_count: 12,
  status: "completed" as const,
  registrar: "정대우",
  registered_at: "2024-01-20T10:00:00Z"
}, {
  id: "file-002",
  filename: "NLNG_GasPipeline_Overview.docx",
  filepath: "/files/NLNG_GasPipeline_Overview.docx",
  filesize: 15000000,
  upload_time: "2024-01-20T10:02:00Z",
  processing_time: "2024-01-20T10:07:00Z",
  page_count: 28,
  chunk_count: 8,
  status: "processing" as const,
  registrar: "정대우",
  registered_at: "2024-01-20T10:02:00Z"
}, {
  id: "file-003",
  filename: "Sadara_ChemicalComplex_Details.pdf",
  filepath: "/files/Sadara_ChemicalComplex_Details.pdf",
  filesize: 35000000,
  upload_time: "2024-01-20T10:04:00Z",
  processing_time: "2024-01-20T10:09:00Z",
  page_count: 60,
  chunk_count: 0,
  status: "failed" as const,
  error_log: "Error 504: Processing timeout",
  registrar: "정대우",
  registered_at: "2024-01-20T10:04:00Z"
}];
const ITEMS_PER_PAGE = 5;
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
};
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
const processingAnimation = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;
export const FileList = ({
  onUploadClick
}: FileListProps) => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const {
    isOpen: isLogOpen,
    onOpen: onLogOpen,
    onClose: onLogClose
  } = useDisclosure();
  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose
  } = useDisclosure();
  const {
    isProcessing,
    processingFiles
  } = useProcessing();
  const getStatusBadge = (status: string) => {
    if (status === "processing") {
      return <HStack spacing={1}>
          <Badge colorScheme="yellow" px={2} py={1} animation={`${processingAnimation} 1.5s infinite`} display="flex" alignItems="center" gap={1}>
            <Spinner size="xs" color="yellow.600" />
            <Text>전처리 중</Text>
          </Badge>
        </HStack>;
    }
    return <Badge colorScheme={status === "completed" ? "green" : status === "failed" ? "red" : "blue"} px={2} py={1}>
        {status === "completed" ? "완료" : status === "failed" ? "실패" : "대기중"}
      </Badge>;
  };
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedFiles(mockFiles.map(file => file.id));
    } else {
      setSelectedFiles([]);
    }
  };
  const handleSelectFile = (fileId: string) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      } else {
        return [...prev, fileId];
      }
    });
  };
  const handleDelete = () => {
    console.log("Deleting files:", selectedFiles);
    setSelectedFiles([]);
    setIsDeleteDialogOpen(false);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockFiles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFiles = mockFiles.slice(startIndex, endIndex);
  return <Box bg="white" borderRadius="lg" shadow="sm">
      <Box p={4} borderBottom="1px" borderColor="gray.200">
        <HStack justify="space-between">
          <HStack>
            <Text fontSize="lg" fontWeight="bold">
              문서 목록
            </Text>
            <Button leftIcon={<History size={16} />} variant="ghost" size="sm" onClick={onLogOpen}>
              로그 보기
            </Button>
          </HStack>
          <HStack spacing={3}>
            {selectedFiles.length > 0 && <Button leftIcon={<Trash2 size={16} />} colorScheme="red" variant="outline" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
                선택 삭제 ({selectedFiles.length})
              </Button>}
            {isProcessing && <HStack bg="blue.50" px={3} py={2} borderRadius="md" borderWidth={1} borderColor="blue.200">
                <Spinner size="sm" color="blue.500" />
                <Text fontSize="sm" color="blue.700">
                  전처리 진행 중
                </Text>
                <Badge colorScheme="blue" variant="subtle">
                  {processingFiles.length}개 문서
                </Badge>
              </HStack>}
            <Menu>
              <MenuButton as={Button} colorScheme={isProcessing ? "blue" : "blue"} variant={isProcessing ? "outline" : "solid"} rightIcon={isProcessing ? <ChevronDown size={16} /> : undefined} leftIcon={!isProcessing ? <Upload size={16} /> : <Spinner size="sm" />} onClick={!isProcessing ? onUploadClick : undefined}>
                {isProcessing ? "진행 상태 보기" : "문서 등록"}
              </MenuButton>
              {isProcessing && <MenuList>
                  {processingFiles.map(file => <MenuItem key={file.id}>
                      <HStack justify="space-between" width="100%">
                        <Text fontSize="sm" noOfLines={1}>
                          {file.filename}
                        </Text>
                        <Badge colorScheme={file.status === "completed" ? "green" : file.status === "failed" ? "red" : file.status === "processing" ? "yellow" : "blue"}>
                          {file.status === "completed" ? "완료" : file.status === "failed" ? "실패" : file.status === "processing" ? "처리중" : "업로드중"}
                        </Badge>
                      </HStack>
                    </MenuItem>)}
                </MenuList>}
            </Menu>
          </HStack>
        </HStack>
      </Box>
      <Box overflowX="auto">
        <Table variant="simple" minWidth="800px">
          <Thead>
            <Tr>
              <Th width="1">
                <Checkbox isChecked={selectedFiles.length === mockFiles.length} isIndeterminate={selectedFiles.length > 0 && selectedFiles.length < mockFiles.length} onChange={handleSelectAll} />
              </Th>
              <Th>파일명</Th>
              <Th>크기</Th>
              <Th>페이지</Th>
              <Th>청크</Th>
              <Th display={{
              base: "none",
              md: "table-cell"
            }}>
                등록자
              </Th>
              <Th display={{
              base: "none",
              lg: "table-cell"
            }}>
                등록 일시
              </Th>
              <Th>상태</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentFiles.map(file => <Tr key={file.id}>
                <Td>
                  <Checkbox isChecked={selectedFiles.includes(file.id)} onChange={() => handleSelectFile(file.id)} />
                </Td>
                <Td maxW="200px" isTruncated>
                  {file.filename}
                </Td>
                <Td>{formatFileSize(file.filesize)}</Td>
                <Td>{file.page_count}</Td>
                <Td>{file.chunk_count}</Td>
                <Td display={{
              base: "none",
              md: "table-cell"
            }}>
                  {file.registrar}
                </Td>
                <Td display={{
              base: "none",
              lg: "table-cell"
            }}>
                  {formatDate(file.registered_at)}
                </Td>
                <Td>{getStatusBadge(file.status)}</Td>
                <Td>
                  <Menu>
                    <MenuButton as={IconButton} icon={<MoreVertical size={16} />} variant="ghost" size="sm" />
                    <MenuList>
                      <MenuItem icon={<Eye size={16} />} onClick={() => {
                    setSelectedDocument(file);
                    onDetailOpen();
                  }}>
                        상세보기
                      </MenuItem>
                      <MenuItem icon={<RefreshCw size={16} />}>재처리</MenuItem>
                      <MenuItem icon={<Trash2 size={16} />} color="red.500" onClick={() => {
                    setSelectedFiles([file.id]);
                    setIsDeleteDialogOpen(true);
                  }}>
                        삭제
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>)}
          </Tbody>
        </Table>
      </Box>
      <Box borderTop="1px" borderColor="gray.200" bg="white">
        <Box width="100%" py={4} px={6}>
          <HStack justify="space-between" align="center">
            <Text fontSize="sm" color="gray.600">
              총 {mockFiles.length}개 중 {startIndex + 1}-
              {Math.min(endIndex, mockFiles.length)}
            </Text>
            <HStack spacing={2}>
              <Button size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} isDisabled={currentPage === 1} leftIcon={<ChevronLeft size={16} />} variant="ghost">
                이전
              </Button>
              {Array.from({
              length: totalPages
            }, (_, i) => i + 1).map(page => <Button key={page} size="sm" variant={currentPage === page ? "solid" : "ghost"} colorScheme={currentPage === page ? "blue" : "gray"} onClick={() => setCurrentPage(page)}>
                  {page}
                </Button>)}
              <Button size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} isDisabled={currentPage === totalPages} rightIcon={<ChevronRight size={16} />} variant="ghost">
                다음
              </Button>
            </HStack>
          </HStack>
        </Box>
      </Box>
      <ProcessingLogModal isOpen={isLogOpen} onClose={onLogClose} />
      <AlertDialog isOpen={isDeleteDialogOpen} leastDestructiveRef={cancelRef} onClose={() => setIsDeleteDialogOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              문서 삭제
            </AlertDialogHeader>
            <AlertDialogBody>
              선택한 {selectedFiles.length}개의 문서를 삭제하시겠습니까?
              <Text fontSize="sm" color="gray.500" mt={2}>
                이 작업은 되돌릴 수 없습니다.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteDialogOpen(false)}>
                아니오
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                예
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {selectedDocument && <DocumentDetailDrawer isOpen={isDetailOpen} onClose={onDetailClose} document={selectedDocument} />}
    </Box>;
};