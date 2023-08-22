import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeRibolovnoMestoComponent } from './moje-ribolovno-mesto.component';

describe('MojeRibolovnoMestoComponent', () => {
  let component: MojeRibolovnoMestoComponent;
  let fixture: ComponentFixture<MojeRibolovnoMestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MojeRibolovnoMestoComponent]
    });
    fixture = TestBed.createComponent(MojeRibolovnoMestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
