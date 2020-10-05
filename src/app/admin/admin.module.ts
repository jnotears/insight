import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { RepositoryComponent, RepositorySyncAirTableDialog, RepositorySyncGithubDialog } from './repositories/repository.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ProfileComponent } from './profile/profile.component';
import { AirTableConfigComponent } from './airtable/airtable.config.component';
import { DashboardReviewComponent } from './dashboard/dashboard.review/dashboard.review.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        AdminComponent,
        DashboardComponent,
        RepositoryComponent,
        ProfileComponent,
        AirTableConfigComponent,
        DashboardReviewComponent,
        RepositorySyncGithubDialog,
        RepositorySyncAirTableDialog
    ]
})
export class AdminModule { }