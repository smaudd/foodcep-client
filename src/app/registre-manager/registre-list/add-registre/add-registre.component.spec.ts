import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegistreComponent } from './add-registre.component';

describe('AddRegistreComponent', () => {
  let component: AddRegistreComponent;
  let fixture: ComponentFixture<AddRegistreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRegistreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
