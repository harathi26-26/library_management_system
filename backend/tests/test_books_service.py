from app.models.book import Book

# ---------------- POSITIVE ----------------

def test_create_book(db_session):
    book = Book(
        title="Python Basics",
        author="Guido",
        available_copies=5
    )
    db_session.add(book)
    db_session.commit()

    saved = db_session.query(Book).first()
    assert saved is not None


def test_search_existing_book(db_session):
    books = db_session.query(Book).filter(
        Book.title.ilike("%Python%")
    ).all()
    assert len(books) == 1


def test_filter_available_books(db_session):
    books = db_session.query(Book).filter(Book.available_copies > 0).all()
    assert len(books) == 1

# ---------------- NEGATIVE ----------------

def test_get_non_existing_book(db_session):
    book = db_session.query(Book).filter(Book.id == 999).first()
    assert book is None


def test_search_non_existing_book(db_session):
    books = db_session.query(Book).filter(
        Book.title.ilike("%Java%")
    ).all()
    assert books == []


def test_delete_non_existing_book(db_session):
    book = db_session.query(Book).filter(Book.id == 888).first()
    assert book is None
