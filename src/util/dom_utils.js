export function getHTMLElement(ref) {
  if (ref) {
    return ref.current;
  }

  return ref;
}
