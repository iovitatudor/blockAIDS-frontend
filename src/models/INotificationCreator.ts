export interface INotificationCreator {
  id?: number,
  taskId?: number,
  userId?: number,
  specialistId?: number,
  user_status?: string,
  specialist_status?: string,
  user_message?: string,
  specialist_message?: string,
}