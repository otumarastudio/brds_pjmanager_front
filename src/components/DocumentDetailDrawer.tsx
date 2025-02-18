import React from "react";
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, VStack, Card, CardHeader, CardBody, Text, Heading, Divider, Box, HStack, Badge, IconButton, Collapse, useDisclosure } from "@chakra-ui/react";
import { ChevronDown, ChevronUp, FileText, User, Calendar, Database } from "lucide-react";
interface DocumentDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  document: any; // 실제 사용시 타입 정의 필요
}
const CodeBlock = ({
  data
}: {
  data: any;
}) => <Box as="pre" p={4} bg="gray.50" borderRadius="md" fontSize="sm" fontFamily="monospace" overflowX="auto">
    {JSON.stringify(data, null, 2)}
  </Box>;
const Section = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const {
    isOpen,
    onToggle
  } = useDisclosure({
    defaultIsOpen: true
  });
  return <Card variant="outline" width="100%">
      <CardHeader p={4}>
        <HStack justify="space-between">
          <Heading size="sm">{title}</Heading>
          <IconButton aria-label="Toggle section" icon={isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />} variant="ghost" size="sm" onClick={onToggle} />
        </HStack>
      </CardHeader>
      <Collapse in={isOpen}>
        <CardBody pt={0}>{children}</CardBody>
      </Collapse>
    </Card>;
};
export const DocumentDetailDrawer = ({
  isOpen,
  onClose,
  document
}: DocumentDetailDrawerProps) => {
  const mockDocumentInfo = {
    metadata: {
      title: "Indorama T3 Specification",
      author: "Engineering Team",
      created_date: "2024-01-15",
      last_modified: "2024-01-20",
      page_count: 45,
      keywords: ["specification", "engineering", "chemical plant"]
    }
  };
  const mockChunks = [{
    id: "chunk-001",
    content: "The T3 expansion project includes...",
    page: 1,
    position: {
      top: 100,
      left: 50,
      width: 500,
      height: 200
    }
  }, {
    id: "chunk-002",
    content: "Technical specifications for the main reactor...",
    page: 2,
    position: {
      top: 150,
      left: 50,
      width: 500,
      height: 180
    }
  }];
  return <Drawer isOpen={isOpen} onClose={onClose} size="lg" placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">문서 상세 정보</DrawerHeader>
        <DrawerBody>
          <VStack spacing={6} py={4}>
            <Section title="기본 정보">
              <VStack align="stretch" spacing={3}>
                <HStack>
                  <FileText size={16} />
                  <Text fontWeight="medium">파일명:</Text>
                  <Text>{document.filename}</Text>
                </HStack>
                <HStack>
                  <Database size={16} />
                  <Text fontWeight="medium">크기:</Text>
                  <Text>{document.filesize} bytes</Text>
                </HStack>
                <HStack>
                  <User size={16} />
                  <Text fontWeight="medium">등록자:</Text>
                  <Text>{document.registrar}</Text>
                </HStack>
                <HStack>
                  <Calendar size={16} />
                  <Text fontWeight="medium">등록일:</Text>
                  <Text>
                    {new Date(document.registered_at).toLocaleString()}
                  </Text>
                </HStack>
                <HStack>
                  <Text fontWeight="medium">상태:</Text>
                  <Badge colorScheme={document.status === "completed" ? "green" : document.status === "failed" ? "red" : "yellow"}>
                    {document.status}
                  </Badge>
                </HStack>
              </VStack>
            </Section>
            <Section title="Document Information">
              <CodeBlock data={mockDocumentInfo} />
            </Section>
            <Section title="Chunks">
              <CodeBlock data={mockChunks} />
            </Section>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>;
};