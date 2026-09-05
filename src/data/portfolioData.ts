import { Project, Skill, Education, Achievement } from '../types';

export const personalInfo = {
  name: 'Thakshnesh B',
  initials: 'TB',
  roles: [
    'Electronics Engineer',
    'VLSI & Embedded Developer',
    'Technical Innovator',
    'AI & Analytics Enthusiast',
  ],
  status: 'Available for Opportunities',
  email: 'thakshnesh@gmail.com',
  location: 'Tiruchengode, Tamil Nadu, India',
  mapsUrl: 'https://maps.app.goo.gl/NwCivf8YVTJngjw88',
  linkedin: 'https://www.linkedin.com/in/thakshnesh-b-585928381',
  careerObjective:
    'Driven and curious Electronics Engineering undergraduate with interests in VLSI Design, Embedded Systems, Business Analytics, and Artificial Intelligence. Passionate about combining analytical thinking, hardware engineering, and software innovation to build robust solutions while continuously growing both technically and professionally.',
  bio: `I am an Electronics Engineering student at K. S. Rangasamy College of Technology specializing in VLSI Design and Technology. My engineering focus combines hardware circuit design, sensor interfacing, microcontrollers, and algorithm development to construct impactful, automated solutions.`,
};

export const projectsData: Project[] = [
  {
    id: 'solar-tracker',
    title: 'Solar Tracking System using Arduino and LDR Sensors',
    category: 'Embedded & IoT',
    badge: 'Hardware & Embedded',
    tech: ['Arduino Uno', 'LDR Sensors', 'Servo Motors', 'Embedded C', 'Solar PV'],
    summary:
      'Dual-axis automated solar panel alignment system tracking peak sunlight vectors with real-time differential light sensing.',
    description:
      'Engineered an automatic solar tracking system utilizing an Arduino microcontroller and Light Dependent Resistor (LDR) sensor arrays to maximize solar energy absorption. The system continuously samples light intensity across quadrants and drives servo actuators to orient the photovoltaic panel perpendicular to incident sunlight, increasing energy yield by up to 35% compared to static mounts.',
    features: [
      'Dual-axis servo azimuth and elevation angular tracking',
      'Differential light comparison algorithm with dynamic thresholding',
      'Real-time power generation efficiency telemetry',
      'Night-time automatic return and reset routine',
    ],
    simulationType: 'solar',
    schematicDetails:
      '4x LDR sensor dividers connected to Analog Pins A0-A3; 2x Micro Servos (SG90) mapped to PWM Pins 9 & 10; 5V Regulated power bus with decoupling capacitors.',
    pinout: [
      { pin: 'A0 - A1', function: 'Horizontal Axis LDRs (Left/Right)' },
      { pin: 'A2 - A3', function: 'Vertical Axis LDRs (Top/Bottom)' },
      { pin: 'Pin 9 (PWM)', function: 'Horizontal Azimuth Servo' },
      { pin: 'Pin 10 (PWM)', function: 'Vertical Elevation Servo' },
      { pin: '5V / GND', function: 'Regulated Logic & Sensor Rail' },
    ],
    likesCount: 42,
  },
  {
    id: 'smoke-detector',
    title: 'Smoke & Gas Detection System using MQ-2 Sensor and Arduino',
    category: 'Embedded & IoT',
    badge: 'Safety & IoT',
    tech: ['MQ-2 Gas Sensor', 'Arduino', 'C++', 'LED Indicators', 'Piezo Buzzer'],
    summary:
      'Real-time hazardous gas and smoke concentration monitoring unit with multi-level visual alerts and emergency buzzer tripping.',
    description:
      'Designed and programmed an intelligent smoke and combustible gas detector (LPG, smoke, methane, butane) using an MQ-2 electrochemical sensor and Arduino. Features calibrated ADC voltage sampling, moving-average noise filtering, progressive LED hazard indicators, and audio alarms for industrial safety and domestic fire prevention.',
    features: [
      'Electrochemical resistance sensing with heat-cycle calibration',
      'Multi-stage threshold monitoring (Safe < 200 PPM, Warning 200-500 PPM, Hazard > 500 PPM)',
      'Sub-millisecond emergency alarm interrupt response',
      'Oscilloscope waveform telemetry for gas concentration fluctuations',
    ],
    simulationType: 'smoke',
    schematicDetails:
      'MQ-2 Analog Out to Arduino A0; Digital Alert Pins 7 & 8 driving Status Green/Red LEDs; Pin 11 driving Piezo Buzzer; 5V Heater power supply.',
    pinout: [
      { pin: 'A0 (Analog)', function: 'MQ-2 Gas Sensor Voltage Out (0-5V)' },
      { pin: 'Pin 7', function: 'Normal Status Green LED' },
      { pin: 'Pin 8', function: 'Emergency Hazard Red LED' },
      { pin: 'Pin 11 (PWM)', function: 'High-Decibel Piezo Siren' },
    ],
    likesCount: 38,
  },
  {
    id: 'vlsi-design',
    title: 'VLSI Design & Digital Circuit Architecture',
    category: 'VLSI & Hardware',
    badge: 'Core Specialization',
    tech: ['VLSI D&T', 'Digital Electronics', 'Verilog / HDL', 'CMOS Logic', 'EDA Tools'],
    summary:
      'Silicon circuit modeling, digital logic synthesis, and timing analysis for integrated circuits.',
    description:
      'Comprehensive study and practical design of VLSI integrated circuits, CMOS logic gates, arithmetic logic units (ALU), and digital state machines. Focus on reducing power dissipation, silicon footprint, and propagation delay in modern microelectronics.',
    features: [
      'Combinational and sequential logic circuit synthesis',
      'CMOS inverter & transmission gate layout exploration',
      'Propagation delay minimization and timing constraints',
      'Simulation of digital architectures in EDA environments',
    ],
    simulationType: 'none',
    schematicDetails: 'Digital RTL design and gate-level netlists with clock synchronization.',
    pinout: [
      { pin: 'CLK / RST', function: 'Global Clock and Asynchronous Reset' },
      { pin: 'Data IN [7:0]', function: '8-bit Parallel Input Vector' },
      { pin: 'Data OUT [7:0]', function: '8-bit Output Bus' },
    ],
    likesCount: 29,
  },
];

