import {RepositoryOwner} from './repository-owner';

export class Repository {
    public full_name: string;
    public forks: number;
    public stargazers_count: number;
    public watchers: number;
    public open_issues: number;
    public name: string;
    public owner: RepositoryOwner;

    constructor(data) {
        this.full_name = data.full_name;
        this.forks = data.forks;
        this.stargazers_count = data.stargazers_count;
        this.watchers = data.watchers;
        this.open_issues = data.open_issues;
        this.name = data.name;
        this.full_name = data.full_name;
        this.owner = new RepositoryOwner(data.owner);
    }

    static parse1 (data): Array<Repository> {
        let result: Repository[] = [];


        for (let i = 0; i < data.length; i++) {
            let issue = data[i];
            result[i] = new Repository(issue);
        }

        return result;
    }
}