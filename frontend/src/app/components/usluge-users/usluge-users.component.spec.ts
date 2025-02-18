import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UslugeReadOnlyComponent } from './usluge-users.component';

describe('UslugeUsersComponent', () => {
  let component: UslugeReadOnlyComponent;
  let fixture: ComponentFixture<UslugeReadOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UslugeReadOnlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UslugeReadOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
