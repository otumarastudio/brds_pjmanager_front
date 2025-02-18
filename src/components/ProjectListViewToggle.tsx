import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Grid, Table } from "lucide-react";
interface ProjectListViewToggleProps {
  view: "grid" | "table";
  onChange: (view: "grid" | "table") => void;
}
export const ProjectListViewToggle = ({
  view,
  onChange
}: ProjectListViewToggleProps) => {
  return <ButtonGroup size="sm" isAttached variant="outline">
      <Button leftIcon={<Grid size={16} />} onClick={() => onChange("grid")} variant={view === "grid" ? "solid" : "outline"} colorScheme={view === "grid" ? "blue" : "gray"}>
        그리드
      </Button>
      <Button leftIcon={<Table size={16} />} onClick={() => onChange("table")} variant={view === "table" ? "solid" : "outline"} colorScheme={view === "table" ? "blue" : "gray"}>
        테이블
      </Button>
    </ButtonGroup>;
};