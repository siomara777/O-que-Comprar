import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddNewItemComponent } from "./add-new-item/add-new-item.component";
import { ShoppingListItemComponent } from "./shopping-list-item/shopping-list-item.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddNewItemComponent, ShoppingListItemComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items = Array<{ itemName: string, isBought: boolean }>();

  // ngOnInit() {
  //   const items = localStorage.getItem('items');

  //   if (items) {
  //     this.items = JSON.parse(items);
  //   }
  // }
  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('yourKey');
      // faça algo com 'data'
    } else {
      console.warn('localStorage is not available.');
    }
  }
  
  addNewItem(itemName: string) {
    this.items.push({
      itemName,
      isBought: false,
    });
    this.sortItems();
    this.saveItems();
  }
  
  handleUpdateName(id: number, itemName: string) {
    this.items[id].itemName = itemName;
    this.saveItems();
  }
  
  handleToggleBought(id: number, isBought: boolean) {
    this.items[id].isBought = isBought;
    this.sortItems();
    this.saveItems();
  }
  
  handleDeleteItem(id: number) {
    this.items.splice(id, 1);
    this.sortItems();
    this.saveItems();
  }
  
  sortItems() {
    this.items.sort((a, b) => a.isBought === b.isBought ? 0 : a.isBought ? 1 : -1);
  }

  saveItems() {
    localStorage.setItem('items', JSON.stringify(this.items));
  }
}
