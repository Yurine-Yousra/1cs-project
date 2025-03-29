import Image1 from '../../assets/image copy 4.png'


const Profile = () => {
  return (
    <div className="flex items-center gap-2">
    <img src={Image1} alt="user image" className="rounded-[50%] w-[40px] h-[40px]" />
        <div >
            <h2 className=" text-[12px] font-semibold">first name last name</h2>
            <span className="text-gray-500 text-[10px]">Admin</span>
        </div>
    </div>
  )
}

export default Profile
