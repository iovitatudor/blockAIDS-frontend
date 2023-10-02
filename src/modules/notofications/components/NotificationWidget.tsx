import React, {FC, useEffect} from "react";
import "../styles/Notifications.scss";
import {Alert, Grid} from "@mui/material";
import {notificationsApi} from "../../../api/notificationsApi";
import {useAppSelector} from "../../../hooks/redux";
import {NotificationStatusEnum} from "../enums/NotificationStatusEnum";
import {useNavigate} from "react-router-dom";
import {INotification} from "../../../models/INotification";

const NotificationWidget: FC = () => {
  const navigate = useNavigate();
  const {type, authUser} = useAppSelector(state => state.authReducer);
  const {data: notifications,} = notificationsApi.useFetchAllNotificationsByUserIdQuery(1);
  const [updateNotification] = notificationsApi.useUpdateNotificationMutation();

  const markAllNotificationsAsRead = () => {
    if (notifications) {
      notifications.map(notification => {
        if (notification.userStatus === NotificationStatusEnum.scheduled) {
          updateNotification({
            id: notification.id,
            user_status: NotificationStatusEnum.completed,
          });
        }
      })
    }
  }

  const markNotificationAsRead = (notification: INotification) => {
    if (notification.userStatus === NotificationStatusEnum.scheduled) {
      updateNotification({
        id: notification.id,
        user_status: NotificationStatusEnum.completed,
      });
    }
    navigate(`/tasks/view/${notification.task.id}`);
  }
  return (
    <div className="notifications-area">
      <p className="set-as-read" onClick={markAllNotificationsAsRead}>Mark all as read</p>
      <Grid container spacing={3}>
        {
          notifications && notifications.map(notification => (
            <Grid item xs={12}>
              {
                type === 'specialist' ?
                  <Alert
                    severity={notification.specialistStatus === NotificationStatusEnum.scheduled ? 'info' : 'success'}>
                    <div className="notification-item">
                      <p className="notification-body" onClick={() => markNotificationAsRead(notification)}>
                        {notification.specialistMessage}&nbsp;Click here to see more details
                      </p>
                      <p className="notification-time"> {new Date(notification.created).toLocaleString()}</p>
                    </div>
                  </Alert>
                  :
                  <Alert severity={notification.userStatus === NotificationStatusEnum.scheduled ? 'info' : 'success'}>
                    <div className="notification-item">
                      <p className="notification-body" onClick={() => markNotificationAsRead(notification)}>
                        {notification.userMessage}&nbsp;Click here to see more details
                      </p>
                      <p className="notification-time"> {new Date(notification.created).toLocaleString()}</p>
                    </div>
                  </Alert>
              }
            </Grid>
          ))
        }
      </Grid>

    </div>
  );
}

export default NotificationWidget;