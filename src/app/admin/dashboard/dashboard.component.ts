import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Repository } from '../models';

@Component({
    selector: 'admin-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    repos: Repository[] = [];

    constructor(
        private readonly adminService: AdminService
    ) { }

    ngOnInit() {
        this.getRepos();
    }

    getRepos() {
        this.adminService.getRepos().subscribe(
            val => {
                for (let repo of val) {
                    if (repo.sync == true) {
                        this.repos.push(repo);
                    }
                }
            }
        );
    }
}