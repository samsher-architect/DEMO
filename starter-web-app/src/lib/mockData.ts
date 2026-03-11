import { Demo, CompanyDetails } from '../types';

export const MOCK_COMPANY_DETAILS: CompanyDetails = {
  id: '1',
  name: 'OmniServe Intelligence',
  description: 'Transforming Customer Service with Next-Gen AI Agents, Amazon Connect Integration, and Salesforce CRM Sync.',
  logo_url: 'https://i.imgur.com/05beTFf.png',
  website: 'https://omniserveai.com',
  contact_email: 'contact@omniserveai.com',
  established_year: 2023,
  address: '123 Innovation Drive, Tech City, TC 10010'
};

export const MOCK_DEMOS: Demo[] = [
  {
    id: '1',
    title: 'OmniServe AI Customer Support Agent',
    description: 'See how our AI agent handles complex customer queries, processes refunds, and updates account information seamlessly.',
    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    image_url: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=1920&q=80',
    tags: ['Customer Support', 'NLP', 'Automated Refunds'],
    points: [
      'Understands natural language and sentiment',
      'Integrates directly with your CRM',
      'Reduces human escalation by 70%',
      '24/7 instant response times'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Sales Outreach Automation',
    description: 'A demonstration of the outbound sales agent qualifying leads and booking meetings directly onto your calendar.',
    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80',
    tags: ['Sales', 'Lead Generation', 'Scheduling'],
    points: [
      'Personalized email and SMS outreach',
      'Intelligent follow-up sequences',
      'Direct calendar integration (Google/Outlook)',
      'Objection handling capabilities'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'IT Helpdesk Assistant',
    description: 'Watch the AI assistant troubleshoot common IT issues, reset passwords, and provision software access autonomously.',
    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80',
    tags: ['IT Support', 'Troubleshooting', 'Automation'],
    points: [
      'Automated password resets',
      'Software provisioning workflows',
      'Knowledge base integration',
      'Ticket categorization and routing'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'E-commerce Order Tracking',
    description: 'An AI agent that provides real-time order status, handles returns, and answers product-related questions.',
    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80',
    tags: ['E-commerce', 'Order Tracking', 'Returns'],
    points: [
      'Real-time shipping updates',
      'Automated return processing',
      'Product recommendation engine',
      'Inventory system integration'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Healthcare Appointment Scheduler',
    description: 'See how patients can easily schedule, reschedule, or cancel appointments using natural language voice or text.',
    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80',
    tags: ['Healthcare', 'Scheduling', 'Voice AI'],
    points: [
      'HIPAA compliant architecture',
      'EHR system integration',
      'Multi-lingual voice support',
      'Automated appointment reminders'
    ],
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Financial Services Advisor',
    description: 'An intelligent agent that helps customers check balances, report lost cards, and understand their spending habits.',
    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1920&q=80',
    tags: ['Finance', 'Banking', 'Security'],
    points: [
      'Secure authentication flows',
      'Fraud detection alerts',
      'Transaction history analysis',
      'Core banking integration'
    ],
    created_at: new Date().toISOString()
  }
];
