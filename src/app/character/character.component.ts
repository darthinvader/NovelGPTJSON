import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  characterForm: FormGroup = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      background: ['', Validators.required],
      personality: ['', Validators.required],
      goals: this.fb.array([this.fb.control('')]),
      conflicts: this.fb.array([this.fb.control('')]),
      relationships: this.fb.array([this.createRelationship()]),
      motivations: this.fb.array([this.fb.control('')]),
      fears: this.fb.array([this.fb.control('')]),
      character_arc: ['', Validators.required]
    });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      background: ['', Validators.required],
      personality: ['', Validators.required],
      goals: this.fb.array([this.fb.control('')]),
      conflicts: this.fb.array([this.fb.control('')]),
      relationships: this.fb.array([this.createRelationship()]),
      motivations: this.fb.array([this.fb.control('')]),
      fears: this.fb.array([this.fb.control('')]),
      character_arc: ['', Validators.required]
    });
  }

  createRelationship(): FormGroup {
    return this.fb.group({
      name: '',
      relationship: '',
    });
  }

  get goals() {
    return this.characterForm.get('goals') as FormArray;
  }

  get conflicts() {
    return this.characterForm.get('conflicts') as FormArray;
  }

  get relationships() {
    return this.characterForm.get('relationships') as FormArray;
  }

  get motivations() {
    return this.characterForm.get('motivations') as FormArray;
  }

  get fears() {
    return this.characterForm.get('fears') as FormArray;
  }

  addGoal(): void {
    this.goals.push(this.fb.control(''));
  }

  addConflict(): void {
    this.conflicts.push(this.fb.control(''));
  }

  addRelationship(): void {
    this.relationships.push(this.createRelationship());
  }

  addMotivation(): void {
    this.motivations.push(this.fb.control(''));
  }

  addFear(): void {
    this.fears.push(this.fb.control(''));
  }

  onSubmit(): void {
    console.log(this.characterForm.value);
  }
}