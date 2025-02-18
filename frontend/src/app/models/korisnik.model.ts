export interface Korisnik {
    id: number;
    ime: string;
    prezime: string;
    email: string;
    lozinka: string; 
    razina_prava: 'admin' | 'korisnik' | 'instruktor';
    isEditing?: boolean;
  }
  