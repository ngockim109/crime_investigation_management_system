import { Search } from 'lucide-react';

const Nav = () => {
    const links = ["Home", "About", "Bureaus", "Services", "Stats", "Policies"]
    const compoentLink = links.map((v, i) => {
        return (
            <>
                <li className="cursor-pointer py-6.25 px-6.75  " key={v}>
                    <a className=" " href={`#${v}`}>{v}</a>
                </li>
                {
                    i + 1 == links.length ? <></> : <li className="px-2.25 font-normal text-gray-300">
                        |
                    </li>
                }
            </>
        )
    })
    return (
        <nav className="w-max mx-auto mb-7  max-lg:hidden">
            <ul className=" flex items-center h-17 text-[16px] font-bold">
                {compoentLink}
                <li className="pl-10 ml-8.75 relative bg-[#EEEEEE] rounded-[8px] w-66 h-10">
                    <div className="size-6 absolute left-3.75 top-1/2 -translate-y-1/3">
                        <Search className='size-4.5' />
                    </div>
                    <input type="text" className='h-full text-sm font-normal w-full focus:outline-none'/>
                </li>
            </ul>
        </nav>
    )
}

export default Nav