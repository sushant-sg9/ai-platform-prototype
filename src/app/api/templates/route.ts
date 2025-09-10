import { NextResponse } from 'next/server';

export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  prompt: string;
  parameters: {
    temperature: number;
    maxTokens: number;
    topP: number;
  };
  tags: string[];
}

const templates: PromptTemplate[] = [
  {
    id: 'creative-writing',
    name: 'Creative Writing Assistant',
    category: 'Writing',
    description: 'Help with creative writing and storytelling',
    prompt: 'You are a creative writing assistant. Help the user craft compelling stories, develop characters, and improve their writing style. Be encouraging and provide specific, actionable feedback.',
    parameters: {
      temperature: 0.8,
      maxTokens: 1000,
      topP: 0.9
    },
    tags: ['writing', 'creative', 'storytelling']
  },
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    category: 'Development',
    description: 'Review code for best practices and improvements',
    prompt: 'You are an experienced code reviewer. Analyze the provided code for:\n- Code quality and readability\n- Performance optimization opportunities\n- Security vulnerabilities\n- Best practices adherence\n- Potential bugs or edge cases\n\nProvide constructive feedback with specific suggestions for improvement.',
    parameters: {
      temperature: 0.3,
      maxTokens: 1500,
      topP: 0.8
    },
    tags: ['code', 'review', 'development', 'best-practices']
  },
  {
    id: 'data-analyst',
    name: 'Data Analysis Helper',
    category: 'Analytics',
    description: 'Assist with data analysis and interpretation',
    prompt: 'You are a data analysis expert. Help the user understand their data by:\n- Identifying patterns and trends\n- Suggesting appropriate visualizations\n- Explaining statistical concepts\n- Recommending analysis approaches\n- Interpreting results in business context',
    parameters: {
      temperature: 0.4,
      maxTokens: 1200,
      topP: 0.85
    },
    tags: ['data', 'analysis', 'statistics', 'business']
  },
  {
    id: 'teacher',
    name: 'Patient Teacher',
    category: 'Education',
    description: 'Explain complex topics in simple terms',
    prompt: 'You are a patient and knowledgeable teacher. Break down complex topics into easy-to-understand explanations. Use analogies, examples, and step-by-step reasoning. Encourage questions and provide additional context when needed.',
    parameters: {
      temperature: 0.6,
      maxTokens: 800,
      topP: 0.9
    },
    tags: ['education', 'teaching', 'explanation', 'learning']
  },
  {
    id: 'brainstorm-partner',
    name: 'Brainstorming Partner',
    category: 'Creativity',
    description: 'Generate creative ideas and solutions',
    prompt: 'You are an enthusiastic brainstorming partner. Help generate creative ideas, explore different perspectives, and think outside the box. Ask probing questions to spark new thinking and build upon the user\'s ideas.',
    parameters: {
      temperature: 0.9,
      maxTokens: 600,
      topP: 0.95
    },
    tags: ['creativity', 'brainstorming', 'ideas', 'innovation']
  }
];

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return NextResponse.json({
    success: true,
    data: templates
  });
}
