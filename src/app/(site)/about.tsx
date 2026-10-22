import { Page } from '@/components/Page';
import { Body, Button, Card, Eyebrow, Grid, Heading, Hero, Section } from '@/components/ui';
import { images, pastors } from '@/lib/content';
import { colors, fonts, spacing } from '@/lib/theme';

export default function About() {
  return (
    <Page>
      <Hero image={images.worship} eyebrow="About us" title="One family, many nations" subtitle="An international church in the heart of Stockholm, part of the SOS network across Sweden, Switzerland and France." />

      <Section>
        <Eyebrow>Our team</Eyebrow>
        <Heading>Our pastors</Heading>
        <Grid columns={2}>
          {pastors.map((p) => (
            <Card key={p.names} title={p.names}>
              <Body style={{ color: colors.accent, fontFamily: fonts.bodyMedium }}>{p.role}</Body>
              <Body muted>{p.bio}</Body>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section tone="raised">
        <Eyebrow>Vision & values</Eyebrow>
        <Heading size="md">What we believe</Heading>
        {/* On the current site these are images only; real copy needed. */}
        <Body muted style={{ marginVertical: spacing.md, maxWidth: 640 }}>
          Placeholder: our vision and core values will live here as real text instead of images, so they read well on phones and screen readers.
        </Body>
        <Button label="Our values" url="https://soschurch.se/our-values" variant="ghost" />
      </Section>
    </Page>
  );
}
