import { ptBR } from "date-fns/locale";
import { format, setDefaultOptions } from "date-fns";

export function formatDate(date: string) {
  setDefaultOptions({ locale: ptBR });
  const formattedDate = format(date.replace("-", "/"), "iii, d LLL");
  return formattedDate;
}
