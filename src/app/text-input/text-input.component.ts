import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl('');
  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();

  emitValue() {
    this.valueChanged.emit(this.control.value);
  }
}
