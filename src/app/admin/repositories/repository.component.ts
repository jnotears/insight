import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Repository } from '../models';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-repository',
    templateUrl: 'repository.component.html',
    styleUrls: ['repository.component.scss']
})
export class RepositoryComponent implements OnInit {
    repos: Repository[] = [];

    constructor(
        private readonly adminService: AdminService,
        private readonly router: Router,
    ) {
        if (!localStorage.getItem('current_user') || !localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
    }

    ngOnInit(): void {
        this.getRepos();
    }

    getRepos() {
        return this.adminService.getRepos().subscribe(
            repos => {
                this.repos = repos;
            }
        );
    }

    registerHook(repo_id: number) {
        return this.adminService.registerHook(repo_id).subscribe();
    }
}
