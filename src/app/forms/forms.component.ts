import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  // @Input() providedJSON: JSON
  dynamicForm: FormGroup;

  constructor(private fb: FormBuilder) { this.dynamicForm = this.fb.group({}); }

  ngOnInit(): void {
    this.dynamicForm = this.createGroup({
      "Book Title": "",
      "Author": "",
      "Mood": "",
      "Themes": [""],
      "Narrative Devices": [""],
      "Imagery": [""],
      "Setting": {
        "Time": "",
        "Place": {
          "Name": "",
          "Description": "",
          "Brief_history": ""
        }
      },
      "Plot": {
        "Plot Structure": "",
        "Conflict Details": {
          "Origin": "",
          "Escalation": "",
          "Resolution": ""
        },
        "Subplots": [
          {
            "Description": "",
            "Resolution": ""
          }
        ],
        "Major Events": [
          {
            "Description": "",
            "Impact": ""
          }
        ],
        "Beginning scenes": [
          {
            "Description": "",
            "Cause": "",
            "Effect": ""
          }
        ],
        "Middle_scenes": [
          {
            "Description": "",
            "Cause": "",
            "Effect": ""
          }
        ],
        "End Scenes": [
          {
            "Description": "",
            "Cause": "",
            "Effect": ""
          }
        ],
        "Plot Twists": [
          {
            "Description": "",
            "Impact": ""
          }
        ]
      },
      "Settings Details": {
        "Notable Places": [
          {
            "Name": "",
            "Description": ""
          }
        ],
        "Significant Structures": [
          {
            "Name": "",
            "Description": ""
          }
        ],
        "Species": [
          {
            "Species Name": "",
            "Description": "",
            "Realtionship With Other Races": ""
          }
        ],
        "Languages": [
          {
            "Name": "",
            "Description": ""
          }
        ],
        "Key items": [
          {
            "Item Name": "",
            "Description": "",
            "Significance": ""
          }
        ]
      },
      "characters": [
        {
          "Name": "",
          "Role": "",
          "Background": "",
          "Personality": "",
          "Goal": "",
          "Conflicts": "",
          "Relationships": [{ "Name": "", "Description": "" }],
          "Motivations": "",
          "Fears": "",
          "Character Arc": ""
        }
      ],
      "inspirations": {
        "literature_inspirations": [""],
        "real_world_inspirations": [""]
      }
    }

    );
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
    this.dynamicForm
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