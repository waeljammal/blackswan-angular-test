import {Repository} from '../../models/models';

interface IRepositoryService {
    /**
     * Loads a single repository.
     *
     * @param owner Owner of the repository.
     * @param repo Name of the repository.
     * @returns Repository information.
     */
    load(owner: string, repo: string): ng.IPromise<Repository>;
}