
export interface Party {
  party_type : string
  full_name: string
  attached_file: attachments_url[]
  nationality: string
  statement: string
  gender: string
}
// {
//     "original_name": "file url",
//         "file_url": "https://example.com/witness-statement-1.pdf",
//             "public_id": "1234",
//                 "resource_type": "enum"
// }
export interface attachments_url {
  original_name: string
  file_url: string
  public_id: string
  resource_type: string
}
