import React from "react";
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, VStack, Text, Badge, Box, Flex, Spinner } from "@chakra-ui/react";
import { useProcessing } from "../contexts/ProcessingContext";
const mockLogs = [{
  id: "log-001",
  timestamp: "2024-01-20T10:00:00Z",
  type: "info",
  message: "전처리 세션 시작 - 총 5개 파일",
  details: "세션 ID: SESSION-2024-01-20-001"
}, {
  id: "log-002",
  timestamp: "2024-01-20T10:01:00Z",
  type: "info",
  message: "Indorama_T3_Specification.pdf 업로드 완료",
  details: "파일크기: 25.4MB, 페이지: 45"
}, {
  id: "log-003",
  timestamp: "2024-01-20T10:02:00Z",
  type: "processing",
  message: "NLNG_GasPipeline_Overview.docx 전처리 진행 중",
  details: "텍스트 추출 및 청크 생성 중..."
}, {
  id: "log-004",
  timestamp: "2024-01-20T10:03:00Z",
  type: "success",
  message: "Duqm_Port_Layout.pdf 전처리 완료",
  details: "생성된 청크: 12개, 처리시간: 50초"
}, {
  id: "log-005",
  timestamp: "2024-01-20T10:04:00Z",
  type: "error",
  message: "Sadara_ChemicalComplex_Details.pdf 전처리 실패",
  details: "Error 504: 전처리 모듈 타임아웃 - 네트워크 문제로 인한 데이터 전송 실패"
}];
interface ProcessingLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const ProcessingLogModal = ({
  isOpen,
  onClose
}: ProcessingLogModalProps) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).replace(/\./g, "-").slice(0, -1);
  };
  return <Drawer isOpen={isOpen} onClose={onClose} size="md" placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">처리 로그</DrawerHeader>
        <DrawerBody>
          <VStack spacing={4} align="stretch" pt={2}>
            {mockLogs.map(log => <Box key={log.id} p={4} bg={log.type === "error" ? "red.50" : log.type === "success" ? "green.50" : log.type === "processing" ? "yellow.50" : "gray.50"} borderRadius="md" borderWidth="1px" borderColor={log.type === "error" ? "red.200" : log.type === "success" ? "green.200" : log.type === "processing" ? "yellow.200" : "gray.200"}>
                <VStack align="stretch" spacing={2}>
                  <Text color="gray.500" fontSize="sm" fontFamily="monospace" whiteSpace="nowrap">
                    {formatTime(log.timestamp)}
                  </Text>
                  <Flex align="center" gap={2}>
                    <Badge colorScheme={log.type === "error" ? "red" : log.type === "success" ? "green" : log.type === "processing" ? "yellow" : "blue"} px={2} py={0.5}>
                      {log.type === "error" ? "실패" : log.type === "success" ? "완료" : log.type === "processing" ? "처리중" : "정보"}
                    </Badge>
                    {log.type === "processing" && <Spinner size="xs" />}
                  </Flex>
                  <Text fontWeight="medium">{log.message}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {log.details}
                  </Text>
                </VStack>
              </Box>)}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>;
};