import { DataTable } from "../components/DataTable.jsx";
import { useApiResource } from "../hooks/useApiResource.js";
import { getMembers } from "../services/api.js";

const statusLabels = {
    active: "Activo",
    paused: "Pausado"
};

export const Socios = () => {
    const members = useApiResource(getMembers);

    if (members.loading) return <p className="muted">Cargando socios...</p>;
    if (members.error) return <p className="alert">{members.error}</p>;

    return (
    <div className="page-stack">
        <div>
        <p className="eyebrow">Socios</p>
        <h1>Socios de la biblioteca</h1>
    </div>

    <DataTable
        title="Listado de socios"
        rows={[...members.data].sort((a, b) => {
        const numberA = Number(a.fullName.match(/\d+$/)?.[0] || 0);
        const numberB = Number(b.fullName.match(/\d+$/)?.[0] || 0);

    return numberA - numberB;
    })}
        emptyText="No hay socios registrados."
        columns={[
            {
            key: "memberNumber",
            label: "Nº socio",
            render: (member) => member.fullName.match(/\d+$/)?.[0] || "-"
    },
            {
            key: "fullName",
            label: "Nombre",
            render: (member) => member.fullName.replace(/\s+\d+$/, "")
    },
            { key: "email", label: "Email" },
            { key: "phone", label: "Teléfono" },
            { key: "neighborhood", label: "Barrio" },
            {
            key: "status",
            label: "Estado",
            render: (member) => statusLabels[member.status] || member.status
            }
        ]} 
        />
    </div>
    );
};