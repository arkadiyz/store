import { store } from '../redux/store';

export function getNameById(id: number | string): string {
  const { productTypes } = store.getState().app;

  const found = productTypes.find((item) => item.id === id);

  return found ? found.name : '';
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // חודשים מ-0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function setDefoultDateForDisplay(): string {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split('T')[0];
}

export function formatDateForInput(dateStr: string | undefined): string {
  if (!dateStr) return setDefoultDateForDisplay();

  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? setDefoultDateForDisplay() : date.toISOString().split('T')[0];
}
