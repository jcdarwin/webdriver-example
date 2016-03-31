# What is this?

This project demonstrates using the webdriver.io selenium bindings via the gulp-webdriver module, using the chai assertion library:
    http://webdriver.io/api.html
    http://chaijs.com/api/assert/


## Installation

Ensure you have already installed node/npm. [Installation on a Mac using Homebrew](https://changelog.com/install-node-js-with-homebrew-on-os-x/)
is probably the easiest way.

Ensure you have the gulp-cli installed globally:

    npm install -g gulp-cli

Install the app:

    npm install

## Testing via the command line

We can run tests on the deployed site as a gulp task:
    gulp test

You should see the tests completing in the console, and you'll find screenshots afterwarsds in `test/spec/screenshots`
