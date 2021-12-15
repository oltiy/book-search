import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { UserNameGuardGuard } from './user-name-guard.guard';
import { WishListComponent } from './wish-list/wish-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [UserNameGuardGuard],
  },
  {
    path: 'wish',
    component: WishListComponent,
    canActivate: [UserNameGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
