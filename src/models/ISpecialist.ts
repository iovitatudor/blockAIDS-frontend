export interface ISpecialist {
  "id": number,
  "name": string,
  "email": string,
  "jobPosition": string,
  "avatar": string,
  "organizationId": string,
  "file"?: File | Blob,
}