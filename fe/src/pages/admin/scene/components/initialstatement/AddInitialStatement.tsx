import React from "react"

const AddInitialStatement = () => {
  return (
    <div className="bg-white rounded-xl shadow border max-w-3xl mx-auto mt-8 mb-8">
      <div className="bg-[#e9f1fa] px-6 py-4 rounded-t-xl">
        <h2 className="text-center text-xl font-bold text-[#1A2C47]">
          ADD INITIAL STATEMENT
        </h2>
      </div>
      <div className="p-6">
        {/* Initial information */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Initial information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Initial name</label>
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Ms.Merry"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Date</label>
              <input type="date" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1">Contact information</label>
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="+xxxxxxxxxx"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Role</label>
              <select className="w-full border rounded px-3 py-2">
                <option>Witness</option>
                <option>Victim</option>
                <option>Suspect</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>
        {/* Detailed statement */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Detailed statement</h3>
          <div className="flex gap-2 mb-2">
            <input
              className="flex-1 border rounded px-3 py-2"
              placeholder="Content of the statement"
            />
            <button className="px-4 py-2 rounded bg-gray-300">Cancel</button>
            <button className="px-4 py-2 rounded bg-blue-600 text-white">
              Add
            </button>
          </div>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[80px]"
            defaultValue={
              "I am Ms. A, a witness in this case. At about 9:00 a.m. on June 15, 2025, I was walking in the park near the crime scene. When I passed by the local area, I heard a loud scream. I turned around and saw a man attacking a woman. The man looked tall, wearing a blue shirt and black pants. I couldn't see his face clearly because his back was turned."
            }
          />
        </div>
        {/* Evidence Link */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Evidence Link</h3>
            <button className="px-4 py-1 rounded bg-gray-200 border">
              Upload file
            </button>
          </div>
          <div className="flex gap-4 flex-wrap">
            <div className="bg-[#f6f7f8] border rounded p-4 w-48 flex flex-col items-center">
              <div className="text-red-500 font-bold mb-1">File Title.png</div>
              <div className="text-xs text-gray-500 mb-1">
                315 KB - 21/04/2022
              </div>
            </div>
            <div className="bg-[#f6f7f8] border rounded p-4 w-48 flex flex-col items-center">
              <div className="text-red-500 font-bold mb-1">File Title.png</div>
              <div className="text-xs text-gray-500 mb-1">
                315 KB - 21/04/2022
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button className="px-6 py-2 rounded bg-gray-300 text-black">
            Back
          </button>
          <button className="px-6 py-2 rounded bg-blue-600 text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddInitialStatement
