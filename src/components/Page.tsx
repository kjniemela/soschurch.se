import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { Container, openUrl } from '@/components/ui';
import { church, locations, network } from '@/lib/content';
import { colors, fonts, spacing } from '@/lib/theme';
import { useIsDesktop } from '@/lib/useIsDesktop';

/** Scrollable page shell shared by every screen. `back` adds a back link for pages outside the main nav. */
export function Page({ children, back }: { children: ReactNode; back?: boolean }) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ flexGrow: 1 }}>
      {back && (
        <Container style={{ paddingTop: spacing.md }}>
          <Pressable
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
            style={styles.back}
            accessibilityRole="link"
          >
            <Icon name="arrowLeft" size={18} color={colors.accent} />
            <Text style={styles.backLabel}>Back</Text>
          </Pressable>
        </Container>
      )}
      <View style={{ flexGrow: 1 }}>{children}</View>
      <Footer />
    </ScrollView>
  );
}

function Footer() {
  const isDesktop = useIsDesktop();
  return (
    <View style={styles.footer}>
      <Container style={{ flexDirection: isDesktop ? 'row' : 'column', gap: spacing.lg }}>
        {locations.map((l) => (
          <View key={l.id} style={{ flex: 1, gap: 2 }}>
            <Text style={styles.footerHeading}>{l.title}</Text>
            <Text style={styles.footerText}>{l.name}</Text>
            <Text style={styles.footerText}>{l.street}</Text>
            <Text style={styles.footerText}>{l.postal}</Text>
          </View>
        ))}
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={styles.footerHeading}>Contact</Text>
          <Text style={styles.footerLink} onPress={() => openUrl(`mailto:${church.email}`)}>
            {church.email}
          </Text>
          <Text style={styles.footerLink} onPress={() => openUrl(church.instagram)}>
            Instagram
          </Text>
          <Text style={styles.footerLink} onPress={() => openUrl(church.youtube)}>
            YouTube
          </Text>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={styles.footerHeading}>SOS Network</Text>
          {network.map((n) => (
            <Text key={n.url} style={styles.footerLink} onPress={() => openUrl(n.url)}>
              {n.name}
            </Text>
          ))}
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.bg },
  back: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, alignSelf: 'flex-start' },
  backLabel: { fontFamily: fonts.bodyMedium, color: colors.accent, fontSize: 15 },
  footer: { backgroundColor: colors.sage, paddingVertical: spacing.xl },
  footerHeading: {
    fontFamily: fonts.displayMedium,
    fontSize: 15,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.forest,
    marginBottom: spacing.xs,
  },
  footerText: { fontFamily: fonts.body, fontSize: 14, color: '#1E2423' },
  footerLink: { fontFamily: fonts.bodyMedium, fontSize: 14, color: '#1E2423', textDecorationLine: 'underline' },
});
