export interface ITaskCreator {
  id?: number,
  userId: string,
  specialistId: string,
  taskTypeId: string,
  organizationId: string,
  name: string,
  dateDue?: string,
  status: string,
  points: number,
  description: string
}