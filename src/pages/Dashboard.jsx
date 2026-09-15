import { useMemo, useState } from "react";
import { BookOpen, Clock,Tags,UserRound,UsersRound } from "lucide-react";
import { DataTable } from "../components/DataTable.jsx";
import { StatCard } from "../components/StatCard.jsx";
import { useApiResource } from "../hooks/useApiResource.js";
import { useDashboardStats } from "../hooks/useDashboardStats.js";
import { getBooks, getLoans, getMembers } from "../services/api.js";

const statusLabels = {
  borrowed: "Prestado",
  returned: "Devuelto",
  late: "Con retraso"
};

const formatDate = (date) => {
  const loanDate = new Date(date);
  const day= String(loanDate.getDate()).padStart(2, "0");
  const month = String(loanDate.getMonth() + 1).padStart(2, "0");
  const year = loanDate.getFullYear();
  return `${day}/${month}/${year}`;
};

export const Dashboard = () => {
  const [search, setSearch] = useState("");
  const bookParams = useMemo(() => ({ search }), [search]);
  const books = useApiResource(getBooks, bookParams);
  const members = useApiResource(getMembers);
  const loans = useApiResource(getLoans);
  const stats = useDashboardStats({
    books: books.data,
    members: members.data,
    loans: loans.data
  });

  const loading = books.loading || members.loading || loans.loading;
  const error = books.error || members.error || loans.error;

  return (
    <div className="dashboard">
      <section className="hero-image">
        <div className="hero-content">
          <p>Biblioteca La Costera</p>
          <h2>Lectura, socios y préstamos en un solo lugar</h2>
          </div>
      </section>
      <section className="toolbar">
        <label>
          Buscar libros
          <input
            type="search"
            placeholder="Titulo o autor"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </section>

      {error && <p className="alert">{error}</p>}

      <section id="resumen" className="stats-grid" aria-label="Resumen">
        {stats.map((stat) => {
          const icons={
            "Libros": BookOpen,
            "Libros en catálogo": BookOpen,
            "Socios": UsersRound,
            "Prestamos activos": Clock,
            "Préstamos activos": Clock,
            "Prestamos con retraso": UserRound,
            "Préstamos con retraso": UserRound,
            "Generos": Tags,
            "Géneros": Tags

          };
          return <StatCard key={stat.label} {...stat} icon={icons[stat.label]} />;
      })}
      </section>

      {loading ? (
        <p className="muted">Cargando datos...</p>
      ) : (
        <>
        <section id="catalogo" className="dashboard-tables">
          <DataTable
            title="Catálogo de libros"
            rows={books.data.slice(0, 8)}
            emptyText="No hay libros con ese filtro."
            columns={[
              { key: "title", label: "Título" },
              { key: "author", label: "Autor" },
              { key: "genre", label: "Género" },
              { key: "copies", label: "Copias" }
            ]}
          />
<DataTable
  title="Préstamos recientes"
  rows={loans.data.slice(0, 8)}
  emptyText="No hay préstamos registrados."
  columns={[
    { key: "book", label: "Libro", render: (loan) => loan.book?.title },
    {
      key: "member",
      label: "Socio",
      render: (loan) => loan.member?.fullName?.replace(/\s+\d+$/, "")
    },
    {
      key: "status",
      label: "Estado",
      render: (loan) => statusLabels[loan.status] || loan.status
    },
    {
      key: "dueDate",
      label: "Vence",
      render: (loan) => formatDate(loan.dueDate)
    }
  ]}
/>
</section>
        </>
      )}
    </div>
  );
};
