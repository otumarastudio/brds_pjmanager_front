import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, IconButton, Menu, MenuButton, MenuList, MenuItem, Text, Tooltip } from "@chakra-ui/react";
import { Eye, MoreVertical, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Project } from "../types";
interface ProjectTableViewProps {
  projects: Project[];
}
export const ProjectTableView = ({
  projects
}: ProjectTableViewProps) => {
  const navigate = useNavigate();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  };
  return <Box bg="white" borderRadius="lg" shadow="sm" overflow="hidden">
      <Box overflowX="auto">
        <Table variant="simple" minWidth="800px">
          <Thead>
            <Tr>
              <Th>프로젝트 번호</Th>
              <Th>프로젝트명</Th>
              <Th display={{
              base: "none",
              md: "table-cell"
            }}>
                설명
              </Th>
              <Th display={{
              base: "none",
              lg: "table-cell"
            }}>
                담당자
              </Th>
              <Th display={{
              base: "none",
              md: "table-cell"
            }}>
                생성일
              </Th>
              <Th display={{
              base: "table-cell",
              md: "none"
            }}>
                날짜
              </Th>
              <Th>문서</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map(project => <Tr key={project.id} _hover={{
            bg: "gray.50"
          }} cursor="pointer" onClick={() => navigate(`/project/${project.id}`)}>
                <Td>{project.pj_no}</Td>
                <Td>
                  <Tooltip label={project.pj_full_nm}>
                    <Text fontWeight="medium" maxW="200px" isTruncated>
                      {project.pj_nm}
                    </Text>
                  </Tooltip>
                </Td>
                <Td display={{
              base: "none",
              md: "table-cell"
            }}>
                  <Text noOfLines={1} maxW="300px">
                    {project.description}
                  </Text>
                </Td>
                <Td display={{
              base: "none",
              lg: "table-cell"
            }}>
                  정대우 책임
                </Td>
                <Td display={{
              base: "none",
              md: "table-cell"
            }}>
                  {formatDate(project.created_at)}
                </Td>
                <Td display={{
              base: "table-cell",
              md: "none"
            }}>
                  {formatDate(project.created_at)}
                </Td>
                <Td whiteSpace="nowrap">{project.fileCount}개</Td>
                <Td onClick={e => e.stopPropagation()}>
                  <Menu>
                    <MenuButton as={IconButton} icon={<MoreVertical size={16} />} variant="ghost" size="sm" />
                    <MenuList>
                      <MenuItem icon={<Eye size={16} />}>상세보기</MenuItem>
                      <MenuItem icon={<Edit size={16} />}>수정</MenuItem>
                      <MenuItem icon={<Trash2 size={16} />} color="red.500">
                        삭제
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>)}
          </Tbody>
        </Table>
      </Box>
    </Box>;
};