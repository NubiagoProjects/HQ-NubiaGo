# NubiaGo Command Center Dashboard

A comprehensive business management dashboard for NubiaGo's agent network, orders, suppliers, and financial operations with full Airtable integration.

## Features

### 🎯 Core Modules
- **Agent Management** - Track agent performance, XP, commissions, and recruitment
- **Order Pipeline** - Kanban-style order management with real-time status updates
- **Supplier Network** - Monitor supplier performance, trust scores, and margins
- **Customer Feedback** - Support ticket management with satisfaction tracking
- **Financial Management** - Commission tracking, product margins, and sales analytics
- **Analytics Dashboard** - Business intelligence and performance insights

### 🔗 Airtable Integration
- **Real-time Data Sync** - Bidirectional synchronization with Airtable
- **Flexible Schema** - Customizable table names and field mappings
- **Category Management** - Dynamic categories for products, issues, and statuses
- **Batch Operations** - Efficient bulk data operations with rate limiting
- **Error Handling** - Comprehensive error handling and retry mechanisms

### 🎨 Design Features
- **Modern UI** - Clean, professional interface with dark/light theme support
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Interactive Components** - Hover states, animations, and micro-interactions
- **Data Visualization** - Charts, progress bars, and performance metrics
- **Loading States** - Skeleton screens and loading indicators

## Quick Start

### 1. Setup Airtable Base

Create a new Airtable base with the following tables:

#### Agents Table
```
- Name (Single line text)
- Country (Single select)
- Status (Single select: Active, Interviewing, Applied)
- XP (Number)
- Total Orders (Number)
- Recruited Clients (Number)
- Referred Agents (Number)
- Join Date (Date)
- Commission Rate (Number)
- Total Earned (Currency)
- Monthly Earned (Currency)
- Pending Payouts (Currency)
- Bonus XP (Number)
- Campaign Progress (Number)
```

#### Orders Table
```
- Order ID (Single line text)
- Agent Name (Link to Agents)
- Product (Link to Products)
- Country (Single select)
- Status (Single select: Pending, Assigned to Supplier, In Transit, Delivered, Delayed)
- Assigned Carrier (Single select)
- Last Update (Date & time)
- Value (Currency)
- Cost of Goods (Currency)
- Sale Price (Currency)
- Margin (Formula: {Sale Price} - {Cost of Goods})
- Agent Commission (Formula: {Value} * {Commission Rate} / 100)
```

#### Suppliers Table
```
- Name (Single line text)
- Country (Single select)
- Total Products (Number)
- On Time Percentage (Number)
- Defect Rate (Number)
- Margin Category (Single select: High, Medium, Low)
- Trust Score (Number)
- Average Price (Currency)
- Margin (Number)
```

#### Products Table
```
- Name (Single line text)
- Category (Link to Categories)
- Cost of Goods (Currency)
- Sale Price (Currency)
- Margin (Formula: {Sale Price} - {Cost of Goods})
- Margin Percentage (Formula: {Margin} / {Sale Price} * 100)
- Supplier (Link to Suppliers)
- Stock (Number)
- Monthly Sales (Number)
```

#### Feedback Table
```
- Ticket ID (Single line text)
- Issue Category (Single select: Late Delivery, Damaged Product, Wrong Item, Payment Issue, Communication)
- Submitted By (Single line text)
- Assigned Agent (Link to Agents)
- Resolution Time (Number)
- Status (Single select: Open, In Progress, Resolved, Closed)
- Satisfaction (Rating)
- Created At (Date & time)
```

#### Commissions Table
```
- Commission ID (Single line text)
- Agent ID (Link to Agents)
- Agent Name (Lookup from Agents)
- Order ID (Link to Orders)
- Order Value (Lookup from Orders)
- Commission Rate (Lookup from Agents)
- Commission Amount (Formula: {Order Value} * {Commission Rate} / 100)
- Status (Single select: Pending, Paid, Processing)
- Date (Date)
- Payout Date (Date)
```

