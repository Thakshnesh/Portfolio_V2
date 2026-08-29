import fs from 'fs';
import path from 'path';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read: boolean;
  ip?: string;
}

export interface AnalyticsRecord {
  id: string;
  type: 'page_view' | 'project_sim_run' | 'terminal_cmd' | 'resume_download' | 'theme_toggle';
  detail?: string;
  timestamp: string;
  userAgent?: string;
}

export interface ProjectLike {
  projectId: string;
  likes: number;
}

export interface PortfolioDatabase {
  messages: ContactMessage[];
  analytics: AnalyticsRecord[];
  projectLikes: Record<string, number>;
  visitorCount: number;
}

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const DB_FILE = path.join(DATA_DIR, 'portfolio_data.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const defaultData: PortfolioDatabase = {
  messages: [
    {
      id: 'msg-welcome-1',
      name: 'System Recruiter',
      email: 'recruiter@techventures.io',
      subject: 'Impressive 3D VLSI & Embedded Portfolio!',
      message: 'Hello Thakshnesh, we reviewed your Solar Tracking System & MQ-2 sensor simulation. Great hardware & software synergy. Looking forward to connecting!',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: false,
      ip: '127.0.0.1',
    },
  ],
  analytics: [],
  projectLikes: {
    'solar-tracker': 42,
    'smoke-detector': 38,
    'vlsi-design': 29,
  },
  visitorCount: 1284,
};

function readDB(): PortfolioDatabase {
  try {
    if (!fs.existsSync(DB_FILE)) {
      writeDB(defaultData);
      return defaultData;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB, falling back to memory/default:', err);
    return defaultData;
  }
}

function writeDB(data: PortfolioDatabase) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to DB file:', err);
  }
}

export const db = {
  // Messages
  addMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
    const data = readDB();
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    data.messages.unshift(newMsg);
    writeDB(data);
    return newMsg;
  },

  getMessages(): ContactMessage[] {
    const data = readDB();
    return data.messages;
  },

  markMessageRead(id: string): boolean {
    const data = readDB();
    const target = data.messages.find((m) => m.id === id);
    if (target) {
      target.read = true;
      writeDB(data);
      return true;
    }
    return false;
  },

  deleteMessage(id: string): boolean {
    const data = readDB();
    const initialLen = data.messages.length;
    data.messages = data.messages.filter((m) => m.id !== id);
    if (data.messages.length !== initialLen) {
      writeDB(data);
      return true;
    }
    return false;
  },

  // Analytics
  recordEvent(type: AnalyticsRecord['type'], detail?: string, userAgent?: string): void {
    const data = readDB();
    if (type === 'page_view') {
      data.visitorCount = (data.visitorCount || 0) + 1;
    }
    data.analytics.push({
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type,
      detail,
      timestamp: new Date().toISOString(),
      userAgent,
    });
    // Keep max 1000 latest events
    if (data.analytics.length > 1000) {
      data.analytics = data.analytics.slice(-1000);
    }
    writeDB(data);
  },

  getStats() {
    const data = readDB();
    return {
      visitorCount: data.visitorCount || 1284,
      totalMessages: data.messages.length,
      unreadMessages: data.messages.filter((m) => !m.read).length,
      projectLikes: data.projectLikes,
      recentEvents: data.analytics.slice(-15),
    };
  },

  // Likes
  likeProject(projectId: string): number {
    const data = readDB();
    data.projectLikes[projectId] = (data.projectLikes[projectId] || 0) + 1;
    writeDB(data);
    return data.projectLikes[projectId];
  },
};
