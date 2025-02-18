import React from "react";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Input, Textarea, VStack } from "@chakra-ui/react";
interface CreateProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export const CreateProjectDrawer = ({
  isOpen,
  onClose
}: CreateProjectDrawerProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };
  return <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">신규 프로젝트 등록</DrawerHeader>
        <DrawerBody>
          <form id="create-project-form" onSubmit={handleSubmit}>
            <VStack spacing={4} mt={4}>
              <FormControl isRequired>
                <FormLabel>프로젝트 번호</FormLabel>
                <Input placeholder="예: IND-T3-001" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>국가</FormLabel>
                <Input placeholder="예: 나이지리아" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>프로젝트 명</FormLabel>
                <Input placeholder="예: Indorama T3" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>프로젝트 설명</FormLabel>
                <Textarea placeholder="예: 입찰 ITB - Indorama T3" rows={4} />
              </FormControl>
            </VStack>
          </form>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            취소
          </Button>
          <Button colorScheme="blue" type="submit" form="create-project-form">
            등록
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>;
};