import type { PartyType } from "@/enum/party.enum"

export interface Party {
  type_Party: string
  full_name: string
  attached_file: attached_file[]
  nationality: string
  statement: string
  gender: string
  party_type: PartyType
}
// {
//     "original_name": "file url",
//         "file_url": "https://example.com/witness-statement-1.pdf",
//             "public_id": "1234",
//                 "resource_type": "enum"
// }
export interface attached_file {
  original_name: string
  file_url: string
  public_id: string
  resource_type: string
}
