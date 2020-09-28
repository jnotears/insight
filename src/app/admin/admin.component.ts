import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { User } from './models'

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.scss']
})
export class AdminComponent implements OnInit {
    user: User;
    dark: boolean;
    isProfileMenuOpen: boolean = false;

    constructor(
        private readonly adminService: AdminService,
        private readonly authService: AuthService,
        private readonly router: Router
    ) { 
        if(!localStorage.getItem('current_user') || !localStorage.getItem('access_token')){
            this.router.navigate(['login']);
        }
    }

    ngOnInit() {
        const username = localStorage.getItem('current_user');
        this.getUser(username);
        this.setTheme(true);
        this.dark = this.getTheme();
    }

    getUser(username: string) {
        this.adminService.getUser(username).subscribe(
            data => {
                this.user = data;
            }
        );
    }

    setTheme(value) {
        localStorage.setItem('dark', value);
    }

    getTheme() {
        if (localStorage.getItem('dark')) {
            return JSON.parse(localStorage.getItem('dark'));
        }
        return !!matchMedia && matchMedia('(prefers-color-scheme: dark)').matches
    }

    toggleTheme() {
        this.dark = !this.dark;
        this.setTheme(this.dark);
    }

    onLogout() {
        this.authService.logout();
        if (!localStorage.getItem('current_user') || !localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
    }
}