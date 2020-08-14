import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreTestComponent } from './nombre-test.component';

describe('NombreTestComponent', () => {
  let component: NombreTestComponent;
  let fixture: ComponentFixture<NombreTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombreTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
