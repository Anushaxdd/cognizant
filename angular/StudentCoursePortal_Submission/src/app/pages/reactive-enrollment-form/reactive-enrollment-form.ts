import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentFormComponent implements OnInit {
  enrollForm!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Hands-On 5 Step 49: FormBuilder Reactive Form initialization
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      // Step 55: Async validator simulateEmailCheck applied as 3rd argument
      studentEmail: ['', [Validators.required, Validators.email], [this.simulateEmailCheck.bind(this)]],
      // Step 53: Custom synchronous validator noCourseCode
      courseId: ['', [Validators.required, this.noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      // Step 56: FormArray for dynamic repeating controls
      additionalCourses: this.fb.array([])
    });
  }

  // Hands-On 5 Step 57: Typed getter for FormArray
  /*
    Comment explaining why getter is better than template casting:
    A typed getter encapsulates casting logic inside TypeScript (this.enrollForm.get('additionalCourses') as FormArray),
    ensuring strict compile-time type checking, refactoring safety, and clean template syntax without unsafe inline casting.
  */
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  // Hands-On 5 Step 53: Custom synchronous validator function
  noCourseCode(control: AbstractControl): ValidationErrors | null {
    const val = String(control.value || '').trim();
    if (val.toUpperCase().startsWith('XX')) {
      return { noCourseCode: true };
    }
    return null;
  }

  // Hands-On 5 Step 55: Custom async validator function returning a Promise
  simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const val = String(control.value || '').toLowerCase();
        if (val.includes('test@')) {
          resolve({ emailTaken: true });
        } else {
          resolve(null);
        }
      }, 800);
    });
  }

  // Hands-On 5 Step 56: FormArray dynamic addition/removal
  addAdditionalCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  // Hands-On 5 Step 51: Submit Handler
  /*
    Hands-On 5 Step 52 Comment:
    Difference between enrollForm.value and enrollForm.getRawValue():
    - enrollForm.value extracts values ONLY from enabled form controls (disabled controls are omitted).
    - enrollForm.getRawValue() extracts values from ALL form controls regardless of disabled state.
  */
  onSubmit(): void {
    console.log('Reactive Form value (excludes disabled):', this.enrollForm.value);
    console.log('Reactive Form raw value (includes disabled):', this.enrollForm.getRawValue());

    if (this.enrollForm.valid) {
      this.submitted = true;
    }
  }

  hasUnsavedChanges(): boolean {
    return this.enrollForm && this.enrollForm.dirty && !this.submitted;
  }
}
