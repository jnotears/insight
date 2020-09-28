import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class AuthModule { }