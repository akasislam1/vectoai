# VectoAI — Setup Guide (বাংলা)

## Step 1: Supabase তৈরি করো

1. **supabase.com** এ যাও → "Start your project" → GitHub দিয়ে login করো
2. "New project" → নাম দাও: `vectoai` → password মনে রেখো → Create
3. Project তৈরি হলে **Settings → API** তে যাও
4. এই দুটো copy করো:
   - `Project URL` → config.js এ `supabase.url` তে দাও
   - `anon public key` → config.js এ `supabase.anonKey` তে দাও

### Supabase Database Tables তৈরি করো:
**SQL Editor** তে গিয়ে নিচের SQL run করো:

```sql
-- Profiles table
create table profiles (
  id uuid references auth.users primary key,
  email text,
  name text,
  plan text default 'free',
  plan_expires_at timestamptz,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Users can read own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Admin can do anything" on profiles for all using (true);

-- Payment proofs table
create table payment_proofs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  user_email text,
  method text,
  sender_number text,
  transaction_id text,
  amount numeric,
  plan text,
  screenshot_url text,
  note text,
  status text default 'pending',
  admin_note text,
  created_at timestamptz default now()
);
alter table payment_proofs enable row level security;
create policy "Users insert own proofs" on payment_proofs for insert with check (auth.uid() = user_id);
create policy "Admin full access" on payment_proofs for all using (true);

-- Conversions table
create table conversions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  style text,
  svg_data text,
  created_at timestamptz default now()
);
alter table conversions enable row level security;
create policy "Users manage own conversions" on conversions for all using (auth.uid() = user_id);
```

### Storage bucket তৈরি করো:
**Storage** তে গিয়ে:
1. "New bucket" → নাম: `screenshots` → Public: ON → Create
2. Policy: Allow all uploads

---

## Step 2: Anthropic API Key নাও

1. **console.anthropic.com** এ login করো
2. API Keys → Create Key → copy করো
3. config.js এ `anthropic.apiKey` তে দাও

---

## Step 3: config.js আপডেট করো

```javascript
const CONFIG = {
  supabase: {
    url: 'https://YOURPROJECT.supabase.co',      // ← তোমার URL
    anonKey: 'eyJhbGci...',                        // ← তোমার key
  },
  anthropic: {
    apiKey: 'sk-ant-...',                          // ← তোমার API key
  },
  adminEmail: 'tomar-email@gmail.com',             // ← তোমার email
  payment: {
    bkash: '01712345678',                          // ← তোমার bKash নম্বর
    nagad: '01712345678',                          // ← তোমার Nagad নম্বর
    bankInfo: 'Dutch Bangla | A/C: 123 | Name: X', // ← তোমার bank info
  },
  freeLimit: 3,
};
```

---

## Step 4: GitHub এ upload করো (Free hosting)

1. **github.com** এ account করো / login করো
2. "New repository" → নাম: `vectoai` → Public → Create
3. সব files (index.html, auth.html, app.html, payment.html, admin.html, config.js) upload করো
4. **Settings → Pages → Source: main branch → Save**
5. কিছুক্ষণ পর তোমার site live হবে: `https://yourusername.github.io/vectoai`

---

## Step 5: Admin account তৈরি করো

1. তোমার site এ গিয়ে Sign Up করো তোমার admin email দিয়ে
2. এরপর admin panel: `https://yourusername.github.io/vectoai/admin.html`
3. সেই email + password দিয়ে login করো

---

## কীভাবে payment approve করবে

1. `/admin.html` এ login করো
2. "Payments" tab এ pending payments দেখবে
3. "View" বাটন দিয়ে screenshot দেখো, TrxID verify করো
4. ✅ Approve করো → user automatically Pro হয়ে যাবে!

---

## Files overview

| File | কী করে |
|------|--------|
| `index.html` | Landing page — visitors দেখবে |
| `auth.html` | Login / Sign up |
| `app.html` | Main tool — vector converter |
| `payment.html` | Payment proof submit |
| `admin.html` | তোমার admin panel |
| `config.js` | সব settings এখানে |

---

## সমস্যা হলে

- Supabase error → SQL ঠিকমতো run হয়েছে কিনা দেখো
- API error → Anthropic key ঠিক আছে কিনা দেখো
- Login হচ্ছে না → Supabase URL/key ঠিক আছে কিনা দেখো
