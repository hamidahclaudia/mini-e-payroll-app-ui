export function formatDateToUTC(date: Date | string | null): string | null {
    if (!date) return null; // Handle null values
  
    const d = new Date(date);
    return d.toISOString(); // Convert to UTC format (ISO 8601)
  }
  