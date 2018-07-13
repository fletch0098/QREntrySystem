import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerSearchComponent } from './computer-search.component';

describe('ComputerSearchComponent', () => {
  let component: ComputerSearchComponent;
  let fixture: ComponentFixture<ComputerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
