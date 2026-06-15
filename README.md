# Octopi Backend Task evaluation - Multi-Tenant Booking System

# 📌 Multi-Tenant Booking & Availability System

A production-oriented backend system built for managing **multi-tenant organizations**, **resource booking**, and a **timezone-aware availability engine**.
This project demonstrates scalable backend architecture, clean code structure, and robust scheduling logic.

---

## 🚀 Tech Stack

-  Node.js
-  Express.js
-  TypeScript
-  MongoDB + Mongoose
-  Zod (Validation)
-  Luxon (Timezone handling)
-  JWT Authentication

---

## 📂 Project Architecture

```txt
src/
├── modules/
│   ├── auth/
│   ├── organization/
│   ├── resource/
│   ├── booking/
│   ├── availability/
│
├── middleware/
│   ├── auth.ts
│   ├── validateRequest.ts
│
├── utils/
│   ├── catchAsync.ts
│   ├── sendResponse.ts
│
├── errors/
├── config/
├── app.ts
```

---

## 🧠 Key Features

### 🏢 Multi-Tenancy

-  Strict organization-level data isolation
-  Every request scoped to `organizationId`
-  Prevents cross-tenant data access

---

### 🔐 Authentication & Authorization

-  JWT-based authentication
-  Role-based access control:

   -  `ORG_ADMIN`
   -  `EMPLOYEE`

---

### 📦 Resource Management

-  Create / Update / Delete resources
-  Resource types:

   -  ROOM
   -  DESK
   -  DEVICE

-  Soft delete support
-  Unique resource names per organization

---

### 📅 Booking System

-  Create and manage bookings
-  Prevent overlapping bookings
-  Buffer time support per resource
-  Valid duration enforcement
-  Booking cancellation support

---

### ⚡ Availability Engine (Core Feature)

-  Generates real-time available slots
-  Considers:

   -  Existing bookings
   -  Buffer time
   -  Working hours
   -  Timezone (Luxon)
   -  Booking duration

---

## 🧮 Conflict Detection Logic

```ts
startTime < existingEndTime && endTime > existingStartTime;
```

Prevents overlapping bookings across all edge cases.

---

## ⏱ Timezone Handling

-  All data stored in **UTC**
-  Converted using Luxon per organization timezone
-  Ensures consistent scheduling across regions

```ts
DateTime.fromISO(time, { zone: timezone }).toUTC().toJSDate();
```

---

## 🔒 Multi-Tenant Security

Every query is scoped:

```ts
{
   organizationId: req.user.organizationId;
}
```

Ensures complete data isolation between organizations.

---

## ⚙️ API Endpoints

### Auth

```
POST /auth/register
POST /auth/login
```

### Organization

```
POST /organizations
GET  /organizations/me
PATCH /organizations
```

### Resource

```
POST   /resources
GET    /resources
GET    /resources/:id
PATCH  /resources/:id
DELETE /resources/:id
```

### Booking

```
POST   /bookings
GET    /bookings
DELETE /bookings/:id
```

### Availability

```
GET /availability?resourceId=&date=&duration=
```

---

## ⚡ Availability Engine

The system dynamically generates available time slots based on:

-  Working hours (Org level)
-  Existing bookings
-  Resource buffer time
-  Requested duration
-  Timezone conversion

---

## 🧪 Validation

All request validation is handled using **Zod**:

-  Strong schema validation
-  Centralized validation middleware
-  Clear error messages

---

## ❗ Error Handling

-  Centralized error middleware
-  Custom AppError class
-  Consistent API response structure

---

## 📊 Design Highlights

-  Clean architecture (service-controller separation)
-  Scalable module-based structure
-  MongoDB indexing for performance
-  Lean queries for optimization
-  Production-ready booking logic

---

## 🧠 Key Engineering Challenges Solved

-  Multi-tenant data isolation
-  Timezone-safe scheduling system
-  Booking conflict prevention
-  Buffer-aware scheduling logic
-  Dynamic slot generation engine

---

## 📦 Future Improvements

-  Swagger API documentation
-  Unit & integration testing (Jest)
-  Redis caching for availability
-  Docker containerization
-  Rate limiting & logging (Winston)
-  MongoDB transactions for race conditions

---

## 🏁 Getting Started

```bash
git clone https://github.com/your-repo.git
cd project

npm install
npm run dev
```

---

## ⚙️ Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

## 📌 Author Notes

This project was built as a **backend engineering assessment** focusing on:

-  System design
-  Multi-tenancy
-  Scheduling algorithms
-  Production-grade architecture
-  Clean TypeScript implementation
