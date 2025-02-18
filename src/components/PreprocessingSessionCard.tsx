import React from "react";
import { Box, Card, CardBody, Text, Stack, Badge, Button, Flex } from "@chakra-ui/react";
import { Clock, AlertCircle, CheckCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PreprocessingSession } from "../types";
interface PreprocessingSessionCardProps {
  session: PreprocessingSession;
}
export const PreprocessingSessionCard = ({
  session
}: PreprocessingSessionCardProps) => {
  const navigate = useNavigate();
  return <Card>
      <CardBody>
        <Stack spacing={3}>
          <Flex justify="space-between" align="center">
            <Text fontWeight="bold">최근 전처리 세션</Text>
            <Badge colorScheme={session.status === "completed" ? "green" : session.status === "failed" ? "red" : "yellow"}>
              {session.status === "completed" ? "완료" : session.status === "failed" ? "실패" : "진행중"}
            </Badge>
          </Flex>
          <Stack spacing={2}>
            <Flex align="center" gap={2}>
              <FileText size={16} />
              <Text fontSize="sm">총 파일: {session.totalFiles}개</Text>
            </Flex>
            <Flex align="center" gap={2}>
              <CheckCircle size={16} />
              <Text fontSize="sm">완료: {session.completedFiles}개</Text>
            </Flex>
            <Flex align="center" gap={2}>
              <Clock size={16} />
              <Text fontSize="sm">처리중: {session.processingFiles}개</Text>
            </Flex>
            <Flex align="center" gap={2}>
              <AlertCircle size={16} />
              <Text fontSize="sm">실패: {session.failedFiles}개</Text>
            </Flex>
          </Stack>
          <Button size="sm" variant="outline" onClick={() => navigate("/preprocessing-sessions")}>
            세션 목록 보기
          </Button>
        </Stack>
      </CardBody>
    </Card>;
};