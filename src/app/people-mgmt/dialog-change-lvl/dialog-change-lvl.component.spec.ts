import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeLvlComponent } from './dialog-change-lvl.component';

describe('DialogChangeLvlComponent', () => {
  let component: DialogChangeLvlComponent;
  let fixture: ComponentFixture<DialogChangeLvlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChangeLvlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChangeLvlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
