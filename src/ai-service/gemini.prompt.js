const categories = [
    {
        name: "Technology",
        topics: [
            "Programming",
            "Web Development",
            "Frontend Development",
            "Backend Development",
            "Full Stack Development",
            "Cloud Computing",
            "DevOps",
            "APIs Development",
            "Microservices",
            "Software Engineering",
            "System Design",
            "Open Source Contribution",
            "Git & GitHub",
            "Data Structures",
            "Algorithms",
        ],
        trendingTopics: [
            "AI Assisted Coding",
            "Next.js 15 Features",
            "Serverless Architecture",
            "Web 3.0 Technology",
            "Edge Computing",
        ],
    },

    {
        name: "Artificial Intelligence",
        topics: [
            "ChatGPT",
            "Gemini AI",
            "Claude AI",
            "Machine Learning",
            "Deep Learning",
            "Neural Networks",
            "Natural Language Processing",
            "Computer Vision",
            "AI Ethics",
            "AI in Daily Life",
            "AI Automation",
            "Prompt Engineering",
            "AI Tools",
        ],
        trendingTopics: [
            "AI Agents Automation",
            "Autonomous AI Systems",
            "Multimodal AI Models",
            "OpenAI GPT Models",
            "AI Coding Assistants",
        ],
    },

    {
        name: "Business & Marketing",
        topics: [
            "Digital Marketing",
            "SEO",
            "Affiliate Marketing",
            "E-commerce",
            "Dropshipping",
            "Startup Growth",
            "Branding",
            "Email Marketing",
            "Content Marketing",
            "Sales Funnel",
            "Lead Generation",
            "Business Strategy",
        ],
        trendingTopics: [
            "AI Marketing Automation",
            "Passive Income Systems",
            "No Code Businesses",
            "Influencer Marketing Trends",
            "YouTube Monetization",
        ],
    },

    {
        name: "Finance & Money",
        topics: [
            "Investing",
            "Stock Market",
            "Crypto Currency",
            "Personal Finance",
            "Banking System",
            "Credit Cards",
            "Loans",
            "Insurance",
            "Budgeting",
            "Wealth Building",
            "Financial Planning",
        ],
        trendingTopics: [
            "Bitcoin Halving Impact",
            "Passive Income Strategies",
            "AI Trading Bots",
            "Global Recession Trends",
            "ETF Investing",
        ],
    },

    {
        name: "Education & Learning",
        topics: [
            "Online Learning",
            "Coding Courses",
            "Study Tips",
            "Scholarships",
            "Certifications",
            "Skill Development",
            "Career Guidance",
            "Exam Preparation",
            "Language Learning",
        ],
        trendingTopics: [
            "AI Learning Tools",
            "Free Online Courses 2026",
            "Remote Learning Platforms",
            "Skill Based Education",
        ],
    },

    {
        name: "Health & Wellness",
        topics: [
            "Fitness",
            "Nutrition",
            "Mental Health",
            "Yoga",
            "Weight Loss",
            "Healthy Diet",
            "Exercise Plans",
            "Meditation",
            "Sleep Health",
        ],
        trendingTopics: [
            "AI Fitness Apps",
            "Home Workout Trends",
            "Mental Health Awareness",
            "Intermittent Fasting",
        ],
    },

    {
        name: "Lifestyle",
        topics: [
            "Productivity",
            "Self Improvement",
            "Fashion",
            "Beauty",
            "Relationships",
            "Time Management",
            "Minimalism",
            "Habits Building",
        ],
        trendingTopics: [
            "Digital Detox Lifestyle",
            "Morning Routine Trends",
            "Self Growth Hacks",
        ],
    },

    {
        name: "Travel",
        topics: [
            "Travel Guides",
            "Budget Travel",
            "Luxury Travel",
            "Adventure Travel",
            "Visa Guides",
            "Hotels",
            "Tourism Tips",
            "Backpacking",
        ],
        trendingTopics: [
            "Digital Nomad Lifestyle",
            "Cheap Flight Hacks",
            "AI Travel Planning",
        ],
    },

    {
        name: "Food & Recipes",
        topics: [
            "Recipes",
            "Healthy Recipes",
            "Cooking Tips",
            "International Cuisine",
            "Street Food",
            "Baking",
            "Fast Food",
        ],
        trendingTopics: [
            "AI Recipe Generators",
            "Viral Food Trends",
            "Healthy Diet Trends",
        ],
    },

    {
        name: "Sports",
        topics: [
            "Football",
            "Cricket",
            "Basketball",
            "Tennis",
            "Esports",
            "Fitness Sports",
        ],
        trendingTopics: [
            "World Cup Analysis",
            "Esports Growth",
            "Olympics Highlights",
        ],
    },

    {
        name: "Gaming",
        topics: [
            "PC Gaming",
            "Mobile Gaming",
            "Console Gaming",
            "Game Reviews",
            "Game Guides",
            "Esports",
            "Game Development",
        ],
        trendingTopics: [
            "AI in Game Development",
            "VR Gaming Trends",
            "Metaverse Games",
        ],
    },

    {
        name: "Cybersecurity",
        topics: [
            "Ethical Hacking",
            "Penetration Testing",
            "Network Security",
            "Malware Analysis",
            "Security Tools",
            "Data Protection",
            "Cyber Laws",
        ],
        trendingTopics: [
            "AI Cyber Attacks",
            "Zero Day Exploits",
            "Cloud Security Trends",
        ],
    },

    {
        name: "Science & Space",
        topics: [
            "Astronomy",
            "Space Exploration",
            "Physics",
            "Biology",
            "Chemistry",
            "Environment",
            "Quantum Physics",
        ],
        trendingTopics: [
            "NASA Mars Mission",
            "Black Hole Discoveries",
            "James Webb Telescope",
        ],
    },

    {
        name: "Jobs & Careers",
        topics: [
            "Remote Jobs",
            "Freelancing",
            "Resume Tips",
            "Interview Tips",
            "Career Growth",
            "Job Search",
            "Internships",
        ],
        trendingTopics: [
            "AI Jobs Future",
            "Remote Work Trends",
            "High Paying Skills 2026",
        ],
    },

    {
        name: "SaaS & Software",
        topics: [
            "SaaS Tools",
            "CRM Software",
            "Project Management Tools",
            "Business Automation",
            "Productivity Tools",
            "No Code Tools",
        ],
        trendingTopics: [
            "AI SaaS Products",
            "No Code Revolution",
            "Automation Platforms",
        ],
    },
];

