import { describe, it, expect } from 'vitest';
import { isValidSlug, RESERVED_SLUGS, CATEGORIES } from '../src/lib/posts';

describe('isValidSlug', () => {
	it('rejects slugs that collide with fixed pages', () => {
		expect(isValidSlug('about')).toBe(false);
		expect(isValidSlug('contact')).toBe(false);
		expect(isValidSlug('privacy-policy')).toBe(false);
		expect(isValidSlug('category')).toBe(false);
		expect(isValidSlug('tags')).toBe(false);
	});

	it('accepts normal article slugs', () => {
		expect(isValidSlug('ai-skill-crisis-2026')).toBe(true);
	});
});

describe('RESERVED_SLUGS', () => {
	it('contains the 5 fixed-page slugs', () => {
		expect(RESERVED_SLUGS).toEqual(
			expect.arrayContaining(['about', 'contact', 'privacy-policy', 'category', 'tags'])
		);
	});
});

describe('CATEGORIES', () => {
	it('contains exactly the 5 defined categories', () => {
		expect(CATEGORIES).toEqual(['キャリア', 'AI・IT', '英語', '転職', '金融']);
	});
});
