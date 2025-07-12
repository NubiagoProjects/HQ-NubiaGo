# NubiaGo Command Center

A comprehensive agent network management and business intelligence platform built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Agent Management**: Track agent performance, XP, and recruitment metrics
- **Order Pipeline**: Kanban-style order management with real-time status updates
- **Supplier Network**: Monitor supplier performance and trust scores
- **Customer Feedback**: Manage support tickets and satisfaction ratings
- **Financial Dashboard**: Commission tracking and payout management
- **Margin Analysis**: Product profitability and business intelligence
- **Airtable Integration**: Real-time data synchronization
- **Dark Mode**: Full dark/light theme support
- **Responsive Design**: Mobile-first responsive interface
- **Accessibility**: WCAG 2.1 AA compliant

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Vitest, Testing Library
- **Linting**: ESLint with TypeScript support
- **Accessibility**: Built-in ARIA support and screen reader compatibility

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/nubiago/command-center.git
cd command-center
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔧 Configuration

### Airtable Integration

1. Navigate to Settings → Airtable Integration
2. Enter your Airtable Base ID and API Key
3. Configure table mappings for your data
4. Test the connection and save settings

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_NAME=NubiaGo Command Center
VITE_APP_VERSION=1.0.0
VITE_AIRTABLE_BASE_URL=https://api.airtable.com/v0
VITE_API_TIMEOUT=30000
```

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

Run tests with UI:
```bash
npm run test:ui
```

Generate coverage report:
```bash
npm run test:coverage
```

## 🏗️ Building for Production

1. Build the application:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Agents/         # Agent management components
│   ├── Orders/         # Order pipeline components
│   ├── Suppliers/      # Supplier network components
│   ├── Feedback/       # Customer feedback components
│   ├── Financials/     # Financial dashboard components
│   ├── Margins/        # Margin analysis components
│   ├── Settings/       # Settings and configuration
│   ├── Layout/         # Layout components
│   └── UI/             # Reusable UI components
├── hooks/              # Custom React hooks
├── services/           # API services and integrations
├── utils/              # Utility functions
├── contexts/           # React contexts
├── types/              # TypeScript type definitions
└── data/               # Mock data and constants
```

## 🎨 Design System

The application uses a comprehensive design system with:

- **Color Palette**: Primary, success, warning, error, and neutral colors
- **Typography**: Inter font family with multiple weights
- **Spacing**: 8px grid system
- **Components**: Consistent button, card, badge, and form components
- **Animations**: Smooth transitions and micro-interactions

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences
- Focus management and skip links

## 🔒 Security

- API key encryption for sensitive data
- Input validation and sanitization
- XSS protection
- Secure storage practices
- Error boundary implementation

## 📊 Performance

- Code splitting and lazy loading
- Image optimization
- Bundle size optimization
- Performance monitoring utilities
- Efficient re-rendering strategies

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@nubiago.com
- Documentation: https://docs.nubiago.com
- Issues: https://github.com/nubiago/command-center/issues

## 🚀 Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Vercel

1. Import project from GitHub
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔄 Updates

Check for updates regularly:
```bash
npm outdated
npm update
```

---

Built with ❤️ by the NubiaGo Team