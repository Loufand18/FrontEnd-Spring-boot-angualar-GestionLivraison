import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoterLivreurComponent } from './noter-livreur.component';

describe('NoterLivreurComponent', () => {
  let component: NoterLivreurComponent;
  let fixture: ComponentFixture<NoterLivreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoterLivreurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoterLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
