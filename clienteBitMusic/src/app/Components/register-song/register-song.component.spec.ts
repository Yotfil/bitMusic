import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSongComponent } from './register-song.component';

describe('RegisterSongComponent', () => {
  let component: RegisterSongComponent;
  let fixture: ComponentFixture<RegisterSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
