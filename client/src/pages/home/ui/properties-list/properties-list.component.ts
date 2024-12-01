import { Component, Input } from '@angular/core';
import { Property } from 'src/entities/property/model';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss'],
})
export class PropertiesListComponent {
  @Input() properties!: Property[];
}
