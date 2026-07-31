import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseSummaryWidgetComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  // Hands-On 2 Step 11: TypeScript property for string interpolation
  portalName: string = 'Student Course Portal';

  // Hands-On 2 Step 12: Property binding for button disabled state
  isPortalActive: boolean = true;

  // Hands-On 2 Step 13: Event binding handler property
  message: string = '';

  // Hands-On 2 Step 14: Two-way binding property with ngModel
  searchTerm: string = '';

  // Hands-On 1 & 6: Live stats row properties
  availableCoursesCount: number = 0;
  enrolledCount: number = 3;
  gpa: number = 3.8;

  constructor(private courseService: CourseService) {}

  // Hands-On 2 Step 16: ngOnInit lifecycle hook
  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    this.availableCoursesCount = this.courseService.getCoursesSync().length;
  }

  // Hands-On 2 Step 17: ngOnDestroy lifecycle hook
  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  // Hands-On 2 Step 13: Event binding click handler
  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  /*
    Hands-On 2 Step 15 Comment:
    Difference between [property] and [(ngModel)]:
    - [property] is one-way binding flowing from Component Class -> DOM Element property.
      Updates to the component property update the DOM, but user interaction with the DOM does NOT update the component property.
    - [(ngModel)] is two-way binding flowing symmetrically (Component Class <-> DOM Element).
      It is a shorthand syntax for [ngModel]="prop" (ngModelChange)="prop=$event", keeping DOM input state and component state synchronized in real time.
  */
}