export const skillsData: Skill[] = [
  // Technical
  {
    name: 'Python',
    category: 'Technical Skills',
    level: 80,
    color: '#38bdf8',
    iconName: 'Code',
    details: 'Data analytics, algorithmic problem solving, scripting, AI logic, and automation.',
    codeSnippet: `def optimize_solar_energy(ldr_readings):\n    # Calculate optimal angle vector\n    delta_x = ldr_readings['right'] - ldr_readings['left']\n    return 'ADJUST_SERVO' if abs(delta_x) > 15 else 'STEADY'`,
  },
  {
    name: 'C Programming',
    category: 'Technical Skills',
    level: 75,
    color: '#60a5fa',
    iconName: 'Cpu',
    details: 'Low-level embedded firmware, pointers, memory management, and microcontroller drivers.',
    codeSnippet: `#define LDR_PIN A0\nvoid setup() {\n  pinMode(LDR_PIN, INPUT);\n  Serial.begin(9600);\n}`,
  },
  {
    name: 'Java',
    category: 'Technical Skills',
    level: 70,
    color: '#f59e0b',
    iconName: 'Coffee',
    details: 'Object-oriented programming, data structures, modular software architecture.',
    codeSnippet: `public class SensorTelemetry {\n    private double gasPPM;\n    public boolean isHazardous() { return this.gasPPM > 500.0; }\n}`,
  },
  {
    name: 'VLSI Design & Technology',
    category: 'Domains',
    level: 80,
    color: '#818cf8',
    iconName: 'Layers',
    details: 'CMOS logic, digital circuit design, integrated circuits, silicon architectures.',
  },
  {
    name: 'Embedded Systems & IoT',
    category: 'Domains',
    level: 85,
    color: '#34d399',
    iconName: 'Radio',
    details: 'Arduino, sensor interfacing (MQ-2, LDR, ultrasonic), actuators, PWM servo controls.',
  },
  {
    name: 'Artificial Intelligence & Analytics',
    category: 'Domains',
    level: 75,
    color: '#ec4899',
    iconName: 'Sparkles',
    details: 'Business analytics, machine learning fundamentals, predictive automation.',
  },
  // Tools & Platforms
  {
    name: 'Visual Studio Code',
    category: 'Tools & Platforms',
    level: 90,
    color: '#007acc',
    iconName: 'Terminal',
    details: 'Primary code editor for C, Python, web development, and embedded extensions.',
  },
  {
    name: 'Eclipse IDE',
    category: 'Tools & Platforms',
    level: 80,
    color: '#c084fc',
    iconName: 'Box',
    details: 'Java application development, debugging, build management.',
  },
  {
    name: 'Canva',
    category: 'Tools & Platforms',
    level: 85,
    color: '#00c4cc',
    iconName: 'Palette',
    details: 'UI/UX presentations, technical infographics, project documentation design.',
  },
  {
    name: 'MIT App Inventor',
    category: 'Tools & Platforms',
    level: 80,
    color: '#a3e635',
    iconName: 'Smartphone',
    details: 'Rapid mobile UI prototyping and Bluetooth/WiFi IoT controller apps.',
  },
  // Soft Skills
  {
    name: 'Analytical Thinking',
    category: 'Soft Skills',
    level: 90,
    color: '#38bdf8',
    iconName: 'Compass',
    details: 'Deconstructing complex engineering problems into actionable algorithmic steps.',
  },
  {
    name: 'Problem Solving',
    category: 'Soft Skills',
    level: 90,
    color: '#818cf8',
    iconName: 'Wrench',
    details: 'Hands-on debugging in hardware circuits, timing glitches, and software logic.',
  },
  {
    name: 'Leadership & Teamwork',
    category: 'Soft Skills',
    level: 85,
    color: '#34d399',
    iconName: 'Users',
    details: 'Coordinating team deliverables, technical presentations, and project milestones.',
  },
  {
    name: 'Communication',
    category: 'Soft Skills',
    level: 85,
    color: '#fbbf24',
    iconName: 'MessageSquare',
    details: 'Articulating technical concepts clearly to multidisciplinary teams and stakeholders.',
  },
];

