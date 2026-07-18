import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import Button from './Button.svelte';
import { createRawSnippet } from 'svelte';

afterEach(() => {
	cleanup();
});

const childrenSnippet = createRawSnippet(() => ({
	render: () => `<p>Test content</p>`
}));

vi.mock('$lib/utils/route', () => ({
	localizedResolve: (url: string) => `/en${url}`
}));

describe('UI Component: Button', () => {
	it('should render the button tag if no href parameter is passed', () => {
		render(Button, {
			props: {
				'aria-label': 'test-button',
				children: childrenSnippet
			}
		});

		const buttonEl = screen.getByRole('button', { name: 'test-button' });

		expect(buttonEl.tagName).toBe('BUTTON');
	});

	it('should render an "a" tag (link) with the correct href if this parameter is passed', () => {
		render(Button, {
			props: {
				href: '/dashboard',
				'aria-label': 'test-button',
				children: childrenSnippet
			}
		});

		const anchorEl = screen.getByRole('link', { name: 'test-button' });

		expect(anchorEl.tagName).toBe('A');

		expect(anchorEl.getAttribute('href')).toBe('/en/dashboard');
	});
});
