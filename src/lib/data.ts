import { PlaceHolderImages } from "./placeholder-images";
import type { ImagePlaceholder } from "./placeholder-images";

const findImage = (id: string): ImagePlaceholder => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
        // Fallback to a default image if not found, to prevent crashes
        return {
            id: 'fallback',
            description: 'Fallback image',
            imageUrl: 'https://picsum.photos/seed/fallback/600/400',
            imageHint: 'abstract'
        };
    }
    return img;
};

export const navLinks = [
    { title: 'Home', id: 'home' },
    { title: 'About', id: 'about' },
    { title: 'Skills', id: 'skills' },
    { title: 'Projects', id: 'projects' },
    { title: 'Experience', id: 'experience' },
    { title: 'Contact', id: 'contact' },
];

export const skills = {
    'Frontend Development': [
        { name: 'React.js', level: 95, icon: '⚛️', projectCount: 6 },
        { name: 'JavaScript (ES6+)', level: 90, icon: '🟨', projectCount: 6 },
        { name: 'HTML5 & CSS3', level: 90, icon: '🎨', projectCount: 6 },
        { name: 'Tailwind CSS', level: 75, icon: '🌊', projectCount: 2 },
        { name: 'Three.js', level: 60, icon: '🎮', projectCount: 1 },
        { name: 'TypeScript', level: 70, icon: '📘', projectCount: 2 },
        { name: 'Next.js', level: 50, icon: '▲', projectCount: 1 },
    ],
    'Backend Development': [
        { name: 'Node.js', level: 90, icon: '🟢', projectCount: 5 },
        { name: 'Express.js', level: 85, icon: '🚂', projectCount: 4 },
        { name: 'RESTful APIs', level: 90, icon: '🔌', projectCount: 5 },
        { name: 'JWT Authentication', level: 75, icon: '🔐', projectCount: 2 },
    ],
    'Database': [
        { name: 'MongoDB', level: 80, icon: '🍃', projectCount: 3 },
        { name: 'MySQL', level: 70, icon: '🐬', projectCount: 1 },
        { name: 'SQL', level: 85, icon: '💾', projectCount: 2 },
        { name: 'PostgreSQL', level: 65, icon: '🐘', projectCount: 1 },
        { name: 'Firebase', level: 75, icon: '🔥', projectCount: 1 },
    ],
    'Design & Tools': [
        { name: 'Figma', level: 95, icon: '🎨', projectCount: 5 },
        { name: 'Adobe XD', level: 60, icon: '💎', projectCount: 1 },
        { name: 'UI/UX Design', level: 90, icon: '🖌️', projectCount: 6 },
        { name: 'Git & GitHub', level: 90, icon: '🐙', projectCount: 6 },
        { name: 'VS Code', level: 95, icon: '💻', projectCount: 6 },
        { name: 'Postman', level: 75, icon: '📮', projectCount: 5 },
    ],
};

export const projects = [
    {
        title: 'AI-Powered Chatbot',
        image: findImage('project-chatbot'),
        tech: ['React', 'Node.js', 'OpenAI', 'Express', 'MongoDB'],
        description: 'Intelligent chatbot with memory that provides human-like responses.',
        features: ['Natural language understanding', 'Context-aware conversations', 'Chat history with search', 'Multi-language support', 'Real-time typing indicators'],
        github: '#',
        live: '#',
    },
    {
        title: 'Advanced Task Management System',
        image: findImage('project-task-manager'),
        tech: ['React', 'Node.js', 'Socket.io', 'JWT', 'Tailwind'],
        description: 'Full-featured project management tool for teams.',
        features: ['Drag-and-drop Kanban board', 'Real-time collaboration', 'Priority & deadline management', 'Team assignment', 'Progress tracking dashboard'],
        github: '#',
        live: '#',
    },
    {
        title: 'Smart To-Do List Application',
        image: findImage('project-todo'),
        tech: ['React', 'Firebase', 'Framer Motion', 'LocalStorage'],
        description: 'Beautiful and intuitive task organizer with smart features.',
        features: ['Categories & tags', 'Due date reminders', 'Search & advanced filters', 'Dark/Light mode', 'Voice input'],
        github: '#',
        live: '#',
    },
    {
        title: 'SQL Database Dashboard',
        image: findImage('project-db-dashboard'),
        tech: ['React', 'Node.js', 'MySQL', 'PostgreSQL', 'Recharts'],
        description: 'Powerful database management tool with analytics.',
        features: ['Visual query builder', 'Real-time data visualization', 'CRUD operations interface', 'Table relationship mapper', 'Export reports'],
        github: '#',
        live: '#',
    },
    {
        title: 'E-Commerce Platform',
        image: findImage('project-ecommerce'),
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
        description: 'Full-stack online shopping platform.',
        features: ['Product catalog with filters', 'Shopping cart', 'Secure payment integration', 'Order tracking', 'Admin dashboard'],
        github: '#',
        live: '#',
    },
    {
        title: 'Weather Forecast App',
        image: findImage('project-weather'),
        tech: ['React', 'OpenWeather API', 'Mapbox'],
        description: 'Real-time weather app with stunning visuals.',
        features: ['Current weather & 7-day forecast', 'Location-based detection', 'Interactive maps', 'Weather alerts', 'Beautiful UI with animations'],
        github: '#',
        live: '#',
    },
];

export const experiences = [
    {
        category: 'Education',
        items: [
            { title: 'B.Tech at PME College', date: '2024-2028', description: 'Pursuing a degree in Computer Science, focusing on software development and design principles.' },
        ],
    },
    {
        category: 'Certifications',
        items: [
            { title: 'React.js - Advanced', date: '2024', description: 'Completed an in-depth course on advanced React concepts and performance optimization.' },
            { title: 'Node.js Development', date: '2024', description: 'Mastered backend development with Node.js, Express, and REST APIs.' },
            { title: 'UI/UX Design Fundamentals', date: '2024', description: 'Gained foundational knowledge in user interface and user experience design.' },
            { title: 'SQL Database Management', date: '2024', description: 'Learned advanced SQL queries and database administration.' },
        ],
    },
    {
        category: 'Achievements',
        items: [
            { title: 'Built 15+ Projects', date: 'Ongoing', description: 'Developed a diverse range of personal and academic projects.' },
            { title: 'Open Source Contributor', date: 'Ongoing', description: 'Actively contributing to various open-source projects on GitHub.' },
            { title: 'Hackathon Participant', date: '2024', description: 'Competed in multiple hackathons, developing innovative solutions under pressure.' },
            { title: 'College Tech Society Member', date: '2024-Present', description: 'An active member of the college technology society, organizing and participating in events.' },
        ],
    },
];
