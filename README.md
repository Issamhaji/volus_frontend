# Volus AI - E-commerce Intelligence Platform

Volus AI is an advanced AI-powered platform that helps e-commerce sellers, brands, and businesses discover winning products, analyze market trends, and gain competitive intelligence across multiple marketplaces.

## Overview

Volus AI provides comprehensive market intelligence by analyzing millions of data points from Amazon, TikTok, Google Trends, and 50+ other platforms. Our platform empowers sellers to make data-driven decisions and stay ahead of the competition.

## Key Features

### 🔍 Semantic Search
Advanced AI-powered product search that understands natural language queries and returns the most relevant products based on:
- Product attributes and specifications
- Market trends and performance metrics
- Consumer sentiment and reviews
- Cross-platform availability

### 📈 Trends Explorer
Discover what's trending across 13+ product categories:
- Real-time category trend tracking
- AI-powered trend scoring engine analyzing 47+ signals
- Smart alerts for breakout products
- Emerging subcategory detection
- Market gap identification

### 🎯 Competitor Intelligence
Stay ahead with comprehensive competitive analysis:
- Market share mapping and tracking
- Ad spend monitoring and creative vault
- Dynamic pricing intelligence
- Sentiment analysis of competitor products
- Stock and availability monitoring

### 🔮 Prediction Lab
Leverage AI to forecast product success:
- Demand prediction models
- Profitability analysis
- Trend lifespan forecasting
- Seasonality adjustments
- Risk assessment scoring

### 💬 Sentiment Analysis
Understand customer emotions at scale:
- Multi-platform review aggregation
- Real-time emotion heatmaps
- Complaint clustering and opportunity scoring
- Brand perception tracking
- Feature gap identification

### 📊 Monitoring Dashboard
Track your portfolio and competitors:
- Custom watchlists
- Real-time alerts and notifications
- Performance metrics tracking
- Market condition monitoring
- Automated reporting

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Email**: ZeptoMail

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Stripe account (for billing)
- ZeptoMail account (for emails)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/badrmellal/volus_frontend.git
cd volus_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Configure the following in `.env.local`:
- Database connection string
- NextAuth secret and URL
- Stripe API keys
- ZeptoMail credentials
- API endpoints

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   ├── competitor/           # Competitor intelligence page
│   ├── trends-explorer/      # Category trends page
│   ├── semantic-search/      # Product search page
│   ├── prediction-lab/       # AI predictions page
│   ├── sentiment/            # Sentiment analysis page
│   ├── monitoring/           # Portfolio monitoring page
│   └── user-dashboard/       # User control room
├── components/               # Reusable components
│   ├── ui/                   # UI components
│   └── navigation/           # Navigation components
├── lib/                      # Utility functions
└── types/                    # TypeScript definitions
```

## Subscription Tiers

- **Starter**: Basic access with limited queries
- **Pro**: Full feature access with higher limits
- **Enterprise**: Unlimited access with priority support

## License

Proprietary - All rights reserved

## Contact

For questions or support, contact us through the platform or visit [volus.ai](https://volus.ai)
