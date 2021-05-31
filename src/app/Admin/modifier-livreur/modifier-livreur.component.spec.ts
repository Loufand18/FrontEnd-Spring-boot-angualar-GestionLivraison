import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierLivreurComponent } from './modifier-livreur.component';

describe('ModifierLivreurComponent', () => {
  let component: ModifierLivreurComponent;
  let fixture: ComponentFixture<ModifierLivreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierLivreurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
