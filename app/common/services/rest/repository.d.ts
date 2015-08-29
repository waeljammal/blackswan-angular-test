interface IRepository {
    full_name: string;
    forks: number;
    stargazers_count: number;
    watchers: number;
    open_issues: number;
    name: string;
    owner: IRepositoryOwner;
}

interface IRepositoryOwner {
    login: string;
}

interface IRepositoryService {
    /**
     * Loads a single repository.
     *
     * @param owner Owner of the repository.
     * @param repo Name of the repository.
     * @returns Repository information.
     */
    load(owner: string, repo: string): ng.IPromise<IRepository>;
}