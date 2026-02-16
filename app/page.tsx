"use client";

import { useMemo, useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
};

const initialBooks: Book[] = [
  { id: 101, title: "Clean Code", author: "Robert C. Martin", category: "CS" },
  { id: 102, title: "Atomic Habits", author: "James Clear", category: "Self-help" },
  { id: 103, title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "CS" },
  { id: 104, title: "Deep Work", author: "Cal Newport", category: "Productivity" },
];

export default function Page() {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  // Search
  const [query, setQuery] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;

    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
  }, [books, query]);

  const addBook = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const t = title.trim();
    const a = author.trim();
    const c = category.trim();

    if (!t || !a || !c) {
      setError("Please fill all fields (Title, Author, Category).");
      return;
    }

    // Create a new id
    const nextId = books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;

    const newBook: Book = { id: nextId, title: t, author: a, category: c };

    setBooks((prev) => [newBook, ...prev]);

    // Reset form
    setTitle("");
    setAuthor("");
    setCategory("");
  };

  const removeBook = (id: number) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1 className="title">Library Management System</h1>
          <p className="subtitle">Search • Add • Remove • React Hooks (CRUD)</p>
        </div>
        <div className="countPill">
          Total Books <span className="badge">{books.length}</span>
        </div>
      </header>

      <section className="panel">
        <h2 className="sectionTitle">Search Books</h2>
        <input
          className="input"
          placeholder="Search by title / author / category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </section>

      <section className="panel">
        <h2 className="sectionTitle">Add New Book</h2>

        <form className="form" onSubmit={addBook}>
          <div className="grid2">
            <div className="field">
              <label className="label">Title</label>
              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Introduction to AI"
              />
            </div>

            <div className="field">
              <label className="label">Author</label>
              <input
                className="input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g., Andrew Ng"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Category</label>
            <input
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., CS / Fiction / Self-help"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button className="btn" type="submit">
            + Add Book
          </button>
        </form>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <h2 className="sectionTitle">Book List</h2>
          <p className="muted">{filteredBooks.length} result(s)</p>
        </div>

        <div className="bookGrid">
          {filteredBooks.map((b) => (
            <div className="card" key={b.id}>
              <div className="chip">{b.category}</div>

              <h3 className="bookTitle">{b.title}</h3>
              <p className="bookMeta">Author: {b.author}</p>
              <p className="bookMeta">ID: {b.id}</p>

              <button className="dangerBtn" onClick={() => removeBook(b.id)}>
                Remove
              </button>
            </div>
          ))}

          {filteredBooks.length === 0 && (
            <div className="empty">
              No books found. Try another search or add a new book.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}