describe('Test Issues List Directive', function() {
    let element, scope;

    // Module name we are testing
    beforeEach(angular.mock.module('issuesDataListModule'));

    // Use inject to compile the directive so we can test it
    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope;
        scope.data = [
            {
                id: 1,
                title: 'issue 1',
                user: {
                    'avatar_url': 'http://avatar1/url',
                    'login': 'test user 1'
                }
            },
            {
                id: 2,
                title: 'issue 2',
                user: {
                    'avatar_url': 'http://avatar2/url',
                    'login': 'test user 2'
                }
            }
        ];

        scope.selectedItem = scope.data[0];

        element = '<issues-data-list data="data" selected-item="selectedItem"></issues-data-list>';
        element = $compile(element)(scope);

        scope.$digest();
    }));

    // Tests
    it('Should contain 2 rows', function() {
        let links = $(element.find('a'));
        expect(links.length).toBe(2);
    });

    it('First link should be active', function() {
        let links = $(element.find('a'));
        expect(links[0]).toHaveClass('active');
    });
});