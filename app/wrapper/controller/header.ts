import {inject, controller} from 'op/metadata';

/**
 * Global header controller for the site.
 */
@controller()
class HeaderController {

    /** @private **/
    @inject()
    public $state;

    /**
     * Handles repository searching.
     */
    public getRepositories: Function;

    /**
     * Handles repository selection.
     */
    public selectRepo: Function;

    /**
     * Selected Repository
     */
    public selectedRepo: IRepository;

    /** @private **/
    @inject('NavManager')
    private _nav: any;

    /** @private **/
    @inject('AppState')
    private _appState: IAppStateService;

    /** @private **/
    @inject('Search')
    private _searchService: ISearchService;

    /** @private **/
    @inject('MsgBus')
    private _msgBus: IMsgBus;

    constructor() {
        // Listen for repo changes
        this._msgBus.onMsg(this._appState.REPO_CHANGE_EVENT, (e, d) => { this.update(d); });

        // Update on initialization, the router will have already
        // taken care of loading the repo if provided through the url.
        this.update(this._appState.currentRepo);

        this.getRepositories = (value) => { return this.handleGetRepositories(value); };
        this.selectRepo = ($item, $model, $label) => { this.handleSelectRepo($item, $model, $label); };
    }

    /**
     * Returns true if navigation is enabled.
     *
     * @returns True if navigation is enabled
     */
    get enabled(): boolean {
        return this._nav.enabled && this.selectedRepo !== undefined;
    }

    /**
     * Returns true if main navigation is visible.
     *
     * @returns True if main navigation is visible
     */
    get mainNavVisible(): boolean {
        return this._nav.mainNavVisible;
    }

    /**
     * Returns true if sub navigation is visible.
     *
     * @returns True if sub navigation is visible
     */
    get subNavVisible(): boolean {
        return this._nav.subNavVisible;
    }

    /**
     * Returns the current path.
     *
     * @returns {string} Current path top.?
     */
    get currentPath(): string {
        return this.$state.current.name;
    }

    /**
     * Returns navigation data for the main nav.
     *
     * @returns Main navigation data
     */
    get mainNavData(): Object {
        return this._nav.mainNav;
    }

    /**
     * Checks if the current path includes the given child
     *
     * @param child Child to check
     * @returns True if path contains child path
     */
    includesChild(child: any): boolean {
        return this.$state.includes(child.path);
    }

    /**
     * Checks if the current path matches the given child
     *
     * @param child Child to check
     * @returns True if paths match
     */
    isChild(child: any): boolean {
        return this.$state.is(child.path);
    }

    /**
     * Invoked when the active repository changed.
     *
     * @param data IRepository.
     */
    update(data: IRepository) {
        this.selectedRepo = data;
    }

    /**
     * Navigates to the given path
     *
     * @param {Object} data Object containing the 'path'
     */
    navigateTo(data: any) {
        if (!this.enabled) {
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
    handleGetRepositories(term: string): ng.IPromise<Array<IRepository>> {
        return this._searchService.search(term).then((data: Array<IRepository>) => {
            return data.map(function(item: IRepository){
                return item;
            });
        });
    }

    /**
     * Handles the selection of a repository from the search list.
     *
     * @param $item Selected Repository.
     * @param $model Current Model.
     * @param $label Label of the selected repository.
     */
    public handleSelectRepo($item: IRepository, $model: Object, $label: string) {
        let params = this._nav.getParams(this.$state.current.name);
        params.repo = $item.name;
        params.owner = $item.owner.login;

        let path = this.$state.current.name;

        if (path === 'top') {
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