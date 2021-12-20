import React from "react";
import { Divider, Typography } from '@mui/material';
import moment from 'moment';
import endpoints from "~/constants/endpoints";
import httpAuthorization from "~/utils/httpAuthorization";
import { useDispatch } from "react-redux";
import { UPDATE_USER_NOTIFICATIONS } from "~/store/auth";

const NotificationItem = (props) => {
    const { notification } = props;
    const dispatch = useDispatch();

    const handleClick = async () => {
        const result = await httpAuthorization.patch(`${endpoints.checkNotification}?notificationId=${notification._id}`);
        if (result) {
            dispatch(UPDATE_USER_NOTIFICATIONS(result.data));
        }
    };

    return (
        <div onClick={handleClick} style={{ padding: 10, backgroundColor: notification.seen ? '#FFFFFF' : '#E3F2FD' }}>
            <Typography variant="subtitle2" component="div">
                {notification.title}
            </Typography>
            <Typography variant="body2" gutterBottom component="div">
                {notification.description}
            </Typography>
            <Typography variant="caption" gutterBottom>
                {moment(notification.createdAt).fromNow()}
            </Typography>
        </div>
    );
}

export default NotificationItem;