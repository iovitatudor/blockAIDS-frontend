export interface ITaskCreator {
  id?: number,
  userId?: string,
  specialistId?: string,
  taskTypeId?: string,
  organizationId?: string,
  name?: string,
  due_date?: string | null,
  status?: string,
  points?: number,
  description?: string
}