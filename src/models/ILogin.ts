export interface ILogin {
  email: string,
  password: string,
  type: string,
}

export interface ILoginClientResponse {
  "token": string,
  "userId": number,
}

export interface ILoginSpecialistResponse {
  "token": string,
  "specialist": number,
}