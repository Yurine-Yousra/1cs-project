import Image1 from "../assets/image.png";
import Image2 from '../assets/image copy 3.png'
import AdminInfoForm from "../components/AdminInfosForm";
import SchoolInfoForm from "../components/SchoolInfosForm";
import Button1 from "../components/Button1";
import { useState } from "react";

function Registration() {
  const [displayed, setDisplayed] = useState(false);

  return (
    <div className="h-screen w-screen p-[50px] bg-[url('./assets/background.png')] bg-cover bg-center">
      <div className="container py-4 relative">
        <div className="absolute left-10 top-8">
          <h1 className="font-bold">
            LOGO
          </h1>
        </div>
        <div className="custom-container flex flex-col lg:flex-row items-center gap-10">
          <div className="hidden lg:block lg:w-[50%]">
            {!displayed ? <img src={Image1} alt="Illustration"  className="w-[500px]"/> : <img src={Image2} alt="Illustration" className="w-[500px]" /> }    
          </div>
          <div className="lg:w-[50%] pl-10 flex flex-col gap-10">
            <div className="w-[100%]">
            {!displayed &&<h1 className="font-semibold text-[24px]">Bienvenu dans Dirassati</h1>}
               <p className="text-gray-600">{!displayed  ? "Créez un compte pour votre établissement" : "Créez un compte administrateur pour votre établissement"}</p>
            </div>
            <div className="flex flex-col gap-4 w-[80%] items-center">
              <div className="w-full flex flex-col gap-2">
                {!displayed ? <SchoolInfoForm /> : <AdminInfoForm />}
              </div>
              <Button1  displayed={displayed} setDisplayed={setDisplayed} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
