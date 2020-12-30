import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './componets/aboutus/aboutus.component';
import { ComprarunoComponent } from './componets/compraruno/compraruno.component';
import { AuthGuard } from './guards/auth.guard';




const routes: Routes = [
  {path: '', component: AboutusComponent },
  {path: 'home', component : AboutusComponent},
  {path: 'compra', component: ComprarunoComponent},
  {path: '**', component: AboutusComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
