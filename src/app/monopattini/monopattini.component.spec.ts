import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonopattiniComponent } from './monopattini.component';

describe('MonopattiniComponent', () => {
  let component: MonopattiniComponent;
  let fixture: ComponentFixture<MonopattiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonopattiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonopattiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
