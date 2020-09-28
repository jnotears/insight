import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AirTableConfigComponent } from './airtable/airtable.config.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RepositoryComponent } from './repositories/repository.component';
// import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const adminRoutes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'repos', component: RepositoryComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'airtable/config', component: AirTableConfigComponent },

        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }