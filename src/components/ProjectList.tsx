import React, { useState } from "react";
import { Box, Grid, HStack, Button, VStack, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { ProjectTableView } from "./ProjectTableView";
import { ProjectListViewToggle } from "./ProjectListViewToggle";
const mockProjects = [{
  id: "proj-001",
  pj_no: "IND-T3-001",
  pj_nm: "Indorama T3",
  pj_full_nm: "Indorama T3 Project - Nigeria",
  description: "입찰 검토 및 수행 현장 준비: 나이지리아에서 진행되는 Indorama T3 프로젝트.",
  created_at: "2025-01-05T09:15:00Z",
  updated_at: "2025-01-12T16:20:00Z",
  fileCount: 8
}, {
  id: "proj-002",
  pj_no: "NLNG-002",
  pj_nm: "NLNG",
  pj_full_nm: "NLNG Gas Pipeline Project - Nigeria",
  description: "입찰 검토 및 수행 현장: 나이지리아 내 NLNG 가스 파이프라인 프로젝트.",
  created_at: "2025-01-10T11:00:00Z",
  updated_at: "2025-01-15T13:45:00Z",
  fileCount: 12
}, {
  id: "proj-003",
  pj_no: "DUQM-003",
  pj_nm: "Duqm",
  pj_full_nm: "Duqm Port & Industrial Zone Project - Oman",
  description: "입찰 검토 및 수행 현장: 오만 Duqm 항만 및 산업단지 개발 프로젝트.",
  created_at: "2025-01-08T08:30:00Z",
  updated_at: "2025-01-18T10:00:00Z",
  fileCount: 15
}, {
  id: "proj-004",
  pj_no: "SAD-004",
  pj_nm: "Sadara",
  pj_full_nm: "Sadara Chemical Complex - Saudi Arabia",
  description: "입찰 검토 및 수행 현장: 사우디아라비아 Sadara 화학단지 프로젝트.",
  created_at: "2025-01-12T14:20:00Z",
  updated_at: "2025-01-20T09:50:00Z",
  fileCount: 10
}, {
  id: "proj-005",
  pj_no: "CPF-005",
  pj_nm: "CPF",
  pj_full_nm: "CPF Refinery Project - Kuwait",
  description: "입찰 검토 및 수행 현장: 쿠웨이트 CPF 정유 공장 프로젝트.",
  created_at: "2025-01-15T10:00:00Z",
  updated_at: "2025-01-22T11:30:00Z",
  fileCount: 6
}];
const ITEMS_PER_PAGE = 6;
export const ProjectList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState<"grid" | "table">("grid");
  const totalPages = Math.ceil(mockProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = mockProjects.slice(startIndex, endIndex);
  const Pagination = () => <Box width="100%" py={4} px={6}>
      <HStack justify="space-between" align="center">
        <Text fontSize="sm" color="gray.600">
          총 {mockProjects.length}개 중 {startIndex + 1}-
          {Math.min(endIndex, mockProjects.length)}
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
    </Box>;
  return <VStack spacing={0} width="100%" align="stretch">
      <Box px={6} mb={4}>
        <ProjectListViewToggle view={view} onChange={setView} />
      </Box>
      {view === "grid" ? <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} p={6} width="100%">
          {currentProjects.map(project => <ProjectCard key={project.id} {...project} />)}
        </Grid> : <Box px={6}>
          <ProjectTableView projects={currentProjects} />
        </Box>}
      <Box borderTop="1px" borderColor="gray.200" bg="white">
        <Pagination />
      </Box>
    </VStack>;
};