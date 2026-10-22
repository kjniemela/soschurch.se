import { Page } from '@/components/Page';
import { Body, Button, Hero, Section } from '@/components/ui';
import { images, lifeGroupsUrl } from '@/lib/content';
import { spacing } from '@/lib/theme';

export default function LifeGroups() {
  return (
    <Page back>
      <Hero image={images.crowd} eyebrow="Life Groups" title="We do life as a family" />
      <Section>
        <Body style={{ maxWidth: 680, marginBottom: spacing.lg }}>
          Life Groups are the heart of SOS Church: small groups that meet weekly in homes and neighbourhoods all over Stockholm. Find one near you and send a request to join — the leader will get in touch.
        </Body>
        <Button label="Find a Life Group" url={lifeGroupsUrl} />
      </Section>
    </Page>
  );
}
