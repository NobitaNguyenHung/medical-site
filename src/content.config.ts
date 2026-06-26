import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const looseStringList = z.union([z.string(), z.array(z.string())]);
const reviewDate = z.union([z.string(), z.date()]);

// QA gate mềm: chuẩn hóa metadata mới nhưng vẫn nuốt frontmatter Obsidian/vault cũ.
export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				type: z
					.enum([
						'book-chapter',
						'clinical-case',
						'treatment-update',
						'topic-index',
						'algorithm',
						'drug-note',
						'template',
					])
					.optional(),
				category: z.enum(['books', 'cases', 'updates', 'topics', 'templates']).optional(),
				specialty: looseStringList.optional(),
				difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
				status: z.unknown().optional(),
				lastReviewed: reviewDate.optional(),
				evidence_level: z.string().optional(),
				purpose: z.string().optional(),
				aliases: z.array(z.string()).optional(),
				source: z.unknown().optional(),
				sourceType: z
					.enum(['textbook', 'guideline', 'rct', 'meta-analysis', 'expert-opinion', 'raw-note'])
					.optional(),
				sourceDetail: z.string().optional(),
				sourceUrl: z.string().url().optional(),
				source_kb: z.unknown().optional(),
				nguon_KB: z.unknown().optional(),
				chunk_nguon: z.unknown().optional(),
				author: z.unknown().optional(),
				chapter: z.unknown().optional(),
				tay_y_tuong_duong: z.unknown().optional(),
				created: z.unknown().optional(),
				tags: z.unknown().optional(),
			}),
		}),
	}),
};
