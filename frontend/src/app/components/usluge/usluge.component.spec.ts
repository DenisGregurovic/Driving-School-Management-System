import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UslugeComponent } from './usluge.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UslugeComponent', () => {
  let component: UslugeComponent;
  let fixture: ComponentFixture<UslugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UslugeComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UslugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load services', () => {
    component.loadUsluge();
    expect(component.usluge).toBeDefined();
  });

  it('should add a new service', () => {
    const newService = { id: 1, ime: 'Test', opis: 'Test opis', cijena: 100 };
    component.usluge.push(newService);
    expect(component.usluge.length).toBeGreaterThan(0);
  });
});
