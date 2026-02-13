"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "dashboard_theme"; // "light" | "dark"

export default function Page() {
  const [theme, setTheme] = useState("light");

  // Load saved theme on first render
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "dark" || saved === "light") setTheme(saved);
    } catch (_) {}
  }, []);

  // Apply theme to <html> and persist
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="dash">
      {/* Header */}
      <header className="header">
        <div>
          <h1 className="title">Admin Dashboard</h1>
          <p className="subtitle">CSS Grid + Theme Switching + localStorage</p>
        </div>

        <button className="themeBtn" onClick={toggleTheme}>
          {theme === "dark" ? "🌙 Dark" : "☀️ Light"} → Switch
        </button>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">Navigation</div>

        <nav className="nav">
          <a className="navItem active" href="#">
            Overview
          </a>
          <a className="navItem" href="#">
            Users
          </a>
          <a className="navItem" href="#">
            Orders
          </a>
          <a className="navItem" href="#">
            Analytics
          </a>
          <a className="navItem" href="#">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="main">
        <section className="stats">
          <Card title="Total Users" value="1,248" hint="+6.2% this week" />
          <Card title="Revenue" value="₹92,450" hint="+3.1% this week" />
          <Card title="Orders" value="312" hint="+1.8% today" />
          <Card title="Tickets" value="17" hint="5 urgent" />
        </section>

        <section className="panel">
          <h2 className="sectionTitle">Recent Activity</h2>
          <ul className="list">
            <li>New user registered: <b>Yahya Tyagi</b></li>
            <li>Order #1042 marked as <b>Delivered</b></li>
            <li>Payment received: <b>₹4,999</b></li>
            <li>Support ticket created: <b>Login issue</b></li>
          </ul>
        </section>
      </main>

      {/* Right panel */}
      <section className="right">
        <div className="panel">
          <h2 className="sectionTitle">Quick Actions</h2>
          <div className="actions">
            <button className="actionBtn">+ Add User</button>
            <button className="actionBtn">Create Report</button>
            <button className="actionBtn">Manage Roles</button>
          </div>
        </div>

        <div className="panel">
          <h2 className="sectionTitle">System Status</h2>
          <div className="statusRow">
            <span>API</span> <span className="pill ok">Online</span>
          </div>
          <div className="statusRow">
            <span>DB</span> <span className="pill ok">Healthy</span>
          </div>
          <div className="statusRow">
            <span>Deploy</span> <span className="pill warn">Pending</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Admin Dashboard • Theme saved in localStorage
      </footer>
    </div>
  );
}

function Card({ title, value, hint }) {
  return (
    <div className="card">
      <div className="cardTitle">{title}</div>
      <div className="cardValue">{value}</div>
      <div className="cardHint">{hint}</div>
    </div>
  );
}