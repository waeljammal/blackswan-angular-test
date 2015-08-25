/**
 * Stores the current app state.
 *
 * This consists of the currently open repository.
 */
/* @ngInject */
export default class AppStateService {
    constructor(MsgBus) {
        this._currentRepo = undefined;
        this._msgBus = MsgBus;
        this._isLoading = false;
    }

    /**
     * Name of the event fired when the repository changes.
     *
     * @returns {string}
     * @constructor
     */
    get REPO_CHANGE_EVENT() {
        return 'repoChangedEvent';
    }

    /**
     * Read only access to the message bus.
     *
     * @returns {MsgBus}
     */
    get msgBus() {
        return this._msgBus;
    }

    /**
     * Sets the current repository
     *
     * @param repo {undefined|object}
     */
    set currentRepo(repo) {
        this._currentRepo = repo;
        this.msgBus.emitMsg(this.REPO_CHANGE_EVENT, repo);
    }

    /**
     * Returns the current repository.
     *
     * @returns {undefined|object}
     */
    get currentRepo() {
        return this._currentRepo;
    }

    get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = value;
    }
}

module.exports = AppStateService;