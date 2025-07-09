import React from "react"

type Props = {
  activeMenu: string;
  setActiveMenu: (v: string) => void;
  setShowAdd: (v: boolean) => void;
  showAdd: boolean;
};

const Sidebar = ({ activeMenu, setActiveMenu, setShowAdd, showAdd }: Props) => {
  const [open, setOpen] = React.useState(true) // mặc định mở Scene Information

  return (
    <div className="w-72 bg-white shadow-md p-4 flex flex-col">
      <button className="w-full text-left font-semibold py-2 px-3 rounded bg-gray-200 mb-2 flex items-center gap-2">
        <span>&#9654;</span> Initial Response
      </button>

      <button
        className={`w-full text-left font-semibold py-2 px-3 rounded flex items-center gap-2 ${open ? "bg-blue-100 text-blue-700" : "bg-gray-200"}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{open ? "\u25bc" : "\u25b6"}</span> Scene Information
      </button>
      {open && (
        <ul className="ml-6 mt-2 text-sm">
          <li
            className={`mb-1 cursor-pointer ${activeMenu === "initialstatement" && showAdd ? "text-blue-600 font-bold" : ""}`}
            onClick={() => {
              setActiveMenu("initialstatement")
              setShowAdd(true)
            }}
          >
            Initial Statements
          </li>
          <li className="mb-1">Scene Description</li>
          <li
            className={`mb-1 cursor-pointer ${activeMenu === "imagesandvideos" ? "text-blue-600 font-bold" : ""}`}
            onClick={() => {
              setActiveMenu("imagesandvideos")
              setShowAdd(false)
            }}
          >
            Images and Videos
          </li>
          <li className="mb-1">Preliminary Physical Evidence Information</li>
          <li className="mb-1">Scene Sketch</li>
        </ul>
      )}

      <button className="w-full text-left font-semibold py-2 px-3 rounded bg-gray-200 mt-4 flex items-center gap-2">
        <span>&#9654;</span> Report Case
      </button>
    </div>
  )
}

export default Sidebar
