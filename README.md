# Avishay-Gpt - AI Chatbot Application

A full-stack AI-powered chatbot application built with React, FastAPI, and MySQL. This project enables users to have intelligent conversations with an AI assistant powered by OpenAI's GPT models.

## 🎯 Project Overview

Avishay-Gpt is a modern web application that allows users to:
- Create and manage multiple conversations with an AI assistant
- Send and receive messages with persistent conversation history
- Maintain separate conversation threads for different topics
- Interact with a responsive, intuitive user interface

## 🏗️ Project Architecture

The project is organized into three main directories:

```
.
├── Frontend/          # React + TypeScript + Vite frontend application
├── backend/           # FastAPI Python backend server
├── DataBase/          # MySQL database schema and initialization
└── README.md          # This file
```

### Technology Stack

#### Frontend
- **React** 19.1.1 - UI library
- **TypeScript** 5.9.3 - Type-safe JavaScript
- **Vite** 7.1.7 - Fast build tool and dev server
- **Material-UI (MUI)** 7.3.7 - Component library
- **React Router** 7.9.5 - Client-side routing
- **React Hook Form** 7.66.0 - Form state management
- **Axios** 1.13.1 - HTTP client
- **RTL Support** - Right-to-left language support

#### Backend
- **FastAPI** 0.136.1 - Modern Python web framework
- **Uvicorn** 0.46.0 - ASGI web server
- **SQLAlchemy** 2.0.49 - ORM for database operations
- **MySQL Connector** 9.6.0 - MySQL database driver
- **OpenAI** 2.41.0 - GPT API integration
- **Pydantic** 2.13.3 - Data validation
- **Python Dotenv** 1.2.2 - Environment variable management
- **Python Multipart** 0.0.27 - Multipart form data handling

#### Database
- **MySQL** - Relational database for storing conversations and messages

## 📋 Prerequisites

Before running this project, ensure you have installed:

- **Node.js** (v18 or higher) - for frontend development
- **Python** (v3.9 or higher) - for backend
- **MySQL** (v8.0 or higher) - for database
- **npm** or **yarn** - package manager for Node.js
- **Postman** (optional) - for API testing

## 🚀 Getting Started

### 1. Database Setup

Navigate to the `DataBase` directory and execute the SQL schema:

```bash
cd DataBase
mysql -u root -p < DB.sql
```

Update the MySQL credentials in the backend `.env` file if needed.

### 2. Backend Setup

```bash
cd backend

# Create a Python virtual environment
python -m venv env

# Activate the virtual environment
# On Windows:
env\Scripts\activate
# On macOS/Linux:
source env/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with the following variables:
# DATABASE_URL=mysql+pymysql://user:password@localhost/Avishay-Gpt
# OPENAI_API_KEY=your_openai_api_key

# Run the server
py src/app.py
```

The backend will start on `http://localhost:4000`

### 3. Frontend Setup

```bash
cd Frontend

# Install dependencies
npm install

# Start server
npm start
```

The frontend will be available at `http://localhost:5173`

## 📚 Project Structure

### Frontend (`Frontend/`)
```
src/
├── Components/
│   ├── LayoutArea/     # Layout components
│   ├── PagesArea/      # Page components
│   └── SharedArea/     # Shared/reusable components
├── Models/             # TypeScript interfaces and types
├── Services/           # API service layer
├── Utils/              # Utility functions
├── assets/             # Static assets
├── main.tsx            # React entry point
└── index.css           # Global styles
```

### Backend (`backend/`)
```
src/
├── app.py              # FastAPI application setup
├── controllers/        # API endpoints
├── models/             # Database models and schemas
├── services/           # Business logic
├── middlewares/        # CORS, exception handlers
└── utils/              # Utility functions
```

### Database (`DataBase/`)
```
├── DB.sql              # MySQL schema and initial data
```

## 🔌 API Endpoints

### Conversations
- `GET /api/conversations` - Get all conversations
- `POST /api/conversations` - Create a new conversation
- `GET /api/conversations/details/{conversation_uuid}` - Get specific conversation details
- `GET /api/conversations/messages/{conversation_uuid}` - Get all messages in a conversation

### Messages
- `GET /api/messages/{conversation_id}` - Get messages by conversation ID
- `POST /api/messages` - Send a new message and receive AI response

## 🧪 API Testing with Postman

A Postman collection is included in the project for easy API testing:

- **Collection File**: `backend/Chat_Gpt.postman_collection.json`
- **Import Steps**:
  1. Open Postman
  2. Click "Import" → "Upload Files"
  3. Select `Chat_Gpt.postman_collection.json`
  4. All API endpoints will be pre-configured and ready to use

This collection includes all available endpoints with example requests and configurations.

## 🔑 Environment Variables

### Backend (`.env`)
```
DATABASE_URL=mysql+pymysql://user:password@localhost/Avishay-Gpt
OPENAI_API_KEY=your_openai_api_key
```

## 📦 Available Scripts

### Frontend
```bash
npm start
```

### Backend
```bash
py src/app.py
```

## 🎨 Features

- ✅ Create multiple conversations
- ✅ Real-time message streaming
- ✅ Persistent conversation history
- ✅ AI-powered responses using OpenAI GPT
- ✅ Responsive Material-UI design
- ✅ RTL support for Hebrew and other RTL languages
- ✅ Type-safe TypeScript frontend
- ✅ RESTful API backend

## 🔐 Security Notes

- Never commit `.env` files with sensitive data to version control
- Store API keys securely using environment variables
- Implement proper CORS policies for production
- Use HTTPS in production environment
- Validate all user inputs on both frontend and backend

## 📝 Development Workflow

1. **Frontend Development**: Use `npm run dev` for hot-reload development
2. **Backend Development**: Use `python -m uvicorn app:server --reload`
3. **Database Changes**: Update `DataBase/DB.sql` and re-initialize the database
4. **Testing**: Run `npm run lint` to check code quality

## 🐛 Troubleshooting

### Backend connection issues
- Verify MySQL is running: `mysql -u root -p`
- Check database credentials in `.env`
- Ensure database schema is initialized with `DB.sql`

### Frontend connection issues
- Verify backend is running on `http://localhost:4000`
- Check browser console for API errors
- Clear browser cache and restart dev server

### Missing modules
- Frontend: Run `npm install` to reinstall dependencies
- Backend: Run `pip install -r requirements.txt` with virtual environment activated


## 👤 Author

- **Avishay Davidi**
- **Phone:** `0542169111`
- **Email:** `abushking4@gmail.com`
- **GitHub:** https://github.com/abushking4/avishay-davidi-fourth-project

---

For more information or support, please contact the project maintainer.
