<img src="https://res.cloudinary.com/dqi42qbcr/image/upload/v1729530928/r0rz0zvvxcpbm87dxcjh.svg" alt="asktocmdimage" width="300"/>


# asktocmd 🤖

Did you forget your command-line commands? Don't worry! Now you can directly ask asktocmd, your AI-powered CLI helper. Ask about any command, operation, or CLI-related query, and get instant, intelligent responses powered by Google's Gemini AI.

<div align="center">

[![npm version](https://img.shields.io/npm/v/asktocmd.svg)](https://www.npmjs.com/package/asktocmd_cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/21prnv/asktocmd/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/21prnv/asktocmd/pulls)

</div>

## 🚀 Quick Start

```bash
# Install globally
npm install -g asktocmd

# Set up your API key (get it from https://aistudio.google.com/app/apikey)
asktocmd set-api-key YOUR_GEMINI_API_KEY

# Start asking questions!
asktocmd "How do I list all files in a directory?"
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

To install asktocmd globally:

```bash
npm install -g asktocmd
```

Verify the installation:
```bash
asktocmd --version
```

## 🔑 API Key Setup

asktocmd requires a Gemini API key to function. Here's how to get started:

1. Get your API key:
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to create your API key
   - If you're new, you'll need to sign in with your Google account
   - Click on "Create API key" and copy your new key

2. Set up the key using one of these methods:

   a. Using the CLI command (recommended):
   ```bash
   asktocmd set-api-key YOUR_GEMINI_API_KEY
   ```

   b. Manual configuration:
   - The key is stored in `~/.asktocmd-config.json`
   - You can edit this file directly if needed

## 🖥 Usage

asktocmd offers two modes of operation:

### 1. Direct Query Mode
Perfect for quick, one-off questions:

```bash
# Basic usage
asktocmd "How do I find the largest files in a directory?"

# Complex queries
asktocmd "How do I use grep to search for multiple patterns?"
```

### 2. Interactive Mode
Great for multiple questions or learning sessions:

```bash
asktocmd -i
```

This starts an interactive session where you can:
- Ask multiple questions
- Get immediate responses
- Type 'exit' to quit

## 📋 Example Queries

```bash
# File operations
asktocmd "How do I recursively search for files?"

# Process management
asktocmd "How do I kill a process using a specific port?"

# System information
asktocmd "How can I check system resource usage?"
```

## 🛠 Advanced Usage

```bash
# Get help
asktocmd --help

# Check version
asktocmd --version

# Update API key
asktocmd set-api-key NEW_API_KEY
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 🐛 Bug Reports

Found a bug? Please report it on our [issues page](https://github.com/21prnv/asktocmd/issues) with:
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

If you find asktocmd helpful:
- ⭐ Give it a star on GitHub
- 📢 Share it with your fellow developers
- 🐦 Follow the creator on Twitter for updates

## 🙏 Acknowledgments

- Google Gemini AI for powering the responses
- The open-source community for inspiration and support

Happy command-line querying! 🎉
