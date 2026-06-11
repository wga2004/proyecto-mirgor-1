# Mirgor Backend - API Node.js/Express

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 15+

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
NODE_ENV=development
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USER=mirgor
DB_PASSWORD=mirgor123
DB_NAME=mirgor_db
JWT_SECRET=your-secret-key
```

## Running

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## API Endpoints

See [API.md](../API.md) for complete documentation.
