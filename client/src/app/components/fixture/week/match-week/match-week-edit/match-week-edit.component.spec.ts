import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchWeekEditComponent } from './match-week-edit.component';

describe('MatchWeekEditComponent', () => {
  let component: MatchWeekEditComponent;
  let fixture: ComponentFixture<MatchWeekEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchWeekEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchWeekEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
