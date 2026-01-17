export interface Book {
  id: number;
  title: string;
  author: string;
  available_copies: number;
}

export interface BookCreate {
  title: string;
  author: string;
  available_copies: number;
}

export interface Issue {
  id: number;
  book_id: number;
  student_name: string;
  status: "Issued" | "Returned";
}
