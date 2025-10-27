# School Content Management System (CMS)

A modern, full-featured Content Management System designed specifically for educational institutions. This platform empowers schools to manage their websites effortlessly, enabling administrators to update content, publish announcements, manage media, and organize pages without requiring technical knowledge.

Built with cutting-edge technologies to deliver a fast, responsive, and user-friendly experience for both administrators and visitors.

## 🚀 Features

- **Intuitive Admin Panel** - User-friendly interface for content management without technical expertise
- **Dynamic Content Management** - Easily manage pages, blog posts, announcements, and navigation
- **Media Management** - Upload, organize, and manage images and documents with automatic optimization
- **Secure Authentication** - Role-based access control for different staff members
- **Draft & Live Preview** - Preview content before publishing
- **SEO Optimized** - Built-in SEO tools for better search engine visibility
- **Responsive Design** - Mobile-first approach ensuring great experience on all devices
- **Smooth Animations** - Enhanced user experience with Framer Motion
- **Fast Performance** - Optimized for speed with Next.js 15 and static generation

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router for optimal performance
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality UI components
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations and transitions
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Backend
- **[Payload CMS 3.0](https://payloadcms.com/)** - Headless CMS for content management
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[GraphQL](https://graphql.org/)** - Efficient data querying

### Deployment
- **[Vercel](https://vercel.com/)** - Seamless deployment and hosting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 20.9.0 or higher
- **pnpm** 10.x or higher
- **PostgreSQL** database (local or remote)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cms-sekolah.git
cd cms-sekolah
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database
DATABASE_URI=postgresql://user:password@localhost:5432/school_cms

# Payload
PAYLOAD_SECRET=your-secret-key-here

# Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 4. Run Database Migrations

```bash
pnpm payload migrate
```

### 5. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### 6. Create Your First Admin User

Navigate to `http://localhost:3000/admin` and follow the on-screen instructions to create your first admin account.

## 📁 Project Structure

```
cms-sekolah/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable React components
│   ├── collections/         # Payload CMS collections
│   ├── globals/            # Payload CMS globals (Header, Footer)
│   ├── blocks/             # Layout builder blocks
│   └── payload.config.ts   # Payload CMS configuration
├── public/                 # Static assets
├── tests/                  # Test files
└── package.json           # Dependencies and scripts
```

## 🎯 Key Features Explained

### Content Management

**Collections:**
- **Pages** - Create and manage website pages with a flexible layout builder
- **Posts** - Publish blog posts, news, and announcements
- **Media** - Upload and organize images, documents, and other files
- **Categories** - Organize content with nested categories
- **Users** - Manage staff access with role-based permissions

**Globals:**
- **Header** - Configure navigation menus and branding
- **Footer** - Manage footer links and information

### Layout Builder

Create custom page layouts using pre-built blocks:
- **Hero** - Eye-catching header sections
- **Content** - Rich text content with media
- **Media Block** - Image and video galleries
- **Call to Action** - Conversion-focused sections
- **Archive** - Dynamic content listings

### Authentication & Access Control

- Secure role-based authentication system
- Different permission levels for staff members
- Protected admin panel access
- Draft and published content visibility control

### SEO & Performance

- Built-in SEO optimization tools
- Automatic sitemap generation
- Image optimization with Sharp
- Static site generation for fast loading
- On-demand revalidation for content updates

## 📜 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm payload migrate        # Run database migrations
pnpm payload migrate:create # Create new migration

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors

# Testing
pnpm test             # Run all tests
pnpm test:e2e         # Run end-to-end tests
```

## 🗄️ Database Management

### Working with PostgreSQL

This project uses PostgreSQL for data storage. When making schema changes:

1. **Development**: The database adapter uses `push: true` by default, allowing you to modify fields without migrations
2. **Production**: Always create and run migrations before deploying

### Creating Migrations

```bash
# Create a new migration
pnpm payload migrate:create

# Run pending migrations
pnpm payload migrate
```

### Seeding Data

You can seed the database with sample content from the admin panel:
1. Navigate to `/admin`
2. Click "Seed Database" in the settings

⚠️ **Warning**: Seeding will reset your database. Only use on new projects.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

This project is optimized for deployment on Vercel:

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com/new)
   - Import your repository
   - Configure environment variables
   - Deploy!

3. **Configure Environment Variables**
   Add these to your Vercel project settings:
   - `DATABASE_URI` - Your PostgreSQL connection string
   - `PAYLOAD_SECRET` - A secure random string
   - `NEXT_PUBLIC_SERVER_URL` - Your Vercel deployment URL

### Production Build

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Database Setup for Production

Before deploying, ensure:
1. PostgreSQL database is provisioned
2. Run migrations: `pnpm payload migrate`
3. Environment variables are configured

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

**Full-Stack Developer**

Built with ❤️ for educational institutions looking to modernize their web presence.

## 🔗 Links

- **GitHub Repository**: [GitHub Repo]
- **Live Demo**: [Live Demo]
- **Documentation**: [Payload CMS Docs](https://payloadcms.com/docs)

## 📧 Support

For questions or support:
- Open an issue on GitHub
- Check the [Payload CMS Documentation](https://payloadcms.com/docs)
- Join the [Payload Discord Community](https://discord.com/invite/payload)

---

**Note**: Replace `[GitHub Repo]` and `[Live Demo]` with your actual links before publishing.

