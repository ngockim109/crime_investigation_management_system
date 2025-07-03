import React from "react"

const ReportDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-6 text-black font-sans">
      {/* Header */}
      <div className="flex justify-between mb-4 text-sm">
        <div>
          <p>
            ReportID: <span className="text-gray-800">11111</span>
          </p>
          <p>
            Status: <span className="text-yellow-600">Pending</span>
          </p>
        </div>
        <div>
          <p>
            Date: <span className="text-gray-800">05/22/2024</span>
          </p>
          <p>
            Time: <span className="text-gray-800">18 : 22</span>
          </p>
        </div>
      </div>

      <hr className="mb-4 border-gray-300" />
      <h2 className="text-center text-lg font-semibold mb-6">REPORT DETAIL</h2>

      {/* MY INFORMATION */}
      <section className="mb-8">
        <h3 className="text-red-600 font-bold mb-4">MY INFORMATION</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Full name</p>
            <p className="min-h-[24px]">Nguyen Van A</p>
          </div>
          <div>
            <p className="font-medium">Email</p>
            <p className="min-h-[24px]">abcd@gmail.com</p>
          </div>
          <div>
            <p className="font-medium">Relationship to the incident</p>
            <p className="min-h-[24px]">Witness</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p className="min-h-[24px]">+1 (555) 123-4567</p>
          </div>
          <div className="col-span-2">
            <p className="font-medium">Address</p>
            <p className="min-h-[48px] whitespace-pre-wrap">
              1234 Maplewood Avenue Florida, CA 90026 United States
            </p>
          </div>
        </div>
      </section>

      {/* INCIDENT INFORMATION */}
      <section className="mb-8">
        <h3 className="text-red-600 font-bold mb-4">INCIDENT INFORMATION</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Type of Crime</p>
            <p className="min-h-[24px]">Crimes Against Property</p>
          </div>
          <div>
            <p className="font-medium">Severity</p>
            <p className="min-h-[24px]">Moderate</p>
          </div>
          <div>
            <p className="font-medium">Datetime of occurrence</p>
            <p className="min-h-[24px]">05/20/2024 14 : 30</p>
          </div>
          <div>
            <p className="font-medium">State</p>
            <p className="min-h-[24px]">Florida</p>
          </div>
          <div>
            <p className="font-medium">Detailed address</p>
            <p className="min-h-[48px] whitespace-pre-wrap">
              1234 Maplewood Avenue Florida, CA 90026 United States
            </p>
          </div>
          <div>
            <p className="font-medium">Description of the incident</p>
            <p className="min-h-[48px] whitespace-pre-wrap">
              On the evening of June 15, 2025, at approximately 7:45 PM, I
              returned to my apartment at 1234 Maplewood Avenue...
            </p>
          </div>
        </div>
      </section>

      {/* RELEVANT INFORMATION */}
      <section className="mb-8">
        <h3 className="text-red-600 font-bold mb-2">RELEVANT INFORMATION</h3>
        <p className="text-blue-600 font-medium mb-4 cursor-pointer">
          I. Relevant Parties
        </p>

        {["Victim", "Witness", "Suspect", "Accomplice"].map((role, index) => (
          <div key={index} className="mb-6">
            <p className="font-medium mb-2">{`${String.fromCharCode(65 + index)}/ ${role} (optional)`}</p>
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Full Name</th>
                    <th className="p-2 border">Gender</th>
                    <th className="p-2 border">Nationality</th>
                    <th className="p-2 border">Statement / Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">#1</td>
                    <td className="p-2 border">—</td>
                    <td className="p-2 border">—</td>
                    <td className="p-2 border">—</td>
                    <td className="p-2 border">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      {/* INITIAL EVIDENCE */}
      <section className="mb-16">
        <p className="text-blue-600 font-medium mb-2">II. Initial Evidence</p>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Evidence Location</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Attachments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">#1</td>
                <td className="p-2 border">Documentary Evidence</td>
                <td className="p-2 border">—</td>
                <td className="p-2 border">—</td>
                <td className="p-2 border">File Title.png</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* File upload mockup */}
        <p className="mt-4 font-medium text-sm text-gray-700">Uploaded:</p>
        <div className="flex gap-4 mt-2 flex-wrap">
          <div className="bg-gray-100 p-4 rounded border w-56">
            <p className="text-xs text-gray-500 mb-1">File Title.png</p>
            <p className="text-xs text-gray-400">File size: 2.3 MB</p>
            <button className="text-red-500 text-xs mt-2">× Remove</button>
          </div>
          <div className="bg-gray-100 p-4 rounded border w-56">
            <p className="text-xs text-gray-500 mb-1">File Title.png</p>
            <p className="text-xs text-gray-400">File size: 2.3 MB</p>
            <button className="text-red-500 text-xs mt-2">× Remove</button>
          </div>
        </div>
      </section>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F6F7F8] border-t border-gray-300 px-6 py-4 flex justify-between">
        <button
          className="px-6 py-2 rounded shadow"
          style={{ backgroundColor: "var(--muted-foreground)", color: "white" }}
        >
          Print
        </button>
        <div className="space-x-4">
          <button
            className="px-6 py-2 rounded shadow"
            style={{ backgroundColor: "var(--destructive)", color: "white" }}
          >
            Decline
          </button>
          <button
            className="px-6 py-2 rounded shadow"
            style={{
              backgroundColor: "#1992FC",
              color: "white",
            }}
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportDetailPage
