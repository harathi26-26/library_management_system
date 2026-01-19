from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.core.database import SessionLocal
from app.models.book import Book
from app.models.issue import Issue
from app.schemas.book import BookCreate, BookUpdate, BookResponse

router = APIRouter(prefix="/books", tags=["Books"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- CREATE ----------------
@router.post("/", response_model=BookResponse)
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    existing_book = db.query(Book).filter(
        Book.title.ilike(book.title.strip()),
        Book.title.ilike(book.title.strip()),
        Book.author.ilike(book.author.strip())
    ).first()
    if existing_book:
        raise HTTPException(status_code=400, detail="this book already exist in the library")
    new_book = Book(**book.dict())
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book

# ---------------- READ (SEARCH + FILTER) ----------------
@router.get("/", response_model=list[BookResponse])
def get_books(
    db: Session = Depends(get_db),
    search: str | None = Query(None, description="Search by title or author"),
    available: bool | None = Query(
        None, description="Filter by availability (true = available books)"
    )
):
    query = db.query(Book)

    # Search by title or author
    if search:
        query = query.filter(
            or_(
                Book.title.ilike(f"%{search}%"),
                Book.author.ilike(f"%{search}%")
            )
        )

    # 🎯 Filter by availability
    if available is not None:
        if available:
            query = query.filter(Book.available_copies > 0)
        else:
            query = query.filter(Book.available_copies == 0)
            
    return query.all()

# ---------------- READ ONE ----------------
@router.get("/{book_id}", response_model=BookResponse)
def get_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

# ---------------- UPDATE ----------------
@router.put("/{book_id}", response_model=BookResponse)
def update_book(book_id: int, data: BookUpdate, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(book, key, value)

    db.commit()
    db.refresh(book)
    return book

# ---------------- DELETE ----------------
@router.delete("/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    active_issue = db.query(Issue).filter(
        Issue.book_id == book_id,
        Issue.status == "Issued"
    ).first()
    if active_issue:
        raise HTTPException(
            status_code=400,
            detail="Book is currently issued and can't be deleted"
        )

    db.delete(book)
    db.commit()
    return {"message": "Book deleted successfully"}
