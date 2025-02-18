export interface Rezervacija {
  id: number; // ID rezervacije
  korisnik: {
    id: number;
    ime: string;
    prezime: string;
    email: string;
    lozinka: string;
    razina_prava: string;
  }; // Korisnik povezan s rezervacijom
  instruktor: {
    id: number;
    korisnik: {
      id: number;
      ime: string;
      prezime: string;
      email: string;
      lozinka: string;
      razina_prava: string;
    };
    kategorije: string[];
  }; // Instruktor povezan s rezervacijom
  usluga: {
    id: number;
    ime: string;
    opis: string;
    cijena: number;
  }; // Usluga povezana s rezervacijom
  datum: Date; // Datum rezervacije
  isEditing?: boolean; // Koristi se za uređivanje na frontendu
  backup?: Rezervacija; // Backup for editing
}
