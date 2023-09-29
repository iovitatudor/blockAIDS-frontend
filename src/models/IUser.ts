export interface IUser {
  "id": number,
  "name": string,
  "email": string,
  "phone": string,
  "avatar": string,
  "gender": string,
  "birthdate"?: string | null,
  "file"?: Blob | File,
}