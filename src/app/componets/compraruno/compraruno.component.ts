import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  NgControl,
  FormBuilder,
} from '@angular/forms';
import { FormularioModel } from '../../model/formulario';
import { ServicemainService } from '../../services/servicemain.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearcuentaComponent } from '../crearcuenta/crearcuenta.component';
import { DialogorecargasComponent } from '../dialogorecargas/dialogorecargas.component';

import swal from 'sweetalert';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { ChipCompraFormulario } from '../../model/chip.interface';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';

@Component({
  selector: 'app-compraruno',
  templateUrl: './compraruno.component.html',
  styleUrls: ['./compraruno.component.css'],
})
export class ComprarunoComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  stripeTest: FormGroup;

  formularioModel: FormularioModel;

  poderSubir: boolean;

  isLogin;

 public isCheckout;
  isSend;

  porcentage: number;

  controlGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    texto: new FormControl('', [Validators.required, Validators.minLength(1)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone: new FormControl(''),
  });

  controlChip = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.min(10)]),
    chip: new FormControl('', Validators.required),
    recaptcha: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  siteKey: string;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  ref: any;
  valor;
  uid: string;

  @ViewChild('imageFiles') imageFiles: ElementRef;

  constructor(
    private serviceMain: ServicemainService,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {
    this.siteKey = '6Le0xeIZAAAAAO3GTJ-C09tJkAb0Hj6F8bYRuzEu';
  }

  ngOnInit(): void {
    this.authService.isAuth().subscribe(
      (auth) => {
        if (auth) {
          this.uid = auth.uid;
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getErrorMessage() {
    if (this.controlGroup.controls.texto.hasError('required')) {
      return 'Debes escribir el correo';
    }

    return this.controlGroup.controls.texto.hasError('email')
      ? 'No es un correo valido'
      : '';
  }

  enviarFormulario(form: FormularioModel) {
    this.isSend = true;
    form.pathsArchivos = this.imageFiles.nativeElement.value;
    const dates = new Date();
    form.uid = this.uid;
    form.date = dates.toLocaleDateString();
    form.time = dates.toLocaleTimeString();
    this.serviceMain
      .enviarFormulario(form)
      .then((value) => {
        this.isSend = false;
        this.controlGroup.reset();
        this.imageFiles.nativeElement.value = '';
        swal(
          'Exito',
          'Se a enviado con exito tus archivos por favor espera nuestra respuesta a tu correo electonico' +
            ' o numero telefonico Puedes escribirnos atravez de Whatsapp para mayor informacion. ',
          'success'
        );
      })
      .catch((err) => {
        // console.log(err);

        swal(err, 'error');
      });
  }

  nandleImage(e) {

    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const size = file.size;

    // console.log(size);

    if (size <= 1501381) {
      this.porcentage = 10;
      console.log('entro para enviar');
      const filePath = `Product Images/${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      this.uploadPercent = task.percentageChanges();

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.urlImage = ref.getDownloadURL();
            this.porcentage = 100;
          })
        )
        .subscribe();
    } else {
      swal(
        'Lo sentimos',
        'No puedes subir un archivo con un peso de mayor a 1mb por favor escribenos por via WhatsApp',
        'error'
      );
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CrearcuentaComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`DIalog result ${result}`);
    });
  }

  logout() {
    this.authService.logout();
  }

  openDialogRecargas(categoria) {
    const dialoRef = this.dialog.open(DialogorecargasComponent, {
      data: { categoria },
    });
  }

  createToken(valor: ChipCompraFormulario): void {
    const dates = new Date();

    valor.date = dates.toLocaleDateString();
    valor.time = dates.toLocaleTimeString();
    // console.log(valor.date);

    this.isCheckout = true;
    const name = valor.email;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          // console.log(result.token);
          valor.stripeToken = result.token.id;
          valor.descripcion = valor.chip;
          valor.uid = this.uid;
          switch (valor.chip) {
            case 'claro':
              valor.price = 400;
              break;
            case 'movistar':
              valor.price = 300;
              break;
            case 'tuenti':
              valor.price = 400;
              break;
            case 'cnt':
              valor.price = 400;
              break;
          }

          this.crearVenta(valor);
        } else if (result.error) {
          // Error creating the token
          // console.log(result.error.message);
          swal(result.error.message, 'error');
        }
      });
  }

  crearVenta(venta: ChipCompraFormulario) {
    this.serviceMain.crearCompra(venta).subscribe(
      (res) => {
        if (res.status === 'success') {
          venta.id = res.id;
          venta.paid = res.paid;
          this.addBaseData(venta);
        }
      },
      (err) => {
        // console.log(err);
        swal(err, 'error');
      }
    );
  }

  addBaseData(venta: ChipCompraFormulario) {
    // console.log(venta);
    this.serviceMain
      .enviarCompraBD(venta)
      .then((res) => {
        this.isCheckout = false;
        this.controlChip.reset();
        swal(
          'Exito en tu compra de tu chip',
          `Pronto un encargado se dirijira a tu domicilio a entregar tu nuevo chip ${venta.chip}`,
          'success'
        );
      })
      .catch((err) => {
        // console.log(err);
        swal(err, 'error');
      });
  }
}
