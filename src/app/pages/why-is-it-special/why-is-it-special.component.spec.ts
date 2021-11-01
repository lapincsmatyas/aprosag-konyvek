import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyIsItSpecialComponent } from './why-is-it-special.component';

describe('WhyIsItSpecialComponent', () => {
  let component: WhyIsItSpecialComponent;
  let fixture: ComponentFixture<WhyIsItSpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyIsItSpecialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyIsItSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
