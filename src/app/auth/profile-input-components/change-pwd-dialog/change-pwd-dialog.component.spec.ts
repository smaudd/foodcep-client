import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePwdDialogComponent } from './change-pwd-dialog.component';

describe('ChangePwdDialogComponent', () => {
  let component: ChangePwdDialogComponent;
  let fixture: ComponentFixture<ChangePwdDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePwdDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePwdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
