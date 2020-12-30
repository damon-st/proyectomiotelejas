import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarunoComponent } from './compraruno.component';

describe('ComprarunoComponent', () => {
  let component: ComprarunoComponent;
  let fixture: ComponentFixture<ComprarunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprarunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprarunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
