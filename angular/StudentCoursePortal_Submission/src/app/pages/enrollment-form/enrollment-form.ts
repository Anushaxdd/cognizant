import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})
export class EnrollmentFormComponent {
  studentName: string = '';
  studentEmail: string = '';
  courseId: number | null = null;
  preferredSemester: string = 'Odd';
  agreeToTerms: boolean = false;

  submitted: boolean = false;

  // Hands-On 4 Step 40: Form Submit handler logging form.value and form.valid
  onSubmit(form: NgForm): void {
    console.log('Template-Driven Form submitted — valid:', form.valid);
    console.log('Form values object:', form.value);

    if (form.valid) {
      this.submitted = true;
    }
  }

  // Hands-On 4 Step 47: Reset button handler
  onReset(form: NgForm): void {
    form.resetForm();
    this.submitted = false;
  }
}
