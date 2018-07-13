import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerManagementComponent } from './computer-management.component';

describe('ComputerManagementComponent', () => {
  let component: ComputerManagementComponent;
  let fixture: ComponentFixture<ComputerManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
