import React from "react";
import { Box, Button, Flex, useDisclosure, Breadcrumb, BreadcrumbItem, Text, HStack } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { Header } from "../components/Header";
import { ProjectList } from "../components/ProjectList";
import { SearchBar } from "../components/SearchBar";
import { CreateProjectDrawer } from "../components/CreateProjectDrawer";
export const Home = () => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure();
  return <Box bg="gray.50" minH="100vh" width="100%">
      <Header />
      <Box p={6}>
        <Box mb={6}>
          <Breadcrumb spacing="8px">
            <BreadcrumbItem isCurrentPage>
              <Text>프로젝트 관리</Text>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Flex justify="space-between" align="center" mb={6}>
          <SearchBar />
          <HStack spacing={4}>
            <Button leftIcon={<Plus size={20} />} colorScheme="blue" onClick={onOpen} shadow="md">
              신규 프로젝트 등록
            </Button>
          </HStack>
        </Flex>
        <ProjectList />
        <CreateProjectDrawer isOpen={isOpen} onClose={onClose} />
      </Box>
    </Box>;
};