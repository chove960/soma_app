import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetaiilsComponent } from './student-detaiils.component';

describe('StudentDetaiilsComponent', () => {
  let component: StudentDetaiilsComponent;
  let fixture: ComponentFixture<StudentDetaiilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDetaiilsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentDetaiilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
