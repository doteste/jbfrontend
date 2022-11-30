import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { AuthService } from './componentes/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExtracaoComponent } from './componentes/aposta/extracao/extracao.component';
import { NumerosComponent } from './componentes/aposta/numeros/numeros.component';
import { PagamentoComponent } from './componentes/aposta/pagamento/pagamento.component';
import { PremiacaoComponent } from './componentes/aposta/premiacao/premiacao.component';
import { TipoComponent } from './componentes/aposta/tipo/tipo.component';
import { HeaderComponent } from './componentes/template/header/header.component';
import { SidenavComponent } from './componentes/template/sidenav/sidenav.component';
import { HomeComponent } from './componentes/view/home/home.component';
import { LoginComponent } from './componentes/view/login/login.component';
import { MessageService } from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExtracaoComponent,
    HomeComponent,
    TipoComponent,
    NumerosComponent,
    PremiacaoComponent,
    PagamentoComponent,
    SidenavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    CurrencyMaskModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MessagesModule,
    MessageModule
  ],
  providers: [MessageService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
