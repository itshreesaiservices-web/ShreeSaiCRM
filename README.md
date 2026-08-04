# Shree Sai Services - Financial Advisory Platform

A premium, full-stack Next.js 15 application built for modern financial advisory firms. This project seamlessly combines a high-conversion marketing website, a powerful internal CRM for advisors, and a secure, personalized client portal into one unified codebase.

![Dashboard Preview](/public/hero-bg.jpg) 
> *(Replace the above image link with an actual screenshot of your dashboard once deployed)*

## ✨ Features

### 1. Public Marketing Site
- **Premium Aesthetics:** Glassmorphism, smooth animations (Framer Motion), and a bespoke dark/light mode toggle.
- **Conversion Optimized:** Includes beautifully designed service pages (Mutual Funds, Income Tax, Insurance) and a "Book Consultation" funnel.
- **Dynamic Routing:** Next.js App Router powers fast, SEO-friendly static marketing pages.

### 2. Advisor CRM (`/dashboard`)
- **Lead Pipeline:** Drag-and-drop Kanban board to track leads from "New" to "Converted" using `@hello-pangea/dnd`.
- **Client Management:** Manage client portfolios, view KYC statuses, and organize documents.
- **Tax Workflow:** A dedicated kanban board for tracking the status of client tax returns (Missing Docs -> Verification -> Filing).

### 3. Secure Client Portal (`/portal`)
- **Personalized Dashboard:** Clients log in to see their real-time portfolio value, missing documents, and upcoming appointments.
- **Document Vault:** Secure upload/download area for sensitive tax and financial documents.
- **Secure Messaging:** Built-in chat interface for clients to communicate directly with their dedicated advisor.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Actions, React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) + Base UI
- **Database:** SQLite (Development) via [Prisma ORM](https://www.prisma.io/)
- **Authentication:** Custom JWT-based authentication using `jose` & HTTP-only cookies.
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Quick Setup Guide

Follow these steps to get the application running on your local machine.

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ShreeSaiServices
```

### 2. Install dependencies
Make sure you have Node.js 20+ installed.
```bash
npm install
# or
yarn install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following keys:
```env
# Database connection string (SQLite for local development)
DATABASE_URL="file:./dev.db"

# JWT Secret for authentication (Use a strong random string in production)
JWT_SECRET="your-super-secret-jwt-key"
```

### 4. Setup the Database
Push the Prisma schema to create the SQLite database tables and generate the Prisma Client.
```bash
npx prisma db push
npx prisma generate
```

### 5. Seed the Database
Populate the database with default admin accounts, mock clients, and dummy leads so you can test the application immediately.
```bash
npm run prisma db seed
# (This runs the prisma/seed.ts script configured in package.json)
```

### 6. Start the Development Server
```bash
npm run dev
```
The application will now be running at [http://localhost:3000](http://localhost:3000).

---

## 🔐 Default Login Credentials

If you seeded the database using the step above, the following accounts are available for testing:

**Admin / Advisor Access:**
- **Email:** `admin@shreesaiservices.com`
- **Password:** `password123`

**Client Portal Access:**
- **Email:** `vikram.k@example.com`
- **Password:** `password123`

---

## 🚢 Deployment (Production)

To deploy this application to a production environment (like Vercel, Railway, or AWS):

1. **Change the Database:** Swap the SQLite `DATABASE_URL` in `.env` for a production PostgreSQL connection string (e.g., Neon, Supabase, AWS RDS). 
2. **Update Prisma Schema:** In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`.
3. **Run Migrations:** Run `npx prisma migrate deploy` in your production build step.
4. **Set Secrets:** Ensure `JWT_SECRET` is set to a highly secure, random string in your host's environment variables.

```bash
npm run build
npm start
```

## 📝 License
This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
