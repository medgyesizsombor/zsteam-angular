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
import { LoginGuard } from './shared/guards/login.guard';
import { urls } from './shared/urls';
import { ProductComponent } from './pages/product/product.component';
import { UserComponent } from './pages/user/user.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: urls.PRODUCTS,
    pathMatch: 'full'
  },
  {
    path: urls.PRODUCTS,
    component: ProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: urls.ADMIN,
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: urls.PRODUCT,
    component: ProductComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: urls.NOT_FOUND,
    component: NotFoundComponent,
    canActivate: [AuthGuard]
  },
  {
    path: urls.GAMES,
    component: GamesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: urls.DECKS,
    component: DecksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: urls.USERS,
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: urls.USER,
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: urls.USER_DETAIL,
    component: UserDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: urls.PRODUCT_DETAIL,
    component: ProductDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: urls.LOGIN,
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: urls.REGIST,
    component: RegistComponent,
    canActivate: [LoginGuard]
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
