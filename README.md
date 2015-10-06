# BlackSwan AngularJS Test

BlackSwan github API test, built with AngularJS / Karma / Jasmine / Webpack

Features:
- Strong typing (Typescript 1.5.3)
- Decorators (@inject, @service, @controller, @directive, @autobind, @log)
- Modules op.metadata
- Definition files
- Constructor less dependency injection
- type docs
- Mocks
- Unit testing example

Time Spent:
- 2 days

The project uses a modular architecture where you build re-usable modules and glue them together in a container.

- Install
    - npm install
    - bower install
    - npm install -g typedoc
    - npm install -g typescript

Run:

- grunt
    - Starts up the built in server and the continuous test server for development.
    - Open a browser and go to http://localhost:7358/public/#/

- grunt mock
    - Starts up the built in server and the continuous test server for development.
    - Open a browser and go to http://localhost:7358/public/#/
    
Build:

- grunt build
    - Creates a release build including coverage and docs. Ready for deployment.

- grunt docs 
    - To generate documentation (it's stored under /target/docs)

Notes:

Test coverage is stored under target/coverage.

Developers:

- [Wael Jammal](https://github.com/waeljammal)
