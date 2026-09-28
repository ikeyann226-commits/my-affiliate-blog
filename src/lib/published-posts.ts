// astro:content に依存するデータ取得。Astroのビルド/開発環境でのみ動作するため、
// Vitestでは直接テストしない（isValidSlug等の純粋ロジックは lib/posts.ts でテストする）。
import { getCollection, type CollectionEntry } from 'astro:content';

// 05（記事チェック）で draft: false になった記事のみを公開対象として返す。
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
	const posts = await getCollection('blog', ({ data }) => data.draft !== true);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
