import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GuestbookService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL ?? '',
      process.env.SUPABASE_KEY ?? '',
    );
  }

  async getMessages() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  async createMessage(name: string, message: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([{ name, message }])
      .select();

    if (error) throw new Error(error.message);
    return data;
  }

  async updateMessage(id: number, message: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .update({ message })
      .eq('id', id)
      .select();

    if (error) throw new Error(error.message);
    return data;
  }

  async deleteMessage(id: number) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return data;
  }
}