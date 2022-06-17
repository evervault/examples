# Multi Cage Example
[Evervault](https://evervault.com) makes it easy to encrypt data at source, process it in a Cage — a secure, serverless function — and never store it unencrypted.

This example will show you how to have multiple cages in a single github repository.

## Setup

Fork this repository.
Navigate to the dashboard of your evervault account.
You should see a screen as follows.
Clock on the plus button at the top right of the cages menu in order to create a cage.
Choose to import the cage from a github repository and enter the link to the fork that you made.
Select the checkbox 'Include from subdirectory'.
Enter `cages/<cage>`.
Do this for each cage.
You now have three cages which are derived from a single git repository.

## Deployment

We will create a lambda instance which will obtain encrypted information from Relay and perform operations on it using the cages we made in the previous step.

We will be using [serverless]() to deploy the lambda.
For this to work, you will have needed to setup the AWS CLI.
For information on doing that, see [here]().
Once you have theat set up, simply deploy the lambda to AWS using the command;

```
serverless deply
```
If this works, you should see output smilar to the output below.
```
output...
```

## Invocation

### With Curl

### NodeJS with axios

---

If you want to know more about Evervault, check out our [documentation](https://docs.evervault.com).
