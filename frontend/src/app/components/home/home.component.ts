import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  emailForm: FormGroup;
  googleMapUrl: string;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.emailForm = this.fb.group({
      senderEmail: ['', [Validators.required, Validators.email]], // Email validacija
      subject: ['', Validators.required], // Naslov
      message: ['', Validators.required], // Poruka
    });
  // Kreiranje URL-a za Google Karte s API ključem
  this.googleMapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&q=Ul.+Ivana+Rendića,+49000,+Krapina`;
}

ngOnInit(): void {}
  

  submitForm(): void {
    if (this.emailForm.valid) {
      const formData = this.emailForm.value;

      this.http.post('http://localhost:5000/api/send-email', formData).subscribe(
        () => {
          alert('Poruka uspješno poslana!');
          this.emailForm.reset();
        },
        (error) => {
          alert('Došlo je do pogreške prilikom slanja poruke.');
          console.error(error);
        }
      );
    }
  }
}
