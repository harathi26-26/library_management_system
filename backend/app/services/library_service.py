from sqlalchemy.orm import Session
from app.models.book import Book
from app.models.issue import Issue

def issue_book(db: Session, book_id: int, student_name: str):
    if book_id <= 0:
        return{"error":"Invaild book ID"}
    book = db.query(Book).filter(Book.id == book_id).first()

    if not book or book.available_copies <= 0:
        return {"error": "Book not available"}

    book.available_copies -= 1

    issue = Issue(
        book_id=book_id,
        student_name=student_name,
        status="Issued"   # 👈 EXPLICIT STATUS
    )

    db.add(issue)
    db.commit()
    db.refresh(issue)
    return issue


def return_book(db: Session, issue_id: int):
    issue = db.query(Issue).filter(Issue.id == issue_id).first()

    if not issue:
        return {"error": "Issue record not found"}

    if issue.status == "Returned":
        return {"error": "Book already returned"}

    issue.status = "Returned"  # 👈 STATUS CHANGED HERE

    book = db.query(Book).filter(Book.id == issue.book_id).first()
    book.available_copies += 1

    db.commit()
    return issue
