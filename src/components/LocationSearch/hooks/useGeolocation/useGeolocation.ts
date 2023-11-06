export function useGeolocation() {
  const isNavigatorAvailable = navigator && "geolocation" in navigator;
  return { displayGeolocation: isNavigatorAvailable };
}
