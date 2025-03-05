import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { GlowingEffectDirective } from '../directives/glowing-effect.directive';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    GlowingEffectDirective
  ],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  contactForm: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }



  get formControls() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    // Handle form submission
    console.log('Form submitted', this.contactForm.value);
  }
}
