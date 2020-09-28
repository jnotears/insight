import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { RepositoryComponent } from './repositories/repository.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ProfileComponent } from './profile/profile.component';
import { AirTableConfigComponent } from './airtable/airtable.config.component';
import { DashboardReviewComponent } from './dashboard/dashboard.review/dashboard.review.component';
// import { DashboardRepositoriesComponent } from './admin-dashboard/dashboard-reviews/dashboard-repositories/dashboard-repositories.component';
// import { DashboardIssuesComponent } from './admin-dashboard/dashboard-reviews/dashboard-issues/dashboard-issues.component';
// import { AdminProfileComponent } from './admin-profile/admin-profile.component';
// import { DashboardProjectsComponent } from './admin-dashboard/dashboard-reviews/dashboard-projects/dashboard-projects.component';


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
        // DashboardRepositoriesComponent,
        // DashboardIssuesComponent,
        // AdminProfileComponent,
        // DashboardProjectsComponent,
    ]
})
export class AdminModule { }