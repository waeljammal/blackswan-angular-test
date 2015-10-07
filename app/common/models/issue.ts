import {RepositoryOwner} from './repository-owner';

export class Issue {
    public id: string;
    public title: string;
    public body: string;
    public user: RepositoryOwner;
    public state: string;
    public comments: string;
    public updated_at: string;
    public html_url: string;

    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.body = data.body;
        this.user = new RepositoryOwner(data.user);
        this.state = data.state;
        this.comments = data.comments;
        this.updated_at = data.updated_at;
        this.html_url = data.html_url;
    }

    static parse1 (data): Array<Issue> {
        let result: Issue[] = [];


        for(let i = 0; i < data.length; i++) {
            let issue = data[i];
            result[i] = new Issue(issue);
        }

        return result;
    }
}