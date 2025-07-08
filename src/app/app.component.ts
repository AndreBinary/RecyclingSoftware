import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStateService } from './shared/services/app-state.service';
import { GlobalSearchService } from './shared/global-search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Mamix';
  globalSearchTerm = '';

  constructor(private appState: AppStateService, private globalSearch: GlobalSearchService) {
    this.appState.updateState();
  }

  onGlobalSearchChange(term: string) {
    this.globalSearch.setSearchTerm(term);
  }
}
