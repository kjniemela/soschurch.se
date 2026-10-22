import type { ComponentConfig } from '@puckeditor/core';
import { StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { Body, Eyebrow, Heading, Section } from '@/components/ui';
import { events } from '@/lib/content';
import { colors, fonts, radius, spacing } from '@/lib/theme';
import { toneField, type Tone } from '@/puck/fields';

// Editors control the heading and how many events show; the events themselves
// still come from src/lib/content.ts until they're pulled from Church Center.

export type EventListProps = {
  eyebrow: string;
  heading: string;
  limit: number;
  tone: Tone;
};

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return {
    day: d.getDate().toString(),
    month: d.toLocaleString('en-GB', { month: 'short' }).toUpperCase(),
    weekday: d.toLocaleString('en-GB', { weekday: 'long' }),
  };
}

export const EventList: ComponentConfig<EventListProps> = {
  label: 'Upcoming events',
  fields: {
    eyebrow: { type: 'text', label: 'Small heading' },
    heading: { type: 'text', label: 'Heading' },
    limit: { type: 'number', label: 'Number of events', min: 1, max: 20 },
    tone: toneField,
  },
  defaultProps: { eyebrow: 'Upcoming', heading: 'Events', limit: 5, tone: 'default' },
  render: ({ eyebrow, heading, limit, tone }) => (
    <Section tone={tone}>
      {!!eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading>{heading}</Heading>
      <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
        {events.slice(0, limit).map((e) => {
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
  ),
};

const styles = StyleSheet.create({
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
});
