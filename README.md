Beer app - a project which showcases some of the technologies, termins and techniques I am aware of and have an understanding of where and how to use them in a real-world web application.

At the moment: basically a glorified "Excel" file which stores only my (admin's) thoughts on different tried beers in kind of a nice way. Also allows to add new beers (has a CRUD functionality) for all of the objects.
In the future (dream): users sharing their experiences and making up tops of beers and beer brands for others to try. Kind of a beer geeks' social network/guidebook.

To start the app: 
1. Gradle command "bootRun" starts the backend, data is accessible at localhost:8080/beer-app/api/{controller-name}.
2. From directory frontend/angular/beer-app command "ng serve", the app starts on localhost:4200

Used technologies on backend: Java 17, Lombok, Gradle, Spring Boot, JDBC, H2 (embedded) Database, Liquibase
Frontend: Typescript, Angular, Bootstrap, also used "ng-multiselect-dropdown": https://www.npmjs.com/package/ng-multiselect-dropdown.

Written on VS Code.

Plans: Routing fix (ie. not to show beer ids to users), parametrized search for beers, decent rating fuctionality, Spring Security (user management in app), i18n, better UI/UX (especially responsiveness on smaller screens), maybe switch to Postgres DB, global .css file.
