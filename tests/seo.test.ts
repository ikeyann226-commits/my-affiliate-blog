import { describe, it, expect } from 'vitest';
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema } from '../src/lib/seo';

describe('buildArticleSchema', () => {
	it('builds a BlogPosting schema with required fields', () => {
		const schema = buildArticleSchema(
			{
				title: 'テストタイトル',
				description: 'テスト説明',
				pubDate: new Date('2026-09-28'),
				authorName: '運営者名',
			},
			'https://example.com/test-slug/'
		);
		expect(schema['@type']).toBe('BlogPosting');
		expect(schema.headline).toBe('テストタイトル');
		expect(schema.datePublished).toBe('2026-09-28T00:00:00.000Z');
		expect(schema.author).toEqual({ '@type': 'Person', name: '運営者名' });
		expect(schema.mainEntityOfPage).toBe('https://example.com/test-slug/');
	});
});

describe('buildBreadcrumbSchema', () => {
	it('builds a BreadcrumbList with 1-indexed positions', () => {
		const schema = buildBreadcrumbSchema([
			{ name: 'ホーム', url: 'https://example.com/' },
			{ name: '転職', url: 'https://example.com/category/転職/' },
		]);
		expect(schema['@type']).toBe('BreadcrumbList');
		expect((schema.itemListElement as unknown[]).length).toBe(2);
	});
});

describe('buildFaqSchema', () => {
	it('returns null when there are no FAQ items', () => {
		expect(buildFaqSchema([])).toBeNull();
	});

	it('builds a FAQPage schema when FAQ items exist', () => {
		const schema = buildFaqSchema([{ question: '質問1', answer: '回答1' }]);
		expect(schema?.['@type']).toBe('FAQPage');
	});
});
