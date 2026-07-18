# BoT Test Project

A modern web application built with [SvelteKit](https://kit.svelte.dev/), featuring server-side rendering, localization, comprehensive testing, and performance budget monitoring.

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (with forms & typography plugins)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Localization (i18n)**: [ParaglideJS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
- **Testing**:
  - [Playwright](https://playwright.dev/) for E2E and performance budget tests
  - [Vitest](https://vitest.dev/) for unit testing
- **CI/CD Quality**: Lighthouse CI (`@lhci/cli`), ESLint, Prettier, Husky

## Getting Started

### Prerequisites

Make sure you have Node.js (v20+) installed.

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Development Server

Start the development server:

```bash
npm run dev
# or open automatically in the browser:
npm run dev -- --open
```

## Available Commands

| Command               | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `npm run dev`         | Start the development server                                     |
| `npm run build`       | Build the project for production                                 |
| `npm run preview`     | Preview the production build locally                             |
| `npm run check`       | Run `svelte-check` and TypeScript type checking                  |
| `npm run lint`        | Run ESLint and Prettier checks                                   |
| `npm run format`      | Auto-format code with Prettier                                   |
| `npm run test`        | Run both Unit and E2E tests                                      |
| `npm run test:unit`   | Run unit tests with Vitest                                       |
| `npm run test:e2e`    | Run end-to-end tests with Playwright                             |
| `npm run test:budget` | Run JS bundle size budget tests (fails if bundles exceed limits) |

## Project Structure

```text
├── src/
│   ├── app.html         # Main HTML template
│   ├── hooks.server.ts  # Server-side hooks
│   ├── lib/             # Shared components, utilities, and states
│   │   ├── components/  # UI components
│   │   ├── paraglide/   # Auto-generated i18n runtime
│   │   ├── state/       # Global application states
│   │   └── utils/       # Helper functions
│   └── routes/          # SvelteKit file-based routing
│       ├── (app)/       # Dashboard/authenticated routes
│       └── (marketing)/ # Public-facing routes
├── tests/               # Playwright E2E and budget tests
├── messages/            # i18n translation files (inlang)
├── lighthouserc.json    # Lighthouse CI configuration
└── tailwind.config.ts   # Tailwind CSS configuration
```

## Performance Budgets

This project enforces strict JavaScript bundle size limits per route to ensure optimal load times (LCP/TTI). These are automatically verified using Playwright. To run the budget checks:

```bash
npm run test:budget
```

## License

This project is proprietary and confidential.
