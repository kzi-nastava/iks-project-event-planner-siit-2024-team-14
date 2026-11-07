# Event Planner — Web Application

**Angular 18 | TypeScript | Team Project**

Event Planner is a multi-platform event management system designed to connect event organizers, attendees, and service providers.

This repository contains the **Angular web application**, which provides an interactive interface for event planning, service discovery, bookings, communication, and platform administration.

The application is part of a collaborative university project developed for Server-Layer Engineering course at the Faculty of Technical Sciences, University of Novi Sad.

## Key Features

### Event Discovery and Management
- Browse and search events
- Filter events by available criteria
- View event details
- Create and manage events
- Manage event types and categories
- Save favorite events
- View joined events and manage participation
- Organize event agendas and activities

### User Accounts and Profiles
- User registration and login
- Role-specific user interfaces
- Organizer and service provider profiles
- Account and profile management

### Services, Products and Bookings
- Browse services and products
- Search and filter available offerings
- View service and product details
- Manage offerings and price lists
- Submit and manage service booking requests
- Manage event budgets

### Communication and Administration
- Direct messaging
- Notifications
- Event invitations
- Administrative management of reports and comments
- Management interfaces for event types and categories

## Technology Stack

| Category | Technologies |
|---|---|
| Framework | Angular 18 |
| Language | TypeScript 5.5 |
| UI Components | Angular Material, Angular CDK |
| Reactive Programming | RxJS |
| Routing | Angular Router |
| Authentication | JWT integration |
| Real-time Communication | STOMP, SockJS |
| PDF Generation | jsPDF, jsPDF AutoTable |
| Testing | Jasmine, Karma |
| Build Tools | Angular CLI |

## Project Structure

The application is organized into feature-based Angular modules and components.

```text
src/
└── app/
    ├── communication/
    ├── components/
    │   ├── admin-comments/
    │   ├── admin-reports/
    │   ├── booking-service-requests/
    │   ├── event-budget/
    │   ├── event-management/
    │   ├── event-type-management/
    │   ├── invitations/
    │   ├── joined-events/
    │   ├── login/
    │   ├── notifications/
    │   ├── profiles/
    │   └── registration/
    ├── dialogs/
    ├── event-details/
    ├── infrastructure/
    ├── interfaces/
    └── offerings/
```

## Getting Started

### Prerequisites

- Node.js and npm compatible with Angular 18
- Angular CLI 18
- Event Planner backend for API-dependent functionality

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kzi-nastava/iks-project-event-planner-siit-2024-team-14.git
```

2. Navigate to the project directory:

```bash
cd iks-project-event-planner-siit-2024-team-14
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

5. Open the application in your browser:

```text
http://localhost:4200
```

Some features require the Spring Boot backend and its database to be running.

## Testing

The project uses **Jasmine** and **Karma** for Angular testing.

Run the configured test suite with:

```bash
npm test
```

Test execution may require a compatible browser and additional local configuration.

## Building the Application

Create a production build using:

```bash
npm run build
```

Angular generates the build output in the configured distribution directory.

## System Architecture

The Event Planner platform consists of three connected applications:

| Component | Technology | Repository |
|---|---|---|
| Web Application | Angular, TypeScript | [Frontend](https://github.com/kzi-nastava/iks-project-event-planner-siit-2024-team-14) |
| Backend | Spring Boot, PostgreSQL | [Backend](https://github.com/kzi-nastava/iss-project-event-planner-siit-2024-team-14) |
| Mobile Application | Java, Android SDK | [Android](https://github.com/kzi-nastava/ma-project-event-planner-siit-2024-team-14) |

The web application communicates with the backend through HTTP APIs and uses real-time communication technologies for supported messaging and notification features.
