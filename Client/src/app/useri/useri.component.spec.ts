import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseriComponent } from './useri.component';

describe('UseriComponent', () => {
  let component: UseriComponent;
  let fixture: ComponentFixture<UseriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UseriComponent]
    });
    fixture = TestBed.createComponent(UseriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
