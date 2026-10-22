import { Page } from '@/components/Page';
import { Body, Button, Card, Eyebrow, Grid, Heading, Hero, Section } from '@/components/ui';
import { childDedicationUrl, images } from '@/lib/content';
import { spacing } from '@/lib/theme';

export default function Kids() {
  return (
    <Page>
      <Hero image={images.crowd} eyebrow="SOS Kids" title="Parents, we've got this!" subtitle="Every Sunday your kids get their own celebration while you join the service at Venue 81." />

      <Section>
        <Grid columns={2}>
          <Card title="Kids Church · 3–9 years">
            <Body muted>
              Every Sunday at S:t Peter's Place, Kammakargatan 60. Doors open 10:30.
            </Body>
          </Card>
          <Card title="Youngsters · 10–12 years">
            <Body muted>
              Start in worship with the adults at Venue 81, then walk together to S:t Peter's Church — two minutes away.
            </Body>
          </Card>
        </Grid>
      </Section>

      <Section tone="raised">
        <Eyebrow>Child dedication</Eyebrow>
        <Heading size="md">Dedicate your child</Heading>
        <Body muted style={{ marginVertical: spacing.md, maxWidth: 640 }}>
          We don't baptise infants, but we hold a child dedication at a Sunday Celebration at least once a year.
        </Body>
        <Button label="Sign up" url={childDedicationUrl} />
      </Section>
    </Page>
  );
}
