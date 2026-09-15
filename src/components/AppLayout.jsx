import {
  BookOpen,
  CalendarDays,
  ChartColumn,
  Home,
  LibraryBig,
  LogOut,
  Settings,
  Tags,
  UsersRound,
  Repeat2,
  Sprout
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export const AppLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
  <div className="brand brand-stacked">
    <LibraryBig aria-hidden="true" />
    <span>Biblioteca<br />La Costera</span>
  </div>

  <nav className="nav-list" aria-label="Navegación principal">
  <a href="/">
  <Home aria-hidden="true" />
  <span>Inicio</span>
</a>

<a href="/catalogo">
  <BookOpen aria-hidden="true" />
  <span>Catálogo</span>
</a>

<a href="/socios">
  <UsersRound aria-hidden="true" />
  <span>Socios</span>
</a>

<a href="/prestamos">
  <Repeat2 aria-hidden="true" />
  <span>Préstamos</span>
</a>
    
  </nav>

  <div className="sidebar-quote">
    <Sprout aria-hidden="true" />
    <p>“Los libros nos hacen más libres”</p>
    <span>Biblioteca La Costera<br />Cultura. Personas. Comunidad.</span>
  </div>

  <button className="icon-button logout-button" onClick={logout} title="Cerrar sesión">
    <LogOut aria-hidden="true" />
    <span>Cerrar sesión</span>
  </button>
</aside>
      <main className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Gestión de biblioteca</p>
            <h1>Panel de control: catálogo de libros y préstamos</h1>
          </div>
          <div className="user-pill">{user?.name}</div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};
