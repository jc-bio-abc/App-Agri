import { Component, ViewChild, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './core/services/auth.service';
import { ContextService } from './core/services/context.service';
import { TranslateService } from '@ngx-translate/core';

interface NavLink {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav?: MatSidenav;

  private readonly auth = inject(AuthService);
  private readonly contextService = inject(ContextService);
  private readonly translate = inject(TranslateService);

  readonly title = 'App Agricole';
  readonly user = this.auth.getCurrentUser();
  readonly context = this.contextService.getCurrentContext();

  readonly links: NavLink[] = [
    { path: 'dashboard', label: 'NAV.DASHBOARD', icon: 'dashboard' },
    { path: 'parcelles', label: 'NAV.FIELDS', icon: 'terrain' },
    { path: 'planification', label: 'NAV.PLANNING', icon: 'event' },
    { path: 'activites', label: 'NAV.ACTIVITIES', icon: 'task' },
    { path: 'entrepots', label: 'NAV.WAREHOUSES', icon: 'warehouse' },
    { path: 'produits', label: 'NAV.PRODUCTS', icon: 'local_florist' },
    { path: 'semences', label: 'NAV.SEEDS', icon: 'spa' }
  ];

  constructor() {
    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
