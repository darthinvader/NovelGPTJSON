import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  @Input() providedJSON?: JSON
  @Input() title?: string
  dynamicForm: FormGroup;
  faCoffee = faCoffee
  constructor(private fb: FormBuilder) { this.dynamicForm = this.fb.group({}); }

  ngOnInit(): void {
    this.dynamicForm = this.createGroup(this.providedJSON);
    delete this.dynamicForm.controls['default'];

    // Check if there's form data in localStorage
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      // If found, populate the form
      this.updateForm(this.dynamicForm, JSON.parse(storedFormData));
    }

    // Subscribe to form changes
    this.dynamicForm.valueChanges.subscribe(value => {
      // Save form data to localStorage
      localStorage.setItem('formData', JSON.stringify(value));
    });
  }

  // Define a property to keep track of toggled fields
  toggledFields: { [key: string]: boolean } = {};

  // Define a function to toggle the input type
  toggleInputType(controlName: string): void {
    this.toggledFields[controlName] = !this.toggledFields[controlName];
  }

  // Define a function to determine whether the textarea should be shown
  isTextarea(controlName: string): boolean {
    return this.toggledFields[controlName];
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
        array.push(this.createArray(element) as unknown as FormControl); // directly add it
      } else if (typeof element === 'object') {
        array.push(this.createGroup(element) as unknown as FormControl); // directly add it
      } else {
        array.push(this.createControl(element)); // add form control directly
      }
    });
    return array;
  }

  deepCloneControl(control: AbstractControl): AbstractControl {
    if (control instanceof FormControl) {
      return new FormControl(control.value);
    } else if (control instanceof FormGroup) {
      const copy: { [key: string]: AbstractControl } = {}; // Explicit typing
      Object.keys(control.controls).forEach(key => {
        copy[key] = this.deepCloneControl(control.controls[key]);
      });
      return new FormGroup(copy);
    } else if (control instanceof FormArray) {
      return new FormArray(control.controls.map(ctrl => this.deepCloneControl(ctrl)));
    } else {
      throw new Error(`Unknown form control class: ${control.constructor.name}`);
    }
  }

  addToArray(controlArray: FormArray) {
    if (controlArray.controls.length > 0) {
      const clone = this.deepCloneControl(controlArray.at(0));
      clone.reset();
      controlArray.push(clone);
    }
  }

  createControl(data: any): FormControl {
    return this.fb.control(data, Validators.required);
  }
  submit(): void {
    const formValues = this.removeEmptyFields(this.dynamicForm.value);
    const jsonData = JSON.stringify(formValues, null, 2); // Prettify JSON string
    const blob = new Blob([jsonData], { type: 'text/json;charset=utf-8' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    // Extract a name for the file from the form data or use the title
    console.log('form Values:', formValues)
    const name = (formValues['Scene Name'] || formValues['Chapter']?.['Name'] || formValues['Name'] || formValues['Book Title'] || this.title || 'file') + '.json';
    link.download = name; // You can name the file whatever you want
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Trigger the download
    document.body.removeChild(link); // Remove the link from the body
    URL.revokeObjectURL(href); // Clean up
  }


  // In your component class, add a method to handle the file input
  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files.item(0);
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const content = event.target.result;
      const parsedJson = JSON.parse(content);

      // Now, update the form using this parsed JSON
      this.updateForm(this.dynamicForm, parsedJson);
    };

    if (file) {
      reader.readAsText(file);
    }
  }

  // Add a recursive method to update the form
  updateForm(control: AbstractControl, data: any): void {
    if (control instanceof FormGroup) {
      for (const controlName in control.controls) {
        if (control.controls.hasOwnProperty(controlName) && data.hasOwnProperty(controlName)) {
          this.updateForm(control.controls[controlName], data[controlName]);
        }
      }
    } else if (control instanceof FormArray) {
      // First, clear the existing FormArray
      while (control.length) {
        control.removeAt(0);
      }
      // Now, iterate through the provided data array
      data.forEach((element: any, index: number) => {
        if (Array.isArray(element)) {
          control.push(this.createArray(element) as unknown as FormControl);
        } else if (typeof element === 'object') {
          control.push(this.createGroup(element) as unknown as FormControl);
        } else {
          control.push(this.createControl(element));
        }
        // Update the newly created control with the corresponding data
        this.updateForm(control.at(index), element);
      });
    } else if (control instanceof FormControl && data !== null && data !== undefined) {
      control.setValue(data);
    }
  }

  removeEmptyFields(data: any): any {
    if (typeof data !== 'object') return data;

    // First, iterate through child properties
    for (const key in data) {
      if (typeof data[key] === 'object') {
        data[key] = this.removeEmptyFields(data[key]);
      }
    }

    // Next, check if any properties should be deleted
    for (const key in data) {
      if (data[key] === null || data[key] === '' || (Array.isArray(data[key]) && data[key].length === 0) || (typeof data[key] === 'object' && Object.keys(data[key]).length === 0)) {
        delete data[key];
      }
    }

    return data;
  }

  isFormGroup(control: FormControl | FormArray | FormGroup): boolean {
    return control instanceof FormGroup;
  }

  isFormArray(control: FormControl | FormArray | FormGroup): boolean {
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