/**
 * Created by Wael on 17/08/15.
 */

/* @ngInject */
export default class AppStateService {
    constructor(MsgBus) {
        this._currentRepo = undefined;
        this._msgBus = MsgBus;
    }

    get REPO_CHANGE_EVENT() {
        return 'repoChangedEvent';
    }

    get msgBus() {
        return this._msgBus;
    }

    set currentRepo(repo) {
        this._currentRepo = repo;
        this.msgBus.emitMsg(this.REPO_CHANGE_EVENT, repo);
    }

    get currentRepo() {
        return this._currentRepo;
    }
}

module.exports = AppStateService;