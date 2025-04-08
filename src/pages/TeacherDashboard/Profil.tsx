import Image1 from '../../assets/image copy 2.png'
const Profil = () => {
  return (
    <div className="w-[90%] m-auto mt-6 h-screen overflow-y-hidden">
        <h1 className="text-[var(--color-yousra)] text-[25px] font-semibold">Details Enseignant</h1>
        <div className="bg-white w-full flex p-8 mt-12 justify-between h-[600px]">
            <div className="w-[40%] relative">
                <h1 className='absolute top-0 left-1/4 font-semibold'>Changer mot de pass</h1>
                <div className='absolute top-12 flex flex-col gap-6'>
                <div  className="w-full relative ">
                            <label className="text-gray-700 text-[14.5px]">ancien mot de passe</label>
                            <input type="text" name="nom" className="w-full  h-[45px] border-gray-600 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-2 mt-0.5"  />
                            <span className='absolute right-0 -bottom-4 text-[12px] text-[var(--color-yousra)] font-semibold'>Forgot password ?</span>

                </div>
                <div  className="w-full  ">
                            <label className="text-gray-700 mb-2 text-[14.5px]">nouveau mot de passe</label>
                            <input type="text" name="nom" className="w-full  h-[45px] border-gray-600 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-2 mt-0.5"  />

                </div>
                <div  className="w-full ">
                            <label className="text-gray-700 mb-2 text-[14.5px]">confirmer nouveau mot de passe</label>
                            <input type="text" name="nom" className="w-full  h-[45px] border-gray-600 border-[2px] focus:border-[var(--color-secondary)] focus:outline-none pl-2 mt-0.5"  />

                </div>

                <button
            className="absolute left-1/4 -bottom-18 w-[200px] text-[14px] bg-[var(--color-yousra)] text-white px-4 py-2 rounded-sm shadow-lg hover:shadow-2xl hover:cursor-pointer hover:scale-105 transition-all duration-200"
          >
            <span>Changer mot de passe</span> 
          </button>
                </div>
            </div>


            <div className="w-[40%]">
                <img src={Image1} alt="image" />
            </div>


        </div>
      
    </div>
  )
}

export default Profil
