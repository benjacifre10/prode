import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTokenEditComponent } from './user-token-edit.component';

describe('UserTokenEditComponent', () => {
  let component: UserTokenEditComponent;
  let fixture: ComponentFixture<UserTokenEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTokenEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTokenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
