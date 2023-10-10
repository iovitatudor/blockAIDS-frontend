import {ITask} from "../../../models/ITask";
import {NotificationStatusEnum} from "../../notofications/enums/NotificationStatusEnum";

export const setNotification = (task: ITask, messageAction: string, type: 'specialist' | 'user', createNotification) => {
  const userMessage =
    type === 'specialist' ? `${task.specialist.name} has ${messageAction} ${task.name} task!` : `You have ${messageAction} ${task.name} task!`;
  const specialistMessage =
    type === 'specialist' ? `You have ${messageAction} ${task.name} task for ${task.user.name}!` : `${task.user.name} has ${messageAction} ${task.name} task `;

  if (task) {
    createNotification({
      taskId: task.id,
      userId: Number(task.user.id),
      specialistId: Number(task.specialist.id),
      user_status: NotificationStatusEnum.scheduled,
      specialist_status: NotificationStatusEnum.scheduled,
      user_message: userMessage,
      specialist_message: specialistMessage,
    });
  }
}
