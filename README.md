# MSL Pages

This repository is a sub-repository of the [Kenzan Million Song Library](https://github.com/kenzanmedia/million-song-library) (MSL) project, a microservices-based Web application built using [AngularJS](https://angularjs.org/), a [Cassandra](http://cassandra.apache.org/) NoSQL database, and [Netflix OSS](http://netflix.github.io/) tools.

> **NOTE:** For an overview of the Million Song Library microservices architecture, as well as step-by-step instructions for running the MSL demonstration, see the [Million Song Library Project Documentation](https://github.com/kenzanmedia/million-song-library/tree/develop/docs).

## Overview

The Million Song Library client/UI application was built using Node 0.12.2 and npm 2.7.4. Before installing, building, or running the MSL client/UI, install [Node 0.12.x](https://nodejs.org/en/download/) or higher and [npm 2.7.x](https://nodejs.org/en/download/) or higher (see [NVM](https://github.com/creationix/nvm) for more information).

> **NOTE:** If you receive an error when running any of the commands below, try using `sudo` (Mac and Linux) or run PowerShell as an administrator (Windows).

## Installation

To install the client/UI, run the following command from the `/msl-pages` directory of the main [million-song-library](https://github.com/kenzanmedia/million-song-library/tree/develop/server) repository:

```
npm install
```

This will install `npm` dependencies as well as run `bower install` for [Bower](https://github.com/bower/bower) dependencies.

## Build

To build the client/UI, run the following command from the `/msl-pages` directory of the main [million-song-library](https://github.com/kenzanmedia/million-song-library/tree/develop/server) repository:

```
npm run build
```

This will create client/UI source files in the `/build` directory. To use the source files, mount them on a server, or run the `npm run full-dev` command (see [Dev Server](#dev-server) below).

To build microservice dependencies, use the command `npm run build-server`. Alternately, use the command `npm run build-and-serve` to build dependencies and launch an instance of Jetty for each microservice.

### Dev Server

> **NOTE:** Install [Asciidoctor](http://asciidoctor.org/) before running dev server tasks.

To start the dev server, run the following command from the `/msl-pages` directory of the main [million-song-library](https://github.com/kenzanmedia/million-song-library/tree/develop/server) repository:

```
npm run full-dev
```

This will automatically mount a server on localhost port `3000`. Add `msl.kenzanlabs.com` to the `/etc/hosts` file to map the localhost IP address and make localhost an allowed origin.

If any changes are made while the dev server is running, source files are automatically rebuilt.

### Prod Server

> **NOTE:** Run the `npm run full-dev` command before running dev server tasks (see [Dev Server](#dev-server) above).

To start the prod server, run the following command from the `/msl-pages` directory of the main [million-song-library](https://github.com/kenzanmedia/million-song-library/tree/develop/server) repository:

```
npm run serve-all
```

This will attempt to mount the `/build` directory to port `80` using [http-server](https://github.com/indexzero/http-server) to serve static resources.

### ESDocs

To generate [ESDoc](https://esdoc.org/) Javascript documentation, run the following command from the `/msl-pages` directory of the main [million-song-library](https://github.com/kenzanmedia/million-song-library/tree/develop/server) repository:

```
npm run gen-jsdocs
```

This will generate documentation for the JavaScript functions and methods that are part of the UI service. The generated files are located in the `/build/esdocs` directory.

### Style Guide

To generate a [KSS](http://warpspire.com/kss/) style guide, run the following command from the `/msl-pages` directory of the main [million-song-library](https://github.com/kenzanmedia/million-song-library/tree/develop/server) repository:

```
npm run styleguide
```

This will use [kss-node](https://github.com/kss-node/kss-node) to generate a style guide for the CSS styles used in the UI pages. The generated files are located in the `/build/styleguide/` directory.

## File Layout Structure

Source files are located in the `/src` directory (see the diagram below). The build process begins with the `/src/index.js` file. You can access library files from `npm` and `bower` using simple imports as in `node.js`. For best results, use `npm` to install dependencies, or use `bower` for dependencies that are not published to `npm`.

```
├──  /src
│   ├── /filters
│   │   │   # Filters used to format display of times.
│   │   └── <filters>
│   ├── /images
│   │   │   # Graphic files used throughout the site.
│   │   └── <images>
│   ├── /layout
│   │   │   # Overall site layout, navigation bar, and elements that 
│   │   │   # are visible throughout all views.
│   │   └── /<navigation elements>
│   ├── /modules
│   │   │   # Custom modules used throughout the site.
│   │   └── /<modules>
│   ├── /pages
│   │   │   # Controllers, factories, and other per-page components. 
│   │   │   # Each page is a separate Angular module, so it can have a 
│   │   │   # custom configuration and route. When using the Angular UI 
│   │   │   # router, define its states in the page module route (not in 
│   │   │   # the global route). This provides a clearer view of page 
│   │   │   # dependencies.
│   │   └── /<pages>
│   │       ├── /controllers
│   │       ├── /factories
│   │       ├── /*-route.js
│   │       ├── /*-module.js
│   │       └── /*.html
│   ├── /styles
│   │   │   # Custom stylesheets used throughout the site.
│   │   └── <stylesheets>
│   ├── /constants.js
│   ├── /index.js
│   ├── /index.tpl.html
│   ├── /routing.js
│   └── /run.js
```

## Testing

The Million Song Library project is tested with the [Karma](https://github.com/karma-runner/karma) with [Jasmine](https://github.com/jasmine/jasmine) frameworks, and [ESLint](https://github.com/eslint/eslint) for reporting on patterns. To execute the tests, run the following command from the `/msl-pages` directory of the main [million-song-library](https://github.com/kenzanmedia/million-song-library/tree/develop/server) repository:

```
npm run test
```

You can also use the command `npm run autotest` for automated test runs when some source files change. (Tests will not be executed if ESLint fails.)

### Functional Testing

Functional testing is performed with Jasmine using the [Protractor](https://github.com/angular/protractor) framework.

1. Install global dependencies:
   ```
   npm install -g protractor
   npm install -g selenium-webdriver
   ```
2. Run the mock server and the site ineracting with the server:
   ```
   npm run serve-mock
   npm run dev --mock
   webdriver-manager start
   ```
   > **NOTE:** When running these commands for the first time, you may need to update the manager using the `webdriver-manager update --standalone` command.
   
3. Run the tests using the following command:
   ```
   protractor protractor.conf.js
   ```
   The tests will run in several browsers (Chrome, Firefox, Safari, and Internet Explorer).

### Test Files

Test files are located in the `/test/specs` directory. When Karma starts, it only includes files matching the `/test/specs/.../*.test.js` pattern. Other files that need to be tested (like source files) must be imported in the test files.

## Swagger

Each microservice has its own Swagger definition. With the [Swagger codegen](https://github.com/swagger-api/swagger-codegen) tools, you can use the definition files to generate the REST API code for each microservice.

In addition, there is an overall Swagger definition that you can generate using the `npm run parse-swagger-src` command. This process is part of the npm tasks `build-server` and `serve-and-build`.

### Swagger Mock Server

To start the Swagger mock server, run the `npm run serve-mock` command.

> **NOTE:** If you want the dev server to use the Swagger mock server, start the dev server with the `--mock` argument, for example, `npm run dev --mock`. You can access the mock server on localhost port `10010`.

### Swagger Interactive Documentation

When the Swagger mock server is running, you can access the interactive Swagger documentation at: http://localhost:10010/docs/

The interactive documentation lets you view the available operations and even lets you test them in real time by sending parameters and seeing responses.

 ## LICENSE
Copyright 2015 Kenzan, LLC <http://kenzan.com>
 
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
    http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
