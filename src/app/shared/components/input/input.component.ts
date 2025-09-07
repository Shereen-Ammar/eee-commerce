import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() control: any;
  @Input() typeInput: any;
  @Input() idInput: any;
  @Input() element: string = 'input'
  @Input() labelInput: any;
  flag: boolean = true;

}
