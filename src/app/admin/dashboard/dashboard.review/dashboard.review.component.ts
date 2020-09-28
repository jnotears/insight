import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Repository, IssueEntity, ProjectEntity, Assignee } from '../../models';

@Component({
    selector: 'dashboard-review',
    templateUrl: 'dashboard.review.component.html',
    styleUrls: ['dashboard.review.component.scss']
})
export class DashboardReviewComponent implements OnInit {
    repos: Repository[] = [];
    totalSyncRepo: number = 0;
    totalSyncIssue: number = 0;
    totalSyncProject: number = 0;
    totalSyncAssignee: number = 0;
    issues: IssueEntity[] = [];
    projs: ProjectEntity[] = [];
    assignees: Assignee[] = []
    constructor(
        private readonly adminService: AdminService
    ) { }

    ngOnInit() {
        this.getSyncRepos();
        this.getSyncIssues();
        this.getSyncProjects();
        this.getSyncAssignees();
    }

    getSyncRepos() {
        return this.adminService.getSyncRepos().subscribe(
            repos => {
                this.repos = repos;
                this.totalSyncRepo = repos.length;
            }
        );
    }

    getSyncIssues() {
        return this.adminService.getSyncIssues().subscribe(
            issues => {
                this.issues = issues;
                this.totalSyncIssue = issues.length;
            }
        );
    }

    getSyncProjects() {
        return this.adminService.getSyncProjects().subscribe(
            projs => {
                this.projs = projs;
                this.totalSyncProject = projs.length;
            }
        );
    }

    getSyncAssignees() {
        return this.adminService.getSyncAssignees().subscribe(
            assigs => {
                this.assignees = assigs;
                this.totalSyncAssignee = assigs.length;
            }
        );
    }
}