import type { ComponentConfig, Slot } from '@puckeditor/core';
import { View } from 'react-native';

import { Section } from '@/components/ui';
import { spacing } from '@/lib/theme';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { toneField, type Tone } from '@/puck/fields';

// Example of a layout block: `slot` fields hold other blocks, so editors can
// drop content into each column. On phones the columns stack.

export type ColumnsProps = {
  ratio: '1:1' | '1:2' | '2:1';
  tone: Tone;
  left: Slot;
  right: Slot;
};

const flex = { '1:1': [1, 1], '1:2': [1, 2], '2:1': [2, 1] } as const;
const inColumns = ['Text', 'Image'];

function ColumnsView({ ratio, tone, left: Left, right: Right }: Omit<ColumnsProps, 'left' | 'right'> & {
  left: () => React.ReactNode;
  right: () => React.ReactNode;
}) {
  const isDesktop = useIsDesktop();
  const [l, r] = flex[ratio];
  return (
    <Section tone={tone}>
      <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: spacing.xl }}>
        <View style={{ flex: isDesktop ? l : undefined, gap: spacing.md }}>
          <Left />
        </View>
        <View style={{ flex: isDesktop ? r : undefined, gap: spacing.md }}>
          <Right />
        </View>
      </View>
    </Section>
  );
}

export const Columns: ComponentConfig<ColumnsProps> = {
  label: 'Two columns',
  fields: {
    ratio: {
      type: 'select',
      label: 'Column widths',
      options: [
        { label: 'Equal', value: '1:1' },
        { label: 'Narrow left', value: '1:2' },
        { label: 'Narrow right', value: '2:1' },
      ],
    },
    tone: toneField,
    left: { type: 'slot', label: 'Left column', allow: inColumns },
    right: { type: 'slot', label: 'Right column', allow: inColumns },
  },
  defaultProps: { ratio: '1:1', tone: 'default', left: [], right: [] },
  render: ({ ratio, tone, left, right }) => <ColumnsView ratio={ratio} tone={tone} left={left} right={right} />,
};
