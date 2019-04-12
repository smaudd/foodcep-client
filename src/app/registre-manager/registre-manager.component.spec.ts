import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistreManagerComponent } from './registre-manager.component';

describe('RegistreManagerComponent', () => {
  let component: RegistreManagerComponent;
  let fixture: ComponentFixture<RegistreManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistreManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistreManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
