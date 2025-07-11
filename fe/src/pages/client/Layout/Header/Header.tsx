import imagelogo from "@/assets/images/image_logo.png"
import imageHeader from "@/assets/images/image_header.png"

const Header = () => {
  return (
    <header className="">
      <div className="bg-black h-10 flex justify-between px-2 lg:px-16 text-[12px] text-white font-bold py-2.25">
        <div className="flex ">
          <img src={imagelogo} className="w-17 h-auto" alt="" srcSet="" />
          <p className="ml-8  ">New York City Police Department</p>
        </div>
        <div className="pr-8">
          <p>English</p>
        </div>
      </div>
      <div className="h-30 py-2.5 border-b-1 mb-7 flex justify-center">
        <img src={imageHeader} className="h-full w-auto" />
      </div>
    </header>
  )
}

export default Header
