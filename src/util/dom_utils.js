import React, { useEffect, useState } from 'react';

export function getHTMLElement(ref) {
  if (ref) {
    return ref.current;
  }

  return ref;
}

export function loadAfterMount(Component) {
  return (props) => {
    const [windowLoaded, setWindowLoaded] = useState(false);

    useEffect(() => {
      setWindowLoaded(true);
    }, []);

    if (!windowLoaded) {
      return <></>;
    }

    return <Component {...props} />;
  };
}
