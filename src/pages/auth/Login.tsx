import Image1 from '../../assets/image copy 2.png'
import Logo from '../../assets/5895699245443434210.jpg'
import { LoginForm } from '../../components/LoginForm';


function Login() {

  return (
    <div className="h-screen w-screen p-[50px] bg-[url('./assets/background.png')] bg-cover bg-center">
      <div className="container py-4 relative">
        <div className="absolute left-10 top-1">
         <img src={Logo} alt="logo" width={250} />
        </div>
        <div className="custom-container flex flex-col lg:flex-row items-center gap-10">
          <div className="hidden lg:block lg:w-[50%]">
          <img src={Image1} alt="Illustration"  className="w-[600px]"/>
          </div>
          <div className="lg:w-1/2 pl-10 h-[500px] flex flex-col gap-20 ">
            <div className="w-full">
            <h1 className="font-semibold text-[24px]">Bienvenu dans Dirassati</h1>
               <p className="text-gray-600">connecter à votre compte</p>
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
