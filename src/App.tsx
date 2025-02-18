import React from "react";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProjectDetail } from "./pages/ProjectDetail";
import { PreprocessingSessionList } from "./pages/PreprocessingSessionList";
import { ProcessingProvider } from "./contexts/ProcessingContext";
import { ChakraProvider } from "@chakra-ui/react";
export function App() {
  return <ChakraProvider>
      <ProcessingProvider>
        <Router initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/preprocessing-sessions" element={<PreprocessingSessionList />} />
          </Routes>
        </Router>
      </ProcessingProvider>
    </ChakraProvider>;
}