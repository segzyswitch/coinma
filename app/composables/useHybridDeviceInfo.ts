export const useHybridDeviceInfo = async () => {
  const userAgent = navigator.userAgent
  const platform = navigator.platform

  // Just IP-based geolocation
  const ipInfo: any = await $fetch('https://ipapi.co/json/')

  return {
    ip: ipInfo.ip,
    city: ipInfo.city,
    region: ipInfo.region,
    country: ipInfo.country_name,
    latitude: ipInfo.latitude,
    longitude: ipInfo.longitude,
    geo_accuracy: 'ip',
    userAgent,
    platform
  }
}
