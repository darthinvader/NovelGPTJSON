import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  dynamicForm: FormGroup;

  constructor(private fb: FormBuilder) { this.dynamicForm = this.fb.group({}); }

  ngOnInit(): void {
    this.dynamicForm = this.createGroup({
      name: 'John',   
      description: 'Hello',
      character: { name: 'Melf', level: 1, dong: ['1', '2'] },
      Spells: ['', ''],
      Weirdness: [{ name: 'HOEEE', lvl: 3 }, { name: 'HOII', lvl: 3 }]
    });
  }


  createGroup(data: any): FormGroup {
    const group = this.fb.group({});
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        group.addControl(key, this.createArray(data[key])); // expect array of form control
      } else if (typeof data[key] === 'object') {
        group.addControl(key, this.createGroup(data[key])); // expect form group
      } else {
        group.addControl(key, this.createControl(data[key])); // expect form control
      }
    });
    return group;
  }

  createArray(data: any[]): FormArray {
    const array = this.fb.array([]);
    data.forEach(element => {
      if (Array.isArray(element)) {
        const newArray = this.createArray(element); // create new form array
        array.push(this.fb.control(newArray)); // add it as a form control
      } else if (typeof element === 'object') {
        const newGroup = this.createGroup(element); // create new form group
        array.push(this.fb.control(newGroup)); // add it as a form control
      } else {
        array.push(this.createControl(element)); // add form control directly
      }
    });
    return array;
  }



  createControl(data: any): FormControl {
    return this.fb.control(data, Validators.required);
  }

  submit(): void {
    this.dynamicForm
    console.log(this.dynamicForm);
  }
  isFormGroup(control: FormControl | FormArray | FormGroup, consoler: boolean = false): boolean {
    if (consoler) console.log('Should be group:', control)
    return control instanceof FormGroup;
  }

  isFormArray(control: FormControl | FormArray | FormGroup): boolean {
    // console.log('ISARRAY',control)
    return control instanceof FormArray;
  }

  isFormControl(control: FormControl | FormArray | FormGroup): boolean {
    return control instanceof FormControl;
  }

  getObjectKeys(item: any): string[] {
    if (!item) { return [] }
    return Object.keys(item);
  }
  getObjects(item: any): any[] {
    return Object.values(item);
  }

  getControls(name: string): AbstractControl[] {
    const group = this.dynamicForm.get(name);
    return group instanceof FormGroup ? Object.values(group.controls) : [];

  }
  getObjectEntries(item: any): { key: string, value: any }[] {
    console.log('item:', item)
    console.log("entries:", Object.entries(item).map(([key, value]) => ({ key, value })));
    return Object.entries(item).map(([key, value]) => ({ key, value }));
  }

  getControlNamesFromName(name: string): string[] {
    const group = this.dynamicForm.get(name);
    return group instanceof FormGroup ? Object.keys(group.controls) : [];
  }

  getControlNames(group: any): string[] {
    return group instanceof FormGroup ? Object.keys(group.controls) : [];
  }
  trackByFn(index: any, item: any) {
    return item.key; // unique id corresponding to the item
  }

}