<div align="center">
  <img src="public/icon-192x192.png" alt="ClientBridge Logo" width="120" />

  # 🌟 ClientBridge | Enterprise CRM & Client Portal
  
  **A Next-Generation, Zero-Cost Financial Advisory Platform built for Scale.**
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://prisma.io/)
  
  <br />
</div>

## 🚀 Overview

**ClientBridge** is not just a marketing website—it is a full-scale Enterprise CRM and Client Portal tailored specifically for Indian financial advisors. It automates tax return tracking, handles mutual fund portfolios, secures client document uploads, and processes payments seamlessly.

Engineered with a **Zero-Cost Edge Architecture**, the platform utilizes generous free-tier services (Supabase, Resend, Upstash) to guarantee **₹0/month server maintenance costs** while remaining capable of handling thousands of active clients.

---

## ✨ Feature Highlights

### 🏢 For the Firm (CRM Dashboard)
- **Lead Pipeline Management**: Kanban-style drag-and-drop boards to track potential clients.
- **Client Vault**: Securely view PAN cards, Aadhar cards, and tax documents uploaded by clients.
- **Automated Tax Workflows**: Instantly update a client's ITR status and trigger automated email notifications.
- **Role-Based Access Control (RBAC)**: Strict boundaries between `ADMIN`, `ADVISOR`, and `CLIENT` roles.

### 👥 For the Client (Self-Service Portal)
- **Seamless Document Uploads**: Clients can snap a photo on their phone and upload their Form 16 directly to your secure cloud bucket.
- **Instant Payments**: Integrated Razorpay checkouts allow clients to pay their advisory fees in two clicks without leaving the portal.
- **Live Portfolio Tracking**: Clients can view their Mutual Fund investments and active tax statuses via their personalized dashboard.
- **Mobile PWA Ready**: The portal acts as a Progressive Web App (PWA). Clients can "Install" the portal directly to their iPhone/Android home screen for a native app experience.

---

## 🛠️ Technology Stack (The Zero-Cost Architecture)

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | `Next.js 16` (App Router) | High-performance React framework. |
| **Styling** | `Tailwind CSS` & `Shadcn UI` | Beautiful, responsive, and accessible UI components. |
| **Database** | `PostgreSQL` via `Supabase` | Highly secure, cloud-hosted relational database. |
| **ORM** | `Prisma` | Type-safe database querying and schema migrations. |
| **Storage** | `Supabase Storage` | Secure S3-style bucket for client tax documents. |
| **Payments** | `Razorpay` | Indian payment gateway with secure webhook validation. |
| **Emails** | `Resend` | Automated HTML email dispatching. |
| **Security** | `Upstash Redis` | Sliding-window rate limiting to prevent DDoS attacks. |
| **Localization**| `next-intl` | Core routing foundation for future Marathi & Hindi translations. |

---

## 💻 How to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/itshreesaiservices-web/ClientBridgeCRM.git
   cd ClientBridgeCRM
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your keys:
   ```env
   DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
   SUPABASE_SERVICE_ROLE_KEY="eyJhbG..."
   
   RAZORPAY_KEY_ID="rzp_test_..."
   RAZORPAY_KEY_SECRET="your_secret_..."
   RAZORPAY_WEBHOOK_SECRET="your_custom_secret"
   
   UPSTASH_REDIS_REST_URL="https://..."
   UPSTASH_REDIS_REST_TOKEN="AZ..."
   
   RESEND_API_KEY="re_..."
   ```

4. **Sync the Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   *Visit `http://localhost:3000` to view the application.*

---

## 🤝 Collaboration & Partnership

This enterprise platform was engineered and delivered in collaboration with **CodeMarket**.

> **CodeMarket** specializes in building high-performance, scalable IT solutions and premium web architectures for modern businesses. 
> 
> 🌐 Visit us at: [knowflow.co.in](https://knowflow.co.in)

<div align="center">
  <br />
  <i>Built with ❤️ for ClientBridge.</i>
</div>
