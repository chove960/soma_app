import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterResultComponent } from './semester-result.component';

describe('SemesterResultComponent', () => {
  let component: SemesterResultComponent;
  let fixture: ComponentFixture<SemesterResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SemesterResultComponent]
    });
    fixture = TestBed.createComponent(SemesterResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
