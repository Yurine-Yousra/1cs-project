import SubjectCard from "./cards/subject-card";
import NewSubjectForm from "./forms/new-sbuject-form";




const CoursesList = () => {
 

  return (
    <main className="px-10 mt-5">
    <div className="space-y-4 mb-6">
          <SubjectCard title="Langue Arabe" teacher="Mr.Fadhil" coefficient={4} hours={4} color="indigo" />
          <SubjectCard title="Sciences Islamiques" teacher="Mr.Cyril" coefficient={2} hours={1} color="amber" />
          <SubjectCard title="Langue Française" teacher="Mme.Otaumy" coefficient={5} hours={6} color="red" />
        </div>

        <div className="flex justify-end mb-8">
          <a href="#" className="text-sm text-indigo-600 hover:underline">
            voir tout
          </a>
        </div>

        <NewSubjectForm />
        </main>

    );
};

export default CoursesList;