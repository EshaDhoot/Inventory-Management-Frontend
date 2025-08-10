# 🎨 Inventory Management Frontend

A simple and responsive **React.js** frontend for the Inventory Management API, built with **Bootstrap** for styling.

---

## 🚀 Features

- User authentication (Login/Register)
- Product listing with pagination
- Add new products
- Update product quantity
- Fully responsive design using Bootstrap

---

## 🛠 Prerequisites

Before starting, ensure you have:

- **Node.js** (v16+)
- **npm** or **yarn**
- Backend API running (see [Inventory Management Backend](https://github.com/EshaDhoot/Inventory-Management))

---

## 📥 Local Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/EshaDhoot/Inventory-Management-Frontend.git
```

---

### 2️⃣ Create `.env` File

In the project root, create a `.env` file:

```env
REACT_APP_API_BASE_URL=http://localhost:4000
```

When deployed, change it to your backend’s public URL:

```env
REACT_APP_API_BASE_URL=https://inventory-management-production-9d5c.up.railway.app
```

---

### 3️⃣ Install Dependencies

```bash
npm install
```

---

### 4️⃣ Start Development Server

```bash
npm start
```


The app will be available at:

```
http://localhost:3000
```

---

## 📂 Folder Structure

```
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components (Login, Register, Products, etc.)
│   ├── services/        # API service calls
│   ├── App.js           # Main App component
│   └── index.js         # Entry point
├── public/
├── .env
├── package.json
└── README.md
```

---

## 🧰 Tech Stack

- **Frontend:** React.js
- **Styling:** Bootstrap 5
- **HTTP Client:** Axios
- **Routing:** React Router

---


