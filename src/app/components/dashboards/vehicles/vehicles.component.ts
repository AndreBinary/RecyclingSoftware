
@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    NgClass,
    DecimalPipe,
    NgbDropdownModule,
    NgbPaginationModule,
    NgApexchartsModule
  ],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})

  }
}