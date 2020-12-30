import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalvestodoaquiComponent } from './talvestodoaqui.component';

describe('TalvestodoaquiComponent', () => {
  let component: TalvestodoaquiComponent;
  let fixture: ComponentFixture<TalvestodoaquiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalvestodoaquiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalvestodoaquiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
