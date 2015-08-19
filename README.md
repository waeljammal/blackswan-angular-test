# BlackSwan AngularJS Test

BlackSwan github API test, built with AngularJS / Karma / Jasmine / Webpack

The project uses a modular architecture where you build re-usable modules and glue them together in a container.

- Install
    - npm install
    - npm install -g esdoc

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