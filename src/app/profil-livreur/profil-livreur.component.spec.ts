import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilLivreurComponent } from './profil-livreur.component';

describe('ProfilLivreurComponent', () => {
  let component: ProfilLivreurComponent;
  let fixture: ComponentFixture<ProfilLivreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilLivreurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
