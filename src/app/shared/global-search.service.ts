import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalSearchService {
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  getSearchTerm(): string {
    return this.searchTermSubject.value;
  }
}
