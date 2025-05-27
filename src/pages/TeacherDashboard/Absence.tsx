import Image from "../../assets/image copy 17.png";
import { RiArrowRightSLine } from "react-icons/ri";
import Profile from "../../components/ui/profile";
import { useEffect, useState } from "react";
import SearchBar from "../../components/ui/SearchBar";
import { useParams } from "react-router-dom";
import { getStudentsByGroup, Student } from "../../apis/group.api";
import { addTeacherReport, markAbsences } from "../../apis/absence.api";
import toast from "react-hot-toast";

// Add this interface for the report API
interface SendReportData {
  studentId: string;
  title: string;
  description: string;
  reportDate: string;
}



const Absence = () => {
  const [checkedRows, setCheckedRows] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  
  // New state for report modal
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [selectedStudentForReport, setSelectedStudentForReport] = useState<Student | null>(null);
  const [reportTitle, setReportTitle] = useState<string>("");
  const [reportDescription, setReportDescription] = useState<string>("");
  const [sendingReport, setSendingReport] = useState<boolean>(false);

  const handleCheckboxChange = (studentId: string) => {
    setCheckedRows((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleConfirmAbsences = async () => {
    const selectedStudentIds = Object.keys(checkedRows).filter(
      studentId => checkedRows[studentId]
    );

    if (selectedStudentIds.length === 0) {
      toast.error("Veuillez sélectionner au moins un étudiant");
      return;
    }

    if (!groupId) {
      toast.error("ID du groupe manquant");
      return;
    }

    try {
      setSubmitting(true);
      await markAbsences(groupId, selectedStudentIds);
      // Reset checkboxes after successful submission
      setCheckedRows({});
      toast.success(`${selectedStudentIds.length} absence(s) marquée(s) avec succès`);
    } catch (error) {
      console.error("Error marking absences:", error);
      toast.error("Erreur lors du marquage des absences");
    } finally {
      setSubmitting(false);
    }
  };

  // New function to handle opening report modal
  const handleOpenReportModal = (student: Student) => {
    setSelectedStudentForReport(student);
    setShowReportModal(true);
    setReportTitle("");
    setReportDescription("");
  };

  // New function to handle sending report
  const handleSendReport = async () => {
    if (!selectedStudentForReport) {
      toast.error("Aucun étudiant sélectionné");
      return;
    }

    if (!reportTitle.trim()) {
      toast.error("Veuillez saisir un titre pour le rapport");
      return;
    }

    if (!reportDescription.trim()) {
      toast.error("Veuillez saisir une description pour le rapport");
      return;
    }

    try {
      setSendingReport(true);
      
      const reportData: SendReportData = {
        studentId: selectedStudentForReport.studentId,
        title: reportTitle.trim(),
        description: reportDescription.trim(),
        reportDate: new Date().toISOString()
      };

      await addTeacherReport(reportData);
      
      toast.success("Rapport envoyé avec succès");
      setShowReportModal(false);
      setSelectedStudentForReport(null);
      setReportTitle("");
      setReportDescription("");
      window.location.href = "/Teacherdashboard/convocation-success"; 

    } catch (error) {
      console.error("Error sending report:", error);
      toast.error("Erreur lors de l'envoi du rapport");
    } finally {
      setSendingReport(false);
    }
  };

  // Function to close modal
  const handleCloseReportModal = () => {
    setShowReportModal(false);
    setSelectedStudentForReport(null);
    setReportTitle("");
    setReportDescription("");
  };

  const { groupId } = useParams();

  useEffect(() => { 
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await getStudentsByGroup(groupId || "");
        if (typeof response === "string") {
          console.error("Error fetching students:", response);
          setStudents([]);
        } else {
          setStudents(response);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [groupId]);

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentIdNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.parentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-[90%] mx-auto">
        <div className="w-full flex items-center justify-between mb-10 mt-4">
          <h1 className="text-[var(--color-yousra)] text-[25px] font-semibold">Liste des Élèves</h1>
          <Profile />
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Chargement des étudiants...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto">
      <div className="w-full flex items-center justify-between mb-10 mt-4">
        <h1 className="text-[var(--color-yousra)] text-[25px] font-semibold">Liste des Élèves</h1>
        <Profile />
      </div>

      <div className="w-full flex justify-between items-center">
        <h2 className="font-stretch-semi-condensed text-gray-900">1ère année Classe Scientifique</h2>
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>

      {/* Table Wrapper */}
      <div className="w-full mt-14 relative">
        <div className="overflow-hidden">
          {/* Table */}
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead className="bg-white h-[60px] border-b-20 border-[var(--color-sous)]">
              <tr>
                <th className="w-[5%]"></th>
                <th className="w-[5%] text-[15px] font-semibold"></th>
                <th className="w-[15%] text-left text-[15px] font-semibold text-gray-800">Nom</th>
                <th className="w-[15%] text-left text-[15px] font-semibold text-gray-800">N° Réf</th>
                <th className="w-[15%] text-left text-[15px] font-semibold text-gray-800">Nom du Parent</th>
                <th className="w-[20%] text-left text-[15px] font-semibold text-gray-800">Contact du Parent</th>
                <th className="w-[10%] text-center text-[15px] font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
          </table>

          <div className="w-full">
            <table className="w-full border-collapse bg-white">
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <svg 
                          className="w-16 h-16 mb-4 text-gray-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                          />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-700 mb-2">
                          {searchTerm ? "Aucun étudiant trouvé" : "Aucun étudiant dans ce groupe"}
                        </h3>
                        <p className="text-gray-500">
                          {searchTerm 
                            ? "Essayez de modifier votre recherche" 
                            : "Ce groupe ne contient aucun étudiant pour le moment"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr
                      className={`border-b border-gray-300 h-[72px] border-l-4 ${
                        checkedRows[student.studentId] 
                          ? "border-l-[var(--color-yousra)]" 
                          : "border-l-transparent"
                      }`}
                      key={student.studentId}
                    >
                      <td className="w-[5%] text-center">
                        <input
                          type="checkbox"
                          checked={checkedRows[student.studentId] || false}
                          onChange={() => handleCheckboxChange(student.studentId)}
                        />
                      </td>
                      <td className="w-[5%]">
                        <img src={Image} alt="Profile" className="w-10 h-10 object-cover rounded-full" />
                      </td>
                      <td className="w-[15%] text-[14px] text-left">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="w-[15%] text-left text-[14px] text-[var(--color-yousra)]">
                        {student.studentIdNumber || "Non défini"}
                      </td>
                      <td className="w-[15%] text-left text-[14px]">
                        {student.parentName}
                      </td>
                      <td className="w-[20%] text-left text-[14px]">
                        {student.parentContact}
                      </td>
                      <td className="w-[10%] text-[14px]">
                        <div className="flex gap-2 justify-center">
                          {/* View Button */}
                          <div className="flex justify-center items-center bg-yousra rounded-full px-3 py-0.5 text-white relative">
                            <button>Voir</button>
                            <RiArrowRightSLine className="text-xl absolute right-0" />
                          </div>
                          
                          {/* Report Button */}
                          <button
                            onClick={() => handleOpenReportModal(student)}
                            className="flex justify-center items-center bg-orange-500 hover:bg-orange-600 rounded-full px-3 py-0.5 text-white text-xs transition-colors duration-200"
                          >
                            Rapport
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Confirm Button - Only show if there are students and some are selected */}
        {filteredStudents.length > 0 && Object.values(checkedRows).some(checked => checked) && (
          <button 
            onClick={handleConfirmAbsences}
            disabled={submitting}
            className={`absolute right-0 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-200 mt-4 ${
              submitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[var(--color-yousra)] hover:shadow-2xl hover:cursor-pointer hover:scale-105'
            } text-white`}
          >
            {submitting ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Marquage...
              </>
            ) : (
              `Confirmer (${Object.values(checkedRows).filter(checked => checked).length})`
            )}
          </button>
        )}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Envoyer un rapport
              </h3>
              <button
                onClick={handleCloseReportModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {selectedStudentForReport && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Étudiant sélectionné:</p>
                <p className="font-medium text-gray-800">
                  {selectedStudentForReport.firstName} {selectedStudentForReport.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedStudentForReport.studentIdNumber}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre du rapport *
                </label>
                <input
                  type="text"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-yousra)] focus:border-transparent"
                  placeholder="Ex: Comportement inapproprié"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-yousra)] focus:border-transparent resize-none"
                  placeholder="Décrivez les détails du rapport..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCloseReportModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                onClick={handleSendReport}
                disabled={sendingReport || !reportTitle.trim() || !reportDescription.trim()}
                className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors duration-200 ${
                  sendingReport || !reportTitle.trim() || !reportDescription.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[var(--color-yousra)] hover:bg-opacity-90'
                }`}
              >
                {sendingReport ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi...
                  </div>
                ) : (
                  'Envoyer le rapport'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Absence;