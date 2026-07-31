import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  // Hands-On 6 Step 67: Component-level provider
  providers: [NotificationService],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class NotificationComponent implements OnInit {
  instanceId: number = 0;
  notifications: string[] = [];

  /*
    Hands-On 6 Step 67 Comment:
    Providing NotificationService in the component's @Component({ providers: [NotificationService] })
    instructs Angular's Hierarchical Injector to instantiate a NEW service instance dedicated exclusively
    to this component subtree. Unlike root-provided singletons (providedIn: 'root'), component-level providers
    isolate state per component lifecycle, preventing cross-component state leakage.
  */

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.instanceId = this.notificationService.getInstanceId();
    this.notifications = this.notificationService.getNotifications();
  }

  addNotification(): void {
    this.notificationService.addNotification(`Alert at ${new Date().toLocaleTimeString()}`);
    this.notifications = this.notificationService.getNotifications();
  }
}
