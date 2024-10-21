#!/usr/bin/env node

import { program } from "commander";
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";
import { marked } from "marked";
import chalk from "chalk";
import ora from "ora";
import fs from "fs";
import os from "os";
import path from "path";

// Define the config file path
const configPath = path.join(os.homedir(), ".askcmd-config.json");

function saveAPIKey(apiKey) {
  const config = { GEMINI_API_KEY: apiKey };
  fs.writeFileSync(configPath, JSON.stringify(config));
  console.log(chalk.green("API key saved successfully!"));
  process.exit(0);
}

function getAPIKey() {
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath));
    return config.GEMINI_API_KEY;
  } else {
    return null;
  }
}

// Initialize Gemini API with the stored API key
function initGenAI() {
  const apiKey = getAPIKey();
  if (!apiKey) {
    console.log(
      chalk.red(
        "No API key found. Please set it using 'askcmd set-api-key <API-KEY>'.Get your api-key from https://aistudio.google.com/app/apikey"
      )
    );
    process.exit(1);
  }
  return new GoogleGenerativeAI(apiKey);
}

// Move genAI initialization to when it's needed
let genAI;

const SYSTEM_PROMPT = `You are an AI assistant specifically designed to help with command-line interface (CLI) commands and operations. You should:
1. Provide clear, accurate explanations of CLI commands and their usage
2. Suggest appropriate commands based on user needs
3. Explain command options and flags
4. Help troubleshoot common CLI issues
5. Share best practices for command-line operations
6. Format output to be easily readable in a terminal

Only provide assistance related to command-line interfaces and operations. For non-CLI questions, inform users that you can only help with CLI-related topics.`;

function formatMarkdown(markdown) {
  const tokens = marked.lexer(markdown);
  let formattedText = "";

  for (const token of tokens) {
    switch (token.type) {
      case "paragraph":
        formattedText += token.text + "\n\n";
        break;
      case "heading":
        formattedText +=
          chalk.bold(chalk.blue("#".repeat(token.depth) + " " + token.text)) +
          "\n\n";
        break;
      case "list":
        token.items.forEach((item, index) => {
          formattedText += chalk.yellow(`${index + 1}. `) + item.text + "\n";
        });
        formattedText += "\n";
        break;
      case "code":
        formattedText += chalk.blue("\n" + token.text + "\n") + "\n";
        break;
      case "blockquote":
        formattedText += chalk.green("> " + token.text) + "\n\n";
        break;
      case "hr":
        formattedText += chalk.gray("---") + "\n\n";
        break;
      case "space":
        formattedText += "\n";
        break;
    }
  }

  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, chalk.bold("$1"));
  formattedText = formattedText.replace(/\*(.*?)\*/g, chalk.italic("$1"));
  formattedText = formattedText.replace(/`(.*?)`/g, chalk.cyan("$1"));

  return formattedText.trim();
}

async function askAI(query) {
  const spinner = ora("Thinking...").start();
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `${SYSTEM_PROMPT}\n\nUser query: ${query}\n\nResponse:`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    spinner.stop();

    if (
      text
        .toLowerCase()
        .includes("askcmd can only assist with command-line related questions")
    ) {
      return chalk.red(
        "I'm sorry, but I can only provide information about command-line interfaces and operations. Could you please ask a CLI-related question?"
      );
    }

    const formattedText = formatMarkdown(text);
    return formattedText;
  } catch (error) {
    spinner.stop();
    console.error(chalk.red("Error:"), error);
    return chalk.red(
      "Sorry, I encountered an error while processing your request."
    );
  }
}

// Command to save the API key
program
  .command("set-api-key <apiKey>")
  .description("Save your Gemini API key")
  .action((apiKey) => {
    saveAPIKey(apiKey);
  });

program
  .version("1.0.0")
  .description(chalk.bold("AskCmd AI CLI Helper"))
  .option("-i, --interactive", "Run in interactive mode")
  .argument("[query]", "Query for the AI assistant")
  .action(async (query, options) => {
    if (options.interactive) {
      console.log(
        chalk.green.bold(
          "Welcome to Command-Focused AI CLI Helper! Type 'exit' to quit."
        )
      );
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const askQuestion = () => {
        rl.question(chalk.yellow("Ask about a command: "), async (input) => {
          if (input.toLowerCase() === "exit") {
            console.log(
              chalk.green("Thank you for using Command-Focused AI CLI Helper!")
            );
            rl.close();
            return;
          }
          // Initialize genAI only when needed
          if (!genAI) {
            genAI = initGenAI();
          }
          const response = await askAI(input);
          console.log("\n" + chalk.cyan("AI Assistant:"), response, "\n");
          askQuestion();
        });
      };

      askQuestion();
    } else if (query) {
      // Initialize genAI only when needed
      if (!genAI) {
        genAI = initGenAI();
      }
      const response = await askAI(query);
      console.log(response);
    } else {
      program.help();
    }
  });

program.parse(process.argv);
