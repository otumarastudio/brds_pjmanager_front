import React from "react";
import { Box, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import { Home, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const navigate = useNavigate();
  return <Box bg="white" borderBottom="1px" borderColor="gray.200" width="100%" height="64px">
      <Flex align="center" justify="space-between" p={4} height="100%">
        <Flex align="center" gap={4}>
          <IconButton aria-label="Home" icon={<Home size={20} />} variant="ghost" onClick={() => navigate("/")} />
          <Text fontSize="xl" fontWeight="bold">
            바로답AI 프로젝트 관리
          </Text>
        </Flex>
        <Spacer />
        <IconButton aria-label="User profile" icon={<User size={20} />} variant="ghost" />
      </Flex>
    </Box>;
};