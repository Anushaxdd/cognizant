import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CoursesLayoutComponent } from './components/courses-layout/courses-layout';
import { CourseListComponent } from './pages/course-list/course-list';
import { CourseDetailComponent } from './pages/course-detail/course-detail';
import { StudentProfileComponent } from './pages/student-profile/student-profile';
import { EnrollmentFormComponent } from './pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentFormComponent } from './pages/reactive-enrollment-form/reactive-enrollment-form';
import { NotFoundComponent } from './pages/not-found/not-found';
import { authGuard } from './guards/auth';
import { unsavedChangesGuard } from './guards/unsaved-changes';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // Hands-On 7 Step 72: Nested routes under /courses
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    children: [
      { path: '', component: CourseListComponent },
      { path: ':id', component: CourseDetailComponent }
    ]
  },
  // Hands-On 7 Step 76: CanActivate AuthGuard protection
  {
    path: 'profile',
    canActivate: [authGuard],
    component: StudentProfileComponent
  },
  {
    path: 'enroll',
    canActivate: [authGuard],
    component: EnrollmentFormComponent
  },
  // Hands-On 7 Step 77: CanDeactivate UnsavedChangesGuard protection
  {
    path: 'enroll-reactive',
    canDeactivate: [unsavedChangesGuard],
    component: ReactiveEnrollmentFormComponent
  },
  // Hands-On 7 Step 68: Wildcard 404 route must be last
  { path: '**', component: NotFoundComponent }
];
