import React, { useCallback, useState, createContext, useContext } from "react";
interface ProcessingLog {
  id: string;
  timestamp: string;
  message: string;
  type: "info" | "success" | "error";
}
interface ProcessingFile {
  id: string;
  filename: string;
  status: "uploading" | "processing" | "completed" | "failed";
  progress: number;
  errorMessage?: string;
}
interface ProcessingContextType {
  isProcessing: boolean;
  processingFiles: ProcessingFile[];
  logs: ProcessingLog[];
  startProcessing: (files: File[]) => void;
  addLog: (log: Omit<ProcessingLog, "id" | "timestamp">) => void;
}
const ProcessingContext = createContext<ProcessingContextType | undefined>(undefined);
export const ProcessingProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingFiles, setProcessingFiles] = useState<ProcessingFile[]>([]);
  const [logs, setLogs] = useState<ProcessingLog[]>([]);
  const addLog = useCallback((log: Omit<ProcessingLog, "id" | "timestamp">) => {
    setLogs(prev => [...prev, {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString()
    }]);
  }, []);
  const startProcessing = useCallback((files: File[]) => {
    const newFiles = files.map(file => ({
      id: `file-${Date.now()}-${file.name}`,
      filename: file.name,
      status: "uploading" as const,
      progress: 0
    }));
    setProcessingFiles(newFiles);
    setIsProcessing(true);
    addLog({
      type: "info",
      message: `${files.length}개 파일 업로드 시작`
    });
    // 각 파일별로 업로드 및 처리 시뮬레이션
    newFiles.forEach((file, index) => {
      // 업로드 진행
      setTimeout(() => {
        setProcessingFiles(prev => prev.map(f => f.id === file.id ? {
          ...f,
          progress: 100,
          status: "processing"
        } : f));
        addLog({
          type: "info",
          message: `${file.filename} 업로드 완료`
        });
      }, index * 2000);
      // 처리 완료
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% 성공률
        setProcessingFiles(prev => prev.map(f => f.id === file.id ? {
          ...f,
          status: success ? "completed" : "failed",
          errorMessage: success ? undefined : "전처리 중 오류가 발생했습니다."
        } : f));
        addLog({
          type: success ? "success" : "error",
          message: `${file.filename} ${success ? "전처리 완료" : "전처리 실패"}`
        });
        // 마지막 파일 처리 완료 후
        if (index === newFiles.length - 1) {
          setTimeout(() => {
            setIsProcessing(false);
          }, 1000);
        }
      }, index * 2000 + 8000);
    });
  }, [addLog]);
  return <ProcessingContext.Provider value={{
    isProcessing,
    processingFiles,
    logs,
    startProcessing,
    addLog
  }}>
      {children}
    </ProcessingContext.Provider>;
};
export const useProcessing = () => {
  const context = useContext(ProcessingContext);
  if (context === undefined) {
    throw new Error("useProcessing must be used within a ProcessingProvider");
  }
  return context;
};