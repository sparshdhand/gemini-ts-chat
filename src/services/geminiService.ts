
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface ModelListResponse {
  models: Array<{
    name: string;
    displayName: string;
    description: string;
    supportedGenerationMethods: string[];
  }>;
}

export const sendMessageToGemini = async (
  message: string,
  model: string,
  apiKey: string
): Promise<string> => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [
      {
        parts: [
          {
            text: message,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (data.candidates && data.candidates.length > 0) {
      const content = data.candidates[0].content;
      if (content && content.parts && content.parts.length > 0) {
        return content.parts[0].text;
      }
    }
    
    throw new Error('No valid response from Gemini API');
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

export const getAvailableModels = async (apiKey: string): Promise<string[]> => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('Error fetching models:', response.status);
      return [];
    }

    const data: ModelListResponse = await response.json();
    
    if (data.models) {
      return data.models
        .filter(model => 
          model.supportedGenerationMethods?.includes('generateContent') &&
          model.name.includes('gemini')
        )
        .map(model => model.name.replace('models/', ''))
        .sort();
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching available models:', error);
    return [];
  }
};

// Function calling capabilities (for future enhancement)
export const sendMessageWithFunctions = async (
  message: string,
  model: string,
  apiKey: string,
  functions?: Array<{
    name: string;
    description: string;
    parameters: any;
  }>
): Promise<string> => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const payload: any = {
    contents: [
      {
        parts: [
          {
            text: message,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
  };

  // Add function declarations if provided
  if (functions && functions.length > 0) {
    payload.tools = [
      {
        functionDeclarations: functions,
      },
    ];
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (data.candidates && data.candidates.length > 0) {
      const content = data.candidates[0].content;
      if (content && content.parts && content.parts.length > 0) {
        return content.parts[0].text;
      }
    }
    
    throw new Error('No valid response from Gemini API');
  } catch (error) {
    console.error('Error calling Gemini API with functions:', error);
    throw error;
  }
};
