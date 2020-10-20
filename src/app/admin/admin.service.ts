import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Repository, IssueEntity, ProjectEntity, Assignee, User, AirTableConfig, AirConfigDetail } from './models';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor(
        private readonly http: HttpClient,
        private readonly auth: AuthService
    ) { }

    getUser(username: string): Observable<User> {
        return this.http.get<User>(this.auth.hostUrl + `/api.github/user?username=${username}`);
    }

    getRepos(): Observable<Repository[]> {
        return this.http.get<Repository[]>(this.auth.hostUrl + `/api.github/repos`);
    }

    getAllProjectOfRepo(repo_id: number): Observable<ProjectEntity[]>{
        return this.http.get<ProjectEntity[]>(this.auth.hostUrl +  `/api.github/repo/projects?repo_id=${repo_id}`);
    }

    registerHook(repo_id: number): Observable<any> {
        const body: {} = {
            repo_id
        };
        return this.http.post<any>(this.auth.hostUrl + `/api.github/hooks`, body);
    }

    getSyncRepos(): Observable<Repository[]> {
        return this.http.get<Repository[]>(this.auth.hostUrl + `/api.github/repos/sync`);
    }

    getSyncIssues(): Observable<IssueEntity[]> {
        return this.http.get<IssueEntity[]>(this.auth.hostUrl + `/api.github/issues/sync`);
    }

    getSyncProjects(): Observable<ProjectEntity[]> {
        return this.http.get<ProjectEntity[]>(this.auth.hostUrl + `/api.github/projects/sync`);
    }

    getSyncAssignees(): Observable<Assignee[]> {
        return this.http.get<Assignee[]>(this.auth.hostUrl + `/api.github/assignees/sync`);
    }

    getAirConfigs(): Observable<AirTableConfig[]>{
        return this.http.get<AirTableConfig[]>(this.auth.hostUrl + `/api.github/airtable.configs`);
    }

    getAirConfigDetail(config_id):Observable<AirConfigDetail>{
        return this.http.get<AirConfigDetail>(this.auth.hostUrl + `/api.github/airtable.config/table?config_id=${config_id}`)
    }

    createAirConfig(config: AirTableConfig){
        return this.http.post<AirTableConfig>(this.auth.hostUrl + `/api.github/airtable.config`,config);
    }

    createAirConfigDetail(detail: AirConfigDetail){
        return this.http.post<AirConfigDetail>(this.auth.hostUrl + `/api.github/airtable.config/table`, detail);
    }
}