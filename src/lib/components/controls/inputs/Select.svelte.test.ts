import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import Select from './Select.svelte';

afterEach(() => {
	cleanup();
});

const optionsSnippet = createRawSnippet(() => ({
	render: () => `
		<option value="apple">Apple</option>
		<option value="banana">Banana</option>
		<option value="cherry">Cherry</option>
	`
}));

describe('UI Component: Select', () => {
	it('must pass the disabled attribute', () => {
		render(Select, {
			props: {
				'aria-label': 'fruit-select',
				disabled: true,
				children: optionsSnippet
			}
		});

		const selectEl = screen.getByRole('combobox', { name: 'fruit-select' });
		expect(selectEl).toBeDisabled();
	});
});
