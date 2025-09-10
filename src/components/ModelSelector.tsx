'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Cpu } from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
}

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  const [models, setModels] = useState<AIModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchModels = useCallback(async () => {
    try {
      const response = await fetch('/api/models');
      const data = await response.json();
      if (data.success) {
        setModels(data.data);
        if (!selectedModel && data.data.length > 0) {
          onModelChange(data.data[0].id);
        }
      }
    } catch (error) {
      console.error('Failed to fetch models:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedModel, onModelChange]);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const selectedModelData = models.find(model => model.id === selectedModel);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <div className="text-left">
            <div className="font-medium text-gray-900 dark:text-white">
              {selectedModelData?.name || 'Select Model'}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {selectedModelData?.provider}
            </div>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                onModelChange(model.id);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selectedModel === model.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {model.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {model.provider} • {model.description}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
