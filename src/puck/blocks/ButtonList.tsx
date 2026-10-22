import type { ComponentConfig } from '@puckeditor/core';
import { View } from 'react-native';

import { Button, Eyebrow, Heading, Section } from '@/components/ui';
import { spacing } from '@/lib/theme';
import { linkField, linkTarget, toneField, variantField, type ButtonVariant, type Tone } from '@/puck/fields';

export type ButtonListProps = {
  eyebrow: string;
  heading: string;
  variant: ButtonVariant;
  tone: Tone;
  buttons: { label: string; link: string }[];
};

export const ButtonList: ComponentConfig<ButtonListProps> = {
  label: 'Button list',
  fields: {
    eyebrow: { type: 'text', label: 'Small heading' },
    heading: { type: 'text', label: 'Heading' },
    variant: variantField,
    tone: toneField,
    buttons: {
      type: 'array',
      label: 'Buttons',
      arrayFields: { label: { type: 'text', label: 'Label' }, link: linkField },
      defaultItemProps: { label: 'Button', link: '/' },
      getItemSummary: (item) => item.label || 'Button',
    },
  },
  defaultProps: { eyebrow: '', heading: 'Heading', variant: 'ghost', tone: 'default', buttons: [] },
  render: ({ eyebrow, heading, variant, tone, buttons }) => (
    <Section tone={tone}>
      {!!eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {!!heading && <Heading>{heading}</Heading>}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg }}>
        {buttons.map((b, i) => (
          <Button key={i} label={b.label} variant={variant} {...linkTarget(b.link)} />
        ))}
      </View>
    </Section>
  ),
};
