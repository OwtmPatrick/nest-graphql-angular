import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Property, FilterPropertyInput } from 'src/entities/property/model';

@Component({
  selector: 'app-filter-prpoperties',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() onFilter!: (values: FilterPropertyInput) => void;
  @Input() onReset!: () => void;
  properties: Property[] = [];

  filterForm = new FormGroup({
    search: new FormControl<string>(''),
    wifi: new FormControl<boolean>(false),
  });

  onResetForm() {
    this.onReset();
  }

  onSubmit() {
    this.onFilter(this.filterForm.value as FilterPropertyInput);
  }
}
