from sqlalchemy import Column, Integer, String
from app.core.database import Base
from sqlalchemy import CheckConstraint
from sqlalchemy import UniqueConstraint

class Book(Base):
    __tablename__ = "books"
    __table_args__ = (
        CheckConstraint("available_copies >= 0", name="check_available_copies"),
        UniqueConstraint("title","author", name = "uq_title_author"),
    )

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    available_copies = Column(Integer, nullable=False)
