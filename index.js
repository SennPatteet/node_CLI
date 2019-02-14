#!/usr/bin/env node

const validator = require("email-validator");
const axios = require("axios");
const argv = require("yargs").argv;
const chalk = require('chalk');
const readlineSync = require('readline-sync');


email = readlineSync.question("What's your e-mail address?")
if (validator.validate(email)) {
  console.log(email);
  const encodedEmail = encodeURIComponent(email)
  const url = "https://haveibeenpwned.com/api/v2/breachedaccount/" + encodedEmail;

  axios.get(url, {
    "headers": {"User-Agent": "Node CLI tool"}
  })

    .then(function (response) {

      response.data.forEach(e => {
        name = e.Name
        date = e.BreachDate
        explain = e.Description
        regex = /<\/?\w+[\s\w:"'`/._=-]*>/gi;
        explain = explain.replace(regex, "")

        console.log("");
        console.log(chalk.magenta(`Your e-mail has been 'hacked' on:`));
        console.log(chalk.yellow(name));
        console.log("");
        console.log(chalk.magenta(`The breach happened on:`));
        console.log(chalk.yellow(date));
        console.log("");
        console.log(chalk.magenta(`This is how it happened:`));
        console.log(chalk.yellow(explain));
        console.log("");
      }) //end of forEach

    }) //end of function (response)

    .catch(function (error) {
      // console.log(error);
      if (error.response.status == 404) {
        console.log(chalk.green("Good! Your e-mail hasn't been 'hacked' yet!"));
      }
    }); //end of function (error)

} else {
  console.log(chalk.red("e-mail didn't pass"));
} //end of else
