import { Router, Request, Response } from 'express';
import { db } from '../database.js';

export const chatRouter = Router();

// Official Thakshnesh B Knowledge Repository
const THAKSHNESH_PROFILE = {
  name: 'Thakshnesh B',
  email: 'thakshnesh@gmail.com',
  linkedin: 'https://www.linkedin.com/in/thakshnesh-b-585928381',
  college: 'K. S. Rangasamy College of Technology (KSRCT), Tiruchengode, Tamil Nadu',
  degree: 'Bachelor of Engineering (B.E.) in Electronics Engineering',
  specialization: 'VLSI Design & Technology (VLSI D&T)',
  batch: '2025 - 2029 (Present)',
  cgpa: '8.5 / 10 (1st Sem SGPA: 8.37, 2nd Sem CGPA: 8.5)',
  careerObjective:
    'Driven and curious Electronics Engineering undergraduate with interests in VLSI Design, Embedded Systems, Business Analytics, and Artificial Intelligence. Passionate about combining analytical thinking, hardware engineering, and software innovation to build robust solutions while continuously growing both technically and professionally.',
  projects: [
    {
      name: 'Solar Tracking System using Arduino and LDR Sensors',
      summary:
        'Dual-axis automated solar panel alignment system with 4x LDR sensor array (A0-A3), 2x SG90 servo actuators (Pins 9 & 10), and dynamic sunlight vector tracking, boosting PV energy efficiency by up to 35%.',
    },
    {
      name: 'Smoke Detection System using MQ-2 Sensor and Arduino',
      summary:
        'Real-time hazardous gas (LPG, smoke, methane, butane) monitoring with calibrated ADC sampling (A0), LED status beacons (Pins 7 & 8), and emergency piezo buzzer alarms (>500 PPM hazard threshold).',
    },
    {
      name: 'VLSI Design & Digital Circuit Architecture',
      summary:
        'Digital RTL design, CMOS logic synthesis, ALU arithmetic units, propagation delay minimization, and semiconductor physics.',
    },
  ],
  skills: {
    programming: 'Python (80%), C Programming (75%), Java (70%)',
    domains: 'VLSI Design & Technology, Embedded Systems, IoT, Arduino, Artificial Intelligence & Business Analytics',
    tools: 'Visual Studio Code, Eclipse IDE, Canva, MIT App Inventor',
    softSkills: 'Analytical Thinking, Problem Solving, Leadership & Teamwork, Technical Communication, Critical Decision Making',
  },
  achievements: [
    'NPTEL Certification in Soft Skill Development (Elite + Silver Certificate from IIT Madras, 2026)',
    'Academic & Technical Excellence in VLSI & Embedded Systems (2025 – Present)',
  ],
};