#### Campaigns Table
```
- Name (Single line text)
- Description (Long text)
- Start Date (Date)
- End Date (Date)
- Target XP (Number)
- Bonus Amount (Currency)
- Participants (Number)
- Status (Single select: Active, Completed, Upcoming)
```

#### Categories Table
```
- Name (Single line text)
- Type (Single select: Product, Issue, Agent Status, Order Status, Campaign)
- Description (Long text)
- Active (Checkbox)
- Sort Order (Number)
- Created At (Date & time)
- Updated At (Date & time)
```

### 2. Get Airtable Credentials

1. Go to [Airtable API](https://airtable.com/create/tokens)
2. Create a new personal access token with the following scopes:
   - `data.records:read`
   - `data.records:write`
   - `schema.bases:read`
3. Copy your Base ID from your Airtable base URL (starts with `app`)

### 3. Configure Dashboard

1. Open the NubiaGo dashboard
2. Enter your Airtable Base ID and API Key
3. Verify table names match your Airtable base
4. Test the connection
5. Save configuration

## Architecture

### Data Flow
```
Airtable Base ↔ Airtable Service ↔ React Hooks ↔ UI Components
```

### Key Components

#### Services
- `AirtableService` - Core API communication
- `RateLimiter` - API rate limiting
- `DataMapper` - Type conversion between Airtable and internal formats

#### Hooks
- `useAirtableAgents` - Agent data management
- `useAirtableOrders` - Order data management
- `useAirtableSuppliers` - Supplier data management
- `useAirtableFeedback` - Feedback data management
- `useAirtableProducts` - Product data management
- `useAirtableCommissions` - Commission data management
- `useAirtableCampaigns` - Campaign data management

#### Context
- `AirtableProvider` - Global configuration and connection management

### Error Handling

The dashboard includes comprehensive error handling:

- **Connection Errors** - Network and authentication issues
- **Data Errors** - Invalid or missing data
- **Rate Limiting** - Automatic retry with exponential backoff
- **Validation** - Client-side data validation before API calls

### Performance Optimization

- **Lazy Loading** - Components load data only when needed
- **Caching** - Intelligent caching with automatic invalidation
- **Batch Operations** - Efficient bulk data operations
- **Debounced Searches** - Optimized search performance

## Customization

### Adding New Fields

1. Add field to Airtable table
2. Update TypeScript interface in `src/types/airtable.ts`
3. Update mapping functions
4. Add field to UI components

### Custom Categories

The Categories table allows you to:
- Define custom product categories
- Create issue type classifications
- Set up custom agent statuses
- Configure order status workflows

### Theming

The dashboard supports:
- Light/Dark mode toggle
- Custom color schemes via Tailwind CSS
- Responsive breakpoints
- Accessibility features

## Development

### Tech Stack
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

### Project Structure
```
src/
├── components/          # UI components
│   ├── Agents/         # Agent management
│   ├── Orders/         # Order pipeline
│   ├── Suppliers/      # Supplier network
│   ├── Feedback/       # Customer feedback
│   ├── Financials/     # Financial management
│   ├── Analytics/      # Business analytics
│   ├── Layout/         # Navigation and layout
│   ├── Setup/          # Airtable configuration
│   └── UI/             # Reusable UI components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript definitions
├── utils/              # Utility functions
└── data/               # Mock data (fallback)
```

### Environment Variables

Create a `.env` file for development:
```
VITE_AIRTABLE_BASE_ID=your_base_id
VITE_AIRTABLE_API_KEY=your_api_key
```

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Setup
Set the following environment variables in your deployment platform:
- `VITE_AIRTABLE_BASE_ID`
- `VITE_AIRTABLE_API_KEY`

## Support

For issues and questions:
1. Check the error messages in the dashboard
2. Verify Airtable configuration
3. Test API connectivity
4. Review browser console for detailed errors

## License

This project is proprietary software for NubiaGo operations.