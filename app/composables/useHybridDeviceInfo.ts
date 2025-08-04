export const useHybridDeviceInfo = async () => {
  const userAgent = navigator.userAgent
  const platform = navigator.platform

  let geo: { latitude: number | null, longitude: number | null, geo_accuracy: string } = { latitude: null, longitude: null, geo_accuracy: 'ip' }
  try {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    )
    geo = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      geo_accuracy: 'gps'
    }
  } catch (_) {
    // ignore if blocked
  }

  const ipInfo:any = await $fetch('https://ipapi.co/json/');

  return {
    ip: ipInfo.ip,
    city: ipInfo.city,
    region: ipInfo.region,
    country: ipInfo.country_name,
    latitude: geo.latitude ?? ipInfo.latitude,
    longitude: geo.longitude ?? ipInfo.longitude,
    geo_accuracy: geo.geo_accuracy,
    userAgent,
    platform
  }
}
