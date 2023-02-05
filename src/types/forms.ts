import { Tag } from './shared'

export type FieldValues = Record<string, string>

export type ValidationErrors = Record<string, string>
export interface CreateArticleFields {
	tags: Tag[]
}

export type Validate = (values: FieldValues) => ValidationErrors

export type InputOrTextarea = HTMLInputElement | HTMLTextAreaElement
