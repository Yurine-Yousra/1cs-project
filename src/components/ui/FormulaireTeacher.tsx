import InputForm from "../../components/ui/InputForm";

interface Label {
    text: string;
    type: string;
    name: string;
    select: boolean;
  }


  
  interface LabelsProps {
    labels: Label[];
    type_E : string;
  }
  

const FormulaireTeacher:React.FC<LabelsProps> = ({labels , type_E}) => {

  // List of Algerian cities
  const algerianCities = [
    "Alger",
    "Oran",
    "Constantine",
    "Annaba",
    "Blida",
    "Batna",
    "Sétif",
    "Tlemcen",
    "Béjaïa",
    "Mostaganem",
  ];
  
  const matieres=  [
    "Langue Arabe",
    "Langue Française",
    "Mathématiques",
    "Éducation Islamique",
    "Éducation Civique",
    "Sciences de la Nature et de la Vie",
    "Histoire et Géographie",
    "Éducation Artistique",
    "Éducation Physique et Sportive",
    "Langue Amazighe" // Dans certaines régions
  ]

  return (
    <div className=" w-[90%] m-auto mb-10">
      <h1 className="font-semibold text-[var(--color-yousra)] text-[18px] mb-6">Ajouter un {type_E}</h1>
      <div className="flex flex-col">
        {/* Header */}
        <div className="h-[60px] bg-[var(--color-yousra)] rounded-tl-[24px] rounded-tr-[24px]">
          <h1 className="font-bold ml-4 mt-4 text-white ">Informations Personnelles</h1>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-5 bg-white px-4 gap-10 rounded-br-[6px] rounded-bl-[6px] pb-20 pt-4">
          {/* Photo Upload */}
          <div className="col-span-1">
            <label htmlFor="photo">Photo*</label>
            <input
              type="text"
              className="border border-gray-500 border-dashed w-full h-[197px]"
            />
          </div>

          {/* Left Inputs */}
          <div className="col-span-2 flex flex-col gap-4">
            {labels.slice(0, 3).map((item, index) => {
               if(item.name === "addresse"){
                return(
                  <div className="flex flex-col items-start gap-1">
                    <label htmlFor={item.name}>{item.text}</label>
                    <input
                  name={item.name}
                  type={item.type}
                  required
                  placeholder="Enter value..."
                  className="w-full rounded-[5px] h-[80px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10"
                />
                  </div>
                )

              } else {
                return (
                  <InputForm key={index} Inputtext={item.text} type={item.type} />

                )
              }
})}
          </div>

          {/* Right Inputs */}
          <div className="col-span-2 flex flex-col gap-4">
            {labels.slice(3, 7).map((item, index) => {
              if (item.select) {
                return (
                  <div key={index}>
                    <label>{item.text}</label>
                    {item.name === "date" ? (
                      <input type="date" className=" p-2 w-full rounded  h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10" />
                    ) : item.name === "lieu" ? (
                      <select className=" p-2 w-full rounded   h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10">
                        <option value="">Sélectionner une ville</option>
                        {algerianCities.map((city, cityIndex) => (
                          <option key={cityIndex} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                );
              }
              else {
                return (
                  <InputForm key={index} Inputtext={item.text} type={item.type} />
                );
              }
            })}
          </div>
        </div>
      </div>


      <div className="flex flex-col mt-10">
        {/* Header */}
        <div className="h-[60px] bg-[var(--color-yousra)] rounded-tl-[24px] rounded-tr-[24px]">
          <h1 className="font-bold ml-4 mt-4 text-white ">Informations Professionnelles</h1>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-5 bg-white px-4 gap-10 rounded-br-[6px] rounded-bl-[6px] pb-6 pt-4">
          {/* Right Inputs */}
          <div className="col-span-2 flex flex-col gap-4 mb-10">
            {labels.slice(7, 9).map((item, index) => {
              if (item.select && item.name === "date_début") {
                return (
                  <div key={index}>
                    <label>{item.text}</label>   
                      <input type="date" className=" p-2 w-full rounded  h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10" />
                  </div>
                );
              } else {
                return (
                  <InputForm key={index} Inputtext={item.text} type={item.type} />
                );
              }
            })}
          </div>

          <div className="col-span-2 flex flex-col gap-4">
            {labels.slice(9, 11).map((item, index) => {
              if (item.select && item.name === "matière") {
                return (
                  <div key={index}>
                    <label>{item.text}</label>   
                      <select  className=" p-2 w-full rounded  h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10" >
                      <option value="">Sélectionner une matière</option>
                        {matieres.map((matière, matièreIndex) => (
                          <option key={matièreIndex} value={matière}>
                            {matière}
                          </option>
                        )
                    )
                    }
                          </select>
                  </div>
                );
              } else {
                return (
                  <InputForm key={index} Inputtext={item.text} type={item.type} />
                );
              }
            })}
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>

      
    </div>
  );
};

export default FormulaireTeacher;
