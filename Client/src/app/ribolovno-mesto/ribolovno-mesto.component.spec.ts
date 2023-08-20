import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibolovnoMestoComponent } from './ribolovno-mesto.component';

describe('RibolovnoMestoComponent', () => {
  let component: RibolovnoMestoComponent;
  let fixture: ComponentFixture<RibolovnoMestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RibolovnoMestoComponent]
    });
    fixture = TestBed.createComponent(RibolovnoMestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
