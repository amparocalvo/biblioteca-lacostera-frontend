import { useMemo, useState } from "react";
import { DataTable } from "../components/DataTable.jsx";
import { useApiResource } from "../hooks/useApiResource.js";
import { getBooks } from "../services/api.js";

export const Catalogo = () => {
    const [search, setSearch] = useState("");
    const bookParams = useMemo(() => ({ search }), [search]);
    const books = useApiResource(getBooks, bookParams);


    return (
    <div className="page-stack">
    <div>
        <p className="eyebrow">Catálogo</p>
        <h1>Libros disponibles</h1>
    </div>

    <section className="toolbar">
        <label>
        Buscar libros
        <input
            type="search"
            placeholder="Título o autor"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
        />
        </label>
        </section>

    <DataTable
        title="Catálogo completo"
        rows={books.data}
        emptyText="No hay libros registrados."
        columns={[
            { key: "title", label: "Título" },
            { key: "author", label: "Autor" },
            { key: "genre", label: "Género" },
            { key: "publishedYear", label: "Año" },
            { key: "copies", label: "Copias" }
        ]}
        />
    </div>
    );
};