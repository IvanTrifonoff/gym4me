export function notificationDto(item) { return { id: String(item?.id || ''), title: item?.title === 'openGym' ? 'openGym' : String(item?.title || 'Уведомление'), body: String(item?.body || ''), createdAt: item?.created_at || item?.createdAt || null, read: Boolean(item?.read || item?.read_at || item?.readAt), url: typeof item?.payload?.url === 'string' ? item.payload.url : '/notifications' }; }
export function normalizeNotifications(items) { return (items || []).map(notificationDto).filter(item => item.id); }
export function unreadCount(items) { return normalizeNotifications(items).filter(item => !item.read).length; }
export function notificationUrl(item) { const value = notificationDto(item).url; return value.startsWith('/') ? value : '/notifications'; }
