import fs from 'node:fs/promises';

export class LegacyAthleteProfileRepository {
  constructor(filePath) { this.filePath = filePath; }
  async getProfile(id) {
    const raw = JSON.parse(await fs.readFile(this.filePath, 'utf8'));
    const user = Array.isArray(raw.users) ? raw.users.find(item => String(item.id) === String(id)) : null;
    if (!user) return null;
    return { id: String(user.id), name: String(user.name || user.displayName || 'Спортсмен'), createdAt: user.createdAt ?? null };
  }
}
