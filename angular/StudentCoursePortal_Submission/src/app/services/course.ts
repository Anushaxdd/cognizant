import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  private initialCourses: Course[] = [
    { id: 1, name: 'Data Structures & Algorithms', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Web Development with Angular', code: 'CS202', credits: 3, gradeStatus: 'passed' },
    { id: 3, name: 'Database Management Systems', code: 'CS303', credits: 3, gradeStatus: 'pending' },
    { id: 4, name: 'Software Engineering Principles', code: 'CS404', credits: 4, gradeStatus: 'failed' },
    { id: 5, name: 'Cloud Computing Architecture', code: 'CS505', credits: 3, gradeStatus: 'pending' }
  ];

  constructor(private http: HttpClient) {}

  // Synchronous method for early exercise compatibility
  getCoursesSync(): Course[] {
    return [...this.initialCourses];
  }

  // Hands-On 8: HttpClient API Integration with RxJS operators (map, tap, retry, catchError)
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      map(courses => courses.filter(c => c.credits > 0)),
      tap(courses => console.log('Courses loaded:', courses.length)),
      retry(2),
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(err => {
        console.error(err);
        return throwError(() => new Error(`Course with ID ${id} not found.`));
      })
    );
  }

  addCourse(course: Course): void {
    this.initialCourses.push(course);
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Failed to create course.'));
      })
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Failed to update course.'));
      })
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Failed to delete course.'));
      })
    );
  }
}
