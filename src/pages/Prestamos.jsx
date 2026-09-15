import { DataTable } from "../components/DataTable.jsx";
import { useApiResource } from "../hooks/useApiResource.js";
import { getLoans } from "../services/api.js";

const statusLabels = {
    borrowed: "Prestado",
    returned: "Devuelto",
    late: "Con retraso"
};

const formatDate = (date) => {
    const loanDate = new Date(date);
    const day = String(loanDate.getDate()).padStart(2, "0");
    const month = String(loanDate.getMonth() + 1).padStart(2, "0");
    const year = loanDate.getFullYear();

    return `${day}/${month}/${year}`;
};

export const Prestamos = () => {
    const loans = useApiResource(getLoans);

    if (loans.loading) return <p className="muted">Cargando préstamos...</p>;
    if (loans.error) return <p className="alert">{loans.error}</p>;

    return (
    <div className="page-stack">
        <div>
        <p className="eyebrow">Préstamos</p>
        <h1>Historial de préstamos</h1>
    </div>

    <DataTable
        title="Todos los préstamos"
        rows={loans.data}
        emptyText="No hay préstamos registrados."
        columns={[
            { key: "book", label: "Libro", render: (loan) => loan.book?.title },
            { key: "member", label: "Socio", render: (loan) => loan.member?.fullName },
            {
            key: "status",
            label: "Estado",
            render: (loan) => statusLabels[loan.status] || loan.status
            },
            { key: "loanDate", label: "Fecha", render: (loan) => formatDate(loan.loanDate) },
            { key: "dueDate", label: "Vence", render: (loan) => formatDate(loan.dueDate) }
        ]}
        />
    </div>
    );
};