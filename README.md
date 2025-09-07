
# 🚌 Bus Ticket Booking Web App – Naming Conventions

This guide defines consistent naming conventions for both the **frontend (React)** and **backend (Node.js/Express)** of your Bus Ticket Booking Web App.

---

## ✅ GENERAL RULES

| Convention        | Rule                                                                 |
|------------------|----------------------------------------------------------------------|
| ✅ Be descriptive | Variable and function names should clearly indicate their purpose    |
| ✅ Consistency    | Use the same casing and naming style throughout the entire project   |
| ❌ No abbreviations | Avoid ambiguous short forms like `usr`, `btkt`, `bnfct`             |
| ✅ English only   | All variable names should be in English                              |

---

## 🟦 FRONTEND (React + Vite)

### 🔠 Case Style

| Entity                     | Convention      | Example                          |
|---------------------------|-----------------|----------------------------------|
| Variables                 | `camelCase`     | `busList`, `isLoading`           |
| Functions                 | `camelCase`     | `handleLogin`, `fetchBuses`      |
| Constants (global only)   | `UPPER_SNAKE_CASE` | `MAX_SEATS`, `API_BASE_URL`    |
| Components (React)        | `PascalCase`    | `BookingForm`, `BusCard`         |
| Filenames (components)    | `PascalCase.jsx`| `SearchBuses.jsx`                |
| CSS Modules or Styles     | `kebab-case`    | `bus-card.module.css`            |
| Custom Hooks              | `useCamelCase`  | `useAuth`, `useFetchBuses`       |

### 📄 React Form Example

```jsx
const [busDetails, setBusDetails] = useState({
  origin: "",
  destination: "",
  date: "",
  seats: 0,
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setBusDetails((prev) => ({ ...prev, [name]: value }));
};
```

---

## 🟫 BACKEND (Node.js + Express + MongoDB)

### 🔠 Case Style

| Entity                      | Convention      | Example                           |
|----------------------------|-----------------|-----------------------------------|
| Variables & functions      | `camelCase`     | `getBusList`, `bookTicket`        |
| File/Folder names          | `kebab-case`    | `bus-routes.js`, `user-model.js`  |
| Controller files           | `PascalCase.js` | `BusController.js`                |
| Constants (global)         | `UPPER_SNAKE_CASE` | `JWT_SECRET`, `TOKEN_EXPIRY`   |
| MongoDB collection names   | `plural_kebab-case` | `users`, `buses`, `bookings` |
| Mongoose model names       | `PascalCase`    | `User`, `Bus`, `Booking`          |

### 📄 Example Mongoose Schema

```js
// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
  seatsBooked: Number,
  totalFare: Number,
  bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
```

---

## ✅ EXAMPLES FOR BOTH SIDES

### 🔹 State Variable

```js
const [selectedSeats, setSelectedSeats] = useState([]);
```

### 🔹 API Route (Backend)

```js
// Route: /api/bookings
router.post("/book", bookTicketController);
```

### 🔹 API Function (Frontend)

```js
// api/bookingAPI.js
export const bookTicket = async (ticketData) => {
  return await axios.post("/api/bookings/book", ticketData);
};
```

---

## 📌 Naming Prefixes (Frontend)

| Type           | Prefix          | Example            |
|----------------|------------------|---------------------|
| Boolean        | `is`, `has`, `can` | `isAvailable`, `hasTicket` |
| Functions      | `handle`, `fetch`, `get`, `submit`, `on` | `handleLogout`, `fetchBusList` |
| Arrays         | Plural nouns     | `buses`, `bookings`, `routes` |
| Objects        | Singular noun    | `user`, `bus`, `ticketData` |
| Components     | Use component name | `BookingForm`, `BusCard` |

---

## 📘 API Naming Conventions

| HTTP Method | Route                  | Description                    |
|-------------|------------------------|--------------------------------|
| GET         | `/api/buses`           | Get all buses                  |
| GET         | `/api/buses/:id`       | Get bus by ID                  |
| POST        | `/api/bookings/book`   | Create a new booking           |
| GET         | `/api/users/profile`   | Get current user profile       |
| POST        | `/api/auth/login`      | Login user                     |
| POST        | `/api/auth/register`   | Register user                  |

---
## Trial Add 