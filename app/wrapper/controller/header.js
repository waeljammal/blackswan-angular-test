/**
 * Global header controller for the site.
 */
/* @ngInject */
export default class HeaderController {
    constructor($state, MsgBus, NavManager, Search, AppState) {
        this.$state = $state;
        this.nav = NavManager;

        this._selectedRepo = undefined;
        this._appState = AppState;
        this._searchService = Search;

        MsgBus.onMsg(AppState.REPO_CHANGE_EVENT, (e, d) => {this.update(d);});

        this.update(AppState.currentRepo);
    }

    /**
     * @returns {boolean} True if navigation is enabled
     */
    get enabled() {
        return this.nav.enabled && this.selectedRepo !== undefined;
    }

    /**
     * @returns {boolean} True if main navigation is visible
     */
    get mainNavVisible() {
        return this.nav.mainNavVisible;
    }

    /**
     * @returns {boolean} True if sub navigation is visible
     */
    get subNavVisible() {
        return this.nav.subNavVisible;
    }

    /**
     * @returns Current path top.?
     */
    get currentPath() {
        return this.$state.current.name;
    }

    /**
     * @returns Main navigation data
     */
    get mainNavData() {
        return this.nav.mainNav;
    }

    /**
     * @returns Sub navigation data
     */
    get subNavData() {
        return this.nav.subNav;
    }

    get selectedRepo() {
        return this._selectedRepo;
    }

    set selectedRepo(value) {
        this._selectedRepo = value;
    }

    /**
     * Checks if the current path includes the given child
     *
     * @param child Child to check
     * @returns True if path contains child path
     */
    includesChild(child) {
        return this.$state.includes(child.path);
    }

    /**
     * Checks if the current path matches the given child
     *
     * @param child Child to check
     * @returns True if paths match
     */
    isChild(child) {
        return this.$state.is(child.path);
    }

    update(data) {
        this.selectedRepo = data;
    }

    /**
     * Navigates to the given path
     *
     * @param data Object containing the 'path'
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

    getRepositories(term) {
        return this._searchService.search(term).then((data) => {
            return data.map(function(item){
                return item;
            });
        });
    }

    selectRepo($item, $model, $label) {
        let params = this.nav.getParams(this.$state.current.name);
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