
// ============================================================
// BLOG ANGLES CONFIGURATION
// ============================================================
//
// এই file-এর কাজ:
//
// 1. প্রতিটি Topic-এর জন্য possible Content Angle রাখা
// 2. প্রতিটি Angle-এর জন্য একটি unique Intent Group রাখা
// 3. একই Topic + একই Intent Group-এর duplicate article আটকানো
// 4. একই Topic + different Intent Group-এর article allow করা
//
// Example:
//
// ChatGPT
//
// core-overview
// SEO
// Education
// Productivity
// Business
// Prompt Engineering
//
// অর্থাৎ:
//
// ChatGPT + core-overview
// ChatGPT + seo
//
// আলাদা intent হওয়ায় দুটো article তৈরি করা যাবে।
//
// কিন্তু:
//
// ChatGPT + core-overview
// ChatGPT + core-overview
//
// দ্বিতীয়টি duplicate intent হিসেবে ধরা হবে।
//
// ============================================================


// ============================================================
// DEFAULT ANGLES
// ============================================================
//
// যেসব Topic-এর জন্য আলাদা configuration নেই,
// সেসব Topic-এর জন্য এই default angles ব্যবহার হবে।
//

export const BLOG_ANGLES = {
  default: [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Practical Uses",
      intentGroup: "practical-uses",
    },

    {
      angle: "Tips and Best Practices",
      intentGroup: "best-practices",
    },

    {
      angle: "Common Mistakes",
      intentGroup: "mistakes",
    },

    {
      angle: "Advanced Guide",
      intentGroup: "advanced",
    },

    {
      angle: "Comparison",
      intentGroup: "comparison",
    },

    {
      angle: "Benefits and Limitations",
      intentGroup: "benefits-limitations",
    },

    {
      angle: "Real World Applications",
      intentGroup: "real-world",
    },

    {
      angle: "Future Trends",
      intentGroup: "future-trends",
    },
  ],
};


// ============================================================
// TOPIC SPECIFIC ANGLES
// ============================================================

