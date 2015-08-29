/**
 * Created by Wael on 19/08/15.
 */
angular.module('issues-mocks', ['ngMockE2E'])
    .run(function($httpBackend) {
        var data = [
            {
                'url': 'https://api.github.com/repos/angular/angular/issues/3720',
                'labels_url': 'https://api.github.com/repos/angular/angular/issues/3720/labels{/name}',
                'comments_url': 'https://api.github.com/repos/angular/angular/issues/3720/comments',
                'events_url': 'https://api.github.com/repos/angular/angular/issues/3720/events',
                'html_url': 'https://github.com/angular/angular/pull/3720',
                'id': 101849852,
                'number': 3720,
                'title': 'docs(metadata): correct ES5 annotation examples',
                'user': {
                    'login': 'pkozlowski-opensource',
                    'id': 973550,
                    'avatar_url': 'https://avatars.githubusercontent.com/u/973550?v=3',
                    'gravatar_id': '',
                    'url': 'https://api.github.com/users/pkozlowski-opensource',
                    'html_url': 'https://github.com/pkozlowski-opensource',
                    'followers_url': 'https://api.github.com/users/pkozlowski-opensource/followers',
                    'following_url': 'https://api.github.com/users/pkozlowski-opensource/following{/other_user}',
                    'gists_url': 'https://api.github.com/users/pkozlowski-opensource/gists{/gist_id}',
                    'starred_url': 'https://api.github.com/users/pkozlowski-opensource/starred{/owner}{/repo}',
                    'subscriptions_url': 'https://api.github.com/users/pkozlowski-opensource/subscriptions',
                    'organizations_url': 'https://api.github.com/users/pkozlowski-opensource/orgs',
                    'repos_url': 'https://api.github.com/users/pkozlowski-opensource/repos',
                    'events_url': 'https://api.github.com/users/pkozlowski-opensource/events{/privacy}',
                    'received_events_url': 'https://api.github.com/users/pkozlowski-opensource/received_events',
                    'type': 'User',
                    'site_admin': false
                },
                'labels': [
                    {
                        'url': 'https://api.github.com/repos/angular/angular/labels/cla:%20yes',
                        'name': 'cla: yes',
                        'color': '009800'
                    }
                ],
                'state': 'open',
                'locked': false,
                'assignee': null,
                'milestone': null,
                'comments': 0,
                'created_at': '2015-08-19T09:43:15Z',
                'updated_at': '2015-08-19T09:43:17Z',
                'closed_at': null,
                'pull_request': {
                    'url': 'https://api.github.com/repos/angular/angular/pulls/3720',
                    'html_url': 'https://github.com/angular/angular/pull/3720',
                    'diff_url': 'https://github.com/angular/angular/pull/3720.diff',
                    'patch_url': 'https://github.com/angular/angular/pull/3720.patch'
                },
                'body': ''
            },
            {
                'url': 'https://api.github.com/repos/angular/angular/issues/3719',
                'labels_url': 'https://api.github.com/repos/angular/angular/issues/3719/labels{/name}',
                'comments_url': 'https://api.github.com/repos/angular/angular/issues/3719/comments',
                'events_url': 'https://api.github.com/repos/angular/angular/issues/3719/events',
                'html_url': 'https://github.com/angular/angular/pull/3719',
                'id': 101840992,
                'number': 3719,
                'title': 'chore(build): add IE11 to CI',
                'user': {
                    'login': 'mlaval',
                    'id': 2316643,
                    'avatar_url': 'https://avatars.githubusercontent.com/u/2316643?v=3',
                    'gravatar_id': '',
                    'url': 'https://api.github.com/users/mlaval',
                    'html_url': 'https://github.com/mlaval',
                    'followers_url': 'https://api.github.com/users/mlaval/followers',
                    'following_url': 'https://api.github.com/users/mlaval/following{/other_user}',
                    'gists_url': 'https://api.github.com/users/mlaval/gists{/gist_id}',
                    'starred_url': 'https://api.github.com/users/mlaval/starred{/owner}{/repo}',
                    'subscriptions_url': 'https://api.github.com/users/mlaval/subscriptions',
                    'organizations_url': 'https://api.github.com/users/mlaval/orgs',
                    'repos_url': 'https://api.github.com/users/mlaval/repos',
                    'events_url': 'https://api.github.com/users/mlaval/events{/privacy}',
                    'received_events_url': 'https://api.github.com/users/mlaval/received_events',
                    'type': 'User',
                    'site_admin': false
                },
                'labels': [
                    {
                        'url': 'https://api.github.com/repos/angular/angular/labels/cla:%20yes',
                        'name': 'cla: yes',
                        'color': '009800'
                    }
                ],
                'state': 'open',
                'locked': false,
                'assignee': null,
                'milestone': null,
                'comments': 0,
                'created_at': '2015-08-19T09:02:49Z',
                'updated_at': '2015-08-19T09:02:50Z',
                'closed_at': null,
                'pull_request': {
                    'url': 'https://api.github.com/repos/angular/angular/pulls/3719',
                    'html_url': 'https://github.com/angular/angular/pull/3719',
                    'diff_url': 'https://github.com/angular/angular/pull/3719.diff',
                    'patch_url': 'https://github.com/angular/angular/pull/3719.patch'
                },
                'body': ''
            }
        ];

        let url = 'https://api.github.com/repos/angular/angular/issues?direction=desc&sort=created&state=open';

        $httpBackend.whenGET(url).respond(200, data);
    });

angular.module('wrapperModule').requires.push('issues-mocks');