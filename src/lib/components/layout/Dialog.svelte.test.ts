import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import Dialog from './Dialog.svelte';

describe('UI Component: Dialog', () => {
	it('should display content if open is true', () => {
		const childrenSnippet = createRawSnippet(() => ({
			render: () => `<p>Test content</p>`
		}));

		render(Dialog, { props: { open: true, children: childrenSnippet } });

		const dialog = screen.getByRole('dialog');
		expect(dialog).toBeTruthy();
	});
});
