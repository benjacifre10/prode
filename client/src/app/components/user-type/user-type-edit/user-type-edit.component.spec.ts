import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeEditComponent } from './user-type-edit.component';

describe('UserTypeEditComponent', () => {
  let component: UserTypeEditComponent;
  let fixture: ComponentFixture<UserTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
