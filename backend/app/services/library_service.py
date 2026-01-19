from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.book import Book
from app.models.issue import Issue

def issue_book(db: Session, book_id: int, student_name: str):
    if book_id <= 0:
        raise HTTPException(status_code=400,detail="Invaild ID")
    book = db.query(Book).filter(Book.id == book_id).first()

    if not book or book.available_copies <= 0:
        raise HTTPException(status_code=404, detail="book not found")

    book.available_copies -= 1

    issue = Issue(
        book_id=book_id,
        student_name=student_name,
        status="Issued"   
    )

    db.add(issue)
    db.commit()
    db.refresh(issue)
    return issue

def return_book(db: Session, issue_id: int):
    issue = db.query(Issue).filter(Issue.id == issue_id).first()

    if not issue:
        raise HTTPException(status_code=404, detail="Issue record not found")

    if issue.status == "Returned":
        raise HTTPException(status_code=400, detail="Book already returned")


    book = db.query(Book).filter(Book.id == issue.book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="book still not found")
    book.available_copies += 1
    issue.status = "returned"

    db.commit()
    db.refresh(issue)
    return issue
