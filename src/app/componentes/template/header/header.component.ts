import { ExtracaoService } from './../../services/extracao.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;
  isExtracaoIn$!: Observable<boolean>;

  constructor(private loginService: AuthService,
    private extracaoService: ExtracaoService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
    this.isExtracaoIn$ = this.extracaoService.isExtracaoIn;
  }

}
