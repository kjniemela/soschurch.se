import type { ComponentConfig } from '@puckeditor/core';

import { Body, Card, Eyebrow, Grid, Heading, Section } from '@/components/ui';
import { spacing } from '@/lib/theme';
import { linkField, linkTarget, toneField, type Tone } from '@/puck/fields';

export type CardGridProps = {
  eyebrow: string;
  heading: string;
  body: string;
  columns: number;
  tone: Tone;
  cards: { title: string; text: string; link: string }[];
};

export const CardGrid: ComponentConfig<CardGridProps> = {
  label: 'Card grid',
  fields: {
    eyebrow: { type: 'text', label: 'Small heading' },
    heading: { type: 'text', label: 'Heading' },
    body: { type: 'textarea', label: 'Intro text' },
    columns: {
      type: 'select',
      label: 'Columns on desktop',
      options: [
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
      ],
    },
    tone: toneField,
    cards: {
      type: 'array',
      label: 'Cards',
      arrayFields: {
        title: { type: 'text', label: 'Title' },
        text: { type: 'textarea', label: 'Text' },
        link: linkField,
      },
      defaultItemProps: { title: 'Card', text: '', link: '' },
      getItemSummary: (item) => item.title || 'Card',
    },
  },
  defaultProps: { eyebrow: '', heading: 'Heading', body: '', columns: 3, tone: 'default', cards: [] },
  render: ({ eyebrow, heading, body, columns, tone, cards }) => (
    <Section tone={tone}>
      {!!eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {!!heading && <Heading>{heading}</Heading>}
      {!!body && <Body muted style={{ marginTop: spacing.sm, maxWidth: 640 }}>{body}</Body>}
      <Grid columns={columns}>
        {cards.map((c, i) => (
          <Card key={i} title={c.title} {...linkTarget(c.link)}>
            {!!c.text && <Body muted>{c.text}</Body>}
          </Card>
        ))}
      </Grid>
    </Section>
  ),
};
