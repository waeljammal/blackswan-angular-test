export class RepositoryOwner {
    public login: string;
    public avatar_url: string;

    constructor(data) {
        this.login = data.login;
        this.avatar_url = data.avatar_url;
    }
}