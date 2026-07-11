# 🏠 SLV Enterprises — Premium Real Estate Platform

A full-stack real estate listing and management platform built for **SLV Enterprises**, a Bangalore-based property company. Features a stunning dark-themed public website and a comprehensive admin dashboard.

---

## ✨ Features

### 🌐 Public Website
- **Home Page** — Hero section, featured properties, testimonials, and quick service links
- **Properties Listing** — Browse, search, and filter properties by type, location, BHK, price range
- **Property Detail** — Full image gallery, specs, amenities, and direct Call/WhatsApp buttons
- **Services Pages** — Dedicated pages for Rent, Lease, Sell, and Purchase
- **Reviews** — Public reviews (admin-approved only)
- **Contact** — Contact form with name, email, phone, subject, and message
- **About** — Company information and team details
- **Floating WhatsApp** — One-click WhatsApp chat button on every page

### 🔒 Admin Dashboard
- **Secure Login** — JWT-based authentication
- **Dashboard Overview** — KPI metrics (Total Properties, Active Listings, Sold, Reviews, Messages) and charts
- **Add Property** — Multi-image/video upload with all property fields
- **Manage Listings** — Edit, delete, change status of all properties
- **Booked / Sold** — Track and archive sold properties
- **Reviews Moderation** — Approve/reject/delete customer reviews before they go public
- **Messages Inbox** — View, mark-as-read, and delete customer contact messages
- **Settings** — Admin profile and configuration

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **TypeScript** | Type-safe backend code |
| **MongoDB + Mongoose** | Database and ODM |
| **Zod** | Request validation schemas |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcrypt** | Password hashing |
| **Multer + Cloudinary** | Image/video upload and cloud storage |
| **Helmet** | Security headers |
| **express-rate-limit** | API rate limiting |
| **Morgan** | HTTP request logging |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Dev server and bundler |
| **Framer Motion** | Page transitions and micro-animations |
| **Recharts** | Admin dashboard charts |
| **Lenis** | Smooth kinetic scrolling |
| **Axios** | HTTP client for API calls |

---

## 📁 Project Structure

```
SLV-WEBSITE/
├── src/                          # Backend source (TypeScript)
│   ├── app.ts                    # Express app setup and middleware
│   ├── server.ts                 # Server entry point
│   ├── config/                   # Database and environment config
│   ├── controllers/              # Route handlers
│   ├── middlewares/               # Auth, validation, error, upload middleware
│   ├── models/                   # Mongoose schemas (Property, Review, Contact, Admin)
│   ├── routes/                   # Express route definitions
│   ├── services/                 # Business logic layer
│   ├── utils/                    # ApiError, ApiResponse, catchAsync utilities
│   └── validators/               # Zod validation schemas
│
├── frontend/                     # Frontend source (React + Vite)
│   ├── src/
│   │   ├── App.jsx               # Root component with state-based routing
│   │   ├── DataContext.jsx       # Global state provider (properties, reviews, messages)
│   │   ├── main.jsx              # Entry point
│   │   ├── style.css             # Full design system (dark theme, variables, components)
│   │   ├── utils.js              # API base URL, WhatsApp helpers, mock data
│   │   ├── components/           # Reusable UI (Navbar, Footer, PropertyCard, Badge, etc.)
│   │   ├── pages/                # Public pages (Home, Properties, Detail, About, etc.)
│   │   └── admin/                # Admin pages (Login, Dashboard)
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── .env.example                  # Environment variable template
├── .gitignore
├── package.json                  # Backend dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **MongoDB** running locally or a MongoDB Atlas connection string
- **Cloudinary** account (for image uploads)

### 1. Clone the Repository
```bash
git clone https://github.com/kartik691004/SLV-WEBSITE-.git
cd SLV-WEBSITE-
```

### 2. Setup Environment Variables
Copy the example env file and fill in your credentials:
```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/slv-enterprises
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3. Install Dependencies
```bash
# Backend dependencies
npm install

# Frontend dependencies
cd frontend
npm install
cd ..
```

### 4. Run the Development Servers
Open two terminals:

**Terminal 1 — Backend (port 5000):**
```bash
npm run dev
```

**Terminal 2 — Frontend (port 5173):**
```bash
cd frontend
npm run dev
```

### 5. Access the Application
- **Website:** http://localhost:5173
- **Admin Login:** http://localhost:5173/admin
- **API Health Check:** http://localhost:5000/health

---

## 🔌 API Endpoints

### Public
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/properties/public` | Get all public properties |
| `GET` | `/api/v1/properties/public/:idOrSlug` | Get single property |
| `GET` | `/api/v1/reviews/public` | Get approved reviews |
| `POST` | `/api/v1/reviews` | Submit a new review |
| `POST` | `/api/v1/contact` | Submit a contact message |

### Admin (Requires JWT)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/login` | Admin login |
| `GET` | `/api/v1/properties` | Get all properties (admin) |
| `POST` | `/api/v1/properties` | Create a property |
| `PUT` | `/api/v1/properties/:id` | Update a property |
| `DELETE` | `/api/v1/properties/:id` | Delete a property |
| `GET` | `/api/v1/reviews` | Get all reviews |
| `PUT` | `/api/v1/reviews/:id/approve` | Approve/reject a review |
| `DELETE` | `/api/v1/reviews/:id` | Delete a review |
| `GET` | `/api/v1/contact` | Get all messages |
| `PUT` | `/api/v1/contact/:id/read` | Mark message as read |
| `DELETE` | `/api/v1/contact/:id` | Delete a message |

---

## 🎨 Design System

The frontend uses a custom dark luxury theme with CSS custom properties:

- **Colors:** Charcoal backgrounds, champagne/gold accents, ivory text
- **Typography:** Cormorant Garamond (headings), Inter (body), JetBrains Mono (code/data)
- **Effects:** Glassmorphism, smooth gradients, micro-animations via Framer Motion
- **Responsive:** Mobile-first responsive grid layouts

---

## 📄 License

This project is proprietary software built for **SLV Enterprises**.

---

## 👤 Author

**Kartik** — [GitHub](https://github.com/kartik691004)
