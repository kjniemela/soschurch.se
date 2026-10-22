import type { Config } from '@puckeditor/core';
import { View } from 'react-native';

import { colors } from '@/lib/theme';
import { ButtonList, type ButtonListProps } from '@/puck/blocks/ButtonList';
import { Callout, type CalloutProps } from '@/puck/blocks/Callout';
import { CardGrid, type CardGridProps } from '@/puck/blocks/CardGrid';
import { Columns, type ColumnsProps } from '@/puck/blocks/Columns';
import { EventList, type EventListProps } from '@/puck/blocks/EventList';
import { Hero, type HeroProps } from '@/puck/blocks/Hero';
import { Image, type ImageProps } from '@/puck/blocks/Image';
import { Text, type TextProps } from '@/puck/blocks/Text';

// The block library editors can use. To add a block: create it in src/puck/blocks,
// then register it in `components` and in a category below. The JSON in
// content/pages stores blocks by these names, so don't rename one that's in use.

export type Blocks = {
  Hero: HeroProps;
  Callout: CalloutProps;
  EventList: EventListProps;
  CardGrid: CardGridProps;
  ButtonList: ButtonListProps;
  Columns: ColumnsProps;
  Text: TextProps;
  Image: ImageProps;
};

export type RootProps = { title: string };

export const config: Config<Blocks, RootProps> = {
  categories: {
    sections: { title: 'Sections', components: ['Hero', 'Callout', 'EventList', 'CardGrid', 'ButtonList'] },
    layout: { title: 'Layout', components: ['Columns'] },
    content: { title: 'Inside columns', components: ['Text', 'Image'] },
  },
  components: { Hero, Callout, EventList, CardGrid, ButtonList, Columns, Text, Image },
  root: {
    fields: { title: { type: 'text', label: 'Page title' } },
    // Only used by the editor canvas; the site wraps pages in <Page> instead.
    render: ({ children }) => <View style={{ backgroundColor: colors.bg, minHeight: '100%' }}>{children}</View>,
  },
};
