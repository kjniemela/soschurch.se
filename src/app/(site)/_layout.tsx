import { Link, type Href } from 'expo-router';
import { TabList, TabSlot, TabTrigger, Tabs, type TabTriggerSlotProps } from 'expo-router/ui';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from '@/components/Icon';
import { Button } from '@/components/ui';
import { images } from '@/lib/content';
import { colors, fonts, MAX_CONTENT_WIDTH, spacing } from '@/lib/theme';
import { useIsDesktop } from '@/lib/useIsDesktop';

type NavRoute = { name: string; href: Href; label: string; icon: IconName; mobile: boolean };

// Main navigation, mirroring the current site. `mobile: false` items stay in the
// desktop header but are left out of the bottom bar to keep it at five tabs.
const nav: NavRoute[] = [
  { name: 'index', href: '/', label: 'Home', icon: 'home', mobile: true },
  { name: 'about', href: '/about', label: 'About', icon: 'info', mobile: false },
  { name: 'visit', href: '/visit', label: 'Visit', icon: 'place', mobile: true },
  { name: 'kids', href: '/kids', label: 'Kids', icon: 'kids', mobile: true },
  { name: 'listen', href: '/listen', label: 'Listen', icon: 'listen', mobile: true },
  { name: 'give', href: '/give', label: 'Give', icon: 'heart', mobile: true },
];

// Routes reachable through links but not shown in the nav.
const hidden: { name: string; href: Href }[] = [
  { name: 'life-groups', href: '/life-groups' },
  { name: 'new-believers', href: '/new-believers' },
  { name: 'bible-school', href: '/bible-school' },
];

export default function SiteLayout() {
  const isDesktop = useIsDesktop();

  return (
    <Tabs style={styles.root}>
      {isDesktop ? <TopNav /> : <MobileHeader />}
      <TabSlot style={{ flex: 1, minHeight: 0 }} />
      {!isDesktop && <BottomNav />}
      {/* Declares the routes; the visible navigation is rendered above. */}
      <TabList style={{ display: 'none' }}>
        {[...nav, ...hidden].map((r) => (
          <TabTrigger key={r.name} name={r.name} href={r.href} />
        ))}
      </TabList>
    </Tabs>
  );
}

function Logo({ size }: { size: number }) {
  return (
    <Link href="/" asChild>
      <Pressable style={styles.logo} accessibilityLabel="SOS Church Stockholm, home">
        <Image source={{ uri: images.logo }} style={{ width: size, height: size }} resizeMode="contain" />
        <Text style={styles.logoText}>SOS Church</Text>
      </Pressable>
    </Link>
  );
}

function TopNav() {
  return (
    <View style={styles.topNav}>
      <View style={styles.topNavInner}>
        <Logo size={40} />
        <View style={styles.topNavLinks}>
          {nav.map((r) => (
            <TabTrigger key={r.name} name={r.name} asChild>
              <TopNavLink label={r.label} />
            </TabTrigger>
          ))}
        </View>
        <Button label="Plan a visit" href="/visit" />
      </View>
    </View>
  );
}

function TopNavLink({ label, isFocused, ref, ...props }: TabTriggerSlotProps & { label: string }) {
  return (
    <Pressable {...props} ref={ref as never} style={styles.topNavLink}>
      {({ hovered }: { pressed: boolean; hovered?: boolean }) => (
        <Text style={[styles.topNavLabel, (isFocused || hovered) && { color: colors.accent }]}>{label}</Text>
      )}
    </Pressable>
  );
}

function MobileHeader() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.mobileHeader, { paddingTop: insets.top + spacing.sm }]}>
      <Logo size={32} />
      <TabTrigger name="about" asChild>
        <TopNavLink label="About" />
      </TabTrigger>
    </View>
  );
}

function BottomNav() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
      {nav
        .filter((r) => r.mobile)
        .map((r) => (
          <TabTrigger key={r.name} name={r.name} asChild>
            <BottomNavItem label={r.label} icon={r.icon} />
          </TabTrigger>
        ))}
    </View>
  );
}

function BottomNavItem({ label, icon, isFocused, ref, ...props }: TabTriggerSlotProps & { label: string; icon: IconName }) {
  const color = isFocused ? colors.accent : colors.textMuted;
  return (
    <Pressable {...props} ref={ref as never} style={styles.bottomNavItem} accessibilityRole="tab" accessibilityState={{ selected: isFocused }}>
      <Icon name={icon} size={24} color={color} />
      <Text style={[styles.bottomNavLabel, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  logo: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logoText: { fontFamily: fonts.display, fontSize: 20, color: colors.text, textTransform: 'uppercase', letterSpacing: 1 },
  topNav: { backgroundColor: colors.bg, borderBottomWidth: 1, borderBottomColor: colors.border },
  topNavInner: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topNavLinks: { flexDirection: 'row', gap: spacing.lg },
  topNavLink: { paddingVertical: spacing.sm },
  topNavLabel: { fontFamily: fonts.displayMedium, fontSize: 15, letterSpacing: 1.5, textTransform: 'uppercase', color: colors.text },
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.bg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  bottomNavItem: { flex: 1, alignItems: 'center', gap: 2 },
  bottomNavLabel: { fontFamily: fonts.bodyMedium, fontSize: 11 },
});
