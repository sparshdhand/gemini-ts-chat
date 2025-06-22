
# Gemini Swift Chat

A modern web-based chat interface for Google's Gemini AI models, built with React, TypeScript, and Tailwind CSS.

## Features

- 🤖 **Multiple Gemini Models**: Support for all available Gemini models including Pro, Flash, and Vision variants
- 💬 **ChatGPT-like Interface**: Clean, modern chat interface with message history
- 🔐 **Secure API Key Management**: Local storage of API keys with easy management
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 💾 **Persistent Chat History**: Conversations are saved locally on your device
- ⚡ **Real-time Responses**: Fast, streaming responses from Gemini AI
- 🎨 **Beautiful UI**: Modern gradient design with smooth animations

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher)
- **npm** (comes with Node.js) or **yarn**
- A **Gemini API key** from Google AI Studio

## Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key (keep it secure!)

## Installation Instructions

### Option 1: Clone from GitHub (Recommended)

1. **Clone the repository**:
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd gemini-swift-chat
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:8080
   ```

### Option 2: Download and Extract

1. **Download** the project as a ZIP file
2. **Extract** the ZIP file to your desired location
3. **Open terminal/command prompt** in the extracted folder
4. **Follow steps 2-4** from Option 1 above

## First Time Setup

1. **Launch the application** in your browser
2. **Enter your API key** when prompted (or click the key icon in the top-right)
3. **Select your preferred Gemini model** from the settings
4. **Start chatting!** Your conversations will be saved automatically

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally

## Usage

### Setting Up Your API Key

1. Click the **key icon** (🔑) in the top navigation
2. Paste your Gemini API key
3. Click **"Save API Key"**
4. Your key is stored securely in your browser's local storage

### Selecting Models

1. Click the **settings icon** (⚙️) in the top navigation
2. Choose from available Gemini models:
   - `gemini-1.5-flash` - Fast responses, good for general chat
   - `gemini-1.5-pro` - More capable, better for complex tasks
   - `gemini-1.0-pro` - Original Gemini model
   - And more...

### Chat Features

- **Send messages**: Type your message and press Enter or click Send
- **Copy responses**: Click the copy icon on any message
- **Clear history**: Click the trash icon to clear all messages
- **Auto-scroll**: Messages automatically scroll to the latest

## Data Storage

- **API Keys**: Stored locally in your browser (never sent to our servers)
- **Chat History**: Saved in your browser's local storage
- **Model Preferences**: Remembered between sessions

## Troubleshooting

### Common Issues

**Error: "API Key Required"**
- Make sure you've entered your Gemini API key correctly
- Verify your API key is active in Google AI Studio

**Error: "Failed to send message"**
- Check your internet connection
- Verify your API key hasn't expired
- Try switching to a different Gemini model

**Application won't start**
- Ensure Node.js version 18+ is installed
- Delete `node_modules` and run `npm install` again
- Check that port 8080 isn't being used by another application

### Clearing Data

To reset the application:
1. Clear chat history using the trash icon in the app
2. Or manually clear browser data for localhost:8080

## Development

### Project Structure

```
src/
├── components/          # React components
│   ├── ChatInterface.tsx    # Main chat interface
│   ├── ChatMessage.tsx      # Individual message component
│   ├── ModelSelector.tsx    # Model selection dropdown
│   └── ApiKeyManager.tsx    # API key management modal
├── services/           # API services
│   └── geminiService.ts    # Gemini API integration
├── utils/              # Utility functions
│   └── storageUtils.ts     # Local storage helpers
└── pages/              # Page components
    └── Index.tsx           # Main page
```

### Built With

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Security Notes

- API keys are stored only in your browser's local storage
- No data is sent to external servers except Google's Gemini API
- Chat history remains on your device

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review your API key and network connection
3. Try clearing your browser cache
4. Open browser developer tools to check for error messages

---

**Enjoy chatting with Gemini AI! 🚀**
