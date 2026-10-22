import { Link, type Href } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { ImageBackground, Linking, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { Icon } from '@/components/Icon';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { colors, fonts, MAX_CONTENT_WIDTH, radius, spacing } from '@/lib/theme';

export function openUrl(url: string) {
  Linking.openURL(url);
}

/** Centers content and caps its width on large screens. */
export function Container({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

export function Section({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'raised' }) {
  const isDesktop = useIsDesktop();
  return (
    <View
      style={[
        { paddingVertical: isDesktop ? spacing.xxl : spacing.xl },
        tone === 'raised' && { backgroundColor: colors.surface },
      ]}
    >
      <Container>{children}</Container>
    </View>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <Text style={styles.eyebrow}>{children}</Text>;
}

export function Heading({ children, size = 'lg' }: { children: ReactNode; size?: 'xl' | 'lg' | 'md' }) {
  const isDesktop = useIsDesktop();
  const fontSize = { xl: isDesktop ? 72 : 44, lg: isDesktop ? 44 : 32, md: 22 }[size];
  return (
    <Text role="heading" style={[styles.heading, { fontSize, lineHeight: fontSize * 1.1 }]}>
      {children}
    </Text>
  );
}

export function Body({ children, muted, style }: { children: ReactNode; muted?: boolean; style?: object }) {
  return <Text style={[styles.body, muted && { color: colors.textMuted }, style]}>{children}</Text>;
}

type ButtonProps = {
  label: string;
  href?: Href;
  url?: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
};

/** Internal routes use `href`, external links use `url` (opened in the browser). */
export function Button({ label, href, url, onPress, variant = 'primary' }: ButtonProps) {
  const fg = variant === 'primary' ? colors.accentText : colors.text;
  const [hovered, setHovered] = useState(false);
  // `Link asChild` only accepts a flat style object (no style functions or arrays).
  const button = (
    <Pressable
      onPress={url ? () => openUrl(url) : onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={StyleSheet.flatten([styles.button, styles[`button_${variant}`], hovered && { opacity: 0.85 }])}
    >
      <Text style={[styles.buttonLabel, { color: fg }]}>{label}</Text>
      <Icon name={url ? 'external' : 'arrowRight'} size={16} color={fg} />
    </Pressable>
  );
  return href ? (
    <Link href={href} asChild>
      {button}
    </Link>
  ) : (
    button
  );
}

export function Card({
  title,
  children,
  href,
  url,
  style,
}: {
  title: string;
  children?: ReactNode;
  href?: Href;
  url?: string;
  style?: ViewStyle;
}) {
  const interactive = Boolean(href || url);
  const [hovered, setHovered] = useState(false);
  const card = (
    <Pressable
      disabled={!interactive}
      onPress={url ? () => openUrl(url) : undefined}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={StyleSheet.flatten([styles.card, hovered && interactive && { borderColor: colors.accent }, style])}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        {interactive && <Icon name={url ? 'external' : 'arrowRight'} size={18} color={colors.accent} />}
      </View>
      {children}
    </Pressable>
  );
  return href ? (
    <Link href={href} asChild>
      {card}
    </Link>
  ) : (
    card
  );
}

/** Lays children out in a responsive grid: 1 column on phones, up to `columns` on desktop. */
export function Grid({ children, columns = 3 }: { children: ReactNode[]; columns?: number }) {
  const isDesktop = useIsDesktop();
  const cols = isDesktop ? columns : 1;
  return (
    <View style={styles.grid}>
      {children.map((child, i) => (
        <View key={i} style={{ width: cols === 1 ? '100%' : `${100 / cols}%`, padding: spacing.sm }}>
          {child}
        </View>
      ))}
    </View>
  );
}

export function Hero({
  image,
  eyebrow,
  title,
  subtitle,
  children,
  tall,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  tall?: boolean;
}) {
  const isDesktop = useIsDesktop();
  const minHeight = tall ? (isDesktop ? 620 : 520) : isDesktop ? 380 : 280;
  return (
    <ImageBackground source={{ uri: image }} style={{ minHeight }} resizeMode="cover">
      <View style={[styles.heroOverlay, { minHeight }]}>
        <Container style={{ gap: spacing.md }}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <Heading size={tall ? 'xl' : 'lg'}>{title}</Heading>
          {subtitle && <Body style={{ fontSize: isDesktop ? 20 : 17, maxWidth: 640 }}>{subtitle}</Body>}
          {children}
        </Container>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: spacing.md,
  },
  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  heading: {
    fontFamily: fonts.display,
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: colors.text,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.sm,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 999,
  },
  button_primary: { backgroundColor: colors.accent },
  button_secondary: { backgroundColor: colors.forest },
  button_ghost: { borderWidth: 1, borderColor: colors.border },
  buttonLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  card: {
    flex: 1,
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  cardTitle: { fontFamily: fonts.displayMedium, fontSize: 20, color: colors.text, textTransform: 'uppercase', flex: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -spacing.sm },
  heroOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: spacing.xl,
    backgroundColor: 'rgba(14, 14, 20, 0.55)',
  },
});
