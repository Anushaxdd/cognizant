import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  selectedCourseId: number | null = null;

  // Hands-On 3 Step 25: Loading flag
  isLoading: boolean = true;
  errorMessage: string | null = null;
  searchTerm: string = '';

  // Hands-On 9 Step 96: NgRx Store Observables
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
  }

  ngOnInit(): void {
    // Hands-On 7 Step 71: Read query parameter 'search' from URL
    const searchParam = this.route.snapshot.queryParamMap.get('search');
    if (searchParam) {
      this.searchTerm = searchParam;
    }

    // Hands-On 3 Step 25: Simulated 1.5 second loading delay
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    // Hands-On 8 Step 80: HTTP Subscription
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load courses';
        // Fallback to sync data if backend is offline
        this.courses = this.courseService.getCoursesSync();
      }
    });

    // Hands-On 9 Step 96: Dispatch NgRx Load Action
    this.store.dispatch(loadCourses());
  }

  // Hands-On 2 Step 23: Event Handler for child emission
  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  // Hands-On 3 Step 26: Performance TrackBy Function
  /*
    Comment explaining trackBy performance improvement:
    Without trackBy, Angular re-renders every single DOM node in an *ngFor list whenever the array mutates.
    With trackBy, Angular tracks item identity by unique id, re-rendering ONLY nodes whose data actually changed.
  */
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  // Hands-On 7 Step 70 & 71: Navigation & Query Params
  onCardClick(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  onSearchChange(): void {
    this.router.navigate(['/courses'], { queryParams: { search: this.searchTerm || null } });
  }
}
