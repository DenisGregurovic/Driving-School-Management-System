import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KorisniciComponent } from './korisnici.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { KorisniciService } from '../../services/korisnici.service';
import { of } from 'rxjs';
import { Korisnik } from '../../models/korisnik.model';

describe('KorisniciComponent', () => {
  let component: KorisniciComponent;
  let fixture: ComponentFixture<KorisniciComponent>;
  let mockKorisniciService: jasmine.SpyObj<KorisniciService>;

  beforeEach(async () => {
    mockKorisniciService = jasmine.createSpyObj('KorisniciService', [
      'getKorisnici',
      'addKorisnik',
      'updateKorisnik',
      'deleteKorisnik',
    ]);

    await TestBed.configureTestingModule({
      declarations: [KorisniciComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [{ provide: KorisniciService, useValue: mockKorisniciService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisniciComponent);
    component = fixture.componentInstance;

    mockKorisniciService.getKorisnici.and.returnValue(of([])); // Prazna lista korisnika
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email format correctly', () => {
    expect(component.isValidEmail('test@example.com')).toBeTrue();
    expect(component.isValidEmail('invalid-email')).toBeFalse();
  });

  it('should not allow adding a user with invalid email', () => {
    component.newKorisnik.email = 'invalid-email';
    expect(component.isValidUser(component.newKorisnik)).toBeFalse();
  });

  it('should add a new user', () => {
    const newUser: Korisnik = {
      id: 1,
      ime: 'Test',
      prezime: 'User',
      email: 'test@user.com',
      lozinka: 'password',
      razina_prava: 'korisnik',
    };

    mockKorisniciService.addKorisnik.and.returnValue(of(newUser));

    component.newKorisnik = { ...newUser };
    component.addKorisnik();

    expect(mockKorisniciService.addKorisnik).toHaveBeenCalledWith(newUser);
    expect(component.korisnici).toContain(newUser);
  });

  it('should update a user with valid email', () => {
    const updatedUser: Korisnik = {
      id: 1,
      ime: 'Updated',
      prezime: 'User',
      email: 'updated@user.com',
      lozinka: 'newpassword',
      razina_prava: 'admin',
    };

    component.korisnici = [updatedUser];
    mockKorisniciService.updateKorisnik.and.returnValue(of(updatedUser));

    component.updateKorisnik(updatedUser);

    expect(mockKorisniciService.updateKorisnik).toHaveBeenCalledWith(updatedUser.id, updatedUser);
    expect(component.korisnici[0]).toEqual(updatedUser);
  });
});
