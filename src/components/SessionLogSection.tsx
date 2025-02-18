import React, { useState } from "react";
import { Box, VStack, Button, Collapse, Table, Thead, Tbody, Tr, Th, Td, Badge, Text, IconButton, Flex } from "@chakra-ui/react";
import { ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { SessionSummaryCard } from "./SessionSummaryCard";
import { PreprocessingSession, PreprocessingFile } from "../types";
interface SessionLogSectionProps {
  currentSession: PreprocessingSession;
}
export const SessionLogSection = ({
  currentSession
}: SessionLogSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleReprocess = (fileId: string) => {
    // Implement reprocessing logic
    console.log("Reprocessing file:", fileId);
  };
  return <Box bg="white" borderRadius="lg" shadow="sm" mb={6}>
      <Box p={4}>
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold">
            전처리 세션 현황
          </Text>
          <IconButton aria-label={isExpanded ? "Close session log" : "Open session log"} icon={isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />} variant="ghost" onClick={() => setIsExpanded(!isExpanded)} />
        </Flex>
        <SessionSummaryCard session={currentSession} />
        <Collapse in={isExpanded} animateOpacity>
          <Box mt={4}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>파일명</Th>
                  <Th>이벤트</Th>
                  <Th>시간</Th>
                  <Th>상태</Th>
                  <Th>작업</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentSession.files.map(file => <Tr key={file.id}>
                    <Td>{file.filename}</Td>
                    <Td>
                      <Badge colorScheme={file.status === "completed" ? "green" : file.status === "failed" ? "red" : file.status === "processing" ? "yellow" : "blue"}>
                        {file.status === "completed" ? "전처리 완료" : file.status === "failed" ? "전처리 실패" : file.status === "processing" ? "전처리 중" : "업로드 완료"}
                      </Badge>
                    </Td>
                    <Td>{new Date(file.uploadTime).toLocaleString()}</Td>
                    <Td>
                      {file.errorMessage && <Text color="red.500" fontSize="sm">
                          {file.errorMessage}
                        </Text>}
                    </Td>
                    <Td>
                      {file.status === "failed" && <Button leftIcon={<RefreshCw size={16} />} size="sm" colorScheme="blue" variant="ghost" onClick={() => handleReprocess(file.id)}>
                          재처리
                        </Button>}
                    </Td>
                  </Tr>)}
              </Tbody>
            </Table>
          </Box>
        </Collapse>
      </Box>
    </Box>;
};