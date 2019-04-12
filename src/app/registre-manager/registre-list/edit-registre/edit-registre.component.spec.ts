import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegistreComponent } from './edit-registre.component';

describe('EditRegistreComponent', () => {
  let component: EditRegistreComponent;
  let fixture: ComponentFixture<EditRegistreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRegistreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
