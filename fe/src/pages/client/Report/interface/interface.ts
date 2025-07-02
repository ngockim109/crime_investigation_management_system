export interface stepData {
    fullname: string
    email: string,
    phonenumber: string
    address: string
    typeReport: string,
    date: string
    description: string
    relationshipIncident: string
    crimeType: string
}
export interface relevantParties {
    role: string
    fullname: string
    attackment: string,
    nationality: string
    statement: string
    gender: string
}
export interface initialEvidence {
    type: string,
    location: string,
    description: string
    attackment: string,
}