# SchoolNet

SchoolNet is a modern web application built with Next.js that provides a comprehensive school management system. It offers features for different user roles including school administrators, teachers, and parents.

## Features

- 🔐 Secure Authentication System
  - User registration and login
  - Email verification
  - OTP verification
  - Password recovery
  - Role-based access control

- 📊 Dashboard
  - School dashboard
  - parent dashboard

- 👥 User Management
  - Role selection
  - Parent questionnaire
  - User profiles

## Tech Stack

- **Framework:** Next.js 15.3.0
- **Language:** TypeScript
- **UI Components:** 
  - Material-UI (MUI)
  - Radix UI
  - Tailwind CSS
- **State Management:** Redux Toolkit with Redux Persist
- **Form Handling:** React Hook Form with Zod validation
- **Styling:** Tailwind CSS with PostCSS
- **Icons:** Lucide React, React Icons
- **Charts:** Recharts
- **Date Handling:** date-fns
- **HTTP Client:** Axios

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd schoolnet
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run start` - Runs the built app in production mode
- `npm run lint` - Runs the linter to check code quality

## Project Structure

```
schoolnet/
├── app/                    # Next.js app directory
│   ├── components/        # App-specific components
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication pages
│   └── ...
├── components/            # Shared components
├── contexts/             # React contexts
├── redux/                # Redux store and slices
├── services/             # API services
├── types/                # TypeScript type definitions
└── public/              # Static assets
```

## Deploy on Vercel

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Support

For support, please contact the development team or raise an issue in the repository.


The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# schoolnet
