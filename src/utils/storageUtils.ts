
import { Message } from '../components/ChatInterface';

const CHAT_HISTORY_KEY = 'gemini_chat_history';

export const saveChatHistory = (messages: Message[]): void => {
  try {
    const serializedMessages = messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp.toISOString()
    }));
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(serializedMessages));
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
};

export const loadChatHistory = (): Message[] => {
  try {
    const saved = localStorage.getItem(CHAT_HISTORY_KEY);
    if (!saved) return [];
    
    const parsed = JSON.parse(saved);
    return parsed.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
  } catch (error) {
    console.error('Failed to load chat history:', error);
    return [];
  }
};

export const clearChatHistory = (): void => {
  try {
    localStorage.removeItem(CHAT_HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear chat history:', error);
  }
};
