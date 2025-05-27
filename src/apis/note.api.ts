import { API_URL } from "../lib/config";

export async function downloadNotesTemplate(groupId: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/api/Notes/template?groupId=${groupId}`, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers.get("content-disposition");
      let filename = "template.csv";
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match?.[1]) filename = match[1];
      }
  
      // Trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  }
  interface UploadFormData {
    tremester: string;
    academicYearId: string;
    examTypeId: string;
    subjectId: string;
  }

export async function uploadNotesCSV(
    file: File,
    groupId: string,
    formDataState: UploadFormData
  ): Promise<void> {
    const formData = new FormData();
  formData.append('CsvFile', file);
  formData.append('GroupId', groupId);
  formData.append('Tremester', formDataState.tremester);
  formData.append('AcademicYearId', "1");
  formData.append('ExamTypeId', formDataState.examTypeId);
  formData.append('SubjectId', formDataState.subjectId);
  
    try {
      const response = await fetch('http://localhost:5080/api/Notes/bulk', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          // 'Content-Type' is NOT set manually; browser will handle it for multipart/form-data
        },
        body: formData
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }
  
      console.log("Upload successful");
    } catch (error) {
      console.error("Upload error:", error);
    }
  }
   
  