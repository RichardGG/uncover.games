import { defineStore } from 'pinia';

export type NotificationState = {
  notifications: string[]; // Placeholder for notification objects, can be expanded to a more complex type
};

export const useNotificationStore = defineStore('notification', {
  state: () => {
    return {
      notifications: [],
    } as NotificationState;
  },

  actions: {
    addNotification(notification: string) {
      this.notifications.push(notification);
    },
  },
});
