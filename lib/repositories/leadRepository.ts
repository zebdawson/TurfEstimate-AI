import { Lead } from "@/lib/domain/types";

const memoryStore = new Map<string, Lead>();

export interface LeadRepository {
  save(lead: Lead): Promise<void>;
  getById(id: string): Promise<Lead | null>;
}

class InMemoryLeadRepository implements LeadRepository {
  async save(lead: Lead): Promise<void> {
    memoryStore.set(lead.id, lead);
  }

  async getById(id: string): Promise<Lead | null> {
    return memoryStore.get(id) ?? null;
  }
}

export const leadRepository: LeadRepository = new InMemoryLeadRepository();
