import React, { Suspense } from 'react';

const LazySuspenseComponent = (Component,extraProps) => props => {
  return (
    <Suspense fallback={null}>
      <Component {...extraProps} {...props}/>
    </Suspense>
  )
}
export default LazySuspenseComponent
