import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
 
import { HomeComponent } from './component/home/home.component';
import { ProductComponent } from './component/product/product.component';
import { HeaderComponent } from './includes/header/header.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './authentication/login/login.component';
import { LayoutComponent } from './component/layout/layout.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { AuthenticationService } from './authentication/authentication.service';
 
 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    HeaderComponent,
    LoginComponent,
    LayoutComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
