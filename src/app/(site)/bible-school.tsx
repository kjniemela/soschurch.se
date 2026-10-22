import { Page } from '@/components/Page';
import { Body, Button, Hero, Section } from '@/components/ui';
import { bibleSchoolUrl, images } from '@/lib/content';
import { spacing } from '@/lib/theme';

export default function BibleSchool() {
  return (
    <Page back>
      <Hero image={images.hero} eyebrow="Mission Bible School" title="Become God's adventurer" />
      <Section>
        <Body style={{ maxWidth: 680, marginBottom: spacing.lg }}>
          One full year focused on Jesus, open to all ages: teaching, practical application and mission training. Most teaching is in English.
        </Body>
        <Button label="Apply at sosbibleschools.org" url={bibleSchoolUrl} />
      </Section>
    </Page>
  );
}
