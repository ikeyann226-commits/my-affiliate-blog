import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './lib/posts';

const blog = defineCollection({
	// アンダースコア始まりのファイル（例: _example.md）はテンプレート/参考用として収集対象から除外する
	loader: glob({ base: './src/content/blog', pattern: '**/[^_]*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			category: z.enum(CATEGORIES),
			tags: z.array(z.string()).default([]),
			// 断定的主張の出典（一次情報優先）。04執筆時に必ず記載する。
			sources: z
				.array(
					z.object({
						label: z.string(),
						url: z.string().url(),
					})
				)
				.default([]),
			// trueならPR/広告表記バナーを自動表示（ステマ規制対応）
			hasAffiliateLinks: z.boolean().default(false),
			faq: z
				.array(
					z.object({
						question: z.string(),
						answer: z.string(),
					})
				)
				.default([]),
			// 05担当が記入。執筆段階では空欄のまま
			reviewedBy: z.string().optional(),
			reviewedDate: z.coerce.date().optional(),
			// 05承認まで必ずtrue。trueの記事はビルドで一切出力しない
			draft: z.boolean().default(true),
		}),
});

export const collections = { blog };
