#!/usr/bin/env node

import { program } from "commander";
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";
import { marked } from "marked";
import chalk from "chalk";
import ora from "ora";
import dotenv from "dotenv";

// Initialize Gemini API
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are an AI assistant specifically designed to help with command-line interface (CLI) commands and operations...`;

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

  // Handle inline formatting
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
        .includes("AskCmd can only assist with command-line related questions")
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
    if (error == " TypeError: fetch failed") {
      return chalk.red(
        "Sorry, I encountered an error while processing your request.Please check your internet connection"
      );
    }
    return chalk.red(
      "Sorry, I encountered an error while processing your request."
    );
  }
}

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
          const response = await askAI(input);
          console.log("\n" + chalk.cyan("AI Assistant:"), response, "\n");
          askQuestion();
        });
      };

      askQuestion();
    } else if (query) {
      const response = await askAI(query);
      console.log(response);
    } else {
      program.help();
    }
  });

program.parse(process.argv);
