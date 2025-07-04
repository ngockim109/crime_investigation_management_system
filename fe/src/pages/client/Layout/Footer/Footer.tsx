import footer from "@/assets/images/footer.png"
// import imagelogo from "@/assets/images/imagelogo.png"
// import { Search } from "lucide-react"

const Footer = () => {
    return (
        <footer className="">
            {/* <div className="bg-black text-[16px] font-bold text-white mt-10 px-70 py-10 grid grid-cols-4">
                <div className="col-span-1">
                    <ol className="space-y-2">
                        <li>Directory of City Agencies</li>
                        <li> Notify NYC</li>
                        <li>  NYC Mobile Apps</li>
                    </ol>
                </div>
                <div className="col-span-1">
                    <ol className="space-y-2">
                        <li>Contact NYC Government</li>
                        <li>CityStore</li>
                        <li>Maps.</li>
                    </ol>
                </div>
                <div className="col-span-1">
                    <ol className="space-y-2">
                        <li> City Employees</li>
                        <li>Stay Connected</li>
                        <li> Resident Toolkit</li>
                    </ol>
                </div>
                <div>
                    <div className="flex gap-4">
                        <img src={imagelogo} className="w-25 h-7.5" alt="" srcSet="" />
                        <div className=" relative bg-[#616161] rounded-[8px] flex-1">
                            <div className="size-6 absolute right-1 top-1/2 -translate-y-1/3">
                                <Search className='size-4' />
                            </div>
                            <input type="text" className='h-full text-sm font-normal w-full focus:outline-none' />
                        </div>
                    </div>
                </div>
            </div> */}
            <img src={footer} alt="" srcSet="" />
        </footer>
    )
}

export default Footer