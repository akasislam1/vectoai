// ====================================================
// VectoAI - Configuration File
// এখানে তোমার সব keys ও settings দাও
// ====================================================

const CONFIG = {
  // Supabase settings (supabase.com থেকে নাও)
  supabase: {
    url: https://jpbzdnuzermovldhbdnw.supabase.co ,           // e.g. https://abcd.supabase.co
    anonKey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwYnpkbnV6ZXJtb3ZsZGhiZG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODQyNTQsImV4cCI6MjA5Mzc2MDI1NH0.ZO-GmSM2cd1CXDOuQBX98WxvU-5MxFmtXlbVKXqZrhc ,  // Project Settings > API
  },

  // Anthropic API key (console.anthropic.com থেকে নাও)
  anthropic: {
    apiKey: AIzaSyBX89LrRoectJMjug8zES-DMbyzRxVKo-U,
  },

  // তোমার admin email (এই email দিয়ে admin panel access পাবে)
  adminEmail: 'adnanahmad01985906@gmail.com',

  // Pricing
  pricing: {
    monthly: { bdt: 1230, usd: 9.99 },
    yearly:  { bdt: 12930, usd: 105 },
  },

  // তোমার payment numbers
  payment: {
    bkash: 01716289292,   // তোমার bKash personal/merchant নম্বর
    nagad: 01787770593,   // তোমার Nagad নম্বর
    bankInfo: 'Dutch-Bangla Bank | A/C: XXXXXXXXX | Name: Your Name',
  },

  // Free plan limit (per day)
  freeLimit: 3,

  // Site info
  site: {
    name: 'VectoAI',
    tagline: 'AI-powered Image to Vector Converter',
    url: 'https://yourusername.github.io/vectoai',
  }
};
