import { BiPhoneCall, BiBook } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import Image1 from "../../assets/image copy 4.png";

const Card = () => {
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg h-[207px] gap-3 shadow-lg">
      {/* Header */}
      <div className="flex items gap-2 w-fit   border-b-2 border-gray-300 pb-2">
        <img
          src={Image1}
          alt="user image"
          className="rounded-full w-12 h-12"
        />
        <h3 className="font-semibold text-gray-800">Yousra Bouhriz Daidj</h3>
      </div>

      {/* Infos principales */}
      <div className="flex flex-col gap-2 w-fit   border-b-2 border-gray-300 pb-2">
        <div className="flex items-center gap-4 text-gray-700">
          <BiBook className="text-lg" />
          <span>Science Naturelles</span>
        </div>

        <div className="flex items-center gap-4 text-gray-700">
          <BsPeople className=" text-lg" />
          <span>5 classes</span>
        </div>
      </div>

      {/* Contact */}
      <div className="flex items-center gap-4 text-gray-700">
        <BiPhoneCall className=" text-lg" />
        <span>0550206737</span>
      </div>
    </div>
  );
};

export default Card;
