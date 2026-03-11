# Avni Webapp Architecture

## Overview

Avni Webapp is a React-based web application that provides administrative interfaces and data entry capabilities for the Avni health/social data collection platform.

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 7
- **State Management**: Redux with Redux Saga
- **UI Framework**: Material-UI (MUI) v7
- **Admin Framework**: React Admin v5
- **Routing**: React Router v7
- **Forms**: React Hook Form, Redux Form
- **Authentication**: AWS Amplify (Cognito)
- **Internationalization**: i18next
- **Testing**: Jest, Cypress

## Application Modules

### 1. Admin App (`src/adminApp`)
Organization and system administration interface.

**Features:**
- Organization management
- User management
- Location hierarchy management
- Catchment area configuration
- Address level types
- Identifier sources and assignments

### 2. App Designer (`src/formDesigner`)
Visual form and workflow design tools.

**Features:**
- Form creation and editing
- Form element configuration
- Validation rules
- Skip logic and decision support
- Form preview

### 3. Data Entry App (`src/dataEntryApp`)
Web-based data collection interface.

**Features:**
- Subject registration
- Encounter recording
- Program enrollment
- Form-based data entry
- Search and filter
- Data validation

### 4. Reports (`src/reports`)
Reporting and analytics interface.

**Features:**
- Self-service reports
- Metabase integration
- Data export
- Longitudinal reports

### 5. Translations (`src/translations`)
Multi-language translation management.

**Features:**
- Translation upload/download
- Language support: Hindi, Gujarati, Kannada, Tamil, Marathi, English
- Translation dashboard

### 6. Upload (`src/upload`)
Bulk data upload functionality.

**Features:**
- CSV/Excel upload
- Metadata validation
- Upload status tracking
- Location hierarchy upload
- Encounter data upload

### 7. News & Broadcast (`src/news`)
Communication and notification system.

**Features:**
- News creation and management
- Broadcast messages
- WhatsApp integration
- User targeting

### 8. Documentation (`src/documentation`)
In-app documentation system.

**Features:**
- Context-sensitive help
- Tooltips
- User guides

### 9. User Groups (`src/userGroups`)
User group management for access control.

### 10. Tutorials (`src/tutorials`)
Tutorial resources and learning materials.

## Architecture Patterns

### State Management

**Redux + Redux Saga Pattern:**
```
Component → Action → Saga → API → Reducer → Component
```

**Ducks Pattern:**
- Actions, reducers, and sagas co-located in single files
- Used in most modules except Form Designer

**React Admin Pattern:**
- Used in Admin App
- Data providers for API integration
- Resource-based routing

### Component Structure

```
src/
├── adminApp/          # Admin interfaces
├── dataEntryApp/      # Data entry
├── formDesigner/      # Form design
├── rootApp/           # Root app & routing
├── common/            # Shared components
├── reports/           # Reporting
├── translations/      # i18n management
├── upload/            # Bulk upload
├── news/              # News & broadcast
└── documentation/     # Help system
```

### Authentication Flow

1. User lands on login page
2. Choose IDP (Cognito/Keycloak)
3. Authenticate via AWS Amplify
4. JWT token stored
5. Token included in API requests
6. Secure app routes protected

### API Communication

- **Base URL**: Configurable via `BACKEND_URL` env variable
- **Authentication**: JWT Bearer token
- **Request/Response**: JSON
- **Error Handling**: Centralized error boundaries

## Data Flow

### Form Designer Flow
```
Form Metadata → Form Designer → Validation → Save → Backend API
```

### Data Entry Flow
```
User Input → Form Validation → Business Rules → Save → Sync Queue → Backend
```

### Sync Flow
```
Backend Changes → Polling/WebSocket → Local State Update → UI Refresh
```

## Key Design Decisions

### Why Vite over Create React App?
- Faster build times
- Better HMR (Hot Module Replacement)
- Modern ES modules support

### Why Redux Saga?
- Complex async flows
- Better testability
- Centralized side effects

### Why Material-UI?
- Comprehensive component library
- Accessibility built-in
- Theming support

### Why React Admin?
- Rapid admin interface development
- Built-in CRUD operations
- Extensible architecture

## Development Workflow

### Local Development
```bash
# Connect to staging server (recommended)
make start-with-staging

# Connect to local server
make start
```

### Code Organization
- Feature-based folder structure
- Ducks pattern for Redux
- Shared utilities in `common/`
- Reusable components in `common/components/`

### Testing Strategy
- **Unit Tests**: Jest for components and utilities
- **Integration Tests**: Redux saga test plan
- **E2E Tests**: Cypress for critical flows
- **CI/CD**: CircleCI for automated testing

## Performance Considerations

- **Code Splitting**: Route-based lazy loading
- **Memoization**: React.memo for expensive components
- **Virtual Scrolling**: For large lists
- **Debouncing**: Search and filter inputs
- **Caching**: Redux state persistence

## Security

- **Authentication**: AWS Cognito JWT tokens
- **Authorization**: Role-based access control
- **XSS Protection**: DOMPurify for HTML sanitization
- **CSRF**: Token-based protection
- **HTTPS**: Enforced in production

## Deployment

### Build Process
```bash
yarn build
# Outputs to dist/ directory
```

### Environment Configuration
- `.env.development` - Local development
- `.env.production` - Production build
- Environment variables for backend URL

### Docker Support
```bash
docker build -t avni-webapp .
docker run -p 3000:3000 avni-webapp
```

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions + ESR)
- Safari >= 15.4
- iOS >= 15.4
- Edge (latest 2 versions)

## Accessibility

- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatible
- ARIA labels and roles
- Focus management

## Internationalization

- **Library**: i18next
- **Languages**: English, Hindi, Gujarati, Kannada, Tamil, Marathi
- **Translation Files**: `translations/*.json`
- **RTL Support**: Planned

## Future Enhancements

- Progressive Web App (PWA) support
- Offline data entry
- Real-time collaboration
- Advanced analytics dashboard
- Mobile-responsive improvements