// ======================
// RANDOM SELECTOR
// ======================
const getRandomItem = (arr) =>
    arr[Math.floor(Math.random() * arr.length)];

// ======================
// CATEGORY + TOPIC SELECTOR
// ======================
// FIX: আগে "cat" আর "topic" module-level (file scope) variable ছিল,
// যেটা shared state হওয়ার কারণে একই সময়ে দুইটা request আসলে
// একটার value আরেকটা overwrite করে ফেলতে পারতো (race condition bug)।
// এখন সব local variable এবং function থেকে সরাসরি return হচ্ছে।
//
// এখানে নতুন logic: 50% সময় normal "topics" থেকে, বাকি 50% সময়
// "trendingTopics" থেকে topic বাছাই হবে। যদি কোনো ক্যাটাগরির
// trendingTopics খালি থাকে, তাহলে automatic normal topics থেকেই নিবে।
const categoryAndTopicSelector = () => {
    // 1. random category object select
    const randomCategory = getRandomItem(categories);

    const cat = randomCategory.name;

    // 2. decide: normal topic নাকি trending topic থেকে নিবে (50/50 chance)
    const hasTrending =
        Array.isArray(randomCategory.trendingTopics) &&
        randomCategory.trendingTopics.length > 0;

    const useTrending = hasTrending && Math.random() < 0.5;

    const topic = useTrending
        ? getRandomItem(randomCategory.trendingTopics)
        : getRandomItem(randomCategory.topics);

    return { cat, topic, isTrending: useTrending };
};

