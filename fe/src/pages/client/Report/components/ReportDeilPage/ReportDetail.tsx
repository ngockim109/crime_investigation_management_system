import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export  const ReportDetail = () => {
  return (
    <div className="w-full max-w-5xl mx-auto min-h-screen bg-white p-6 flex flex-col gap-6">
      <div className="flex justify-flex-start text-sm">
        <div className="mr-[260px]">
          <p>ReportID:</p>
          <p>Status:</p>
        </div>
        <div>
          <p>Date:</p>
          <p>Time:</p>
        </div>
      </div>
      <hr className="mt-1" />
      <h2 className="text-center font-bold text-xl">REPORT DETAIL</h2>
      <div className="p-4">
        <h3 className="text-red-600 font-semibold mb-4">MY INFORMATION</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Full name" />
          <Input placeholder="Email" />
          <Input placeholder="Relationship to the incident" />
          <Input placeholder="Phone" />
          <div className="col-span-2">
            <Input placeholder="Address" />
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="p-4">
        <h3 className="text-red-600 font-semibold mb-4">INCIDENT INFORMATION</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Type of Crime" />
          <Input placeholder="Severity" />
          <Input placeholder="Datetime of occurrence" />
          <Input placeholder="State" />
          <Input placeholder="Detailed address" />
          <Textarea placeholder="Description of the incident" />
        </div>
      </div>
      <hr className="my-6" />
      <div className="p-4">
        <h3 className="text-red-600 font-semibold mb-4">RELEVANT INFORMATION</h3>
        <h4 className="text-blue-600 mb-2">I. Relevant Parties</h4>
        <p className="font-medium my-8">A/ Victim (optional)</p>
        <table className="w-full border mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Nationality</th>
              <th className="border p-2">Statement / Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">#1</td>
              <td className="border p-2">—</td>
              <td className="border p-2">—</td>
              <td className="border p-2">—</td>
              <td className="border p-2">_________________________</td>
            </tr>
          </tbody>
        </table>
        <p className="font-medium my-8">B/ Witness (optional)</p>
        <table className="w-full border mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Nationality</th>
              <th className="border p-2">Statement / Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">#1</td>
              <td className="border p-2">—</td>
              <td className="border p-2">—</td>
              <td className="border p-2">—</td>
              <td className="border p-2">_________________________</td>
            </tr>
          </tbody>
        </table>
        <p className="font-medium my-8">C/ Suspect (optional)</p>
        <table className="w-full border mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Nationality</th>
              <th className="border p-2">Statement / Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">#1</td>
              <td className="border p-2">—</td>
              <td className="border p-2">—</td>
              <td className="border p-2">—</td>
              <td className="border p-2">_________________________</td>
            </tr>
          </tbody>
        </table>
        <p className="font-medium my-8">D/ Accomplice (optional)</p>
        <table className="w-full border mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Nationality</th>
              <th className="border p-2">Statement / Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">#1</td>
              <td className="border p-2">—</td>
              <td className="border p-2">—</td>
              <td className="border p-2">—</td>
              <td className="border p-2">_________________________</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="p-4">
        <h4 className="text-blue-600 mb-4 mt-[-40px]">II. Initial Evidence</h4>
        <table className="w-full border mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Evidence Location</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Attachments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">#1</td>
              <td className="border p-2">Documentary Evidence</td>
              <td className="border p-2">—</td>
              <td className="border p-2">—</td>
              <td className="border p-2">File Title.png</td>
            </tr>
          </tbody>
        </table>
        <p>Uploaded:</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 border p-2 rounded w-fit">
          </div>
          <div className="flex items-center gap-2 border p-2 rounded w-fit">
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReportDetail;
