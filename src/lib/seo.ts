interface ArticleInput {
	title: string;
	description: string;
	pubDate: Date;
	authorName: string;
	updatedDate?: Date;
}

interface BreadcrumbItem {
	name: string;
	url: string;
}

interface FaqItem {
	question: string;
	answer: string;
}

export function buildArticleSchema(article: ArticleInput, canonicalUrl: string): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: article.title,
		description: article.description,
		datePublished: article.pubDate.toISOString(),
		dateModified: (article.updatedDate ?? article.pubDate).toISOString(),
		author: { '@type': 'Person', name: article.authorName },
		mainEntityOfPage: canonicalUrl,
	};
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

export function buildFaqSchema(faqs: FaqItem[]): Record<string, unknown> | null {
	if (faqs.length === 0) return null;
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: { '@type': 'Answer', text: faq.answer },
		})),
	};
}
