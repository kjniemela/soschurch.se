import type { ComponentConfig } from '@puckeditor/core';
import { View } from 'react-native';

import { Button, Hero as HeroSection } from '@/components/ui';
import { images } from '@/lib/content';
import { spacing } from '@/lib/theme';
import { linkField, linkTarget, variantField, type ButtonVariant } from '@/puck/fields';

export type HeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  size: 'tall' | 'short';
  buttons: { label: string; link: string; variant: ButtonVariant }[];
};

export const Hero: ComponentConfig<HeroProps> = {
  label: 'Hero',
  fields: {
    eyebrow: { type: 'text', label: 'Small heading' },
    title: { type: 'text', label: 'Title' },
    subtitle: { type: 'textarea', label: 'Subtitle' },
    image: { type: 'text', label: 'Background image URL' },
    size: {
      type: 'radio',
      label: 'Height',
      options: [
        { label: 'Tall', value: 'tall' },
        { label: 'Short', value: 'short' },
      ],
    },
    buttons: {
      type: 'array',
      label: 'Buttons',
      max: 3,
      arrayFields: { label: { type: 'text', label: 'Label' }, link: linkField, variant: variantField },
      defaultItemProps: { label: 'Button', link: '/', variant: 'primary' },
      getItemSummary: (item) => item.label || 'Button',
    },
  },
  defaultProps: {
    eyebrow: '',
    title: 'Page title',
    subtitle: '',
    image: images.hero,
    size: 'short',
    buttons: [],
  },
  render: ({ eyebrow, title, subtitle, image, size, buttons }) => (
    <HeroSection tall={size === 'tall'} image={image} eyebrow={eyebrow || undefined} title={title} subtitle={subtitle || undefined}>
      {buttons.length > 0 && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.sm }}>
          {buttons.map((b, i) => (
            <Button key={i} label={b.label} variant={b.variant} {...linkTarget(b.link)} />
          ))}
        </View>
      )}
    </HeroSection>
  ),
};
