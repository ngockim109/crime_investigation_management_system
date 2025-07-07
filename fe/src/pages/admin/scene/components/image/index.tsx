import React from "react"

const imagesAndVideos = [
  { date: "15/06/2025" },
  { date: "11/04/2025" },
  { date: "17/05/2025" },
]

const ImagesAndVideos = () => {
  return (
    <section className="mb-6">
      <div className="bg-white rounded-lg shadow border">
        <div className="flex justify-between items-center bg-[#e9f1fa] px-4 py-2 rounded-t-lg">
          <span className="font-semibold text-lg">IMAGES AND VIDEO</span>
          <button className="flex items-center gap-1 px-3 py-1 border rounded text-xs bg-white shadow">
            ADD <span>+</span>
          </button>
        </div>
        <div className="p-4">
          <table className="w-full text-sm border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Video or image</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border"></th>
              </tr>
            </thead>
            <tbody>
              {imagesAndVideos.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2 border text-center">{idx + 1}</td>
                  <td className="p-2 border">——</td>
                  <td className="p-2 border">——</td>
                  <td className="p-2 border">{item.date}</td>
                  <td className="p-2 border flex gap-2 justify-center">
                    <button
                      className="rounded-full border border-gray-300 p-1 bg-white hover:bg-gray-100"
                      title="Edit"
                    >
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15.232 5.232l3.536 3.536M9 13l6.071-6.071a2 2 0 1 1 2.828 2.828L11.828 15.828a2 2 0 0 1-1.414.586H7v-3a2 2 0 0 1 .586-1.414z" />
                      </svg>
                    </button>
                    <button
                      className="rounded-full border border-gray-300 p-1 bg-white hover:bg-gray-100"
                      title="Delete"
                    >
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default ImagesAndVideos
