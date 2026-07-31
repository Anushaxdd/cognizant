import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { HighlightDirective } from '../../directives/highlight';
import { EnrollmentService } from '../../services/enrollment';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCardComponent implements OnChanges {
  // Hands-On 2 Step 20: Strongly typed Input property
  @Input() course: Course = {
    id: 0,
    name: 'Sample Course',
    code: 'CS000',
    credits: 3,
    gradeStatus: 'pending'
  };

  // Hands-On 2 Step 21: Strongly typed Output event emitter
  @Output() enrollRequested = new EventEmitter<number>();

  // Hands-On 3 Step 31: Toggle property for expanding details
  isExpanded: boolean = false;

  // Hands-On 9 Step 100: NgRx Store Observable for enrolled course IDs
  enrolledIds$: Observable<number[]>;

  constructor(
    public enrollmentService: EnrollmentService,
    private store: Store
  ) {
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  // Hands-On 2 Step 18: ngOnChanges lifecycle hook
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('CourseCardComponent ngOnChanges — previous:', changes['course'].previousValue, 'current:', changes['course'].currentValue);
    }
  }

  // Hands-On 3 Step 32: Component Getter for clean template binding
  /*
    Comment explaining why getters keep templates clean:
    Using getters encapsulates complex conditional evaluation logic inside TypeScript, preventing template pollution.
    Templates remain focused on structure while getters provide clean, reactive property access.
  */
  get cardClasses(): { [key: string]: boolean } {
    const isEnrolled = this.enrollmentService.isEnrolled(this.course.id);
    return {
      'card--enrolled': isEnrolled,
      'card--full': (this.course?.credits || 0) >= 4,
      'expanded': this.isExpanded
    };
  }

  // Hands-On 3 Step 30: [ngStyle] object calculation
  get borderStyle(): { [key: string]: string } {
    let color = '#94a3b8'; // grey for pending
    if (this.course?.gradeStatus === 'passed') {
      color = '#10b981'; // green
    } else if (this.course?.gradeStatus === 'failed') {
      color = '#ef4444'; // red
    }
    return { 'border-left': `5px solid ${color}` };
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick(): void {
    // Emit event up to parent (Step 21)
    this.enrollRequested.emit(this.course.id);

    // Update EnrollmentService (Step 65)
    if (this.enrollmentService.isEnrolled(this.course.id)) {
      this.enrollmentService.unenroll(this.course.id);
      // Dispatch NgRx Action (Step 100)
      this.store.dispatch(EnrollmentActions.unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.enrollmentService.enroll(this.course.id);
      // Dispatch NgRx Action (Step 100)
      this.store.dispatch(EnrollmentActions.enrollInCourse({ courseId: this.course.id }));
    }
  }
}
