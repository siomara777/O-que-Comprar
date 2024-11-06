import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-list-item.component.html',
  styleUrl: './shopping-list-item.component.css'
})
export class ShoppingListItemComponent {
  @Input({required: true}) itemName!: string;
  @Input({required: true}) isBought!: boolean;
  @Output() updateName = new EventEmitter<string>();
  @Output() toggleBought = new EventEmitter<boolean>();
  @Output() deleteItem = new EventEmitter<void>();

  handleUpdateName (event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      this.updateName.emit(inputElement.value);
    } else {
      inputElement.value = this.itemName;
    }
  }

  handleToggleBought () {
    this.toggleBought.emit(!this.isBought);
  }

  handleDelete () {
    this.deleteItem.emit();
  }
}
