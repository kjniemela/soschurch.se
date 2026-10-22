import { View } from 'react-native';

import { Page } from '@/components/Page';
import { Body, Card, Eyebrow, Grid, Heading, Hero, Section } from '@/components/ui';
import { giving, images } from '@/lib/content';
import { colors, fonts, spacing } from '@/lib/theme';

export default function Give() {
  return (
    <Page>
      <Hero image={images.hero} eyebrow="Ways to give" title="Giving is part of who we are" subtitle={giving.verse} />

      <Section>
        <Grid columns={3}>
          {giving.options.map((o) => (
            <Card key={o.title} title={o.title} url={o.url}>
              <Body muted>{o.blurb}</Body>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section tone="raised">
        <Eyebrow>Miracle Offering</Eyebrow>
        <Heading size="md">We are a generous family</Heading>
        <Body muted style={{ marginVertical: spacing.md, maxWidth: 640 }}>
          Our faith goal this year goes to four areas. Give with reference {giving.miracleOffering.reference}.
        </Body>
        <View style={{ gap: spacing.sm }}>
          {giving.miracleOffering.areas.map((a) => (
            <Body key={a} style={{ fontFamily: fonts.bodyMedium, color: colors.accent }}>
              — {a}
            </Body>
          ))}
        </View>
      </Section>
    </Page>
  );
}
