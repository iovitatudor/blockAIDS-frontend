export interface IRegister {
  "name": string,
  "email": string,
  "password": string,
  "type": string,
}

export interface IRegisterClientResponse {
  "token": string,
  "userId": number,
}

export interface IRegisterSpecialistResponse {
  "token": string,
  "specialist": number,
}