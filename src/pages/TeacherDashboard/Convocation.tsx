import { useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { StudentDetails } from '../../apis/students.api';
import { getStudent } from '../../apis/students.api';
import { sendConvocation } from '../../apis/convocation';
import { useNavigate } from 'react-router-dom';

const Convocation = () => {
  const { id } = useParams<{ id: string }>();
  const [motif, setMotif] = useState<string>("");
  const [titre, setTitre] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [student, setStudent] = useState<StudentDetails | null>(null);
  const navigate = useNavigate()
  useEffect(() => {
      const fetchStudent = async () => {
        const studentData = await getStudent(id as string);
        setStudent(studentData ?? null);
      };
      
      fetchStudent();
    }, [id]);
  const handleTitreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitre(e.target.value);
  };

  const handleMotifChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMotif(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = async() => {
await sendConvocation({
  studentId : student?.studentId,
  titre,
  motif,
  date,
});
      navigate('/dashboard'); // ✅ Navigation ici

    // You can send `data` to your backend API using fetch or axios here.
  };

  return (
    <div className="max-w-3xl mx-auto my-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-[var(--color-yousra)] text-white px-8 py-6 flex items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M4.062 19h15.876c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L2.33 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h1 className="text-2xl font-semibold tracking-wide">Convocation Académique</h1>
      </div>

      <div className="p-8 space-y-10">
        {/* Étudiant */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-yousra)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-700">Informations de l’étudiant</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 pl-1">
            <div>
              <p className="text-sm text-gray-500">Nom </p>
              <p className="font-medium">{student?.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Prénom</p>
              <p className="font-medium">{student?.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ID Étudiant</p>
              <p className="font-medium">{student?.studentId}</p>
            </div>
          </div>
        </section>

        {/* Titre */}
        <section>
          <label htmlFor="titreConvocation" className="block text-gray-700 font-medium mb-2">
            Titre :
          </label>
          <input
            type="text"
            id="titre"
            value={titre}
            onChange={handleTitreChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-yousra)]"
          />
        </section>

        {/* Motif */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-yousra)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-700">Motif de la Convocation</h2>
          </div>
          <textarea
            id="contenu"
            name="contenu"
            rows={4}
            placeholder="Décrivez ici le motif de la convocation..."
            value={motif}
            onChange={handleMotifChange}
            className="w-full border border-gray-300 rounded-md p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-yousra)]"
          ></textarea>
        </section>

        {/* Date de convocation */}
        <section>
          <label htmlFor="dateConvocation" className="block text-gray-700 font-medium mb-2">
            Date de la convocation :
          </label>
          <input
            type="date"
            id="dateConvocation"
            name="dateConvocation"
            value={date}
            onChange={handleDateChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-yousra)]"
          />
        </section>

        {/* Button */}
        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="bg-[var(--color-yousra)] text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all duration-200 shadow-sm"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Convocation;
