
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, ExternalLink, Eye, EyeOff } from 'lucide-react';

interface ApiKeyManagerProps {
  onApiKeySet: (apiKey: string) => void;
  onClose: () => void;
  currentApiKey: string;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({
  onApiKeySet,
  onClose,
  currentApiKey,
}) => {
  const [apiKey, setApiKey] = useState(currentApiKey);
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
    }
  };

  const handleGetApiKey = () => {
    window.open('https://makersuite.google.com/app/apikey', '_blank');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-purple-400" />
            <span>Gemini API Key</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter your Google AI Gemini API key to start chatting
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert className="bg-blue-900/20 border-blue-500/30">
            <AlertDescription className="text-blue-200">
              Your API key is stored locally in your browser and never sent to our servers.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="apikey" className="text-sm font-medium">
              API Key
            </Label>
            <div className="relative">
              <Input
                id="apikey"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key..."
                className="bg-slate-800 border-slate-600 text-white pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-white"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            <p>Don't have an API key?</p>
            <Button
              variant="link"
              className="p-0 h-auto text-purple-400 hover:text-purple-300"
              onClick={handleGetApiKey}
            >
              Get one free from Google AI Studio
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!apiKey.trim()}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Save Key
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyManager;
