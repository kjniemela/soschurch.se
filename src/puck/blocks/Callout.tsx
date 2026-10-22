import type { ComponentConfig } from '@puckeditor/core';
import { View } from 'react-native';

import { Body, Button, Eyebrow, Heading, Section } from '@/components/ui';
import { spacing } from '@/lib/theme';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { linkField, linkTarget, toneField, variantField, type ButtonVariant, type Tone } from '@/puck/fields';

export type CalloutProps = {
  eyebrow: string;
  heading: string;
  body: string;
  buttonLabel: string;
  buttonLink: string;
  buttonVariant: ButtonVariant;
  tone: Tone;
};

function CalloutView({ eyebrow, heading, body, buttonLabel, buttonLink, buttonVariant, tone }: CalloutProps) {
  const isDesktop = useIsDesktop();
  return (
    <Section tone={tone}>
      <View
        style={{
          flexDirection: isDesktop ? 'row' : 'column',
          gap: spacing.lg,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flex: 1, gap: spacing.sm }}>
          {!!eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <Heading size="md">{heading}</Heading>
          {!!body && <Body muted>{body}</Body>}
        </View>
        {!!buttonLabel && <Button label={buttonLabel} variant={buttonVariant} {...linkTarget(buttonLink)} />}
      </View>
    </Section>
  );
}

export const Callout: ComponentConfig<CalloutProps> = {
  label: 'Callout strip',
  fields: {
    eyebrow: { type: 'text', label: 'Small heading' },
    heading: { type: 'text', label: 'Heading' },
    body: { type: 'textarea', label: 'Text' },
    buttonLabel: { type: 'text', label: 'Button label (leave empty for no button)' },
    buttonLink: linkField,
    buttonVariant: variantField,
    tone: toneField,
  },
  defaultProps: {
    eyebrow: '',
    heading: 'Heading',
    body: '',
    buttonLabel: '',
    buttonLink: '',
    buttonVariant: 'secondary',
    tone: 'raised',
  },
  render: (props) => <CalloutView {...props} />,
};
