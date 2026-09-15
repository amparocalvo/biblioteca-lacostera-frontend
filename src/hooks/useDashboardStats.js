import { useMemo } from "react";

export const useDashboardStats = ({ books, members, loans }) => {
  return useMemo(() => {
    const activeLoans = loans.filter((loan) => loan.status !== "returned");
    const lateLoans = loans.filter((loan) => loan.status === "late");
    const genres = new Set(books.map((book) => book.genre));

    return [
      { label: "Libros en catálogo", value: books.length },
      { label: "Socios", value: members.length },
      { label: "Prestamos activos", value: activeLoans.length },
      { label: "Prestamos con retraso", value: lateLoans.length },
      { label: "Generos", value: genres.size }
    ];
  }, [books, members, loans]);
};
