# ShopDash 🛒

A modern e-commerce dashboard application built with Vue 3, Vite, and TypeScript for managing online shopping experiences seamlessly.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Development](#development)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

---

## Overview

ShopDash is a comprehensive e-commerce dashboard application designed to provide users with an intuitive shopping experience. The application combines modern web technologies to deliver fast performance and a responsive user interface.

### Purpose
- Provide a streamlined shopping platform
- Manage product browsing and purchasing
- Track orders and user preferences
- Ensure secure and fast transactions

---

## ✨ Features

### User Features
- **User Authentication**: Secure login and registration system
- **Product Catalog**: Browse products with advanced filtering and search
- **Shopping Cart**: Add, remove, and manage items in the cart
- **Wishlist**: Save favorite items for later
- **Order Management**: Track current and past orders
- **User Profile**: Manage account information and preferences
- **Payment Integration**: Secure checkout process
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Order Tracking**: Monitor all customer orders
- **User Management**: Manage user accounts and roles
- **Dashboard Analytics**: View sales and user statistics
- **Inventory Management**: Track stock levels

---

## 🛠️ Tech Stack

### Frontend
- **Vue 3**: Progressive JavaScript framework for building user interfaces
- **Vite**: Next-generation frontend build tool for fast development
- **TypeScript**: Adds static typing to JavaScript
- **CSS 3**: Modern styling with responsive design

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Minimalist web framework for Node.js
- **REST API**: For communication between frontend and backend

### Database
- **MongoDB**: NoSQL database for storing application data
- **Mongoose**: ODM (Object Document Mapper) for MongoDB

### Additional Tools
- **Git**: Version control system
- **npm**: Package manager
- **VS Code**: Recommended IDE

---

## 📁 Project Structure

```
ShopDash/
├── src/
│   ├── components/           # Vue components
│   ├── views/                # Page components
│   ├── stores/               # State management (Pinia)
│   ├── services/             # API services
│   ├── types/                # TypeScript types
│   ├── assets/               # Images and static files
│   ├── App.vue               # Root component
│   └── main.ts               # Entry point
├── public/                   # Public assets
├── .vscode/                  # VS Code settings
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies
├── DB.json                   # Mock database (development)
└── README.md                 # Project documentation
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Git

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/abdelftah-shkal/ShopDash.git
   cd ShopDash
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root directory:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_APP_NAME=ShopDash
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

---

## 💻 Usage

### For Users
1. Create an account or log in
2. Browse products using search and filters
3. Add items to cart or wishlist
4. Proceed to checkout
5. Complete payment
6. Track your order in the order history

### For Administrators
1. Access the admin dashboard
2. Manage products (CRUD operations)
3. View and process orders
4. Monitor user activities
5. Generate reports and analytics

---

## ⚙️ Configuration

### Vite Configuration
Edit `vite.config.ts` to customize build settings:
```typescript
export default {
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}
```

### TypeScript Configuration
TypeScript settings are defined in `tsconfig.json`:
- Strict mode enabled
- Target: ES2020
- Module: ESNext

---

## 📜 Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run type-check   # Check TypeScript types
```

### Production
```bash
npm run build        # Create optimized production build
npm run preview      # Test production build locally
```

---

## 🔧 Development

### Setting Up Development Environment
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open browser: `http://localhost:5173`

### Hot Module Replacement (HMR)
Vite provides automatic HMR, so changes will reflect in the browser instantly.

### Type Checking
Run TypeScript type checking:
```bash
npm run type-check
```

### Debugging
- Use Vue DevTools browser extension for component inspection
- Use Chrome DevTools for JavaScript debugging
- Enable Custom Object Formatter for better console output

---

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### How to Contribute
1. **Fork the Repository**
   ```bash
   Click the 'Fork' button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/ShopDash.git
   cd ShopDash
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Make Your Changes**
   - Write clean, well-documented code
   - Follow the existing code style
   - Add comments where necessary

5. **Commit Your Changes**
   ```bash
   git commit -m "Add: Description of your changes"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/YourFeatureName
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click 'New Pull Request'
   - Fill in the PR description
   - Submit the PR

### Commit Message Guidelines
- Use imperative mood: "Add feature" instead of "Added feature"
- Start with a type: feat, fix, docs, style, refactor, test, chore
- Example: `feat: add product filter functionality`

### Code Style
- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Keep lines under 100 characters when possible

---

## 📞 Support

### Getting Help
- **Issues**: Report bugs and request features via GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions
- **Email**: Contact the maintainers at support@shopdash.com

### Documentation
- Vue 3 Documentation: https://vuejs.org/
- Vite Documentation: https://vitejs.dev/
- TypeScript Documentation: https://www.typescriptlang.org/

### Troubleshooting

**Port already in use**
```bash
npm run dev -- --port 3000
```

**Dependencies not installing**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build issues**
```bash
rm -rf .vite dist
npm run build
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- **Abdelftah Shkal** - GitHub Profile: https://github.com/abdelftah-shkal

---

## 🎉 Acknowledgments

- Vue.js community for the amazing framework
- Vite team for the blazing fast build tool
- All contributors and supporters of this project

---

## 📈 Roadmap

### Upcoming Features
- Real-time notifications
- Advanced analytics dashboard
- Social media integration
- Multi-language support
- Mobile app version
- AI-powered recommendations

---

Happy Shopping! 🛍️

For the latest updates, follow our GitHub repository