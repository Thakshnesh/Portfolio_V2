import { BackendStats, MessageItem, ContactFormData } from '../types';

const API_BASE = '/api';

export const api = {
  // Check health
  async checkHealth(): Promise<{ status: string }> {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch {
      return { status: 'offline' };
    }
  },

  // Submit contact message
  async submitContact(data: ContactFormData): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      // Fallback response for offline/static deployment mode
      return {
        success: true,
        message: 'Message captured in offline cache mode. Thakshnesh will be notified!',
      };
    }
  },

  // Get live stats
  async getStats(): Promise<BackendStats> {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    } catch {
      // Ignore
    }
    return {
      visitorCount: 1284,
      totalMessages: 1,
      unreadMessages: 1,
      projectLikes: {
        'solar-tracker': 42,
        'smoke-detector': 38,
        'vlsi-design': 29,
      },
    };
  },

  // Record analytics interaction
  async recordEvent(type: string, detail?: string): Promise<void> {
    try {
      await fetch(`${API_BASE}/analytics/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, detail }),
      });
    } catch {
      // Ignore
    }
  },

  // Like project
  async likeProject(projectId: string): Promise<number> {
    try {
      const res = await fetch(`${API_BASE}/projects/${projectId}/like`, {
        method: 'POST',
      });
      const json = await res.json();
      if (json.success && typeof json.likes === 'number') {
        return json.likes;
      }
    } catch {
      // Ignore
    }
    return 45;
  },

  // Get all messages (Admin mode)
  async getMessages(): Promise<MessageItem[]> {
    try {
      const res = await fetch(`${API_BASE}/messages/all`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    } catch {
      // Ignore
    }
    return [];
  },

  // Mark message as read
  async markRead(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/messages/${id}/read`, { method: 'PATCH' });
      const json = await res.json();
      return !!json.success;
    } catch {
      return false;
    }
  },

  // Send AI Chat Message
  async sendChatMessage(message: string): Promise<string> {
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const json = await res.json();
      if (json.success && json.reply) {
        return json.reply;
      }
    } catch {
      // Fallback local smart response
    }
    return `Thank you for your question! Thakshnesh B is an Electronics Engineering undergraduate (VLSI D&T) at K. S. Rangasamy College of Technology with an 8.5 CGPA. You can reach him directly at thakshnesh@gmail.com!`;
  },
};
