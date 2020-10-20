import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AirTableConfig, Repository } from '../models';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';


export interface DialogSyncAirData {
    repo_id: number;
}

export interface DialogSyncGitData {
    repo_name: string;
}

@Component({
    selector: 'admin-repository',
    templateUrl: 'repository.component.html',
    styleUrls: ['repository.component.scss']
})
export class RepositoryComponent implements OnInit {
    repos: Repository[] = [];
    dataSource: MatTableDataSource<Repository>;

    repoColumns = ['id', 'name', 'sync', 'created_at', 'updated_at', 'sync_github'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private readonly adminService: AdminService,
        private readonly router: Router,
        public dialog: MatDialog
    ) {
        if (!localStorage.getItem('current_user') || !localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.getRepos();

    }

    ngOnInit(): void {
    }

    openSyncAirTableDialog(repo_id): void {
        const dialogRef = this.dialog.open(RepositorySyncAirTableDialog, {
            width: '350px',
            data: { repo_id }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    openSyncGithubDialog(repo_id, repo_name): void {
        const dialogRef = this.dialog.open(RepositorySyncGithubDialog, {
            width: '350px',
            data: { repo_name }
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.registerHook(repo_id);
                if(result['syncAirTable']){
                    this.openSyncAirTableDialog(repo_id);
                }
            }
        });
    }

    getRepos() {
        return this.adminService.getRepos().subscribe(
            repos => {
                this.dataSource = new MatTableDataSource(repos);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        );
    }

    registerHook(repo_id: number) {
        return this.adminService.registerHook(repo_id).subscribe();
    }
}

@Component({
    selector: 'repository-sync-airtable-dialog',
    templateUrl: 'repository-sync-airtable.dialog.html',
    styleUrls: ['repository-sync-airtable.scss']
})
export class RepositorySyncAirTableDialog implements OnInit {
    configs: AirTableConfig[] = [];
    airform = new FormControl();
    constructor(
        public dialogRef: MatDialogRef<RepositorySyncAirTableDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogSyncAirData,
        private readonly admin: AdminService
    ) { }

    ngOnInit(){
        this.getAirConfigs();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onAccept(val){
        const result = {val};
        this.dialogRef.close(result);
    }

    getAirConfigs() {
        this.admin.getAirConfigs().subscribe(
            configs => {
                if(configs && configs.length > 0){
                    this.configs = configs;
                }
            }
        )
    }
}

@Component({
    selector: 'repository-sync-github-dialog',
    templateUrl: 'repository-sync-github.dialog.html',
})
export class RepositorySyncGithubDialog {
    isChecked: boolean = false;
    constructor(
        public dialogRef: MatDialogRef<RepositorySyncGithubDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogSyncGitData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    checkCheckBoxValue(e){
        this.isChecked =  e.checked;
    }

    onAccept(val){
        console.log(this.isChecked);
        const syncAirTable = this.isChecked;
        const result = {val, syncAirTable};
        this.dialogRef.close(result);
    }
}