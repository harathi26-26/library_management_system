import axios from "axios";
import type{ Book, BookCreate, Issue } from "../types";

const API = axios.create({
  baseURL: "http://127.0.0.1:8080"
});

// BOOK APIs
export const getBooks = (params?: any) =>
  API.get<Book[]>("/books", { params });

export const createBook = (data: BookCreate) =>
  API.post<Book>("/books", data);

export const updateBook = (id: number, data: Partial<BookCreate>) =>
  API.put(`/books/${id}`, data);


export const deleteBook = (id: number) =>
  API.delete(`/books/${id}`);

// ISSUE APIs
export const issueBook = (data: {
  book_id: number;
  student_name: string;
}) =>
  API.post<Issue>("/issues/issue", data);

export const returnBook = (id: number) =>
  API.put<Issue>(`/issues/return/${id}`);

export const getIssues = () =>
  API.get<Issue[]>("/issues");
