export interface Instruktor {
  id?: number; // ID instruktora
  korisnik: {
    id: number;
    ime: string;
    prezime: string;
    email: string;
    lozinka: string;
    razina_prava: string;
  }; // Korisnik objekt
  kategorije: string[];
  isEditing?: boolean;
}
