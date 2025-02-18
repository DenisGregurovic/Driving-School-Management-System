import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KategorijeComponent } from './kategorije.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('KategorijeComponent', () => {
  let component: KategorijeComponent;
  let fixture: ComponentFixture<KategorijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KategorijeComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KategorijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories', () => {
    component.loadKategorije();
    expect(component.kategorije).toBeDefined();
  });

  it('should add a new category', () => {
    const newCategory = { id: 1, ime: 'Test', opis: 'Test opis' };
    component.kategorije.push(newCategory);
    expect(component.kategorije.length).toBeGreaterThan(0);
  });
});
