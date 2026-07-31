import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CreditLabelPipe],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  enrolledStudents$: Observable<{ id: number; name: string }[]> = of([]);

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    // Hands-On 7 Step 69: Read route parameter :id
    const idParam = this.route.snapshot.paramMap.get('id');
    const courseId = Number(idParam);

    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe({
        next: (c) => this.course = c,
        error: () => {
          // Fallback lookup if server is offline
          const found = this.courseService.getCoursesSync().find(x => x.id === courseId);
          this.course = found || null;
        }
      });

      // Hands-On 8 Step 87: switchMap operator chaining course selection -> enrolled students call
      /*
        Comment explaining switchMap cancellation:
        switchMap automatically unsubscribes and cancels any pending in-flight inner HTTP request
        if a new outer value (courseId) is emitted. This prevents race conditions and out-of-order responses.
      */
      this.enrolledStudents$ = this.route.paramMap.pipe(
        switchMap(params => {
          const id = Number(params.get('id'));
          return this.enrollmentService.getStudentsByCourse(id);
        })
      );
    }
  }
}
