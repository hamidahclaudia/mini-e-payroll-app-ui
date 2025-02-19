export function formatDateToUTC(date: Date | string | null): string | null {
    if (!date) return null; // Handle null values

    const d = new Date(date);
    return d.toISOString(); // Convert to UTC format (ISO 8601)
}

export function convertToInputDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}