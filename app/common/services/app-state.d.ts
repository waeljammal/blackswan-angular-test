// Type definition for the app state

interface IAppStateService {
    REPO_CHANGE_EVENT:string;

    currentRepo: IRepository;
    isLoading: boolean;
}