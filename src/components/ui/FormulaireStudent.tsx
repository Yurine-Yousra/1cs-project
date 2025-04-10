import InputForm from "./InputForm";

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
  

const FormulaireStudent:React.FC<LabelsProps> = ({labels , type_E}) => {

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
  
 
  const Class = [
    "A1","A2","B1","B2","C1"
  ]

  return (
    <div className=" w-[90%] m-auto  mb-10 mt-5">
      <h1 className="font-semibold text-[var(--color-yousra)] text-[18px]  mb-6">Ajouter un {type_E}</h1>
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
            {labels.slice(0, 4).map((item, index) => {
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
            {labels.slice(4, 9).map((item, index) => {
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
                    ) : item.name === "Classe" ? (
                        <select className=" p-2 w-full rounded   h-[45px] border-gray-400 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-10">
                        <option value="">Sélectionner une Classe </option>
                        {Class.map((city, cityIndex) => (
                          <option key={cityIndex} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>  
                    ):null}
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
          <h1 className="font-bold ml-4 mt-4 text-white ">Informations des Parents</h1>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-5 bg-white px-4 gap-10 rounded-br-[6px] rounded-bl-[6px] pb-6 pt-4">
          {/* Right Inputs */}
          <div className="col-span-2 flex flex-col gap-4 mb-10">
            {labels.slice(9, 13).map((item, index) => (
                  <InputForm key={index} Inputtext={item.text} type={item.type} />
            ))}
          </div>

          <div className="col-span-2 flex flex-col gap-4">
            {labels.slice(13, labels.length).map((item, index) => {
                
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
                        ) :null}
                      </div>
                    );
                  }
                return (
                  <InputForm key={index} Inputtext={item.text} type={item.type} />
                );
              }
            )}
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>

      
    </div>
  );
};

export default FormulaireStudent;
