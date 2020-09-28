import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public hostUrl = 'http://localhost:3000';
    authUrl = 'http://localhost:3000/api.github/login';
    feature = "resizable=yes,scrollbars=yes,toolbar=yes,localtion=yes,width=300,height=600,left=500,top=500";
    constructor(
        private readonly router: Router
    ) {
        window.addEventListener('message', this.receiveMessage.bind(this));
    }

    loginWithGithub() {
        window.open(this.authUrl, '_blank', this.feature);
    }

    receiveMessage(event) {
        const receiveData = event.data;
        if (receiveData) {
            const arr = receiveData.split(' ');
            localStorage.setItem('current_user', arr[0])
            localStorage.setItem('access_token', arr[1]);
            console.log('navigate')
            if (localStorage.getItem('current_user') || localStorage.getItem('access_token')) {
                console.log('okkk')
                return this.router.navigate(['admin']);
            }
        }
    }

    logout(): boolean {
        localStorage.removeItem('current_user');
        localStorage.removeItem('access_token');
        return true;
    }
}