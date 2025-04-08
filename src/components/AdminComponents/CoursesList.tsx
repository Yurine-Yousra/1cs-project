import { useState } from "react";
import SubjectCard from "../cards/subject-card";
import NewSubjectForm, { Subject } from "../forms/new-sbuject-form";



const COLORS: Array<"indigo" | "amber" | "red"> = ["indigo", "amber", "red"]



const CoursesList = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: "1",
      title: "Langue Arabe",
      teacher: "Mr.Fadhil",
      coefficient: 4,
      hours: 4,
      color: "indigo",
    },
    {
      id: "2",
      title: "Sciences Islamiques",
      teacher: "Mr.Cyril",
      coefficient: 2,
      hours: 1,
      color: "amber",
    },
    {
      id: "3",
      title: "Langue Française",
      teacher: "Mme.Otaumy",
      coefficient: 5,
      hours: 6,
      color: "red",
    },
  ])
  const handleAddSubject = (newSubject: Omit<Subject, "id" | "color">) => {
    // Assign a color based on the position in the array
    const colorIndex = subjects.length % COLORS.length
    const color = COLORS[colorIndex]

    // Create the complete subject with ID and color
    const completeSubject: Subject = {
      ...newSubject,
      id: Date.now().toString(),
      color,
    }

    // Add to subjects list
    setSubjects([...subjects, completeSubject])
  }


  return (
    <main className="px-10 mt-5">
 <div className="space-y-4 ">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              title={subject.title}
              teacher={subject.teacher}
              coefficient={subject.coefficient}
              hours={subject.hours}
              color={subject.color || "indigo"}
            />
          ))}
        </div>

        <div className="flex justify-end mb-8">
          <a href="#" className="text-sm text-indigo-600 hover:underline">
            voir tout
          </a>
        </div>

        <NewSubjectForm onAddSubject={handleAddSubject} />
        </main>

    );
};

export default CoursesList;