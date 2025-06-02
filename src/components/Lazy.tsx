import React, { ComponentType, Suspense } from 'react';
import { Skeleton } from 'antd';

export const lazy = (
  component: () => Promise<{ default: ComponentType<any> }>,
) => {
  const LazyComponent = React.lazy(component);

  return (
    <Suspense
      fallback={
        <Skeleton
          active
          round
          paragraph={{ rows: 8 }}
          style={{ padding: 20 }}
        />
      }
    >
      <LazyComponent />
    </Suspense>
  );
};
