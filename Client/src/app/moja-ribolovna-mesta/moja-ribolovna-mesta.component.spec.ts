import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojaRibolovnaMestaComponent } from './moja-ribolovna-mesta.component';

describe('MojaRibolovnaMestaComponent', () => {
  let component: MojaRibolovnaMestaComponent;
  let fixture: ComponentFixture<MojaRibolovnaMestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MojaRibolovnaMestaComponent]
    });
    fixture = TestBed.createComponent(MojaRibolovnaMestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
