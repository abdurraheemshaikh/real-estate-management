# 🏡 Real Estate Management System (FastAPI)

This is a modular and scalable backend API for a real estate management platform, built using **FastAPI** and **PostgreSQL**. The system supports role-based access for **Customers**, **Builders**, and **State Agents**, and handles project listings, image uploads, authentication, and more.

---

## 📁 Project Structure

<pre lang="markdown"> ```bash . ├── API_Gateway/ # Entry point and API aggregation (optional for microservices) ├── Auth_service/ # Handles authentication and user registration │ ├── auth.py │ ├── models.py ├── Database/ # DB connection and table definitions │ ├── Data/ │ ├── database.py │ ├── Tables.py │ ├── Database_connection.py ├── Inquiry/ # Handles user inquiries (planned) │ ├── inquiry.py │ ├── models.py ├── Notification/ # For sending alerts and messages (planned) │ ├── notification.py │ ├── models.py ├── Review/ # For user/project reviews (planned) │ ├── review.py │ ├── models.py ├── Search/ # Search functionality for users/projects │ ├── search.py │ ├── models.py ├── Users/ │ ├── Builder/ │ │ ├── builder.py │ │ ├── models.py │ ├── Customer/ │ │ ├── customer.py │ │ ├── models.py │ ├── State Agent/ │ ├── agent.py # Recommended name │ ├── models.py ├── main.py # Main FastAPI app ├── requirements.txt # Dependencies list ``` </pre>
---

## 🚀 Features

- 🔐 User Authentication with JWT (Login/Register)
- 👷 Builder project and profile management
- 👨‍💼 State Agent info and verification
- 🏘️ Project Listings with multiple images
- 🔎 Search functionality (locations, users, etc.)
- 📦 PostgreSQL + SQLAlchemy 

---

## 🛠️ Technologies

- **FastAPI**
- **SQLAlchemy**
- **Pydantic v2**
- **PostgreSQL**
- **Passlib (bcrypt)**
- **JWT Authentication**
- **Uvicorn**

---

## 🧪 Setup Instructions

1. **Clone Repo:**
   ```bash
   git clone https://github.com/abdurraheemshaikh/real-estate-management.git
   cd real-estate-management
   
Create and activate virtual environment:

python -m venv .venv
.venv\Scripts\activate   # On Windows
source .venv/bin/activate   # On macOS/Linux
Install dependencies:

pip install -r requirements.txt
Configure your PostgreSQL DB in .env or database.py.

Run server:

uvicorn main:app --reload

📬 API Endpoints (Examples)
/auth/register – Register a user

/auth/login – Login and receive token

/builders/ – Create/Get builder profile

/projects/{builder_id} – Get builder projects

/agents/ – Manage State Agents

/search – Search users/projects

