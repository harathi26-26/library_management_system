from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.schemas.issue import IssueCreate, IssueResponse
from app.models.issue import Issue
from app.services.library_service import issue_book, return_book

router = APIRouter(prefix="/issues", tags=["Issues"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/issue", response_model=IssueResponse)
def issue_book_api(data: IssueCreate, db: Session = Depends(get_db)):
    return issue_book(db, data.book_id, data.student_name)

@router.put("/return/{issue_id}", response_model=IssueResponse)
def return_book_api(issue_id: int, db: Session = Depends(get_db)):
    return return_book(db, issue_id)

@router.get("/", response_model=list[IssueResponse])
def issue_history(db: Session = Depends(get_db)):
    return db.query(Issue).all()