export const TOPIC_ANGLES = {

  // ========================================================
  // ARTIFICIAL INTELLIGENCE
  // ========================================================

  "ChatGPT": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "SEO Content Creation",
      intentGroup: "seo",
    },

    {
      angle: "Education",
      intentGroup: "education",
    },

    {
      angle: "Productivity",
      intentGroup: "productivity",
    },

    {
      angle: "Business",
      intentGroup: "business",
    },

    {
      angle: "Prompt Engineering",
      intentGroup: "prompt-engineering",
    },

    {
      angle: "Common Mistakes",
      intentGroup: "mistakes",
    },

    {
      angle: "Advanced Usage",
      intentGroup: "advanced",
    },

    {
      angle: "Benefits and Limitations",
      intentGroup: "benefits-limitations",
    },

    {
      angle: "Real World Applications",
      intentGroup: "real-world",
    },
  ],


  "Gemini AI": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "SEO Content Creation",
      intentGroup: "seo",
    },

    {
      angle: "Education",
      intentGroup: "education",
    },

    {
      angle: "Productivity",
      intentGroup: "productivity",
    },

    {
      angle: "Coding",
      intentGroup: "coding",
    },

    {
      angle: "Business",
      intentGroup: "business",
    },

    {
      angle: "Prompt Engineering",
      intentGroup: "prompt-engineering",
    },

    {
      angle: "Advanced Usage",
      intentGroup: "advanced",
    },

    {
      angle: "Comparison",
      intentGroup: "comparison",
    },

    {
      angle: "Benefits and Limitations",
      intentGroup: "benefits-limitations",
    },
  ],


  "Claude AI": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Writing and Content Creation",
      intentGroup: "content-creation",
    },

    {
      angle: "Coding",
      intentGroup: "coding",
    },

    {
      angle: "Productivity",
      intentGroup: "productivity",
    },

    {
      angle: "Education",
      intentGroup: "education",
    },

    {
      angle: "Business",
      intentGroup: "business",
    },

    {
      angle: "Prompt Engineering",
      intentGroup: "prompt-engineering",
    },

    {
      angle: "Advanced Usage",
      intentGroup: "advanced",
    },

    {
      angle: "Comparison",
      intentGroup: "comparison",
    },

    {
      angle: "Benefits and Limitations",
      intentGroup: "benefits-limitations",
    },
  ],


  "Machine Learning": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "How Machine Learning Works",
      intentGroup: "how-it-works",
    },

    {
      angle: "Machine Learning Algorithms",
      intentGroup: "algorithms",
    },

    {
      angle: "Real World Applications",
      intentGroup: "real-world",
    },

    {
      angle: "Python Machine Learning",
      intentGroup: "python",
    },

    {
      angle: "Model Training",
      intentGroup: "model-training",
    },

    {
      angle: "Common Mistakes",
      intentGroup: "mistakes",
    },

    {
      angle: "Advanced Machine Learning",
      intentGroup: "advanced",
    },

    {
      angle: "Career Guide",
      intentGroup: "career",
    },
  ],


  "Deep Learning": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Neural Networks",
      intentGroup: "neural-networks",
    },

    {
      angle: "Computer Vision",
      intentGroup: "computer-vision",
    },

    {
      angle: "Natural Language Processing",
      intentGroup: "nlp",
    },

    {
      angle: "Deep Learning Frameworks",
      intentGroup: "frameworks",
    },

    {
      angle: "Real World Applications",
      intentGroup: "real-world",
    },

    {
      angle: "Model Training",
      intentGroup: "model-training",
    },

    {
      angle: "Advanced Deep Learning",
      intentGroup: "advanced",
    },
  ],


  "Prompt Engineering": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Effective Prompt Writing",
      intentGroup: "prompt-writing",
    },

    {
      angle: "ChatGPT Prompt Engineering",
      intentGroup: "chatgpt",
    },

    {
      angle: "Gemini Prompt Engineering",
      intentGroup: "gemini",
    },

    {
      angle: "AI Content Creation",
      intentGroup: "content-creation",
    },

    {
      angle: "Business Automation",
      intentGroup: "business",
    },

    {
      angle: "Coding Prompts",
      intentGroup: "coding",
    },

    {
      angle: "Common Prompt Mistakes",
      intentGroup: "mistakes",
    },

    {
      angle: "Advanced Prompt Engineering",
      intentGroup: "advanced",
    },
  ],


  // ========================================================
  // TECHNOLOGY
  // ========================================================

  "Programming": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Core Concepts",
      intentGroup: "core-concepts",
    },

    {
      angle: "Practical Tutorial",
      intentGroup: "practical-tutorial",
    },

    {
      angle: "Best Practices",
      intentGroup: "best-practices",
    },

    {
      angle: "Common Mistakes",
      intentGroup: "mistakes",
    },

    {
      angle: "Performance Optimization",
      intentGroup: "performance",
    },

    {
      angle: "Advanced Techniques",
      intentGroup: "advanced",
    },

    {
      angle: "Career Perspective",
      intentGroup: "career",
    },

    {
      angle: "Real World Applications",
      intentGroup: "real-world",
    },
  ],


  "Web Development": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Frontend Development",
      intentGroup: "frontend",
    },

    {
      angle: "Backend Development",
      intentGroup: "backend",
    },

    {
      angle: "Full Stack Development",
      intentGroup: "full-stack",
    },

    {
      angle: "Performance Optimization",
      intentGroup: "performance",
    },

    {
      angle: "Security Best Practices",
      intentGroup: "security",
    },

    {
      angle: "SEO Optimization",
      intentGroup: "seo",
    },

    {
      angle: "Common Mistakes",
      intentGroup: "mistakes",
    },

    {
      angle: "Advanced Techniques",
      intentGroup: "advanced",
    },
  ],


  "Frontend Development": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "HTML CSS JavaScript Fundamentals",
      intentGroup: "fundamentals",
    },

    {
      angle: "React Development",
      intentGroup: "react",
    },

    {
      angle: "UI UX Best Practices",
      intentGroup: "ui-ux",
    },

    {
      angle: "Web Performance",
      intentGroup: "performance",
    },

    {
      angle: "Responsive Web Design",
      intentGroup: "responsive-design",
    },

    {
      angle: "Accessibility",
      intentGroup: "accessibility",
    },

    {
      angle: "Common Mistakes",
      intentGroup: "mistakes",
    },

    {
      angle: "Advanced Frontend Techniques",
      intentGroup: "advanced",
    },
  ],


  "Backend Development": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "REST API Development",
      intentGroup: "rest-api",
    },

    {
      angle: "Node.js Development",
      intentGroup: "nodejs",
    },

    {
      angle: "Database Integration",
      intentGroup: "database",
    },

    {
      angle: "Authentication and Authorization",
      intentGroup: "authentication",
    },

    {
      angle: "Backend Security",
      intentGroup: "security",
    },

    {
      angle: "Performance Optimization",
      intentGroup: "performance",
    },

    {
      angle: "Scalable Backend Architecture",
      intentGroup: "scalability",
    },

    {
      angle: "Common Mistakes",
      intentGroup: "mistakes",
    },
  ],


  "Full Stack Development": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Frontend and Backend Integration",
      intentGroup: "integration",
    },

    {
      angle: "MERN Stack",
      intentGroup: "mern",
    },

    {
      angle: "Project Development",
      intentGroup: "project-development",
    },

    {
      angle: "Authentication System",
      intentGroup: "authentication",
    },

    {
      angle: "Deployment",
      intentGroup: "deployment",
    },

    {
      angle: "Performance Optimization",
      intentGroup: "performance",
    },

    {
      angle: "Security",
      intentGroup: "security",
    },

    {
      angle: "Career Guide",
      intentGroup: "career",
    },
  ],


  // ========================================================
  // BUSINESS & MARKETING
  // ========================================================

  "SEO": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "On Page SEO",
      intentGroup: "on-page-seo",
    },

    {
      angle: "Technical SEO",
      intentGroup: "technical-seo",
    },

    {
      angle: "Keyword Research",
      intentGroup: "keyword-research",
    },

    {
      angle: "Content SEO",
      intentGroup: "content-seo",
    },

    {
      angle: "Local SEO",
      intentGroup: "local-seo",
    },

    {
      angle: "Link Building",
      intentGroup: "link-building",
    },

    {
      angle: "Common Mistakes",
      intentGroup: "mistakes",
    },

    {
      angle: "Advanced SEO",
      intentGroup: "advanced",
    },
  ],


  "Digital Marketing": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "SEO Marketing",
      intentGroup: "seo",
    },

    {
      angle: "Social Media Marketing",
      intentGroup: "social-media",
    },

    {
      angle: "Content Marketing",
      intentGroup: "content-marketing",
    },

    {
      angle: "Email Marketing",
      intentGroup: "email-marketing",
    },

    {
      angle: "Paid Advertising",
      intentGroup: "paid-advertising",
    },

    {
      angle: "Lead Generation",
      intentGroup: "lead-generation",
    },

    {
      angle: "Marketing Automation",
      intentGroup: "automation",
    },

    {
      angle: "Common Mistakes",
      intentGroup: "mistakes",
    },
  ],


  // ========================================================
  // FINANCE
  // ========================================================

  "Personal Finance": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Budgeting",
      intentGroup: "budgeting",
    },

    {
      angle: "Saving Money",
      intentGroup: "saving",
    },

    {
      angle: "Debt Management",
      intentGroup: "debt",
    },

    {
      angle: "Investment Planning",
      intentGroup: "investment",
    },

    {
      angle: "Emergency Fund",
      intentGroup: "emergency-fund",
    },

    {
      angle: "Financial Mistakes",
      intentGroup: "mistakes",
    },

    {
      angle: "Wealth Building",
      intentGroup: "wealth-building",
    },
  ],


  "Investing": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Stock Market Investing",
      intentGroup: "stocks",
    },

    {
      angle: "Long Term Investing",
      intentGroup: "long-term",
    },

    {
      angle: "Dividend Investing",
      intentGroup: "dividend",
    },

    {
      angle: "Risk Management",
      intentGroup: "risk-management",
    },

    {
      angle: "Portfolio Building",
      intentGroup: "portfolio",
    },

    {
      angle: "Investment Mistakes",
      intentGroup: "mistakes",
    },

    {
      angle: "Advanced Investing",
      intentGroup: "advanced",
    },
  ],


  // ========================================================
  // EDUCATION
  // ========================================================

  "Online Learning": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Best Learning Platforms",
      intentGroup: "platforms",
    },

    {
      angle: "Effective Study Methods",
      intentGroup: "study-methods",
    },

    {
      angle: "Online Course Selection",
      intentGroup: "course-selection",
    },

    {
      angle: "Free Learning Resources",
      intentGroup: "free-resources",
    },

    {
      angle: "Career Skill Development",
      intentGroup: "career",
    },

    {
      angle: "Common Learning Mistakes",
      intentGroup: "mistakes",
    },
  ],


  // ========================================================
  // LIFESTYLE
  // ========================================================

  "Productivity": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Time Management",
      intentGroup: "time-management",
    },

    {
      angle: "Focus Improvement",
      intentGroup: "focus",
    },

    {
      angle: "Daily Productivity System",
      intentGroup: "daily-system",
    },

    {
      angle: "AI Productivity Tools",
      intentGroup: "ai-tools",
    },

    {
      angle: "Work From Home Productivity",
      intentGroup: "remote-work",
    },

    {
      angle: "Common Productivity Mistakes",
      intentGroup: "mistakes",
    },

    {
      angle: "Advanced Productivity",
      intentGroup: "advanced",
    },
  ],


  // ========================================================
  // JOBS
  // ========================================================

  "Remote Jobs": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "How to Find Remote Jobs",
      intentGroup: "job-search",
    },

    {
      angle: "Remote Job Platforms",
      intentGroup: "platforms",
    },

    {
      angle: "Remote Work Skills",
      intentGroup: "skills",
    },

    {
      angle: "Remote Interview Preparation",
      intentGroup: "interview",
    },

    {
      angle: "Remote Work Productivity",
      intentGroup: "productivity",
    },

    {
      angle: "Remote Work Mistakes",
      intentGroup: "mistakes",
    },

    {
      angle: "Remote Career Growth",
      intentGroup: "career-growth",
    },
  ],


  "Freelancing": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "How to Start Freelancing",
      intentGroup: "starting",
    },

    {
      angle: "Freelancing Platforms",
      intentGroup: "platforms",
    },

    {
      angle: "Finding Clients",
      intentGroup: "clients",
    },

    {
      angle: "Freelance Profile Optimization",
      intentGroup: "profile",
    },

    {
      angle: "Freelance Pricing",
      intentGroup: "pricing",
    },

    {
      angle: "Freelancing Mistakes",
      intentGroup: "mistakes",
    },

    {
      angle: "Advanced Freelancing",
      intentGroup: "advanced",
    },
  ],


  // ========================================================
  // CYBERSECURITY
  // ========================================================

  "Ethical Hacking": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Ethical Hacking Methodology",
      intentGroup: "methodology",
    },

    {
      angle: "Penetration Testing",
      intentGroup: "penetration-testing",
    },

    {
      angle: "Network Security",
      intentGroup: "network-security",
    },

    {
      angle: "Web Application Security",
      intentGroup: "web-security",
    },

    {
      angle: "Security Tools",
      intentGroup: "security-tools",
    },

    {
      angle: "Cybersecurity Career",
      intentGroup: "career",
    },

    {
      angle: "Common Security Mistakes",
      intentGroup: "mistakes",
    },
  ],


  // ========================================================
  // FOOD
  // ========================================================

  "Recipes": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Easy Recipe",
      intentGroup: "easy-recipe",
    },

    {
      angle: "Quick Recipe",
      intentGroup: "quick-recipe",
    },

    {
      angle: "Healthy Recipe",
      intentGroup: "healthy",
    },

    {
      angle: "Budget Recipe",
      intentGroup: "budget",
    },

    {
      angle: "Family Recipe",
      intentGroup: "family",
    },

    {
      angle: "Cooking Tips",
      intentGroup: "cooking-tips",
    },

    {
      angle: "Common Cooking Mistakes",
      intentGroup: "mistakes",
    },
  ],


  // ========================================================
  // SPORTS
  // ========================================================

  "Football": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Rules and Gameplay",
      intentGroup: "rules",
    },

    {
      angle: "Tactics and Strategy",
      intentGroup: "tactics",
    },

    {
      angle: "Player Analysis",
      intentGroup: "player-analysis",
    },

    {
      angle: "Team Analysis",
      intentGroup: "team-analysis",
    },

    {
      angle: "History",
      intentGroup: "history",
    },

    {
      angle: "Training",
      intentGroup: "training",
    },

    {
      angle: "Common Mistakes",
      intentGroup: "mistakes",
    },
  ],


  "Cricket": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Rules and Gameplay",
      intentGroup: "rules",
    },

    {
      angle: "Batting Techniques",
      intentGroup: "batting",
    },

    {
      angle: "Bowling Techniques",
      intentGroup: "bowling",
    },

    {
      angle: "Fielding Techniques",
      intentGroup: "fielding",
    },

    {
      angle: "Player Analysis",
      intentGroup: "player-analysis",
    },

    {
      angle: "Team Strategy",
      intentGroup: "strategy",
    },

    {
      angle: "Common Mistakes",
      intentGroup: "mistakes",
    },
  ],


  // ========================================================
  // TRAVEL
  // ========================================================

  "Travel Guides": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Budget Travel",
      intentGroup: "budget",
    },

    {
      angle: "Luxury Travel",
      intentGroup: "luxury",
    },

    {
      angle: "Family Travel",
      intentGroup: "family",
    },

    {
      angle: "Solo Travel",
      intentGroup: "solo",
    },

    {
      angle: "Travel Safety",
      intentGroup: "safety",
    },

    {
      angle: "Travel Planning",
      intentGroup: "planning",
    },

    {
      angle: "Common Travel Mistakes",
      intentGroup: "mistakes",
    },
  ],


  // ========================================================
  // SAAS
  // ========================================================

  "SaaS Tools": [
    {
      angle: "Complete Beginner Guide",
      intentGroup: "core-overview",
    },

    {
      angle: "Best SaaS Tools",
      intentGroup: "best-tools",
    },

    {
      angle: "Business SaaS Tools",
      intentGroup: "business",
    },

    {
      angle: "Productivity SaaS Tools",
      intentGroup: "productivity",
    },

    {
      angle: "Automation SaaS Tools",
      intentGroup: "automation",
    },

    {
      angle: "SaaS Tool Comparison",
      intentGroup: "comparison",
    },

    {
      angle: "Free SaaS Tools",
      intentGroup: "free-tools",
    },

    {
      angle: "SaaS Selection Guide",
      intentGroup: "selection",
    },
  ],
};


