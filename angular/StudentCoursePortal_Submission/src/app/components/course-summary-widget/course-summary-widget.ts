import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidgetComponent implements OnInit {
  courseCount: number = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.updateCount();
  }

  updateCount(): void {
    this.courseCount = this.courseService.getCoursesSync().length;
  }

  // Demonstrates singleton service instance shared across components (Step 62)
  addQuickCourse(): void {
    const newId = this.courseCount + 1;
    this.courseService.addCourse({
      id: newId,
      name: `Elective Course #${newId}`,
      code: `CS60${newId}`,
      credits: 3,
      gradeStatus: 'pending'
    });
    this.updateCount();
  }
}
