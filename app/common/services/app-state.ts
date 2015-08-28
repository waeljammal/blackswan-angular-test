/// <reference path="../../../typings/_custom.d.ts" />
/// <reference path="./app-state.d.ts" />

import {inject, service} from '../globals/decorators/decorators'

/**
 * Stores the current app state.
 *
 * This consists of the currently open repository.
 */
@service()
class AppStateService implements IAppStateService {

    /**
     * Currently selected repository.
     *
     * @type {undefined}
     * @private
     */
    private _currentRepo = undefined;

    /**
     * Handles messaging between components.
     */
    @inject('MsgBus')
    private _msgBus;

    /**
     * True if app is in a loading state.
     *
     * @type {boolean} If app is loading something.
     */
    public isLoading:boolean = false;

    constructor() {

    }

    /**
     * Name of the event fired when the repository changes.
     *
     * @returns {string}
     * @constructor
     */
    get REPO_CHANGE_EVENT():string {
        return 'repoChangedEvent';
    }

    /**
     * Sets the current repository
     *
     * @param repo {undefined|object}
     */
    set currentRepo(repo) {
        this._currentRepo = repo;
        this._msgBus.emitMsg(this.REPO_CHANGE_EVENT, repo);
    }

    /**
     * Returns the current repository.
     *
     * @returns {undefined|object}
     */
    get currentRepo() {
        return this._currentRepo;
    }
}

export = AppStateService;