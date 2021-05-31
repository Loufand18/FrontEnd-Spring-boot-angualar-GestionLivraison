import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutlivreurComponent } from './ajoutlivreur.component';

describe('AjoutlivreurComponent', () => {
  let component: AjoutlivreurComponent;
  let fixture: ComponentFixture<AjoutlivreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutlivreurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutlivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
