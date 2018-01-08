# dapp-mailer

> The Giveth Dapp Mailer Notification System
Sends transactional emails and handles unsubscribes for specific email types.

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. This project uses node-mailer, which supports different email api's. The default config is using Mailgun, because it is free up to 10k emails/month.
   You can use Sendgrid, Mailchimp and others, but that needs modification of `InitMailTime.js`
   Start by creating Mailgun account.

2. Copy `default.json` to `development.json` and enter your Mailgun sandbox credentials as `transportUser` and `transportPass` in this file.
   *Do not commit this file!* It is already added to .gitignore.

3. Create a random apiSecret and put it in `default.json`. This is just your test API key.

4. Make sure you have [NodeJS](https://nodejs.org/), Mongodb and Yarn (or NPM) installed.
5. Install your dependencies

    ```
    cd path/to/dapp-mailer; yarn install
    ```

6. Start your app

    ```
    yarn start
    ```

    Make sure you have Mongo running at port 27017 (or change in the default.json file)

You can now talk to the api endpoints.


### Production settings
copy `default.json` to `production.json` and override all settings there. *Do not deploy this file!*

## A note about dependencies
As you may have noticed many dev dependencies in package.json are not located under devDependencies. 
The reason is that we use [Now](https://zeit.co/now) to deploy this project, which builds the project from scratch and needs those dependencies.
If you don't use now, you can move these back to devDependencies.

## Deploy
At Giveth we deploy with [Now](https://zeit.co/now). 

To deploy:
`cd path/to/dapp-mailer; yarn deploy`

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
