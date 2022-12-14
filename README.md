Beer app - a project which showcases some of the technologies, termins and techniques I am aware of and have an understanding of where and how to use them in a real-world web application.

At the moment: basically a glorified "Excel" file which stores only my (admin's) thoughts on different tried beers in kind of a nice way. Also allows to add new beers (has a CRUD functionality) for all of the objects.
In the future (dream): users sharing their experiences and making up tops of beers and beer brands for others to try. Kind of a beer geeks' social network/guidebook.

Used technologies on backend: Java 17 LTS, Lombok, Gradle, Spring Boot, JDBC, H2 (embedded) Database, Liquibase
Frontend: Typescript, Angular, Bootstrap, also used "ng-multiselect-dropdown": https://www.npmjs.com/package/ng-multiselect-dropdown.

Written on VS Code.

To start the app: 
1. Install Node.js, NPM
2. Install Angular CLI with command "npm install -g @angular/cli"
3. Install frontend npm dependencies: from directory frontend/angular/beer-app command "npm install"
4. From beerapp/backend command ".\gradlew bootRun" starts the backend,  data is accessible at localhost:8080/beer-app/api/{controller-name}.
5. From directory frontend/angular/beer-app command "ng serve", the app starts on localhost:4200

Written on VS Code.

Plans: Better parametrized search for beers (with multiselects, rewrite select modules to support multiple & maybe different value types), decent rating fuctionality (bootstrap range or else), backend validation, Spring Security (user management in app), i18n, better UI/UX (especially image sizes), maybe switch to Postgres DB, global .css file.
