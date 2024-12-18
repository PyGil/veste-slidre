export function getGoogleMapsLink(address: string) {
  const encodedAddress = encodeURIComponent(address);

  const googleMapsLink = `https://www.google.com/maps?q=${encodedAddress}`;

  return googleMapsLink;
}
