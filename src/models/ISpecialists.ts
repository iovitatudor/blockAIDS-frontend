import {IOrganizations} from "./IOrganizations";

export interface ISpecialists {
  "id": number,
  "name": string,
  "email": string,
  "jobPosition": string,
  "avatar": string,
  "organization": IOrganizations[] | null,
}