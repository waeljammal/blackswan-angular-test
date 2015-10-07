import {inject, service} from 'op/metadata';
import helpers = require('./helpers');

/**
 * Stores the current app state.
 *
 * This consists of the currently open repository.
 */
@service()
export class AppStateService {
    /**
     * True if app is in a loading state.
     *
     * @type {boolean} If app is loading something.
     */
    public isLoading: boolean = false;

    /**
     * Currently selected repository.
     *
     * @type {IRepository}
     * @private
     */
    private _currentRepo: IRepository = undefined;

    /**
     * Handles messaging between components.
     */
    @inject('MsgBus')
    private _msgBus: helpers.MsgBus;

    /**
     * Name of the event fired when the repository changes.
     *
     * @returns Event name
     */
    get REPO_CHANGE_EVENT(): string {
        return 'repoChangedEvent';
    }

    /**
     * Sets the current repository
     *
     * @param repo Repository
     */
    set currentRepo(repo: IRepository) {
        this._currentRepo = repo;
        this._msgBus.emitMsg(this.REPO_CHANGE_EVENT, repo);
    }

    /**
     * Returns the current repository.
     *
     * @returns Repository
     */
    get currentRepo(): IRepository {
        return this._currentRepo;
    }
}

module.exports = AppStateService;