import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-text-array-input',
  templateUrl: './text-array-input.component.html',
  styleUrls: ['./text-array-input.component.scss']
})
export class TextArrayInputComponent {
  @Input() label: string = '';
  @Input() controlArray: FormArray | null = null;
  @Output() valuesChanged: EventEmitter<string[]> = new EventEmitter<string[]>();

  emitValues() {
    const values = this.controlArray?.value as string[];
    this.valuesChanged.emit(values);
  }

  toFormControl(ctrl: AbstractControl): FormControl {
    return ctrl as FormControl;
  }
}
