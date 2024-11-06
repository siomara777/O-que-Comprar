import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingListItem } from '../../types/shopping-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'http://localhost:3000/items';

  constructor(private httpClient: HttpClient) { }

  getItems() {
    return this.httpClient.get<ShoppingListItem[]>(this.apiUrl);
  }

  getItem(id: number) {
    return this.httpClient.get<ShoppingListItem>(`${this.apiUrl}/${id}`)
  }

  getItemsByUserId(userId: string) {
    return this.httpClient.get<ShoppingListItem[]>(`${this.apiUrl}?userId=${userId}`);
  }

  createItem(item: Omit<ShoppingListItem, 'id'>) {
    return this.httpClient.post<ShoppingListItem>(this.apiUrl, item);
  }

  updateItem(item: ShoppingListItem) {
    return this.httpClient.patch<ShoppingListItem>(`${this.apiUrl}/${item.id}`, item);
  }

  deleteItem(id: number) {
    return this.httpClient.delete<ShoppingListItem>(`${this.apiUrl}/${id}`);
  }
}
