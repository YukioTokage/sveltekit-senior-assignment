import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import ThemeToggle from './ThemeToggle.svelte';

describe('UI Component: ThemeToggle', () => {
	beforeEach(() => {
		document.documentElement.classList.remove('dark');
		localStorage.clear();
	});

	it('should toggle the "dark" class on the html tag and store the selection in localStorage', async () => {
		render(ThemeToggle);

		const buttonEl = screen.getByRole('button', { name: 'Toggle theme' });

		expect(document.documentElement.classList.contains('dark')).toBe(false);
		expect(localStorage.getItem('theme')).toBeNull();

		await fireEvent.click(buttonEl);

		expect(document.documentElement.classList.contains('dark')).toBe(true);
		expect(localStorage.getItem('theme')).toBe('dark');

		await fireEvent.click(buttonEl);

		expect(document.documentElement.classList.contains('dark')).toBe(false);
		expect(localStorage.getItem('theme')).toBe('light');
	});
});
