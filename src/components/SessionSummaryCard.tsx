import React from "react";
import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Flex, Text } from "@chakra-ui/react";
import { FileText, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { PreprocessingSession } from "../types";
interface SessionSummaryCardProps {
  session: PreprocessingSession;
}
export const SessionSummaryCard = ({
  session
}: SessionSummaryCardProps) => {
  return <SimpleGrid columns={{
    base: 1,
    md: 4
  }} spacing={4} mt={4}>
      <Stat>
        <StatLabel>총 파일</StatLabel>
        <StatNumber>{session.totalFiles}</StatNumber>
        <StatHelpText>
          <Flex align="center" gap={2}>
            <FileText size={14} />
            <Text>등록된 파일</Text>
          </Flex>
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>처리 완료</StatLabel>
        <StatNumber>{session.completedFiles}</StatNumber>
        <StatHelpText>
          <Flex align="center" gap={2}>
            <CheckCircle size={14} />
            <Text>전처리 완료</Text>
          </Flex>
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>처리 중</StatLabel>
        <StatNumber>{session.processingFiles}</StatNumber>
        <StatHelpText>
          <Flex align="center" gap={2}>
            <Clock size={14} />
            <Text>진행 중</Text>
          </Flex>
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>실패</StatLabel>
        <StatNumber>{session.failedFiles}</StatNumber>
        <StatHelpText>
          <Flex align="center" gap={2}>
            <AlertCircle size={14} />
            <Text>오류 발생</Text>
          </Flex>
        </StatHelpText>
      </Stat>
    </SimpleGrid>;
};