from app.models.book import Book
from app.services.library_service import issue_book, return_book

# ---------------- POSITIVE ----------------

def test_issue_book_success(db_session):
    book = Book(
        title="FastAPI Guide",
        author="Sebastian",
        available_copies=1
    )
    db_session.add(book)
    db_session.commit()

    issue = issue_book(
        db=db_session,
        book_id=book.id,
        student_name="Harathi"
    )

    assert issue.status == "Issued"


def test_return_book_success(db_session):
    returned = return_book(db=db_session, issue_id=1)
    assert returned.status == "Returned"

# ---------------- NEGATIVE ----------------

def test_issue_non_existing_book(db_session):
    issue = issue_book(
        db=db_session,
        book_id=999,
        student_name="User"
    )
    assert "error" in issue


def test_issue_book_zero_stock(db_session):
    book = Book(
        title="Empty Book",
        author="No One",
        available_copies=0
    )
    db_session.add(book)
    db_session.commit()

    issue = issue_book(
        db=db_session,
        book_id=book.id,
        student_name="User"
    )

    assert "error" in issue


def test_return_invalid_issue(db_session):
    result = return_book(db=db_session, issue_id=999)
    assert "error" in result


def test_return_already_returned_book(db_session):
    result = return_book(db=db_session, issue_id=1)
    assert "error" in result
