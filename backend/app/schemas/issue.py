from pydantic import BaseModel,Field

# Request schema (NO STATUS)
class IssueCreate(BaseModel):
    book_id: int  = Field(ge=0)
    student_name: str = Field(min_length=1)

# Response schema (WITH STATUS)
class IssueResponse(BaseModel):
    id: int
    book_id: int
    student_name: str
    status: str

    class Config:
        from_attributes = True
