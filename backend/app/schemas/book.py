from pydantic import BaseModel, Field

class BookCreate(BaseModel):
    title: str
    author: str
    available_copies: int = Field(ge=0)

class BookUpdate(BaseModel):
    title: str | None = None
    author: str | None = None
    available_copies: int | None = None

class BookResponse(BookCreate):
    id: int

    class Config:
        from_attributes = True
