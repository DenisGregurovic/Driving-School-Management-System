import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorijeUsersComponent } from './kategorije-users.component';

describe('KategorijeUsersComponent', () => {
  let component: KategorijeUsersComponent;
  let fixture: ComponentFixture<KategorijeUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KategorijeUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KategorijeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
