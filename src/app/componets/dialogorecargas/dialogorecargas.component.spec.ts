import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogorecargasComponent } from './dialogorecargas.component';

describe('DialogorecargasComponent', () => {
  let component: DialogorecargasComponent;
  let fixture: ComponentFixture<DialogorecargasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogorecargasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogorecargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
