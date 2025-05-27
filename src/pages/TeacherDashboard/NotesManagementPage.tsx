import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {ArrowLeft,Upload,Download,FileText,CheckCircle,AlertCircle} from "lucide-react";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import {Card,CardContent,CardDescription,CardHeader,CardTitle} from "./components/ui/card";
import { Label } from "./components/ui/label";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "./components/ui/select";
import { Input } from "./components/ui/input";
import { ExamType, getExamTypes } from "../../apis/ExamTypes.api";
import { getSubjectsBySchoolLevel, Subject } from "../../apis/subject.api";
import { downloadNotesTemplate, uploadNotesCSV } from "../../apis/note.api";

interface FormData {
  tremester: string;
  academicYearId: string;
  examTypeId: string;
  subjectId: string;
}

export default function NotesManagementPage() {
  const [examType,setExamType] = useState<ExamType[]>([])
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    tremester: "",
    academicYearId: "",
    examTypeId: "",
    subjectId: "",
  });
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
      setMessage(null);
    } else {
      setMessage({ type: "error", text: "Please select a valid CSV file" });
      setSelectedFile(null);
    }
  };

  const downloadTemplate = async (): Promise<void> => {
    setIsDownloading(true);
    setMessage(null);
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   const csvContent = `Name,FirstName,StudentNumber,Grade
    //   Smith,John,20230001,
    //   Doe,Jane,20230002,`;
    //   const blob = new Blob([csvContent], { type: "text/csv" });
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = `template-students-${groupId?.slice(0, 8)}.csv`;
    //   document.body.appendChild(a);
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    //   document.body.removeChild(a);
    //   setMessage({
    //     type: "success",
    //     text: "Template downloaded successfully!",
    //   });
    // } catch {
    //   setMessage({
    //     type: "error",
    //     text: "Failed to download template. Please try again.",
    //   });
    // } finally {
    //   setIsDownloading(false);
    // }
    await downloadNotesTemplate(groupId || "");
  };

  const uploadNotes = async (): Promise<void> => {
    if (selectedFile && groupId) {
      try {
        await uploadNotesCSV(selectedFile,groupId, formData);
        setMessage({ type: "success", text: "Notes uploaded successfully!" });
      } catch (error) {
        setMessage({
          type: "error",
          text: "Failed to upload notes. Please try again.",
        });
      }
      return;
    }
    const requiredFields: (keyof FormData)[] = [
      "tremester",
      "academicYearId",
      "examTypeId",
      "subjectId",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      setMessage({
        type: "error",
        text: `Please fill all required fields: ${missingFields.join(", ")}`,
      });
      return;
    }
    setIsUploading(true);
    setMessage(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessage({ type: "success", text: "Notes uploaded successfully!" });
      setSelectedFile(null);
      const fileInput = document.getElementById("csvFile") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch {
      setMessage({
        type: "error",
        text: "Failed to upload notes. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleGoBack = (): void => {
    navigate("/Teacherdashboard/notes");
  };

  const getGroupName = (id: string | undefined): string => {
    const groups: Record<string, string> = {
      "6B29FC40-CA47-1067-B31D-00DD010662DA": "Groupe A - Informatique",
      "3fa85f64-5717-4562-b3fc-2c963f66afa6": "Groupe B - Mathématiques",
    };
    return id && groups[id]
      ? groups[id]
      : `Group ${id?.slice(0, 8) || "Unknown"}`;
  };

  useEffect(() => {
    const fetchExamType = async () => {
      try {
        const data = await getExamTypes();
        if(typeof data != "string")
            setExamType(data);  
      } catch (error) {
        console.log("error",error)
      }
    }
    fetchExamType();
  },[])
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubjectsBySchoolLevel()
        if (typeof response !== "string") {
            setSubjects(response);
        } 
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setMessage({
          type: "error",
          text: "Failed to fetch subjects. Please try again later.",
        });
      }
    };
    fetchSubjects();
  }, []);


  return (
    <div className=" ">
      <div className=" mx-auto px-4 py-6">
        <div className="max-w-[80%] mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex-1 text-center">
              <h1 className="text-3xl font-bold text-[var(--color-secondary)]">
                Notes Management
              </h1>
              <p className="text-[var(--color-gray)]">
                Download the template, fill in notes, and upload the file
              </p>
              <p className="text-lg font-medium text-[var(--color-primary)] mt-2">
                {getGroupName(groupId)}
              </p>
            </div>
          </div>

          {message && (
            <Alert
              className={`animate-fade-in ${
                message.type === "error"
                  ? "border-[var(--color-error)]"
                  : "border-green-500"
              }`}
            >
              {message.type === "error" ? (
                <AlertCircle className="h-4 w-4 text-[var(--color-error)]" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
              <AlertDescription
                className={
                  message.type === "error"
                    ? "text-[var(--color-error)]"
                    : "text-green-700"
                }
              >
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-2 border-[var(--color-sous)]">
              <CardHeader className="bg-[var(--color-sous)]">
                <CardTitle className="text-[var(--color-secondary)] flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informations du Cours
                </CardTitle>
                <CardDescription className="text-[var(--color-gray)]">
                  Remplissez les détails du cours pour le modèle de notes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="tremester"
                      className="text-[var(--color-secondary)]"
                    >
                      Trimester *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("tremester", value)
                      }
                    >
                      <SelectTrigger className="input-primary">
                        <SelectValue placeholder="Sélectionner le trimestre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Trimestre 1</SelectItem>
                        <SelectItem value="2">Trimestre 2</SelectItem>
                        <SelectItem value="3">Trimestre 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="academicYear"
                      className="text-[var(--color-secondary)]"
                    >
                      Academic Year *
                    </Label>
                    <Input
                      id="academicYear"
                      className="input-primary"
                      placeholder="ex: 2024"
                      value={formData.academicYearId}
                      onChange={(e) =>
                        handleInputChange("academicYearId", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="examType"
                      className="text-[var(--color-secondary)]"
                    >
                      Exam Type *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("examTypeId", value)
                      }
                    >
                      <SelectTrigger className="input-primary">
                        <SelectValue placeholder="Sélectionner le type d'examen" />
                      </SelectTrigger>
                      <SelectContent>
                        {examType.map((exam) => (
                        <SelectItem value={String(exam.examTypeId)}> {exam.name} </SelectItem>
                        ))}

                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-[var(--color-secondary)]"
                    >
                      Subject *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("subjectId", value)
                      }
                    >
                      <SelectTrigger className="input-primary">
                        <SelectValue placeholder="Sélectionner un module" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                        <SelectItem value={String(subject.subjectId)}> {subject.name} </SelectItem>
                        ))}

                      </SelectContent>
                    </Select>

                  </div>
                </div>
                <Button
                  onClick={downloadTemplate}
                  disabled={isDownloading}
                  className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-yousra)] text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isDownloading ? "Downloading..." : "Download Template"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-[var(--color-sous)]">
              <CardHeader className="bg-[var(--color-sous)]">
                <CardTitle className="text-[var(--color-secondary)] flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Télécharger les Notes Complétées
                </CardTitle>
                <CardDescription className="text-[var(--color-gray)]">
                  Téléchargez le fichier CSV avec les notes des étudiants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="csvFile"
                    className="text-[var(--color-secondary)]"
                  >
                    Fichier CSV *
                  </Label>
                  <div className="border-2 border-dashed border-[var(--color-primary)] rounded-lg p-6 text-center hover:border-[var(--color-yousra)] transition-colors">
                    <input
                      id="csvFile"
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="csvFile"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="h-8 w-8 text-[var(--color-primary)]" />
                      <span className="text-sm font-medium text-[var(--color-secondary)]">
                        {selectedFile
                          ? selectedFile.name
                          : "Cliquez pour sélectionner un fichier CSV"}
                      </span>
                      <span className="text-xs text-[var(--color-gray)]">
                        Seuls les fichiers CSV sont acceptés
                      </span>
                    </label>
                  </div>
                </div>
                {selectedFile && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 animate-fade-in">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-700">
                        Fichier sélectionné: {selectedFile.name}
                      </span>
                    </div>
                  </div>
                )}
                <Button
                  onClick={uploadNotes}
                  disabled={isUploading || !selectedFile}
                  className="w-full bg-[var(--color-yousra)] hover:bg-[var(--color-secondary)] text-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? "Uploading..." : "Upload Notes"}
                </Button>
              </CardContent>
            </Card>
            <div className="border-2  border-[var(--color-sous)] rounded-lg p-6   bg-white width-full md:col-span-2">
              <h2 className="text-xl font-bold text-[var(--color-secondary)] mb-4">
                Comment Utiliser Cette Page
              </h2>
              <ul className="list-disc list-inside space-y-4 text-[var(--color-gray)] text-left">
                <li>
                  <span className="font-medium text-[var(--color-secondary)]">
                    Étape 1 :
                  </span>{" "}
                  Remplissez les détails du cours dans la section "Informations
                  du Cours".
                </li>
                <li>
                  <span className="font-medium text-[var(--color-secondary)]">
                    Étape 2 :
                  </span>{" "}
                  Cliquez sur "Télécharger le Modèle" pour obtenir un fichier
                  CSV contenant le modèle des notes.
                </li>
                <li>
                  <span className="font-medium text-[var(--color-secondary)]">
                    Étape 3 :
                  </span>{" "}
                  Ouvrez le fichier téléchargé et remplissez les notes des
                  étudiants en respectant le format.
                </li>
                <li>
                  <span className="font-medium text-[var(--color-secondary)]">
                    Étape 4 :
                  </span>{" "}
                  Enregistrez le fichier modifié au format CSV sur votre
                  ordinateur.
                </li>
                <li>
                  <span className="font-medium text-[var(--color-secondary)]">
                    Étape 5 :
                  </span>{" "}
                  Téléchargez le fichier dans la section "Télécharger les Notes
                  Complétées" en cliquant sur "Cliquez pour sélectionner un
                  fichier CSV".
                </li>
                <li>
                  <span className="font-medium text-[var(--color-secondary)]">
                    Étape 6 :
                  </span>{" "}
                  Cliquez sur "Télécharger les Notes" pour soumettre le fichier
                  et finaliser le processus.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
