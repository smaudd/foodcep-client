import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesDashboardComponent } from './dishes-dashboard.component';

describe('DishesDashboardComponent', () => {
  let component: DishesDashboardComponent;
  let fixture: ComponentFixture<DishesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