// ============================================================
// GET ANGLES FOR TOPIC
// ============================================================

export const getAnglesForTopic = (topic) => {
  if (!topic) {
    return BLOG_ANGLES.default;
  }

  return TOPIC_ANGLES[topic] || BLOG_ANGLES.default;
};


// ============================================================
// GET RANDOM ANGLE
// ============================================================
//
// এই function শুধু random angle দেয়।
//
// এটি database duplicate check করে না।
//
// তাই production generation-এর সময়:
//
// getAvailableAngle()
//
// ব্যবহার করা উচিত।
//

export const getRandomAngleForTopic = (topic) => {
  const angles = getAnglesForTopic(topic);

  if (!Array.isArray(angles) || angles.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(
    Math.random() * angles.length
  );

  return angles[randomIndex];
};


// ============================================================
// GET ANGLE BY INTENT GROUP
// ============================================================
//
// কোনো নির্দিষ্ট intentGroup থেকে angle দরকার হলে
// এই function ব্যবহার করা যাবে।
//

export const getAngleByIntentGroup = (
  topic,
  intentGroup
) => {
  if (!topic || !intentGroup) {
    return null;
  }

  const angles = getAnglesForTopic(topic);

  return (
    angles.find(
      (item) =>
        item.intentGroup === intentGroup
    ) || null
  );
};


// ============================================================
// GET ALL INTENT GROUPS
// ============================================================
//
// একটি Topic-এর সব available intentGroup পাওয়ার জন্য।
//

export const getIntentGroupsForTopic = (topic) => {
  const angles = getAnglesForTopic(topic);

  return [
    ...new Set(
      angles
        .map((item) => item.intentGroup)
        .filter(Boolean)
    ),
  ];
};


// ============================================================
// CHECK WHETHER ANGLE EXISTS
// ============================================================

export const hasAngleForTopic = (
  topic,
  intentGroup
) => {
  if (!topic || !intentGroup) {
    return false;
  }

  const angles = getAnglesForTopic(topic);

  return angles.some(
    (item) =>
      item.intentGroup === intentGroup
  );
};


// ============================================================
// EXPORT
// ============================================================

export default {
  BLOG_ANGLES,
  TOPIC_ANGLES,
  getAnglesForTopic,
  getRandomAngleForTopic,
  getAngleByIntentGroup,
  getIntentGroupsForTopic,
  hasAngleForTopic,
};

