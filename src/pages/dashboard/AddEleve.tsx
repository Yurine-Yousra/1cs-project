import FormulaireStudent from "../../components/ui/FormulaireStudent";

const AddEleve = () => {
  const labels = [
    { text: "Noms", type: "text", name: "nom", select: false },
    { text: "Adresse*", type: "text", name: "addresse", select: false },
    { text: "Année*", type: "number", name: "année", select: false },
    { text: "Prénom* ", type: "text", name: "prénom", select: false },
    { text: "Numéro De Téléphone*", type: "text", name: "phone", select: false },
    { text: "Date & Lieu De Naissance*", type: "date", name: "date", select: true },
    { text: "", type: "text", name: "lieu", select: true },
    { text: "Classe", type: "text", name: "Classe", select: true },

    { text: "Nom*", type: "text", name: "nom", select: false },
    { text: "Numéro De Téléphone*", type: "text", name: "phone", select: false },
    { text: "Relation*", type: "text", name: "relation", select: true },
    { text: "Adresse*", type: "text", name: "adresse", select: false },

   
    { text: "Prénom* ", type: "text", name: "prénom", select: false },
    { text: "Adresse Email*", type: "email", name: "email", select: false },


    { text: "Contact* ", type: "text", name: "Contact", select: false },
    { text: "Date & Lieu De Naissance*", type: "date", name: "date", select: true },
    { text: "", type: "text", name: "lieu", select: true },
   
  ];
  const type_E = "Eleve"

 

  return (
    <div>
      <FormulaireStudent  labels={labels} type_E={type_E}/>
    </div>
  );
};

export default AddEleve;