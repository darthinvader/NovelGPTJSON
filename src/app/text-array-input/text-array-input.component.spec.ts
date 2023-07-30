import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextArrayInputComponent } from './text-array-input.component';

describe('TextArrayInputComponent', () => {
  let component: TextArrayInputComponent;
  let fixture: ComponentFixture<TextArrayInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextArrayInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextArrayInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
