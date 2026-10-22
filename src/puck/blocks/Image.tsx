import type { ComponentConfig } from '@puckeditor/core';
import { Image as RNImage } from 'react-native';

import { images } from '@/lib/content';
import { radius } from '@/lib/theme';

export type ImageProps = {
  src: string;
  alt: string;
  aspect: number;
};

export const Image: ComponentConfig<ImageProps> = {
  label: 'Image',
  fields: {
    src: { type: 'text', label: 'Image URL' },
    alt: { type: 'text', label: 'Description (for screen readers)' },
    aspect: {
      type: 'select',
      label: 'Shape',
      options: [
        { label: 'Landscape (3:2)', value: 1.5 },
        { label: 'Wide (16:9)', value: 16 / 9 },
        { label: 'Square', value: 1 },
        { label: 'Portrait (4:5)', value: 0.8 },
      ],
    },
  },
  defaultProps: { src: images.worship, alt: '', aspect: 1.5 },
  render: ({ src, alt, aspect }) => (
    <RNImage
      source={{ uri: src }}
      accessibilityLabel={alt}
      resizeMode="cover"
      style={{ width: '100%', aspectRatio: aspect, borderRadius: radius.md }}
    />
  ),
};
