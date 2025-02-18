import React from "react";
import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import { Calendar, FileText, User, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface ProjectCardProps {
  id: string;
  pj_no: string;
  pj_nm: string;
  pj_full_nm: string;
  description: string;
  created_at: string;
  updated_at: string;
  fileCount: number;
}
export const ProjectCard = ({
  id,
  pj_no,
  pj_nm,
  pj_full_nm,
  description,
  created_at,
  updated_at,
  fileCount
}: ProjectCardProps) => {
  const navigate = useNavigate();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  };
  const handleClick = () => {
    navigate(`/project/${id}`);
  };
  return <Box p={6} bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200" _hover={{
    boxShadow: "md",
    transform: "translateY(-2px)"
  }} transition="all 0.2s" cursor="pointer" onClick={handleClick}>
      <Flex direction="column" gap={1} mb={3}>
        <Text color="gray.600" fontSize="sm">
          {pj_no}
        </Text>
        <Tooltip label={pj_full_nm} placement="top">
          <Text fontSize="lg" fontWeight="bold">
            {pj_nm}
          </Text>
        </Tooltip>
      </Flex>
      <Text color="gray.600" noOfLines={2} mb={4}>
        {description}
      </Text>
      <Flex direction="column" gap={2}>
        <Flex align="center" gap={2}>
          <User size={16} />
          <Text fontSize="sm" color="gray.600">
            정대우 책임
          </Text>
        </Flex>
        <Flex align="center" gap={2}>
          <Calendar size={16} />
          <Text fontSize="sm" color="gray.600">
            생성: {formatDate(created_at)}
          </Text>
        </Flex>
        <Flex align="center" gap={2}>
          <Info size={16} />
          <Text fontSize="sm" color="gray.600">
            수정: {formatDate(updated_at)}
          </Text>
        </Flex>
        <Flex align="center" gap={2}>
          <FileText size={16} />
          <Text fontSize="sm" color="gray.600">
            파일 {fileCount}개
          </Text>
        </Flex>
      </Flex>
    </Box>;
};