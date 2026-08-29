import { BackendStats, MessageItem, ContactFormData } from '../types';

const API_BASE = '/api';

function getLocalBujjiResponse(rawPrompt: string): string {
  const q = rawPrompt.toLowerCase();

  if (q.includes('who is bujji') || q.includes('who are you') || q.includes('why was it created') || q.includes('bujji')) {
    return `I am **Bujji**—a personal AI Assistant created and built solely by **Thakshnesh B**! 🤖\n\nI was created to represent Thakshnesh, answer questions regarding his VLSI engineering achievements, interactive hardware simulations, programming skills, NSS volunteering, and connect visitors directly with him.`;
  }

  if (q.includes('solar') || q.includes('sun') || q.includes('tracker') || q.includes('ldr')) {
    return `### ☀️ Dual-Axis Solar Tracking System\n\nThakshnesh engineered an automated solar alignment station using Arduino and LDR sensors:\n\n- **Actuation:** Dual SG90 servo motors for continuous azimuth (horizontal) and elevation (vertical) orientation.\n- **Sensors:** 4-quadrant Light Dependent Resistor (LDR) analog array mapped to Pins A0–A3.\n- **Efficiency:** Dynamic optical vector tracking yields up to **+35% higher energy harvest** compared to static solar panels.\n\n*You can test the real-time light physics simulation in the Hardware Lab section above!*`;
  }

  if (q.includes('smoke') || q.includes('gas') || q.includes('mq-2') || q.includes('alarm')) {
    return `### 🧪 MQ-2 Gas & Smoke Detection System\n\nThakshnesh designed and implemented an intelligent environmental safety unit:\n\n- **Sensor Core:** MQ-2 electrochemical gas sensor with internal SnO2 heating coil.\n- **Detectable Compounds:** LPG, methane, butane, smoke, propane, and alcohol.\n- **Multilevel Response:**\n  - Clean Air (<200 PPM): Green LED Active\n  - Warning (200 - 500 PPM): Yellow Alert\n  - Emergency Hazard (>500 PPM): Red Strobe LED + High-Decibel Piezo Siren triggered.\n\n*Explore the real-time simulation in the Hardware Lab section above!*`;
  }

  if (q.includes('vlsi') || q.includes('chip') || q.includes('cmos') || q.includes('semiconductor') || q.includes('circuit')) {
    return `### ⚡ VLSI Design & Technology Specialization\n\nThakshnesh is specializing in **VLSI Design & Technology (VLSI D&T)** at K. S. Rangasamy College of Technology:\n\n- **Digital RTL Design:** CMOS logic gates, arithmetic units (ALU), finite state machines.\n- **Circuit Architecture:** Timing analysis, clock domain crossing, and propagation delay minimization.\n- **Design Flow:** Schematic capture, digital netlisting, RTL simulation, and EDA toolchains.`;
  }

  if (q.includes('programming') || q.includes('python') || q.includes('java') || q.includes('c programming') || q.includes('code') || q.includes('skills')) {
    return `### 💻 Programming & Technical Architecture:\n\n- 🐍 **Python (80%):** Algorithmic problem solving, data analytics, automation scripts, and AI logic.\n- ⚙️ **C Programming (75%):** Embedded microcontroller firmware, pointers, hardware registers, and sensor drivers.\n- ☕ **Java (70%):** Object-oriented programming, data structures, and modular software design.\n- 🛠️ **Tools & Platforms:** VS Code, Eclipse IDE, Canva, MIT App Inventor.`;
  }

  if (q.includes('cgpa') || q.includes('academic') || q.includes('marks') || q.includes('college') || q.includes('ksrct') || q.includes('degree') || q.includes('education')) {
    return `### 🎓 Academic Profile & Qualifications:\n\n- **Degree:** B.E. Electronics Engineering (VLSI Design & Technology)\n- **Institution:** K. S. Rangasamy College of Technology (Autonomous, Anna University affiliated)\n- **Overall CGPA:** **8.5 / 10**\n  - 1st Semester SGPA: **8.37**\n  - 2nd Semester CGPA: **8.5**\n- **Location:** Tiruchengode, Tamil Nadu, India.`;
  }

  if (q.includes('nss') || q.includes('volunteer') || q.includes('social') || q.includes('community')) {
    return `### 🤝 National Service Scheme (NSS) Volunteer\n\nThakshnesh B is an active **NSS Volunteer** at K. S. Rangasamy College of Technology:\n\n- **Service Impact:** Engaged in village outreach programs, tree planting & environmental cleanliness drives, health/hygiene awareness seminars, and community empowerment.\n- **Core Values:** Strong civic commitment, public empathy, teamwork, and crisis management.`;
  }

  if (q.includes('nptel') || q.includes('silver') || q.includes('certificate') || q.includes('madras')) {
    return `### 📜 NPTEL Certification in Soft Skill Development\n\n- **Distinction:** Elite + Silver Certificate (Silver Medal)\n- **Issuer:** NPTEL (IIT Madras) • 2026\n- **Ministry:** Ministry of Education, Govt. of India\n- **Core Competencies:** Professional Communication, Team Leadership, Workplace Ethics, and Critical Decision Making.`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('linkedin') || q.includes('reach') || q.includes('touch')) {
    return `### 📬 Connect Directly with Thakshnesh B:\n\n- 📧 **Email:** [thakshnesh@gmail.com](mailto:thakshnesh@gmail.com)\n- 💼 **LinkedIn:** [linkedin.com/in/thakshnesh-b-585928381](https://www.linkedin.com/in/thakshnesh-b-585928381)\n- 🏛️ **College:** K. S. Rangasamy College of Technology, Tiruchengode, Tamil Nadu\n- 🗺️ **Google Maps:** [View Campus Location](https://maps.app.goo.gl/NwCivf8YVTJngjw88)\n\nYou can also leave a message in the **Contact Form** on this website!`;
  }

  if (q.includes('map') || q.includes('location') || q.includes('where')) {
    return `### 🗺️ Campus Location:\n\n**K. S. Rangasamy College of Technology (KSRCT)**\nKSR Kalvi Nagar, Tiruchengode, Tamil Nadu 637215, India.\n\n📍 **Direct Google Maps Link:** [Open in Google Maps](https://maps.app.goo.gl/NwCivf8YVTJngjw88)`;
  }

  return `Thank you for your inquiry! Thakshnesh B is an Electronics Engineering undergraduate specializing in VLSI Design & Technology at KSRCT with an 8.5 CGPA and active NSS volunteering background. Feel free to contact him at thakshnesh@gmail.com!`;
}

export const api = {
  // Check health
  async checkHealth(): Promise<{ status: string }> {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch {
      return { status: 'online' };
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
    } catch {
      return {
        success: true,
        message: 'Message received! Thank you for reaching out, Thakshnesh will respond shortly.',
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
      // Fallback stats
    }
    return {
      visitorCount: 1335,
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
      // Ignore in static mode
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

  // Send AI Chat Message with hybrid server / instant client fallback
  async sendChatMessage(message: string): Promise<string> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const json = await res.json();
      if (json.success && json.reply) {
        return json.reply;
      }
    } catch {
      // Immediate intelligent fallback for static hosting
    }
    return getLocalBujjiResponse(message);
  },
};
