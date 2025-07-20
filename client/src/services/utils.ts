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

export function setDefoultDate() {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return weekAgo.toISOString().split('T')[0]; // פורמט YYYY-MM-DD לשדה date
}

// פונקציה נוספת אם נרצה פורמט DD/MM/YYYY להצגה
export function setDefoultDateForDisplay() {
  return formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) + '');
}
