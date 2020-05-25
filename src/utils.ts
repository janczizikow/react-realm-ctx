export function getDisplayName(
  WrappedComponent: React.ComponentType<any>,
): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
