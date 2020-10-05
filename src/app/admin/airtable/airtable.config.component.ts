import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { AirConfigDetail, AirConfigExtended, AirTableConfig } from '../models';

@Component({
    selector: 'admin-airtable',
    templateUrl: 'airtable.config.component.html',
    styleUrls: ['airtable.config.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class AirTableConfigComponent implements OnInit {
    configExtendeds: AirConfigExtended[] = [];
    dataSource: MatTableDataSource<AirConfigExtended>
    configFormGroup: FormGroup;
    tableFormGroup: FormGroup;
    tableFormGroupExpanded: FormGroup;
    expandedElement: AirConfigExtended;
    configTableColumns = ['connect_name', 'api_key', 'base_id', 'table_name', 'updated_at', 'active'];
    configDetailColumns = ['issue_id', 'number', 'name', 'project_name', 'state', 'author', 'content', 'url',
        'repo_id', 'estimate', 'assignee', 'created_at', 'closed_at'];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private readonly router: Router,
        private readonly admin: AdminService,
        private readonly formBuilder: FormBuilder
    ) {
        if (!localStorage.getItem('current_user') || !localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.getAirConfigs();
    }

    ngOnInit() {
        this.configFormGroup = this.formBuilder.group({
            connect_name: ['', Validators.required],
            api_key: ['', Validators.required],
            base_id: ['', Validators.required],
            table_name: ['', Validators.required],
            active: [''],

        });
        this.tableFormGroup = this.formBuilder.group({
            issue_id: ['',],
            issue_number: ['',],
            issue_name: ['',],
            project_name: ['',],
            state: ['',],
            author: ['',],
            content: ['',],
            url: ['',],
            repo_id: ['',],
            closed_at: ['',],
            estimate: ['',],
            assignee: ['',],
            created_at: ['',],
            updated_at: ['',],
        });
        this.tableFormGroupExpanded = this.formBuilder.group({
            issue_id: ['',],
            issue_number: ['',],
            issue_name: ['',],
            project_name: ['',],
            state: ['',],
            author: ['',],
            content: ['',],
            url: ['',],
            repo_id: ['',],
            closed_at: ['',],
            estimate: ['',],
            assignee: ['',],
            created_at: ['',],
            updated_at: ['',],
        });
    }

    async getAirConfigs() {
        const configs = await this.admin.getAirConfigs().toPromise()
        if (configs && configs.length > 0) {
            this.getAirConfigDetails(configs);
        }
    }

    async getAirConfigDetails(configs: AirTableConfig[]) {
        await Promise.all(configs.map(async config => {
            const detail = await this.getAirConfigDetail(config.id);
            if (detail) {
                const configExtened: AirConfigExtended = { ...config, detail }
                this.configExtendeds.push(configExtened)
            }
        }));
        this.dataSource = new MatTableDataSource(this.configExtendeds);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
    }

    addConfigItem(config: AirConfigExtended) {
        this.configExtendeds.push(config);
        this.dataSource = new MatTableDataSource(this.configExtendeds);
    }

    async getAirConfigDetail(config_id: number) {
        const detail = await this.admin.getAirConfigDetail(config_id).toPromise();
        return detail;
    }

    showAddForm() {
        var x = document.getElementById("mat-stepper");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
    }

    showTableExpanded() {
        var x = document.getElementById("expanded-table");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    get configForm() {
        return this.configFormGroup.controls;
    }

    get tableForm() {
        return this.tableFormGroup.controls
    }

    async addNewConfig() {
        if (this.configFormGroup.invalid) {
            return;
        }
        let config = new AirTableConfig();
        config.connect_name = this.configForm.connect_name.value;
        config.api_key = this.configForm.api_key.value;
        config.base_id = this.configForm.base_id.value;
        config.table_name = this.configForm.table_name.value;
        config.active = true;
        const username = localStorage.getItem('current_user');
        const user = await this.admin.getUser(username).toPromise();
        config.user_id = user.id;
        return config;
    }

    addNewDetailConfig() {
        if (this.tableFormGroup.invalid) {
            return;
        }
        let detail = new AirConfigDetail();
        detail.issue_id = this.tableForm.issue_id.value ? this.tableForm.issue_id.value : '';
        detail.number = this.tableForm.issue_number.value ? this.tableForm.issue_number.value : '';
        detail.name = this.tableForm.issue_name.value ? this.tableForm.issue_name.value : '';
        detail.project_name = this.tableForm.project_name.value ? this.tableForm.project_name.value : '';
        detail.state = this.tableForm.state.value ? this.tableForm.state.value : '';
        detail.author = this.tableForm.author.value ? this.tableForm.author.value : '';
        detail.content = this.tableForm.content.value ? this.tableForm.content.value : '';
        detail.url = this.tableForm.url.value ? this.tableForm.url.value : '';
        detail.repo_id = this.tableForm.repo_id.value ? this.tableForm.repo_id.value : '';
        detail.estimate = this.tableForm.estimate.value ? this.tableForm.estimate.value : '';
        detail.assignee = this.tableForm.assignee.value ? this.tableForm.assignee.value : '';
        detail.created_at = this.tableForm.created_at.value ? this.tableForm.created_at.value : '';
        detail.closed_at = this.tableForm.closed_at.value ? this.tableForm.closed_at.value : '';
        return detail
    }

    async onRegisterConfig() {
        const config = await this.addNewConfig();
        let _detail = this.addNewDetailConfig();
        const config_response = await this.admin.createAirConfig(config).toPromise();
        if (config_response) {
            _detail.config_id = config_response.id;
        }
        const detail = await this.admin.createAirConfigDetail(_detail).toPromise();
        const configExtended = { ...config_response, detail }
        this.addConfigItem(configExtended);
    }

}
