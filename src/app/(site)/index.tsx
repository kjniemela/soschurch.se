import { StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { Page } from '@/components/Page';
import { Body, Button, Card, Eyebrow, Grid, Heading, Hero, Section } from '@/components/ui';
import { church, churchLife, events, images, nextSteps, service } from '@/lib/content';
import { colors, fonts, radius, spacing } from '@/lib/theme';
import { useIsDesktop } from '@/lib/useIsDesktop';

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return {
    day: d.getDate().toString(),
    month: d.toLocaleString('en-GB', { month: 'short' }).toUpperCase(),
    weekday: d.toLocaleString('en-GB', { weekday: 'long' }),
  };
}

export default function Home() {
  const isDesktop = useIsDesktop();

  return (
    <Page>
      <Hero tall image={images.hero} eyebrow={church.name} title="Welcome home" subtitle={church.tagline}>
        <View style={styles.row}>
          <Button label="Plan a visit" href="/visit" />
          <Button label="Watch online" url={church.youtube} variant="ghost" />
        </View>
      </Hero>

      <Section tone="raised">
        <View style={[styles.serviceStrip, { flexDirection: isDesktop ? 'row' : 'column' }]}>
          <View style={{ flex: 1, gap: spacing.sm }}>
            <Eyebrow>Sunday Celebration</Eyebrow>
            <Heading size="md">{service.day} · {service.times.join(' & ')}</Heading>
            <Body muted>Venue 81, Drottninggatan 81, Stockholm. {service.language}</Body>
          </View>
          <Button label="Directions" href="/visit" variant="secondary" />
        </View>
      </Section>

      <Section>
        <Eyebrow>Upcoming</Eyebrow>
        <Heading>Events</Heading>
        <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
          {events.map((e) => {
            const d = formatDate(e.date);
            return (
              <View key={e.id} style={styles.event}>
                <View style={styles.eventDate}>
                  <Text style={styles.eventDay}>{d.day}</Text>
                  <Text style={styles.eventMonth}>{d.month}</Text>
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={styles.eventTitle}>{e.title}</Text>
                  <Body muted>
                    {d.weekday} · {e.time} · {e.place}
                  </Body>
                </View>
                <Icon name="calendar" size={22} color={colors.textMuted} />
              </View>
            );
          })}
        </View>
      </Section>

      <Section tone="raised">
        <Eyebrow>Church life</Eyebrow>
        <Heading>Not just an event — a family</Heading>
        <Body muted style={{ marginTop: spacing.sm, marginBottom: spacing.lg, maxWidth: 640 }}>
          SOS is a place for you. Find your people, grow in faith and serve the city together.
        </Body>
        <Grid columns={3}>
          {churchLife.map((c) => (
            <Card key={c.title} title={c.title} href={'href' in c ? c.href : undefined} url={'url' in c ? c.url : undefined}>
              <Body muted>{c.blurb}</Body>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section>
        <Eyebrow>Next steps</Eyebrow>
        <Heading>Where do you want to go?</Heading>
        <View style={[styles.steps, { marginTop: spacing.lg }]}>
          {nextSteps.map((s) => (
            <Button key={s.label} label={s.label} href={s.href} url={s.url} variant="ghost" />
          ))}
        </View>
      </Section>
    </Page>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.sm },
  serviceStrip: { gap: spacing.lg, alignItems: 'flex-start', justifyContent: 'space-between' },
  event: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eventDate: {
    width: 64,
    height: 64,
    borderRadius: radius.sm,
    backgroundColor: colors.violet,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventDay: { fontFamily: fonts.display, fontSize: 26, color: colors.text, lineHeight: 28 },
  eventMonth: { fontFamily: fonts.bodyBold, fontSize: 11, color: colors.text, letterSpacing: 1 },
  eventTitle: { fontFamily: fonts.displayMedium, fontSize: 20, color: colors.text, textTransform: 'uppercase' },
  steps: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