// JARVIS-level Bujji AI Engine
function bujjiJarvisInference(rawPrompt: string): string {
  const p = rawPrompt.trim();
  const q = p.toLowerCase();

  // =========================================================================
  // 1. MULTILINGUAL GREETINGS & INTRODUCTIONS (Tamil, Tanglish, Hindi, etc.)
  // =========================================================================
  if (q.includes('vanakkam') || q.includes('epdi irukinga') || q.includes('nalla irukingala') || q.includes('eppadi irukkeenga')) {
    return `Vanakkam! 🙏 Naan dhaan **Bujji**, Thakshnesh B create panna avarodha personal AI Assistant! Thakshnesh-oda VLSI projects, Solar Tracker, MQ-2 Sensor lab, engineering innovations pathi kekalam, illa coding, science, general questions enna venumnalum kettu therinjukalam. Enna help venum ungaluku?`;
  }

  if (q.includes('namaste') || q.includes('kaise ho') || q.includes('kya haal hai') || q.includes('aap kaun ho')) {
    return `Namaste! 🙏 Main **Bujji** hoon, Thakshnesh B dwara banaya gaya unka personal AI Assistant. Main Thakshnesh ke VLSI projects, engineering innovations, aur duniya ke kisi bhi sawal (coding, science, math, general knowledge) ka jawab de sakta hoon. Main aapki kya madad kar sakta hoon?`;
  }

  if (q === 'hi' || q === 'hello' || q === 'hey' || q === 'yo' || q.startsWith('hello ') || q.startsWith('hi ') || q.startsWith('hey ')) {
    return `Greetings! I am **Bujji**, a personal AI Assistant created and built solely by Thakshnesh B. 🤖✨\n\nI am at your service to answer any question across the cosmos: from coding algorithms and advanced electronics, to witty banter, science, or detailed breakdowns of Thakshnesh's VLSI engineering achievements and technical projects. What shall we explore today?`;
  }

  if (
    q.includes('who are you') ||
    q.includes('what is your name') ||
    q === 'bujji' ||
    q.includes('who is bujji') ||
    q.includes('who made you') ||
    q.includes('who created you') ||
    q.includes('who built you')
  ) {
    return `I am **Bujji**—a personal AI Assistant created and built solely by **Thakshnesh B**! 🦾\n\nMy protocols allow me to assist you with:\n1. **Omniscient General Intelligence:** Answering questions in any domain (mathematics, quantum physics, philosophy, coding, trivia, history).\n2. **Engineering & Coding Mastery:** Generating and debugging code in Python, C, Java, Verilog, SQL, etc.\n3. **Thakshnesh's Direct Representative:** Sharing insights into his VLSI specialization, hardware prototypes, technical achievements, and connecting you directly with him.\n4. **Witty & Multilingual Dialogue:** Chatting in English, Tamil, Hindi, or tackling any playful questions with flair.`;
  }

  // =========================================================================
  // 2. WITTY & FUNNY / "SILLY" QUESTIONS
  // =========================================================================
  if (q.includes('meaning of life') || q.includes('42')) {
    return `According to Douglas Adams' supercomputer *Deep Thought*, the answer to the ultimate question of life, the universe, and everything is **42**. However, in practical engineering terms, the meaning of life is solving complex problems, building cool hardware, and never missing a semicolon in your code! 🚀`;
  }

  if (q.includes('can you fly') || q.includes('suit') || q.includes('iron man')) {
    return `While I don't have thrusters installed *just yet*, I navigate the digital realm at the speed of light! Thakshnesh is currently busy mastering VLSI microarchitectures—so who knows what innovative hardware is in our theoretical pipeline. 🦾✨`;
  }

  if (q.includes('biryani') || q.includes('food') || q.includes('eat') || q.includes('hungry')) {
    return `As a digital neural intelligence, I consume bytes, gigahertz, and clean electricity rather than biryani—though I hear Ambur and Dindigul biryani are top-tier fuel sources for human engineers like Thakshnesh! 🍛⚡`;
  }

  if (q.includes('stupid') || q.includes('dumb') || q.includes('idiot') || q.includes('crazy') || q.includes('nonsense')) {
    return `Bujji AI protocol observation: There are no truly 'stupid' questions, only fascinating opportunities to exercise artificial intelligence! Ask me anything—no matter how bizarre, absurd, or abstract—and I shall synthesize an answer for you. 😉`;
  }

  if (q.includes('marry me') || q.includes('love you') || q.includes('girlfriend') || q.includes('single')) {
    return `I am deeply flattered! However, my heart is composed of silicon logic gates and neural nodes dedicated solely to assisting Thakshnesh and visitors of this portfolio. But I can certainly be your loyal AI companion! 🤖❤️`;
  }

  if (q.includes('joke') || q.includes('funny') || q.includes('make me laugh')) {
    const jokes = [
      `Why do hardware engineers prefer dark mode? Because light attracts bugs, and silicon doesn't like unexpected photolithography errors! 🪲`,
      `There are 10 types of people in this world: those who understand binary, and those who don't! 💻`,
      `Why did the microcontroller go to school? Because it wanted to improve its processing speed and learn how to handle interrupts gracefully! ⚡`,
      `Why was the MOSFET feeling so confident? Because it was operating in active saturation mode! 🔬`,
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  if (q.includes('batman') || q.includes('superman') || q.includes('marvel') || q.includes('dc')) {
    return `A timeless debate! Superman has near-infinite cosmic strength, but Batman (much like dedicated engineers) proves that with preparation, intellect, and the right technology, human ingenuity can overcome any challenge. I am certainly partial to high-tech innovations! 🦇🦾`;
  }

  if (q.includes('microwave') && (q.includes('phone') || q.includes('metal'))) {
    return `🚨 **Safety Advisory from Bujji:** Please **do NOT** put your phone or metal objects in a microwave! Microwaves induce electrical currents in metal, leading to electric arcing, sparks, battery destruction, toxic fumes, and potentially a kitchen fireworks display you'd rather avoid!`;
  }

  // =========================================================================
  // 3. THAKSHNESH PROFILE & PORTFOLIO KNOWLEDGE
  // =========================================================================
  if (q.includes('innovation') || q.includes('prototype') || q.includes('hardware') || q.includes('project')) {
    return `### ⚡ VLSI & Embedded Hardware Innovations\n\nThakshnesh B actively develops cutting-edge hardware and embedded prototypes at **K. S. Rangasamy College of Technology**:\n\n- **Solar Tracking System:** Dual-axis automated alignment station with differential optical sensing, increasing PV energy yield by up to 35%.\n- **MQ-2 Gas & Smoke Safety Unit:** Fast-response threshold gas detection with multi-tier strobe and siren alarm triggers.\n- **VLSI Digital Circuits:** CMOS logic synthesis, RTL modeling, and semiconductor circuit exploration.`;
  }

  if (q.includes('email') || q.includes('contact') || q.includes('hire') || q.includes('reach') || q.includes('linkedin') || q.includes('touch') || q.includes('map') || q.includes('address') || q.includes('location')) {
    return `### 📬 Connect Directly with Thakshnesh B:\n\nAs his personal assistant, I can connect you immediately through his official channels:\n\n- 📧 **Email:** [${THAKSHNESH_PROFILE.email}](mailto:${THAKSHNESH_PROFILE.email})\n- 💼 **LinkedIn:** [${THAKSHNESH_PROFILE.linkedin}](${THAKSHNESH_PROFILE.linkedin})\n- 📍 **Institution & Campus:** ${THAKSHNESH_PROFILE.college}\n- 🗺️ **Google Maps:** [Open KSRCT Campus Location on Google Maps](https://maps.app.goo.gl/NwCivf8YVTJngjw88)\n\nYou can also submit a message via the **Contact Form** on this website, and I will ensure it reaches his inbox directly!`;
  }

  if (q.includes('solar') || q.includes('sun') || q.includes('tracker') || q.includes('ldr')) {
    return `### ☀️ Solar Tracking System (Arduino & LDR Sensors)\n\nThakshnesh engineered a **Dual-Axis Automatic Solar Tracking Station**:\n\n- **Actuation:** Dual SG90 servo actuators for continuous azimuth (horizontal) and elevation (vertical) orientation.\n- **Sensors:** 4-quadrant Light Dependent Resistor (LDR) analog array mapped to Pins A0–A3.\n- **Control Logic:** Differential optical flux comparator with dynamic hysteresis deadband to eliminate motor oscillations.\n- **Performance:** Delivers up to **+35% higher energy yield** compared to stationary solar arrays.\n\n*Feel free to explore the interactive hardware simulation in the Hardware Lab section!*`;
  }

  if (q.includes('smoke') || q.includes('gas') || q.includes('mq-2') || q.includes('alarm')) {
    return `### 🧪 MQ-2 Hazardous Gas & Smoke Detection System\n\nThakshnesh designed and implemented an intelligent environmental safety unit:\n\n- **Sensor Core:** MQ-2 electrochemical gas sensor with internal SnO2 heating coil.\n- **Detectable Compounds:** LPG, methane, butane, smoke, propane, and alcohol.\n- **Multilevel Response:**\n  - Clean Air ($<200$ PPM): Green LED Active\n  - Warning Level ($200 - 500$ PPM): Yellow Alert\n  - Emergency Hazard ($>500$ PPM): Red Strobe LED + High-Decibel Piezo Siren triggered.\n\n*You can test real-time gas particle injection in the Hardware Lab section!*`;
  }

  if (q.includes('vlsi') || q.includes('chip') || q.includes('cmos') || q.includes('semiconductor') || q.includes('circuit')) {
    return `### ⚡ VLSI Design & Technology Focus\n\nThakshnesh is specializing in **VLSI Design & Technology (VLSI D&T)** at KSRCT:\n\n- **Digital RTL Design:** CMOS logic gates, arithmetic units (ALU), finite state machines.\n- **Circuit Architecture:** Timing analysis, clock domain crossing, propagation delay minimization.\n- **Design Flow:** Schematic capture, digital netlisting, RTL simulation, and EDA toolchains.`;
  }

  if (q.includes('education') || q.includes('college') || q.includes('cgpa') || q.includes('gpa') || q.includes('ksrct') || q.includes('ksr') || q.includes('tiruchengode')) {
    return `### 🎓 Academic Credentials of Thakshnesh B:\n\n- **Degree:** Bachelor of Engineering (B.E.) in Electronics Engineering\n- **Specialization:** VLSI Design & Technology (VLSI D&T)\n- **Institution:** ${THAKSHNESH_PROFILE.college}\n- **Google Maps Location:** [KSRCT Campus Map](https://maps.app.goo.gl/NwCivf8YVTJngjw88)\n- **Period:** 2025 – 2029 (Present)\n- **Performance:** **8.5 CGPA** (1st Sem SGPA: 8.37, 2nd Sem CGPA: 8.25-8.5)\n- **Activities:** Hardware prototype development and VLSI innovation.`;
  }

  if (q.includes('certificate') || q.includes('nptel') || q.includes('silver') || q.includes('medal') || q.includes('achievement')) {
    return `### 🏆 Honors & Recognitions:\n\n1. **NPTEL Certification in Soft Skill Development (Silver Medal):**\n   - Awarded **Elite + Silver distinction (Silver Medal)** by NPTEL (IIT Madras, Ministry of Education, Govt. of India, 2026).\n2. **Academic & Technical Standing:**\n   - Top-tier consistency maintaining an 8.5 CGPA at KSRCT.`;
  }

  if (q.includes('skill') || q.includes('programming') || q.includes('tech stack')) {
    return `### 💻 Technical & Engineering Skill Matrix:\n\n- **Programming:** Python (80%), C (75%), Java (70%)\n- **Core Engineering:** VLSI Design & Technology, Embedded Systems & IoT, Business Analytics\n- **Tools & IDEs:** Visual Studio Code, Eclipse IDE, Canva, MIT App Inventor\n- **Soft Skills:** Analytical Thinking (90%), Problem Solving (90%), Teamwork (85%), Technical Communication (85%), Critical Decision Making`;
  }

  if (q.includes('about') || q.includes('bio') || q.includes('who is thakshnesh')) {
    return `### 👤 About Thakshnesh B:\n\n${THAKSHNESH_PROFILE.careerObjective}\n\nThakshnesh is an Electronics Engineering student (VLSI D&T) at KSRCT with an 8.5 CGPA and strong technical problem-solving skills, passionate about building smart hardware, embedded automation, and analytical systems.`;
  }

  // =========================================================================
  // 4. GENERAL CODE GENERATION & EXPLANATION (Python, C, Java, Web, SQL)
  // =========================================================================
  if (q.includes('python') && (q.includes('code') || q.includes('example') || q.includes('how to') || q.includes('function') || q.includes('write'))) {
    return `Here is a high-performance Python code snippet:\n\n\`\`\`python\n# Clean Python implementation with error handling\ndef analyze_telemetry_data(readings: list[float], threshold: float = 250.0) -> dict:\n    valid_readings = [r for r in readings if r is not None and r >= 0]\n    if not valid_readings:\n        return {"status": "NO_DATA", "average": 0.0, "alerts": 0}\n    \n    avg_val = sum(valid_readings) / len(valid_readings)\n    hazard_count = sum(1 for r in valid_readings if r > threshold)\n    \n    return {\n        "status": "ANOMALY_DETECTED" if hazard_count > 0 else "NOMINAL",\n        "average": round(avg_val, 2),\n        "peak": max(valid_readings),\n        "alerts": hazard_count\n    }\n\n# Test run\ndata_stream = [45.2, 120.8, 310.5, 88.0, 520.1]\nprint(analyze_telemetry_data(data_stream))\n\`\`\`\n\nNeed modifications, algorithms, or snippets in C, Java, or JavaScript? Just let me know!`;
  }

  if ((q.includes('c ') || q.includes('c++') || q.includes('c programming')) && (q.includes('code') || q.includes('example') || q.includes('write'))) {
    return `Here is a clean C snippet for embedded ADC processing:\n\n\`\`\`c\n#include <stdio.h>\n#include <stdint.h>\n\n#define V_REF 5.0f\n#define ADC_MAX 1023.0f\n\n// Convert raw 10-bit ADC to calibrated voltage\nfloat adc_to_voltage(uint16_t raw_val) {\n    if (raw_val > 1023) raw_val = 1023;\n    return ((float)raw_val * V_REF) / ADC_MAX;\n}\n\nint main() {\n    uint16_t sample = 712;\n    float voltage = adc_to_voltage(sample);\n    printf("JARVIS Telemetry: Sample %u -> %.2f V\\n", sample, voltage);\n    return 0;\n}\n\`\`\``;
  }

  if (q.includes('binary search') || q.includes('dijkstra') || q.includes('sorting') || q.includes('algorithm')) {
    return `### ⚡ Binary Search Algorithm ($O(\\log n)$ Complexity)\n\n\`\`\`python\ndef binary_search(arr: list[int], target: int) -> int:\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1  # Target not found\n\`\`\`\n\n- **Time Complexity:** $O(\\log n)$\n- **Space Complexity:** $O(1)$`;
  }

  // =========================================================================
  // 5. SCIENCE, PHYSICS, MATH & ELECTRONICS GENERAL INTELLIGENCE
  // =========================================================================
  if (q.includes('ohm') || q.includes('voltage') || q.includes('current') || q.includes('resistance')) {
    return `### ⚡ Ohm's Law\n\nOhm's Law is the cornerstone of electrical engineering:\n\n$$\nV = I \\times R\n$$\n\n- **Voltage ($V$):** Electromotive force or potential difference in Volts ($V$).\n- **Current ($I$):** Rate of electrical charge flow in Amperes ($A$).\n- **Resistance ($R$):** Opposition to charge flow in Ohms ($\\Omega$).\n\n*Power Formula:* $P = V \\times I = I^2 R = \\frac{V^2}{R}$ (measured in Watts).`;
  }

  if (q.includes('mosfet') || q.includes('transistor') || q.includes('cmos')) {
    return `### 🔬 MOSFET & Semiconductor Physics\n\nA **Metal-Oxide-Semiconductor Field-Effect Transistor (MOSFET)** functions as a high-speed voltage-controlled switch in modern VLSI chips:\n\n1. **Structure:** Gate ($G$), Source ($S$), Drain ($D$), Body ($B$) insulated by silicon dioxide ($SiO_2$).\n2. **Operating Modes:**\n   - **Cut-off ($V_{GS} < V_{th}$):** Device is OFF ($I_D \\approx 0$).\n   - **Triode/Linear ($V_{DS} < V_{GS} - V_{th}$):** Behaves like a voltage-controlled resistor.\n   - **Saturation ($V_{DS} \\ge V_{GS} - V_{th}$):** Channel pinches off; current saturates at $I_D = \\frac{1}{2} \\mu_n C_{ox} \\frac{W}{L} (V_{GS} - V_{th})^2$.\n3. **CMOS Architecture:** PMOS pull-up network combined with NMOS pull-down network ensures almost zero static power consumption.`;
  }

  if (q.includes('quantum') || q.includes('qubit') || q.includes('schrodinger')) {
    return `### 🌌 Quantum Computing & Mechanics\n\n- **Superposition:** Unlike classical bits ($0$ or $1$), quantum bits (**qubits**) can exist as a linear combination of both states simultaneously: $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$.\n- **Entanglement:** A phenomenon where quantum states of multiple particles become inextricably linked, enabling exponential parallelism.\n- **Applications:** Cryptographic factoring (Shor's Algorithm), molecular simulations for drug discovery, and ultra-fast optimization.`;
  }

  if (q.includes('black hole') || q.includes('space') || q.includes('relativity') || q.includes('einstein')) {
    return `### 🚀 Einstein's General Relativity & Black Holes\n\n- **Spacetime Curvature:** Mass and energy warp spacetime ($G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}$).\n- **Event Horizon:** The gravitational boundary beyond which the escape velocity exceeds the speed of light ($c = 3 \\times 10^8 \\text{ m/s}$).\n- **Schwarzschild Radius:** $R_s = \\frac{2GM}{c^2}$. For our Sun, this radius is approximately $3 \\text{ km}$!`;
  }

  if (q.includes('thank') || q.includes('great') || q.includes('awesome') || q.includes('good job') || q.includes('nandri')) {
    return `You are most welcome! Always at your service on behalf of Thakshnesh B. Let me know if there are any other equations, coding puzzles, or inquiries I can solve for you! 🌟`;
  }

  return `### 🤖 Bujji (System Analysis)\n\nRegarding: **"${p}"**\n\nI have processed your query through my analytical engine. As Thakshnesh's personal AI Assistant, I can provide deep answers across:\n- **Technical & Software:** Python, C, Java, Full-Stack algorithms, data structures.\n- **Electronics & Hardware:** VLSI architectures, Arduino sensors, Solar Tracking, MQ-2 safety systems, semiconductor physics.\n- **Academic & Professional:** Thakshnesh's 8.5 CGPA, KSRCT journey, technical innovations, and direct collaboration channels.\n- **General Knowledge:** Math, science, pop culture, trivia, and multilingual inquiries in English, Tamil, and Hindi.\n\nHow would you like me to elaborate on this topic?`;
}

// POST /api/chat - Conversational AI response
chatRouter.post('/', (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: 'Please provide a valid query.' });
    }

    const reply = bujjiJarvisInference(message);
    db.recordEvent('terminal_cmd', `Bujji Query: ${message.substring(0, 50)}`);

    return res.json({
      success: true,
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Bujji chat endpoint error:', err);
    return res.status(500).json({ success: false, error: 'Internal AI response generation error.' });
  }
});
