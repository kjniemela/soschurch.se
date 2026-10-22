import type { Href } from 'expo-router';
import type { Field } from '@puckeditor/core';

// Field definitions shared by several blocks. Only `import type` from Puck is
// allowed outside src/puck/editor, so the native app never bundles the editor.

export type Tone = 'default' | 'raised';

export const toneField: Field<Tone> = {
  type: 'radio',
  label: 'Background',
  options: [
    { label: 'Dark', value: 'default' },
    { label: 'Raised', value: 'raised' },
  ],
};

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export const variantField: Field<ButtonVariant> = {
  type: 'select',
  label: 'Style',
  options: [
    { label: 'Teal (primary)', value: 'primary' },
    { label: 'Green (secondary)', value: 'secondary' },
    { label: 'Outline', value: 'ghost' },
  ],
};

export const linkField: Field<string> = {
  type: 'text',
  label: 'Link (a page like /visit, or a full https:// URL)',
};

/** Splits a link typed by an editor into the internal `href` / external `url` props our UI expects. */
export function linkTarget(link: string | undefined): { href?: Href; url?: string } {
  if (!link) return {};
  return /^(https?:|mailto:|tel:)/.test(link) ? { url: link } : { href: link as Href };
}
