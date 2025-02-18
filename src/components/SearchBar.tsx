import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search } from "lucide-react";
export const SearchBar = () => {
  return <InputGroup maxW="400px">
      <InputLeftElement pointerEvents="none">
        <Search size={20} color="gray" />
      </InputLeftElement>
      <Input placeholder="프로젝트 검색..." />
    </InputGroup>;
};