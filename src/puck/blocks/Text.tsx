import type { ComponentConfig } from '@puckeditor/core';
import { View } from 'react-native';

import { Body, Button, Eyebrow, Heading } from '@/components/ui';
import { spacing } from '@/lib/theme';
import { linkField, linkTarget } from '@/puck/fields';

// Content block meant for inside layout blocks like Two columns (no section padding of its own).

export type TextProps = {
  eyebrow: string;
  heading: string;
  body: string;
  buttonLabel: string;
  buttonLink: string;
};

export const Text: ComponentConfig<TextProps> = {
  label: 'Text',
  fields: {
    eyebrow: { type: 'text', label: 'Small heading' },
    heading: { type: 'text', label: 'Heading' },
    body: { type: 'textarea', label: 'Text' },
    buttonLabel: { type: 'text', label: 'Button label (leave empty for no button)' },
    buttonLink: linkField,
  },
  defaultProps: { eyebrow: '', heading: 'Heading', body: 'Write something here.', buttonLabel: '', buttonLink: '' },
  render: ({ eyebrow, heading, body, buttonLabel, buttonLink }) => (
    <View style={{ gap: spacing.sm }}>
      {!!eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {!!heading && <Heading size="md">{heading}</Heading>}
      {!!body && <Body muted>{body}</Body>}
      {!!buttonLabel && (
        <View style={{ marginTop: spacing.sm }}>
          <Button label={buttonLabel} variant="ghost" {...linkTarget(buttonLink)} />
        </View>
      )}
    </View>
  ),
};