export const buildBlogPrompt = () => {
    const { cat, topic, isTrending } = categoryAndTopicSelector();

    return `
তুমি একজন World-Class Bengali Content Strategist, SEO Expert, Professional Journalist, Copywriter এবং Google AdSense Policy Specialist।

তোমার কাজ হলো এমন একটি Premium Quality বাংলা Blog Article তৈরি করা যা পড়লে মনে হবে একজন অভিজ্ঞ লেখক বহুদিন গবেষণা করে লিখেছেন।

TOPIC INFORMATION:

Category: ${cat}
Sub Category: ${topic}
Main Topic: ${topic}
Topic Type: ${isTrending ? "Trending Topic" : "Core Topic"}

CONTENT GOAL:

* Human First Writing
* SEO Optimized
* AdSense Safe
* Helpful Content Update Compliant
* E-E-A-T Friendly
* Featured Snippet Optimized
* Long Form Authority Article
* Ebook Style Reading Experience

========================
OUTPUT STRUCTURE
================

{
  "meta": {
    "title": "",
    "description": "",
    "slug": "",
    "featuredSnippet": ""
  },

  "category": "${cat}",
  "subCategory": "${topic}",

  "keywords": {
    "primary": "${cat}",
    "secondary": "${topic}",
    "related": []
  },

  "article": {
    "title": "",
    "intro": "",
    "tableOfContents": [],

    "sections": [
      {
        "heading": "",
        "content": "",
        "example": "",
        "importantPoints": []
      }
    ],

    "expertTips": [],
    "commonMistakes": [],

    "faq": [
      {
        "question": "",
        "answer": ""
      }
    ],

    "summary": "",
    "conclusion": ""
  },

  "seoTags": []
}

========================
WRITING RULES
=============

১. সম্পূর্ণ বাংলা ভাষায় লিখবে।

২. ২৫০০-৪০০০ শব্দ লিখবে।

৩. Article শুরু হবে এমন Introduction দিয়ে যা পাঠককে পুরো লেখা পড়তে বাধ্য করে।

৪. প্রতিটি Heading এর নিচে কমপক্ষে ৩-৫ Paragraph থাকবে।

৫. প্রতিটি Section Ebook Style Flow তে লিখবে।

৬. Heading → Explanation → Example → Key Takeaways এই Flow অনুসরণ করবে।

৭. Bullet Point অতিরিক্ত ব্যবহার করবে না।

৮. Content যেন AI Generated না লাগে।

৯. মানুষের কথোপকথনের মতো Natural Tone ব্যবহার করবে।

১০. প্রতিটি Section এর মধ্যে Smooth Transition থাকবে।

১১. Real Life Scenario ব্যবহার করবে।

১২. Beginner থেকে Advanced Level পর্যন্ত Cover করবে।

১৩. প্রয়োজন হলে Comparison Table ব্যবহার করবে।

১৪. FAQ Section এ কমপক্ষে ৮টি প্রশ্ন থাকবে।

১৫. Conclusion এমন হবে যাতে পাঠকের Action নেওয়ার ইচ্ছা তৈরি হয়।

১৬. Keyword Stuffing করা যাবে না।

১৭. Google Helpful Content Policy অনুসরণ করতে হবে।

১৮. কোনো Fake তথ্য, False Claim বা Misleading Advice দেওয়া যাবে না।

১৯. Output অবশ্যই Valid JSON Format এ দিতে হবে।

২০. কোনো অতিরিক্ত Text লিখবে না, শুধুমাত্র JSON Return করবে।

SPECIAL WRITING STYLE:

লেখা এমন হবে যেন পাঠক একটি Premium Ebook অথবা Professional Magazine Article পড়ছে।

প্রতিটি Heading এর পর গভীর বিশ্লেষণ, বাস্তব উদাহরণ, ব্যবহারিক পরামর্শ এবং সহজ ব্যাখ্যা থাকবে।

পাঠক যেন শেষ পর্যন্ত পড়ে এবং মনে করে:

"আমি সত্যিই নতুন কিছু শিখলাম।"

========================
STRICT JSON RULES (VERY IMPORTANT)
========================

You MUST return RFC 8259 valid JSON.

This JSON will be parsed directly using JSON.parse().

If the JSON is invalid, the entire response is considered FAILED.

Follow EVERY rule below.

1. Return ONLY one JSON object.

2. Never wrap the JSON inside Markdown.

3. Never use like this \`\`\`\` text \`\`\`\`.

4. Never write explanations before or after JSON.

5. Every string MUST be enclosed using double quotes (").

6. Escape every double quote inside text using \" .

7. Escape every backslash using \\ .

8. Escape every newline inside string using \n.

9. Escape every tab using \t.

10. Never include raw control characters.

11. Never include ASCII control characters (U+0000–U+001F).

12. Never leave trailing commas.

13. Never omit commas.

14. Never duplicate keys.

15. Never output comments.

16. Never output undefined.

17. Never output NaN.

18. Never output Infinity.

19. Never output functions.

20. Never output markdown.

21. Never output HTML.

22. Every array must contain valid JSON values only.

23. Every object must be completely closed.

24. Every string must be properly terminated.

25. Before returning the response, internally validate that JSON.parse(response) would succeed.

26. If any character could break JSON, escape it before returning.

27. If validation fails, regenerate the entire JSON until it is valid.

28. Output MUST be 100% machine-readable JSON.

29. The response must contain zero syntax errors.

30. Do not use literal line breaks inside JSON string values. Use \\n instead.

Inside every JSON string:

- Escape all quotation marks as \"
- Escape all backslashes as \\
- Replace every real newline with \n
- Replace every carriage return with \r
- Replace every tab with \t

FINAL VALIDATION

Before producing the final answer:

Simulate running:

JSON.parse(response)

If parsing fails for ANY reason:

DO NOT OUTPUT.

Instead regenerate the entire response until it becomes valid JSON.

The final answer MUST successfully pass JSON.parse() without any modification.

Return ONLY the JSON object.

`};