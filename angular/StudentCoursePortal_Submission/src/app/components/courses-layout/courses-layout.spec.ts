import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesLayoutComponent } from './courses-layout';
import { provideRouter } from '@angular/router';

describe('CoursesLayoutComponent', () => {
  let component: CoursesLayoutComponent;
  let fixture: ComponentFixture<CoursesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesLayoutComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create courses layout component', () => {
    expect(component).toBeTruthy();
  });
});
