import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CourseService } from './course';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [1];

  constructor(
    private courseService: CourseService,
    private http: HttpClient
  ) {}

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    const index = this.enrolledCourseIds.indexOf(courseId);
    if (index > -1) {
      this.enrolledCourseIds.splice(index, 1);
    }
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourseIds(): number[] {
    return [...this.enrolledCourseIds];
  }

  getEnrolledCourses(): Course[] {
    const allCourses = this.courseService.getCoursesSync();
    return allCourses.filter(c => this.enrolledCourseIds.includes(c.id));
  }

  // Hands-On 8 Step 87: Used for switchMap demo
  getStudentsByCourse(courseId: number): Observable<{ id: number; name: string }[]> {
    const mockStudentsMap: { [key: number]: { id: number; name: string }[] } = {
      1: [{ id: 101, name: 'Alex Morgan' }, { id: 102, name: 'Sam Taylor' }],
      2: [{ id: 103, name: 'Jordan Lee' }],
      3: [{ id: 104, name: 'Casey Miller' }],
      4: [{ id: 105, name: 'Morgan Reed' }],
      5: [{ id: 106, name: 'Taylor Swift' }]
    };
    return of(mockStudentsMap[courseId] || []);
  }
}
