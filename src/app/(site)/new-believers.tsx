import { View } from 'react-native';

import { Page } from '@/components/Page';
import { Body, Button, Hero, Section } from '@/components/ui';
import { images } from '@/lib/content';
import { spacing } from '@/lib/theme';

export default function NewBelievers() {
  return (
    <Page back>
      <Hero image={images.worship} eyebrow="New here?" title="Welcome to the family!" />
      <Section>
        <Body style={{ maxWidth: 680, marginBottom: spacing.lg }}>
          Our Next Steps program is four classes held on selected Sundays. It covers what we believe and everything you need as a new believer. Join a Life Group to grow together with others.
        </Body>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
          <Button label="Next Steps program" url="https://soschurch.se/nextsteps" />
          <Button label="Life Groups" href="/life-groups" variant="ghost" />
          <Button label="Baptism" url="https://soschurch.se/baptism" variant="ghost" />
        </View>
      </Section>
    </Page>
  );
}
