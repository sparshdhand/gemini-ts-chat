
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from 'lucide-react';
import { getAvailableModels } from '../services/geminiService';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  apiKey: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
  apiKey,
}) => {
  const [models, setModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Default models if API call fails
  const defaultModels = [
    'gemini-1.5-flash',
    'gemini-1.5-flash-8b',
    'gemini-1.5-pro',
    'gemini-1.0-pro',
    'gemini-1.0-pro-vision',
  ];

  useEffect(() => {
    const fetchModels = async () => {
      if (!apiKey) {
        setModels(defaultModels);
        return;
      }

      setLoading(true);
      try {
        const availableModels = await getAvailableModels(apiKey);
        setModels(availableModels.length > 0 ? availableModels : defaultModels);
      } catch (error) {
        console.error('Error fetching models:', error);
        setModels(defaultModels);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [apiKey]);

  const getModelInfo = (model: string) => {
    const info = {
      'gemini-1.5-flash': { badge: 'Fast', color: 'bg-green-500' },
      'gemini-1.5-flash-8b': { badge: 'Ultra Fast', color: 'bg-blue-500' },
      'gemini-1.5-pro': { badge: 'Advanced', color: 'bg-purple-500' },
      'gemini-1.0-pro': { badge: 'Classic', color: 'bg-gray-500' },
      'gemini-1.0-pro-vision': { badge: 'Vision', color: 'bg-orange-500' },
    };
    return info[model as keyof typeof info] || { badge: 'Model', color: 'bg-gray-500' };
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Model Selection</h3>
        {loading && <Loader2 className="w-4 h-4 animate-spin text-purple-400" />}
      </div>
      
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="bg-white/10 border-white/20 text-white">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700">
          {models.map((model) => {
            const info = getModelInfo(model);
            return (
              <SelectItem key={model} value={model} className="text-white hover:bg-slate-700">
                <div className="flex items-center justify-between w-full">
                  <span>{model}</span>
                  <Badge className={`ml-2 ${info.color} text-white text-xs`}>
                    {info.badge}
                  </Badge>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      
      <div className="text-sm text-gray-400">
        <p>Selected: <span className="text-purple-400 font-medium">{selectedModel}</span></p>
        <p className="mt-1">
          {models.includes(selectedModel) 
            ? "✓ Model available" 
            : "⚠ Model may not be available with your API key"
          }
        </p>
      </div>
    </div>
  );
};

export default ModelSelector;
