<img src="https://github.com/user-attachments/assets/21766e7e-f02a-413e-97cd-8ec281f7668f" alt="askcmdimage" width="300"/>


# AskCmd 🤖

Did you forget your command-line commands? Don't worry! Now you can directly ask AskCmd, your AI-powered CLI helper. Ask about any command, operation, or CLI-related query, and get instant, intelligent responses powered by Google's Gemini AI.

<div align="center">

[![npm version](https://img.shields.io/npm/v/askcmd.svg)](https://www.npmjs.com/package/askcmd)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/21prnv/askcmd/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/21prnv/askcmd/pulls)

</div>

## 🚀 Quick Start

```bash
# Install globally
npm install -g askcmd

# Set up your API key (get it from https://aistudio.google.com/app/apikey)
askcmd set-api-key YOUR_GEMINI_API_KEY

# Start asking questions!
askcmd "How do I list all files in a directory?"
```

## 🌟 Features

- 🤖 AI-powered responses to command-line queries using Google's Gemini AI
- 💬 Interactive mode for continuous questioning
- 🎨 Beautiful terminal output with syntax highlighting
- 📝 Markdown formatting for easy readability
- 🚀 Fast and efficient responses
- 📚 Comprehensive command-line knowledge
- 🌐 Works across different operating systems

## 📦 Installation

To install AskCmd globally:

```bash
npm install -g askcmd
```

Verify the installation:
```bash
askcmd --version
```

## 🔑 API Key Setup

AskCmd requires a Gemini API key to function. Here's how to get started:

1. Get your API key:
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to create your API key
   - If you're new, you'll need to sign in with your Google account
   - Click on "Create API key" and copy your new key

2. Set up the key using one of these methods:

   a. Using the CLI command (recommended):
   ```bash
   askcmd set-api-key YOUR_GEMINI_API_KEY
   ```

   b. Manual configuration:
   - The key is stored in `~/.askcmd-config.json`
   - You can edit this file directly if needed

## 🖥 Usage

AskCmd offers two modes of operation:

### 1. Direct Query Mode
Perfect for quick, one-off questions:

```bash
# Basic usage
askcmd "How do I find the largest files in a directory?"

# Complex queries
askcmd "How do I use grep to search for multiple patterns?"
```

### 2. Interactive Mode
Great for multiple questions or learning sessions:

```bash
askcmd -i
```

This starts an interactive session where you can:
- Ask multiple questions
- Get immediate responses
- Type 'exit' to quit

## 📋 Example Queries

```bash
# File operations
askcmd "How do I recursively search for files?"

# Process management
askcmd "How do I kill a process using a specific port?"

# System information
askcmd "How can I check system resource usage?"
```

## 🛠 Advanced Usage

```bash
# Get help
askcmd --help

# Check version
askcmd --version

# Update API key
askcmd set-api-key NEW_API_KEY
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 🐛 Bug Reports

Found a bug? Please report it on our [issues page](https://github.com/21prnv/askcmd/issues) with:
- A clear description of the issue
- Steps to reproduce
- Expected vs actual behavior

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Pranav**
- Twitter: [@21prnv](https://twitter.com/21prnv)
- GitHub: [@21prnv](https://github.com/21prnv)

## 💖 Support

If you find AskCmd helpful:
- ⭐ Give it a star on GitHub
- 📢 Share it with your fellow developers
- 🐦 Follow the creator on Twitter for updates

## 🙏 Acknowledgments

- Google Gemini AI for powering the responses
- The open-source community for inspiration and support

Happy command-line querying! 🎉
