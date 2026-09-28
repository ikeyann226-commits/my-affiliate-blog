// 純粋ロジックのみを置くファイル。astro:content には依存しないため、Vitestで直接テストできる。

export const CATEGORIES = ['キャリア', 'AI・IT', '英語', '転職', '金融'] as const;

// 固定ページと衝突しうるスラッグ。記事のslug(=ファイル名)にこれらを使うと本番ビルドが失敗する。
export const RESERVED_SLUGS = ['about', 'contact', 'privacy-policy', 'category', 'tags'];

export function isValidSlug(slug: string): boolean {
	return !RESERVED_SLUGS.includes(slug);
}
