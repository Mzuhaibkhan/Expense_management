# Expense Management System# Vue 3 + TypeScript + Vite



A comprehensive expense management and approval platform with OCR, multi-level approvals, conditional approval rules, and currency localization.This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.



## FeaturesLearn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


- **Multi-tenant Architecture**: Auto-create company and admin on first signup
- **Expense Submission**: Submit expenses with receipt upload and OCR extraction
- **Multi-level Approvals**: Configurable approval workflows
- **Conditional Rules**: Percentage-based, specific approver, or hybrid logic
- **Currency Management**: Multi-currency support with live exchange rates
- **Audit Trail**: Complete immutable audit log

## Tech Stack

- React 18 + TypeScript
- Vite
- React Router
- Axios
- date-fns

## Getting Started

### Install dependencies
```bash
npm install
```

### Set up environment variables
```bash
cp .env.example .env
```

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── features/         # Feature-specific components
├── services/         # API clients
├── context/          # React context
├── hooks/            # Custom hooks
├── types/            # TypeScript types
├── utils/            # Helper functions
└── App.tsx           # Main app
```

## API Integration

- **REST Countries**: `https://restcountries.com/v3.1/all?fields=name,currencies`
- **Exchange Rate**: `https://api.exchangerate-api.com/v4/latest/{BASE_CURRENCY}`

## License

MIT
