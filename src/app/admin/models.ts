
export interface Repository{
    id: number,
    name: string,
    user_id: string,
    external_id: string,
    sync: boolean,
    owner: string,
    created_at: Date,
    updated_at: Date
}

export interface IssueEntity{
    id: number,
    external_id: number;
    number: number;
    name: string;
    author: string;
    content: string;
    url: string;
    state: string;
    closed_at?: Date;
}

export interface ProjectEntity{
    id: number;
    external_id: number;
    number: number;
    name: string;
    description: string;
    state: string;
    repo_id: number;
    closed_at?: Date;
}

export interface Assignee{
    user_id: string;
    name: string;
    email: string;
    avatar_url: string;
    issue_id: number;
}

export interface User{
    id: string;
    username: string;
    name: string;
    email: string;  
    avatar_url: string;
    created_at: Date;
    updated_at: Date;
}

export class AirTableConfig{
    id: number;
    user_id: string;
    api_key: string;
    base_id: string;
    table_name: string;
    connect_name: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}

export class AirConfigDetail{
    id: number;
    issue_id: string;
    external_id: string;
    number: string;
    name: string;
    state: string;
    author: string;
    content: string;
    url: string;
    repo_id: string;
    closed_at: string;
    estimate: string;
    assignee: string;
    config_id: number;
    created_at: string;
    updated_at: string;
    project_name: string;
}