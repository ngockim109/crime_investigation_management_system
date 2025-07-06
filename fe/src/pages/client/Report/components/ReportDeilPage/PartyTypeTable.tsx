import type { Party } from "@/types/party.interface"

const PartyTypeTable = (p: { ls: Party[], title: string }) => {
    if (p.ls.length == 0) {
        return <></>
    }
    return (
        <>
            <p className="font-medium my-8">{p.title}</p>
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
                    {
                        p.ls.map((v, i) => {
                            return <tr>
                                <td className="border p-2">#{i}</td>
                                <td className="border p-2">{v.full_name}</td>
                                <td className="border p-2">{v.gender}</td>
                                <td className="border p-2">{v.nationality}</td>
                                <td className="border p-2">
                                    {v.statement}
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default PartyTypeTable