import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path : '' , component : PostListComponent },
  { path : 'edit-post/:id' , component : CreatePostComponent,canActivate:[AuthGuard] },
  { path : 'create-post' , component : CreatePostComponent,canActivate:[AuthGuard] },
  { path : 'login' , component : LoginComponent },
  { path : 'signup' , component : SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGuard]
})
export class AppRoutingModule { }
