import { Platform, View } from 'react-native';

import { Page } from '@/components/Page';
import { Body, Button, Card, Eyebrow, Grid, Heading, Hero, Section } from '@/components/ui';
import { church, images, locations, service } from '@/lib/content';
import { spacing } from '@/lib/theme';

function mapsUrl(query: string) {
  const q = encodeURIComponent(query);
  return Platform.OS === 'ios' ? `https://maps.apple.com/?q=${q}` : `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export default function Visit() {
  return (
    <Page>
      <Hero image={images.crowd} eyebrow="Plan a visit" title="Join us on Sunday" subtitle={`${service.day} at ${service.times.join(' & ')}. ${service.language}`} />

      <Section>
        <Eyebrow>Locations</Eyebrow>
        <Heading>Where to find us</Heading>
        <Grid columns={2}>
          {locations.map((l) => (
            <Card key={l.id} title={l.title}>
              <Body>
                {l.name}
                {'\n'}
                {l.street}
                {'\n'}
                {l.postal}
              </Body>
              <Body muted>{l.note}</Body>
              <View style={{ marginTop: spacing.sm }}>
                <Button label="Open in maps" url={mapsUrl(`${l.street}, ${l.postal}`)} variant="secondary" />
              </View>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section tone="raised">
        <Eyebrow>Questions?</Eyebrow>
        <Heading size="md">Get in touch</Heading>
        <Body muted style={{ marginVertical: spacing.md }}>
          Email {church.email} or call {church.phone}.
        </Body>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
          <Button label="Email us" url={`mailto:${church.email}`} />
          <Button label="Call" url={`tel:${church.phone.replace(/\s/g, '')}`} variant="ghost" />
        </View>
      </Section>
    </Page>
  );
}
