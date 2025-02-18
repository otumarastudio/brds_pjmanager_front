import React from "react";
import { Box, SimpleGrid, Text, Stat, StatLabel, StatNumber, StatHelpText, Flex, Card, CardBody, Divider, HStack } from "@chakra-ui/react";
import { FileText, Database, Layers, Clock, Calendar, User, Building } from "lucide-react";
import { Project } from "../types";
interface ProjectDashboardProps {
  project: Project;
}
export const ProjectDashboard = ({
  project
}: ProjectDashboardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  return <Box mb={6}>
      <Card mb={6}>
        <CardBody>
          <Text fontSize="sm" color="gray.600" mb={1}>
            {project.pj_no}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            {project.pj_nm}
          </Text>
          <Text color="gray.600" mb={4}>
            {project.description}
          </Text>
          <Divider mb={4} />
          <SimpleGrid columns={{
          base: 1,
          md: 2
        }} spacing={{
          base: 2,
          md: 4
        }}>
            <HStack>
              <User size={16} color="gray.500" />
              <Text fontSize="sm" color="gray.600">
                생성자: 정대우 책임
              </Text>
            </HStack>
            <HStack>
              <Calendar size={16} color="gray.500" />
              <Text fontSize="sm" color="gray.600">
                생성일: {formatDate(project.created_at)}
              </Text>
            </HStack>
            <HStack>
              <Building size={16} color="gray.500" />
              <Text fontSize="sm" color="gray.600">
                소속: 석유화학사업팀
              </Text>
            </HStack>
            <HStack>
              <Clock size={16} color="gray.500" />
              <Text fontSize="sm" color="gray.600">
                수정일: {formatDate(project.updated_at)}
              </Text>
            </HStack>
          </SimpleGrid>
        </CardBody>
      </Card>
      <SimpleGrid columns={{
      base: 1,
      sm: 2,
      lg: 4
    }} spacing={{
      base: 4,
      lg: 6
    }}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>전체 파일</StatLabel>
              <StatNumber>{project.processing_stats.uploaded}</StatNumber>
              <StatHelpText>
                <Flex align="center" gap={2}>
                  <FileText size={14} />
                  <Text>등록된 파일 수</Text>
                </Flex>
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>총 용량</StatLabel>
              <StatNumber>2.5 GB</StatNumber>
              <StatHelpText>
                <Flex align="center" gap={2}>
                  <Database size={14} />
                  <Text>전체 문서 용량</Text>
                </Flex>
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>총 청크</StatLabel>
              <StatNumber>128</StatNumber>
              <StatHelpText>
                <Flex align="center" gap={2}>
                  <Layers size={14} />
                  <Text>생성된 청크 수</Text>
                </Flex>
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>최근 업로드</StatLabel>
              <StatNumber fontSize={{
              base: "lg",
              md: "2xl"
            }}>
                {formatDate(project.updated_at)}
              </StatNumber>
              <StatHelpText>
                <Flex align="center" gap={2}>
                  <Clock size={14} />
                  <Text>마지막 업데이트</Text>
                </Flex>
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>;
};