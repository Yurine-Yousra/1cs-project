import { HiArrowRight } from "react-icons/hi";


interface ButtonProps {
    displayed: boolean;
    setDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  }


const Button1: React.FC<ButtonProps> = ({ displayed, setDisplayed }) => {
  return (
     <div
                    className="flex items-center bg-[var(--color-secondary)] text-white py-2 rounded-[50px] px-10 cursor-pointer"
                    onClick={() => setDisplayed(!displayed)}
                  >
                    <button>{displayed ? "Créer Compte" : "Suivant"}</button>
                    <HiArrowRight size={20} className="pt-1 pl-2" />
                  </div>
  )
}

export default Button1
