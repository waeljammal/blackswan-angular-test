/// <reference path="../../../typings/_custom.d.ts" />

import {inject, directive, controller, autobind} from '../../common/globals/decorators/decorators'

/**
 * Global header controller for the site.
 */
@controller()
class HeaderController {

    /** @private **/
    @inject()
    public $state;

    @inject('NavManager')
    private _nav;

    @inject('AppState')
    private _appState;

    @inject('Search')
    private _searchService;

    @inject("MsgBus")
    private _msgBus;

    /**
     * Handles repository searching.
     */
    public getRepositories:Function;

    /**
     * Handles repository selection.
     */
    public selectRepo:Function;

    /**
     * Selected Repository
     */
    public selectedRepo;

    constructor() {
        // Listen for repo changes
        this._msgBus.onMsg(this._appState.REPO_CHANGE_EVENT, (e, d) => {this.update(d);});

        // Update on initialization, the router will have already
        // taken care of loading the repo if provided through the url.
        this.update(this._appState.currentRepo);

        this.getRepositories = (value) => {return this.handleGetRepositories(value);}
        this.selectRepo = ($item, $model, $label) => {this.handleSelectRepo($item, $model, $label);};
    }

    /**
     * Returns true if navigation is enabled.
     *
     * @returns {boolean} True if navigation is enabled
     */
    get enabled() {
        return this._nav.enabled && this.selectedRepo !== undefined;
    }

    /**
     * Returns true if main navigation is visible.
     *
     * @returns {boolean} True if main navigation is visible
     */
    get mainNavVisible() {
        return this._nav.mainNavVisible;
    }

    /**
     * Returns true if sub navigation is visible.
     *
     * @returns {boolean} True if sub navigation is visible
     */
    get subNavVisible() {
        return this._nav.subNavVisible;
    }

    /**
     * Returns the current path.
     *
     * @returns {string} Current path top.?
     */
    get currentPath() {
        return this.$state.current.name;
    }

    /**
     * Returns navigation data for the main nav.
     *
     * @returns {Object} Main navigation data
     */
    get mainNavData() {
        return this._nav.mainNav;
    }

    /**
     * Checks if the current path includes the given child
     *
     * @param {string} child Child to check
     * @returns {boolean} True if path contains child path
     */
    includesChild(child) {
        return this.$state.includes(child.path);
    }

    /**
     * Checks if the current path matches the given child
     *
     * @param {string} child Child to check
     * @returns {boolean} True if paths match
     */
    isChild(child) {
        return this.$state.is(child.path);
    }

    /**
     * Invoked when the active repository changed.
     *
     * @param {Object} data Repository.
     */
    update(data) {
        this.selectedRepo = data;
    }

    /**
     * Navigates to the given path
     *
     * @param {Object} data Object containing the 'path'
     */
    navigateTo(data) {
        if(!this.enabled) {
            return;
        }

        this.$state.transitionTo(
            data.path,
            {},
            {relative: false, reload: false, inherit: true}
        );
    }

    /**
     * Runs a search on the search service using the term given.
     *
     * @param {string} term Partial or full name of repository.
     * @returns {*|Promise|Promise.<T>} Promise.
     */
    handleGetRepositories(term) {
        return this._searchService.search(term).then((data) => {
            return data.map(function(item){
                return item;
            });
        });
    }

    /**
     * Handles the selection of a repository from the search list.
     *
     * @param {Object} $item Selected Repository.
     * @param {Object} $model Current Model.
     * @param {string} $label Label of the selected repository.
     */
    public handleSelectRepo($item, $model, $label) {
        let params = this._nav.getParams(this.$state.current.name);
        params.repo = $item.name;
        params.owner = $item.owner.login;

        let path = this.$state.current.name;

        if(path === 'top') {
            path = 'top.repo.dashboard';
        }

        this.$state.transitionTo(
            path,
            params,
            {relative: false, reload: false, inherit: true}
        );
    }
}

module.exports = HeaderController;