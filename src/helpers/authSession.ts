export const setWithExpiry = (key: string, value: string, ttl: number) => {
  const now = new Date()
  const item = {
    value: JSON.stringify(value),
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item));
}

export const getWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  const now = new Date()
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key)
    return null
  }
  return JSON.parse(item.value);
}

export const removeSession = (key: string) => {
  localStorage.removeItem(key)
  return true;
}