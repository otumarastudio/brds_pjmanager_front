import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Badge, Container } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
const mockSessions = [{
  id: "session-001",
  startTime: "2024-01-20T10:00:00Z",
  endTime: "2024-01-20T10:30:00Z",
  totalFiles: 10,
  completedFiles: 7,
  failedFiles: 1,
  processingFiles: 2,
  status: "in_progress" as const
}
// Add more mock sessions...
];
export const PreprocessingSessionList = () => {
  const navigate = useNavigate();
  return <Box bg="gray.50" minH="100vh">
      <Header />
      <Container maxW="container.xl" py={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          전처리 세션 목록
        </Text>
        <Box bg="white" borderRadius="lg" shadow="sm">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>세션 ID</Th>
                <Th>시작 시간</Th>
                <Th>종료 시간</Th>
                <Th>총 파일</Th>
                <Th>완료</Th>
                <Th>실패</Th>
                <Th>상태</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mockSessions.map(session => <Tr key={session.id} cursor="pointer" _hover={{
              bg: "gray.50"
            }} onClick={() => navigate(`/preprocessing-sessions/${session.id}`)}>
                  <Td>{session.id}</Td>
                  <Td>{new Date(session.startTime).toLocaleString()}</Td>
                  <Td>
                    {session.endTime ? new Date(session.endTime).toLocaleString() : "-"}
                  </Td>
                  <Td>{session.totalFiles}</Td>
                  <Td>{session.completedFiles}</Td>
                  <Td>{session.failedFiles}</Td>
                  <Td>
                    <Badge colorScheme={session.status === "completed" ? "green" : session.status === "failed" ? "red" : "yellow"}>
                      {session.status === "completed" ? "완료" : session.status === "failed" ? "실패" : "진행중"}
                    </Badge>
                  </Td>
                </Tr>)}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </Box>;
};