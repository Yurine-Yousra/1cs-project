import Image1 from '../assets/image copy 2.png'
import { LoginForm } from '../components/LoginForm';


function Login() {

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
          <img src={Image1} alt="Illustration"  className="w-[600px]"/>
          </div>
          <div className="lg:w-1/2 pl-10 h-[500px] flex flex-col gap-20 ">
            <div className="w-full">
            <h1 className="font-semibold text-[24px]">Bienvenu dans Dirassati</h1>
               <p className="text-gray-600">connecter à votre compte d’administrateur</p>
            </div>
            <div className="flex flex-col gap-4 w-[80%] items-center">
              <div className="w-full flex flex-col gap-2">
                <LoginForm />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
