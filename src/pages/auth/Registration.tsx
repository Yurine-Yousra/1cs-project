
import { AuthImage1,AuthImage2 } from "../../assets";
import AdminInfoForm from "../../components/AdminComponents/AdminInfosForm";
import SchoolInfoForm from "../../components/auth/SchoolInfosForm";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SignupData } from "../../types/register.type";
import { useSignup } from "../../hooks/useSignup";


function Registration() {
  const [displayed, setDisplayed] = useState(false);
  

  const [schoolInfos, setSchoolInfos] = useState({
    Nom_détablissement: "",
    Type_détablissement: "",
    rue:"",
    ville:"",
    région:"",
    code_postal : "" ,
    Adresse_Email: "",
    Numéro_de_Téléphone: "",
  });

  const [adminInfos, setAdminInfos] = useState({
    prénom: "",
    nom: "",
    phone: "",
    email: "",
    pass: "",
    confirm_pass: "",
  });

      const {signup} = useSignup();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); 
      const data: SignupData = {
        school: {
          schoolName: schoolInfos.Nom_détablissement,
          schoolType: schoolInfos.Type_détablissement,
          schoolEmail: schoolInfos.Adresse_Email,
          phoneNumber: schoolInfos.Numéro_de_Téléphone,
          address: {
            street: schoolInfos.rue,
            city: schoolInfos.ville,
            state: schoolInfos.région,
            postalCode: schoolInfos.code_postal,
            country: "Algeria",
          },
        },
        employee: {
          firstName: adminInfos.prénom,
          lastName: adminInfos.nom,
          phoneNumber: adminInfos.phone,
          email: adminInfos.email,
          password: adminInfos.pass,
          permission: 0,
        },
      };
        await signup(data);
        
    
    };
 

  return (
    <div className="h-screen w-screen p-[50px] bg-[url('./assets/images/background.png')] bg-cover bg-center">
      <div className="container py-4 relative">
        <div className="absolute left-10 top-8">
          <h1 className="font-bold">LOGO</h1>
        </div>
        <div className="custom-container flex flex-col lg:flex-row items-center gap-10">
          <div className="hidden lg:block lg:w-[50%]">
            {!displayed ? (
              <img src={AuthImage1} alt="Illustration" className="w-[500px]" />
            ) : (
              <img src={AuthImage2} alt="Illustration" className="w-[500px]" />
            )}
          </div>
          <div className="lg:w-[50%] pl-10 flex flex-col gap-10">
            <div className="w-[100%]">
              {!displayed && <h1 className="font-semibold text-[24px]">Bienvenu dans Dirassati</h1>}
              <p className="text-gray-600">
                {!displayed
                  ? "Créez un compte pour votre établissement"
                  : "Créez un compte administrateur pour votre établissement"}
              </p>
            </div>
            <div className="flex flex-col gap-4 w-[80%] items-center">
              <div className="w-full flex flex-col gap-2">
                {!displayed ? (
                  <SchoolInfoForm setDisplayed={setDisplayed} setSchoolInfos={setSchoolInfos} schoolInfos={schoolInfos} />
                ) : (
                  <AdminInfoForm setDisplayed={setDisplayed} adminInfos={adminInfos} setAdminInfos={setAdminInfos}  handleSubmit={handleSubmit} />
                )}
              </div>
              <Link
          className="hover:underline font-bold ml-auto"
          to={"/login"}
        >
          Already have acount!
        </Link> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
