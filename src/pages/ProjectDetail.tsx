import React from "react";
import { Box, useDisclosure, useToast, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import { Header } from "../components/Header";
import { ProjectDashboard } from "../components/ProjectDashboard";
import { FileList } from "../components/FileList";
import { ProcessingDrawer } from "../components/ProcessingDrawer";
import { useNavigate } from "react-router-dom";
const mockProject = {
  id: "proj-001",
  pj_no: "IND-T3-001",
  pj_nm: "Indorama T3",
  pj_full_nm: "Indorama T3 Project - Nigeria",
  description: "입찰 검토 및 수행 현장 준비: 나이지리아에서 진행되는 Indorama T3 프로젝트.",
  created_at: "2025-01-05T09:15:00Z",
  updated_at: "2025-01-12T16:20:00Z",
  fileCount: 8,
  processing_stats: {
    uploaded: 12,
    processing: 2,
    completed: 8,
    failed: 2
  }
};
export const ProjectDetail = () => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const handleProcessingComplete = (success: number, failed: number) => {
    toast({
      title: "전처리 완료",
      description: `성공: ${success}개, 실패: ${failed}개`,
      status: failed > 0 ? "warning" : "success",
      duration: 5000,
      isClosable: true
    });
  };
  return <Box bg="gray.50" minH="100vh" width="100%">
      <Header />
      <Box p={6}>
        <Box mb={6}>
          <Breadcrumb spacing="8px" separator={<ChevronRight size={16} />}>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate("/")} color="blue.500">
                프로젝트 관리
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Text>문서 등록</Text>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <ProjectDashboard project={mockProject} />
        <FileList onUploadClick={onOpen} />
      </Box>
      <ProcessingDrawer isOpen={isOpen} onClose={onClose} onProcessingComplete={handleProcessingComplete} />
    </Box>;
};