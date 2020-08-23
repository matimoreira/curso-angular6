import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDestinoComponent } from './nuevo-destino.component';

describe('NuevoDestinoComponent', () => {
  let component: NuevoDestinoComponent;
  let fixture: ComponentFixture<NuevoDestinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoDestinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
