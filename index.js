#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Who Wants To Be a JS BOSS?");
  await sleep();
  rainbowTitle.stop();

  console.log(`${chalk.bgBlue("How To Play")}
  I am a process on your computer.
  If you get any questions wrong I will be ${chalk.bgRed("killed")}
  So get all the question right...
  
  `);
}

async function askName() {
  const answer = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });
  playerName = answer.player_name;
}

async function question1() {
  const answer = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "Which of the following is not a JavaScript Data Types?\n",
    choices: ["Boolean", "Undefined", "Number", "Float"],
  });
  return handleAnswer(answer.question_1 == "Float");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Nice work ${playerName}. That's the correct answer.`,
    });
  } else {
    spinner.error({
      text: `Game over, you loss ${playerName}!`,
    });
    process.exit(1);
  }
}

// await welcome();
// await askName();
await question1();
