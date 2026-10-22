import type { ComponentData, Data, PuckContext } from '@puckeditor/core';
import type { ComponentType } from 'react';

import { config } from '@/puck/config';

// Renders page JSON from content/pages with our block library. This stands in
// for Puck's own <Render> so the site and the native app don't bundle the editor.

const renderContext: PuckContext = {
  renderDropZone: () => null,
  metadata: {},
  isEditing: false,
  dragRef: null,
};

export function PuckContent({ data }: { data: Data }) {
  return <ContentList items={data.content} />;
}

function ContentList({ items }: { items: ComponentData[] | undefined }) {
  return <>{items?.map((item) => <Block key={item.props.id} item={item} />)}</>;
}

function Block({ item }: { item: ComponentData }) {
  const component = config.components[item.type as keyof typeof config.components];
  // Skip blocks the JSON mentions but the code no longer has.
  if (!component) return null;

  const props: Record<string, unknown> = { ...component.defaultProps, ...item.props };
  // Slot fields hold nested blocks; render functions receive them as components.
  for (const [name, field] of Object.entries(component.fields ?? {})) {
    if (field.type === 'slot') {
      const nested = props[name] as ComponentData[] | undefined;
      props[name] = () => <ContentList items={nested} />;
    }
  }

  const Render = component.render as ComponentType<Record<string, unknown>>;
  return <Render {...props} puck={renderContext} editMode={false} />;
}
