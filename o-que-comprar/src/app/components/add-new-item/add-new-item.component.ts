import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-new-item.component.html',
  styleUrl: './add-new-item.component.css'
})
export class AddNewItemComponent {
  @Output() newItem = new EventEmitter<string>()
  nameControl = new FormControl('', [Validators.required])

  handleAddNewItem(event: Event) {
    event.preventDefault()
    
    if (this.nameControl.valid) {
      console.log(this.nameControl.valid)
      this.newItem.emit(this.nameControl.value as string);
      this.nameControl.reset()
    }
  }
}
