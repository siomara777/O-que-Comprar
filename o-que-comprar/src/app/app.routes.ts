import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ShoppingListComponent } from './views/shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

import { loginGuard } from './guards/login.guard';
import { childRoutesGuard } from './guards/child-routes.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: 'shopping-list/:id',
        component: ShoppingListComponent,
        canActivate: [loginGuard, childRoutesGuard],
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
