import { Page } from '@/components/Page';
import { pages } from '@/lib/pages';
import { PuckContent } from '@/puck/PuckContent';

// Edited in /admin; the content lives in content/pages/home.json.
export default function Home() {
  return (
    <Page>
      <PuckContent data={pages.home.data} />
    </Page>
  );
}
