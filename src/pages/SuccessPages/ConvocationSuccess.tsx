import { FaCheckCircle, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ConvocationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <FaCheckCircle className="h-10 w-10 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Convocation envoyée avec succès
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          La convocation a été envoyée aux destinataires avec succès. Vous pouvez
          suivre les statuts dans l'historique des envois.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => navigate("/Teacherdashboard")}
            className="flex items-center justify-center gap-2 w-full bg-[var(--color-yousra)] hover:cursor-pointer text-white py-2 px-4 rounded-lg transition-colors"
          >
            <FaEnvelope />
          Retour au tableau de bord
          </button>

        
        </div>
      </div>
    </div>
  );
}