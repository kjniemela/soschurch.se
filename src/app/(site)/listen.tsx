import { Page } from '@/components/Page';
import { Body, Card, Grid, Hero, Section } from '@/components/ui';
import { church, images } from '@/lib/content';

export default function Listen() {
  return (
    <Page>
      <Hero image={images.worship} eyebrow="Podcast & live" title="Listen & watch" subtitle="Catch up on Sunday messages wherever you are." />

      <Section>
        <Grid columns={3}>
          <Card title="Live on YouTube" url={church.youtube}>
            <Body muted>Watch the Sunday Celebration live, or catch past streams.</Body>
          </Card>
          <Card title="Spotify" url={church.spotify}>
            <Body muted>Follow the SOS Church Stockholm podcast.</Body>
          </Card>
          <Card title="Apple Podcasts" url={church.applePodcasts}>
            <Body muted>Subscribe and get new messages automatically.</Body>
          </Card>
        </Grid>
        {/* Next: pull the latest episodes from the podcast RSS feed and play them in-app. */}
      </Section>
    </Page>
  );
}
