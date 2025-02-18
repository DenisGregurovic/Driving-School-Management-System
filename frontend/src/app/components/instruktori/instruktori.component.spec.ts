import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstruktoriComponent } from './instruktori.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { InstruktorService } from '../../services/instruktor.service';
import { of } from 'rxjs';
import { Instruktor } from '../../models/instruktor.model';

describe('InstruktoriComponent', () => {
  let component: InstruktoriComponent;
  let fixture: ComponentFixture<InstruktoriComponent>;
  let mockInstruktorService: jasmine.SpyObj<InstruktorService>;

  beforeEach(async () => {
    mockInstruktorService = jasmine.createSpyObj('InstruktorService', [
      'getInstruktori',
      'addInstruktor',
      'updateInstruktor',
      'deleteInstruktor',
    ]);

    await TestBed.configureTestingModule({
      declarations: [InstruktoriComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [{ provide: InstruktorService, useValue: mockInstruktorService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstruktoriComponent);
    component = fixture.componentInstance;

    // Mocking API responses
    mockInstruktorService.getInstruktori.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load instructors on init', () => {
    const mockInstructors: Instruktor[] = [
      {
        korisnik: {
          id: 1,
          ime: 'Maja',
          prezime: 'Majstorović',
          email: 'maja@example.com',
          lozinka: 'password',
          razina_prava: 'instruktor',
        },
        kategorije: ['A', 'B'],
      },
    ];
    mockInstruktorService.getInstruktori.and.returnValue(of(mockInstructors));

    component.ngOnInit();
    expect(component.instruktori).toEqual(mockInstructors);
  });

  it('should add a new instructor', () => {
    const newInstruktor: Instruktor = {
      korisnik: {
        id: 2,
        ime: 'Ivan',
        prezime: 'Horvat',
        email: 'ivan@example.com',
        lozinka: 'password',
        razina_prava: 'instruktor',
      },
      kategorije: ['C'],
    };
    mockInstruktorService.addInstruktor.and.returnValue(of(newInstruktor));

    component.newInstruktor = { ...newInstruktor };
    component.addInstruktor();

    expect(mockInstruktorService.addInstruktor).toHaveBeenCalledWith(newInstruktor);
    expect(component.instruktori).toContain(newInstruktor);
  });

  it('should update an instructor', () => {
    const updatedInstruktor: Instruktor = {
      korisnik: {
        id: 1,
        ime: 'Maja',
        prezime: 'Majstorović',
        email: 'maja@example.com',
        lozinka: 'password',
        razina_prava: 'instruktor',
      },
      kategorije: ['A', 'B', 'C'],
    };
    component.instruktori = [updatedInstruktor];
    mockInstruktorService.updateInstruktor.and.returnValue(of(updatedInstruktor));

    component.updateInstruktor(updatedInstruktor);

    expect(mockInstruktorService.updateInstruktor).toHaveBeenCalledWith(
      updatedInstruktor.korisnik.id,
      updatedInstruktor
    );
    expect(component.instruktori[0]).toEqual(updatedInstruktor);
  });

  it('should delete an instructor', () => {
    const mockInstructors: Instruktor[] = [
      {
        korisnik: {
          id: 1,
          ime: 'Maja',
          prezime: 'Majstorović',
          email: 'maja@example.com',
          lozinka: 'password',
          razina_prava: 'instruktor',
        },
        kategorije: ['A'],
      },
    ];
    component.instruktori = [...mockInstructors];
    mockInstruktorService.deleteInstruktor.and.returnValue(of(undefined));

    component.deleteInstruktor(mockInstructors[0].korisnik.id);

    expect(mockInstruktorService.deleteInstruktor).toHaveBeenCalledWith(
      mockInstructors[0].korisnik.id
    );
    expect(component.instruktori.length).toBe(0);
  });

  it('should validate an instructor', () => {
    const validInstruktor: Instruktor = {
      korisnik: {
        id: 1,
        ime: 'Maja',
        prezime: 'Majstorović',
        email: 'maja@example.com',
        lozinka: 'password',
        razina_prava: 'instruktor',
      },
      kategorije: ['A', 'B'],
    };
    const invalidInstruktor: Instruktor = {
      korisnik: {
        id: 0,
        ime: '',
        prezime: '',
        email: '',
        lozinka: '',
        razina_prava: 'instruktor',
      },
      kategorije: [],
    };

    expect(component.isValidInstruktor(validInstruktor)).toBeTrue();
    expect(component.isValidInstruktor(invalidInstruktor)).toBeFalse();
  });
});
