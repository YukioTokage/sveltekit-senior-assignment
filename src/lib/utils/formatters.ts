import { getLocale } from '$lib/paraglide/runtime';

export function formatDate(
	date: string | Date,
	options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string {
	try {
		const dateObj = typeof date === 'string' ? new Date(date) : date;
		return new Intl.DateTimeFormat(getLocale(), options).format(dateObj);
	} catch (error) {
		console.error('Error formatting date:', error);
		return '';
	}
}

export function formatNumber(
	value: number,
	options: Intl.NumberFormatOptions = { notation: 'compact', maximumFractionDigits: 1 }
): string {
	try {
		return new Intl.NumberFormat(getLocale(), options).format(value);
	} catch (error) {
		console.error('Error formatting number:', error);
		return value.toString();
	}
}
