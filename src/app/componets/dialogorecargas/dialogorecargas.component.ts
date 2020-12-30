import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComprarunoComponent } from '../compraruno/compraruno.component';

export interface NombresOperadoras {
  categoria: string;
}

@Component({
  selector: 'app-dialogorecargas',
  templateUrl: './dialogorecargas.component.html',
  styleUrls: ['./dialogorecargas.component.css'],
})
export class DialogorecargasComponent implements OnInit {
  public urlCargar: string;

  constructor(
    private dialogRef: MatDialogRef<DialogorecargasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NombresOperadoras
  ) {}

  ngOnInit(): void {
    console.log(this.data.categoria);
    switch (this.data.categoria) {
      case 'Movi':
        this.urlCargar = 'https://firebasestorage.googleapis.com/v0/b/booksotore-3c766.appspot.com/o/movi.jpg?alt=media&token=893df01a-35dd-4c36-a083-c51d6c6e8324';
        break;
      case 'Claro':
        this.urlCargar = 'https://firebasestorage.googleapis.com/v0/b/booksotore-3c766.appspot.com/o/claro.PNG?alt=media&token=f8393e64-419c-4cd1-96e1-4d4927ef79d5';
        break;
      case 'Tuenti':
        this.urlCargar = 'https://firebasestorage.googleapis.com/v0/b/booksotore-3c766.appspot.com/o/tuenti.jpg?alt=media&token=e3a5fe8d-8491-4c79-9508-097cadc99c36';
        break;
      case 'Cnt':
        this.urlCargar = 'https://firebasestorage.googleapis.com/v0/b/booksotore-3c766.appspot.com/o/cnt.jpg?alt=media&token=53de513a-3e06-4d38-9e7b-91c9a04aad23';
        break;
    }
  }
}
