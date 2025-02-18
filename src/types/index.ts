export interface Project {
  id: string;
  pj_no: string;
  pj_nm: string;
  pj_full_nm: string;
  description: string;
  created_at: string;
  updated_at: string;
  fileCount: number;
}
export interface File {
  id: string;
  filename: string;
  filepath: string;
  filesize: number;
  upload_time: string;
  processing_time: string;
  page_count: number;
  chunk_count: number;
  status: 'registered' | 'processing' | 'completed' | 'failed';
  error_log?: string;
}
export interface PreprocessingSession {
  id: string;
  startTime: string;
  endTime?: string;
  totalFiles: number;
  completedFiles: number;
  failedFiles: number;
  processingFiles: number;
  status: 'in_progress' | 'completed' | 'failed';
  files: PreprocessingFile[];
}
export interface PreprocessingFile {
  id: string;
  filename: string;
  uploadTime: string;
  processTime?: string;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  errorCode?: string;
  errorMessage?: string;
}