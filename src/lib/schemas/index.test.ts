import { describe, it, expect } from 'vitest';
import { itemSchema, userSchema } from './index';

describe('Business logic validation via Zod', () => {
	it('itemSchema: must successfully pass a valid campaign', () => {
		const mockCampaign = {
			id: 'cmp_0082',
			name: 'Retention — Pricing change #082',
			status: 'draft',
			channel: 'social',
			owner: {
				id: 'u_jonas',
				name: 'Jonas Lindqvist'
			},
			budget: 5000,
			spent: 0.0,
			impressions: 0,
			clicks: 0,
			ctr: 0.0,
			startDate: '2026-01-14',
			endDate: '2026-03-12',
			updatedAt: '2026-02-03T20:00:00Z',
			tags: ['design', 'product']
		};

		const result = itemSchema.safeParse(mockCampaign);

		expect(result.success).toBe(true);
	});

	it('itemSchema: should block the campaign if there is no name', () => {
		const brokenCampaign = {
			id: 'cmp_0083',
			status: 'active',
			channel: 'push',
			owner: {
				id: 'u_marek',
				name: 'Marek Dvořák'
			},
			budget: 15000,
			spent: 3733.52,
			impressions: 344961,
			clicks: 14976,
			ctr: 0.0434,
			startDate: '2026-04-11',
			endDate: '2026-04-26',
			updatedAt: '2026-04-30T22:00:00Z',
			tags: []
		};

		const result = itemSchema.safeParse(brokenCampaign);

		expect(result.success).toBe(false);
	});

	it('userSchema: should block user with too short password', () => {
		const invalidUser = {
			email: 'admin@demo.test',
			password: '123'
		};

		const result = userSchema.safeParse(invalidUser);

		expect(result.success).toBe(false);
	});
});
