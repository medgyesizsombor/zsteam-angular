import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecksComponent } from './pages/decks/decks.component';
import { GamesComponent } from './pages/games/games.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductsComponent } from './pages/products/products.component';
import { RegistComponent } from './pages/regist/regist.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { urls } from './shared/urls';

const routes: Routes = [
  {
    path: '',
    redirectTo: urls.PRODUCTS,
    pathMatch: 'full'
  },
  {
    path: urls.PRODUCTS,
    component: ProductsComponent
  },
  {
    path: urls.NOT_FOUND,
    component: NotFoundComponent
  },
  {
    path: urls.PRODUCTS,
    component: ProductsComponent
  },
  {
    path: urls.GAMES,
    component: GamesComponent
  },
  {
    path: urls.DECKS,
    component: DecksComponent
  },
  {
    path: urls.USERS,
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: urls.LOGIN,
    component: LoginComponent
  },
  {
    path: urls.REGIST,
    component: RegistComponent
  },
  {
    path: '**',
    redirectTo: urls.NOT_FOUND,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
