# 🚀 Anil Kumar Sahu - Portfolio Website

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Live-00f5ff?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge)

**A stunning, futuristic portfolio showcasing my journey as a Full-Stack Developer**

[View Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## ✨ Features

### 🎨 **Stunning Visual Design**
- **Interactive 3D Ballpit** using Three.js with cursor-following physics
- **Glassmorphic UI** with neon accents (Cyan, Purple, Pink)
- **Smooth Animations** - Parallax scrolling, fade-ins, and micro-interactions
- **Responsive Design** - Perfectly optimized for mobile, tablet, and desktop
- **Dark Mode Theme** with gradient overlays

### 🔥 **Core Sections**
- **Hero Section** - Eye-catching introduction with animated text
- **About Me** - Interactive background with stats showcase
- **Skills** - Animated progress bars for 13+ technologies
- **Projects** - 6 featured projects with live demos
- **Experience Timeline** - Visual journey of achievements
- **Contact Form** - Functional form with toast notifications
- **Social Links** - Direct connections to all platforms

### ⚡ **Technical Highlights**
- Built with **React.js** and modern hooks
- **Three.js** integration for 3D graphics
- **Smooth scroll** navigation
- **Optimized performance** (60 FPS animations)
- **SEO-friendly** structure
- **Accessible** design (WCAG compliant)

---

## 🛠️ Tech Stack

### **Frontend**
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

### **3D Graphics**
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=three.js&logoColor=white)

### **Icons & UI**
![Lucide](https://img.shields.io/badge/Lucide_Icons-FF4088?style=flat&logo=lucide&logoColor=white)

### **Deployment**
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/anilkumarsahu/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Install required packages**
```bash
npm install three lucide-react
```

4. **Start the development server**
```bash
npm start
```

5. **Open your browser**
```
http://localhost:3000
```

---

## 📂 Project Structure

```
portfolio/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── Ballpit.jsx      # Three.js interactive component
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── App.jsx               # Main application component
│   ├── index.js
│   └── index.css
├── package.json
├── README.md
└── .gitignore
```

---

## 🎯 Key Components

### **Ballpit Component**
Interactive 3D ball physics simulation using Three.js:
- 200 animated spheres
- Cursor-following interaction
- Realistic gravity and friction
- Wall bouncing physics

### **Skills Section**
Dynamic skill cards with:
- Animated progress bars
- Hover effects with glow
- Categorized display
- Proficiency levels

### **Projects Showcase**
Featured projects include:
- 🤖 AI-Powered Chatbot
- 📋 Task Management System
- ✅ Smart To-Do List
- 🗄️ SQL Database Dashboard
- 🛍️ E-Commerce Platform
- 🌤️ Weather Forecast App

---

## 🎨 Customization

### **Colors**
Update the color scheme in your CSS/Tailwind config:
```css
Primary: #00f5ff (Cyan)
Secondary: #a855f7 (Purple)
Accent: #ff006e (Pink)
Background: #0a0a0a (Black)
```

### **Personal Information**
Update your details in `App.jsx`:
```javascript
// Hero Section
name: "Anil Kumar Sahu"
title: "Full-Stack Developer"
college: "PME College"

// Contact Section
email: "your.email@example.com"
location: "Chennai, Tamil Nadu, India"
```

### **Projects**
Add/edit projects in the `projects` array:
```javascript
{
  title: 'Your Project',
  tech: ['React', 'Node.js'],
  description: 'Project description',
  features: ['Feature 1', 'Feature 2'],
  image: 'project-image-url'
}
```

---

## 📱 Responsive Design

The portfolio is fully responsive across all devices:
- 📱 **Mobile** (< 640px)
- 📱 **Tablet** (640px - 1024px)
- 💻 **Desktop** (> 1024px)
- 🖥️ **Large Desktop** (> 1536px)

---

## ⚡ Performance Optimization

- **Lazy loading** for images
- **Code splitting** for components
- **Optimized Three.js** rendering (60 FPS)
- **Minimal bundle size**
- **Fast load times** (< 3 seconds)

---

## 🚀 Deployment

### **Deploy to Vercel**
```bash
npm install -g vercel
vercel --prod
```

### **Deploy to Netlify**
```bash
npm run build
# Drag and drop 'build' folder to Netlify
```

### **Deploy to GitHub Pages**
```bash
npm install gh-pages --save-dev
npm run deploy
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Anil Kumar Sahu**

- 📧 Email: anil.sahu@example.com
- 💼 LinkedIn: [linkedin.com/in/anilkumarsahu](#)
- 🐙 GitHub: [github.com/anilkumarsahu](#)
- 🐦 Twitter: [@anilkumarsahu](#)
- 📸 Instagram: [@anilkumarsahu](#)

---

## 🙏 Acknowledgments

- **Three.js Community** - For the amazing 3D library
- **React Team** - For the incredible framework
- **Lucide Icons** - For beautiful, consistent icons
- **Inspiration** - Kevin Levron's ballpit component

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/anilkumarsahu/portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/anilkumarsahu/portfolio?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/anilkumarsahu/portfolio?style=social)

---

<div align="center">

### Made with ❤️ by Anil Kumar Sahu

**If you found this helpful, please give it a ⭐ star!**

[Back to Top ⬆️](#-anil-kumar-sahu---portfolio-website)

</div>