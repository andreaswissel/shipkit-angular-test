# Angular ShipKit Demo

A demo Angular workspace showcasing a UI component library with ShipKit integration.

## Project Structure

```
angular-shipkit-demo/
├── projects/
│   ├── ui-components/          # Component library
│   │   └── src/lib/
│   │       ├── button/         # Button component
│   │       ├── card/           # Card component
│   │       ├── input/          # Input component
│   │       ├── badge/          # Badge component
│   │       ├── avatar/         # Avatar component
│   │       ├── progress/       # Progress bar
│   │       ├── spinner/        # Loading spinner
│   │       ├── stat-card/      # Statistics card
│   │       ├── table/          # Data table
│   │       └── modal/          # Modal dialog
│   │
│   └── dashboard/              # Sample dashboard app
│       └── src/app/
│           ├── layout/         # Layout components
│           ├── pages/          # Page components
│           │   ├── dashboard/  # Dashboard page
│           │   ├── users/      # Users management
│           │   ├── settings/   # Settings page
│           │   └── shipkit/    # ShipKit integration
│           └── services/       # Angular services
│
└── .storybook/                 # Storybook config (stories included)
```

## Quick Start

```bash
# Install dependencies
npm install

# Build the component library
npm run build:lib

# Start the dashboard application
npm start
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Serve the dashboard app on http://localhost:4200 |
| `npm run build` | Build the dashboard for production |
| `npm run build:lib` | Build the ui-components library |
| `npm run storybook` | Start Storybook (requires Angular 21 compatible version) |

## Component Library

The `ui-components` library includes 10 reusable components:

- **Button** - Primary button with variants (primary, secondary, danger, ghost)
- **Card** - Container with shadow and optional header/footer
- **Input** - Text input with labels, validation, and hints
- **Badge** - Status badges with color variants
- **Avatar** - User avatar with initials fallback and status indicator
- **Progress** - Progress bar with variants and animation
- **Spinner** - Loading spinner in multiple sizes
- **StatCard** - Statistics card with trend indicators
- **Table** - Data table with sorting and empty states
- **Modal** - Dialog overlay with footer actions

### Usage

```typescript
import { ButtonComponent, CardComponent } from 'ui-components';

@Component({
  imports: [ButtonComponent, CardComponent],
  template: `
    <ui-card title="My Card">
      <ui-button variant="primary">Click me</ui-button>
    </ui-card>
  `
})
export class MyComponent {}
```

## ShipKit Integration

The dashboard includes a ShipKit integration page (`/shipkit`) that demonstrates:

- Feature generation with AI
- Component registry management
- Feature flag creation
- Generation history tracking

### ShipKit Service

```typescript
import { ShipkitService } from './services/shipkit.service';

const spec = {
  name: 'UserProfileCard',
  description: 'A card showing user profile',
  requirements: [
    'Display user avatar',
    'Show user name and bio'
  ]
};

const result = await shipkitService.ship(spec, {
  validate: true,
  createFlag: true
});
```

## Storybook

Story files are included for all components in the library. Each component has comprehensive stories showcasing different variants and use cases.

Note: Storybook requires Angular 21 compatible version. Story files are located in each component directory:
- `button/button.stories.ts`
- `card/card.stories.ts`
- etc.

## License

MIT
