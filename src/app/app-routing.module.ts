import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
 
 
import { HomeComponent } from './component/home/home.component';
import { LayoutComponent } from './component/layout/layout.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { ProductComponent } from './component/product/product.component';
 
const routes: Routes = [ 
   {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'login', component:LoginComponent},
   /*----------After Athentication--------*/
   {
    path:'home',
    component:LayoutComponent,
   // canActivate: [AuthGuard],
    children: [
      {
        path:'',
        children: [
           {path:'',component:HomeComponent},
           {path:'product',component:ProductComponent},
           {path:"**",component:NotfoundComponent}
        ]
      }
    ]
  },
  {path:"**",component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
