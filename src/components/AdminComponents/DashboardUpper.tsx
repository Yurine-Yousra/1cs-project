import SearchBar from "../ui/SearchBar"
import Image1 from '../../assets/image copy 4.png'



const DashboardUpper = () => {
  return (
    <div className="w-[90%] p-2 m-auto mb-10 flex items-center justify-between pt-4">
    <SearchBar />
    <div className="flex items-center gap-2">
    <img src={Image1} alt="user image" className="rounded-[50%] w-[48px] h-[48px]" />
        <div >
            <h2 className="font-semibold">first name last name</h2>
            <span className="text-gray-500 text-[12px]">Admin</span>
        </div>
    </div>
</div>
  )
}

export default DashboardUpper
