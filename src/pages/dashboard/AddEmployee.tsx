import FormulaireEmployee from "../../components/forms/FormulaireEmployee";
const AddEmployee = () => {
  const labels = [
    { text: "Nom*", type: "text", name: "nom", select: false },
    { text: "Adresse Email*", type: "email", name: "email", select: false },
    { text: "Adresse*", type: "text", name: "addresse", select: false },
    { text: "Prénom* ", type: "text", name: "prénom", select: false },
    { text: "Numéro De Téléphone*", type: "text", name: "phone", select: false },
    { text: "Date & Lieu De Naissance*", type: "date", name: "date", select: true },
    { text: "", type: "text", name: "lieu", select: true },
    { text: "Diplome*", type: "text", name: "diplome", select: false },
    { text: "Date Début*", type: "date", name: "date_début", select: true },
    { text: "Position*", type: "text", name: "matière", select: true },
    { text: "Salaire par Mois*", type: "text", name: "salaire", select: false },
  ];
  const type_E = "Employée"

 

  return (
    <div>
      <FormulaireEmployee  labels={labels} type_E={type_E}/>
    </div>
  );
};

export default AddEmployee;
