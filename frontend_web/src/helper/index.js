import { notification } from 'antd';

export const openNotification = (type, message, description, callback = null) => {
  notification[type]({
		duration : 3,
    message,
    description,
    onClick: () => callback,
  });
};