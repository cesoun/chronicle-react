import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import remarkRehype from 'remark-rehype';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

/**
 * Convert Markdown to HTML content
 * @param markdown The markdown string to convert
 */
export function Unified(markdown: string): Promise<string | Buffer> {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkToc, { prefix: 'toc-' })
    .use(remarkRehype)
    .use(rehypeExternalLinks)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown)
    .then((result) => result.value);
}
