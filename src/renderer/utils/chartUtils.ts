import { Timezone, LanguageCode } from '../../charting_library/charting_library.min';

const timezones: { [key: string]: Timezone } = {
  0: 'Europe/London',
  '-120': 'Europe/Tallinn',
  '-60': 'Europe/Zurich',
  180: 'America/Santiago',
  300: 'America/Toronto',
  240: 'America/Caracas',
  360: 'America/Mexico_City',
  540: 'America/Juneau',
  480: 'America/Vancouver',
  420: 'US/Mountain',
  120: 'America/Sao_Paulo',
  '-360': 'Asia/Almaty',
  '-300': 'Asia/Ashkhabad',
  '-180': 'Europe/Moscow',
  '-420': 'Asia/Jakarta',
  '-480': 'Asia/Taipei',
  '-240': 'Asia/Muscat',
  '-345': 'Asia/Kathmandu',
  '-330': 'Asia/Kolkata',
  '-540': 'Asia/Tokyo',
  '-210': 'Asia/Tehran',
  '-660': 'Pacific/Norfolk',
  '-630': 'Australia/Adelaide',
  '-600': 'Australia/Brisbane',
  '-780': 'Pacific/Fakaofo',
  '-825': 'Pacific/Chatham',
  600: 'Pacific/Honolulu',
};

export function getInterval(resolution: string) {
  if (resolution === '1D' || resolution === 'D') return '1d';
  if (+resolution >= 60) return '1h';
  if (+resolution >= 30) return '30m';
  return '1m';
}

export function forSince(interval: string) {
  const secInterval: { [key: string]: number } = {
    1: 60,
    3: 3 * 60,
    5: 5 * 60,
    15: 15 * 60,
    30: 30 * 60,
    60: 60 * 60,
    120: 120 * 60,
    240: 240 * 60,
    '1D': 24 * 60 * 60,
    '1W': 7 * 24 * 60 * 60,
  };
  return secInterval[interval];
}

export function getTimezone(): Timezone {
  const offset = new Date().getTimezoneOffset();

  if (Object.prototype.hasOwnProperty.call(timezones, offset)) {
    return timezones[offset.toString()];
  }
  return 'Etc/UTC';
}

export function getLanguageFromURL(): LanguageCode {
  const result = navigator.language as LanguageCode;
  return result || 'en';
}