export const educationData: Education = {
  degree: 'B.E. Electronics Engineering',
  specialization: 'VLSI Design & Technology',
  institution: 'K. S. Rangasamy College of Technology',
  location: 'Tiruchengode, Tamil Nadu, India',
  mapsUrl: 'https://maps.app.goo.gl/NwCivf8YVTJngjw88',
  period: '2025 – 2029 (Present)',
  status: 'Undergraduate',
  cgpa: '8.5 / 10',
  semesters: [
    {
      semester: '1st Semester',
      gpa: '8.37',
      type: 'SGPA',
      highlight: 'Solid foundation in Engineering Mathematics, C Programming & Basic Electronics',
    },
    {
      semester: '2nd Semester',
      gpa: '8.5',
      type: 'CGPA',
      highlight: 'Advanced Digital Logic, Semiconductor Physics, and Circuit Simulation',
    },
  ],
  highlights: [
    'Specializing in VLSI Design & Technology (VLSI D&T)',
    'Hands-on lab experience with microcontroller hardware & sensor suites',
    'Active participation in technical symposia and project exhibitions',
  ],
};

export const achievementsData: Achievement[] = [
  {
    title: 'NPTEL Certification in Soft Skill Development',
    badge: 'Elite + Silver Certificate',
    issuer: 'NPTEL (IIT Madras)',
    year: '2026',
    description:
      'Completed the Soft Skill Development course from NPTEL (IIT Madras) with an Elite + Silver category certification.',
    skillsAcquired: [
      'Professional Communication',
      'Team Leadership',
      'Workplace Ethics',
      'Critical Decision Making',
    ],
  },
  {
    title: 'Academic & Technical Excellence',
    badge: 'VLSI & Embedded Innovation',
    issuer: 'Department of Electronics Engineering, KSRCT',
    year: '2025 – Present',
    description:
      'Recognized for exceptional academic consistency maintaining an 8.5 CGPA along with hands-on microcontroller prototype innovations and circuit design.',
    skillsAcquired: [
      'VLSI Design & Layout',
      'Embedded Prototyping',
      'Analytical Problem Solving',
      'Collaborative Teamwork',
    ],
  },
];
