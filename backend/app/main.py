from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine
from app.routes.book_routes import router as book_router
from app.routes.issue_routes import router as issue_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Library Book Management System")

# ✅ CORS CONFIGURATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(book_router)
app.include_router(issue_router)
