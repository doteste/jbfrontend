import { AuthGuard } from './componentes/view/auth.guard';
import { LoginComponent } from './componentes/view/login/login.component';
import { PagamentoComponent } from './componentes/aposta/pagamento/pagamento.component';
import { PremiacaoComponent } from './componentes/aposta/premiacao/premiacao.component';
import { NumerosComponent } from './componentes/aposta/numeros/numeros.component';
import { TipoComponent } from './componentes/aposta/tipo/tipo.component';
import { ExtracaoComponent } from './componentes/aposta/extracao/extracao.component';
import { HomeComponent } from './componentes/view/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "aposta/extracoes",
    component: ExtracaoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "aposta/tipo/:id-extracao",
    component: TipoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "aposta/numeros",
    component: NumerosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "aposta/premiacao",
    component: PremiacaoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "aposta/pagamento",
    component: PagamentoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "aposta/login",
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
