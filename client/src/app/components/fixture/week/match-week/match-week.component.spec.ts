import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchWeekComponent } from './match-week.component';

describe('MatchWeekComponent', () => {
  let component: MatchWeekComponent;
  let fixture: ComponentFixture<MatchWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
