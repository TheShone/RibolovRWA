import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibolovnaMestaComponent } from './ribolovna-mesta.component';

describe('RibolovnaMestaComponent', () => {
  let component: RibolovnaMestaComponent;
  let fixture: ComponentFixture<RibolovnaMestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RibolovnaMestaComponent]
    });
    fixture = TestBed.createComponent(RibolovnaMestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
