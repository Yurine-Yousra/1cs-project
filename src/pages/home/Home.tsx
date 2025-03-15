import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-gray-100 text-black">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our App</h1>
      <p className="text-lg mb-4">Click below to access your account</p>
      <button 
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
        onClick={() => navigate("/login")}
      >
        Go to Login
      </button>
    </div>
  );
};

export default Home;
