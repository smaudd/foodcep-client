import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesManagerComponent } from './dishes-manager.component';

describe('DishCreatorComponent', () => {
  let component: DishesManagerComponent;
  let fixture: ComponentFixture<DishesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
