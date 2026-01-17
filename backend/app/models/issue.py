from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base
from sqlalchemy import CheckConstraint

class Issue(Base):
    __tablename__ = "issues"
    __table_args__ = (
        CheckConstraint("available_copies >= 0", name="check_available_copies"),
    )

    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey("books.id"))
    student_name = Column(String, nullable=False)
    status = Column(String, nullable=False, default="Issued")
