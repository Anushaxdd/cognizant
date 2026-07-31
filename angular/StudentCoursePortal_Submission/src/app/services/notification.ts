import { Injectable } from '@angular/core';

// Provided at component level in NotificationComponent to demonstrate component-scoped service instance
@Injectable()
export class NotificationService {
  private instanceId = Math.floor(Math.random() * 10000);
  private notifications: string[] = ['Welcome to Student Course Portal!'];

  getInstanceId(): number {
    return this.instanceId;
  }

  getNotifications(): string[] {
    return [...this.notifications];
  }

  addNotification(msg: string): void {
    this.notifications.push(msg);
  }
}
