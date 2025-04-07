export const pageCacheKey = (id: string) => `pageCache#${id}`;
export const usersKey = (userId: string) => `users#${userId}`;
export const sessionsKey = (sessionId: string) => `sessions#${sessionId}`;
export const usernamesUniqueKey = () => `usernames:unique`;
export const userLikesKey = (userId: string) => `user:likes#${userId}`;
export const usernamesKey = () => `usernames`;

// Items
export const itemsKey = (itemId: string) => `items#${itemId}`;
export const itemsByViewsKey = () => `items:view`;
export const itemsEndingAtKey = () => `items:endingAt`;
export const itemsViewsKey = (itemId: string) => `items:views#${itemId}`;
export const bidHistoryKey = (itemId: string) => `history#${itemId}`;
export const itemsByPriceKey = () => `items:price`;
export const itemsIndexKey = () => `idx:items`;
