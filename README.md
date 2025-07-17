# BIBA E-commerce Site

This is a fully responsive e-commerce website built with Next.js, Redux Toolkit, Supabase, and shadcn/ui.

## Features

- Product Listing Page
- Product Detail Page
- Shopping Cart
- User Authentication (Login/Signup) with Supabase
- Redux Toolkit for state management
- Tailwind CSS for styling
- Responsive Design

## Setup

1.  **Clone the repository:**
    \`\`\`bash
    git clone <repository-url>
    cd ecom_nextjs
    \`\`\`

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    \`\`\`

3.  **Set up Supabase:**
    *   Create a new project on [Supabase](https://supabase.com/).
    *   Go to "Project Settings" -> "API" to get your `Project URL` and `Anon Public Key`.
    *   Go to "Project Settings" -> "API" -> "Service Role" to get your `Service Role Key`.

4.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of your project and add the following:
    \`\`\`env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
    \`\`\`
    Replace the placeholders with your actual Supabase credentials.

5.  **Run Database Setup and Seed Scripts:**
    *   Navigate to the `scripts` folder.
    *   Open your Supabase SQL Editor and run the `database-setup.sql` script. This will create the necessary tables and RLS policies.
    *   Then, run the `seed-data.sql` script to populate your database with initial product and user data.

6.  **Run the development server:**
    \`\`\`bash
    npm run dev
    \`\`\`

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

\`\`\`
.
├── app/
│   ├── auth/
│   │   └── login/
│   │       └── page.tsx
│   ├── cart/
│   │   └── page.tsx
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   └── not-found.tsx
├── components/
│   ├── home/
│   │   ├── CategorySection.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── HeroCarousel.tsx
│   │   ├── Newsletter.tsx
│   │   └── PromoBanners.tsx
│   ├── layout/
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   └── ProductDetails.tsx
│   ├── providers/
│   │   └── ReduxProvider.tsx
│   ├── theme-provider.tsx
│   └── ui/ (shadcn/ui components)
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── supabase.ts
│   └── utils.ts
├── public/
│   ├── images/
│   └── *.svg, *.png, *.jpg (placeholder images)
├── scripts/
│   ├── database-setup.sql
│   └── seed-data.sql
├── store/
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── cartSlice.ts
│   │   └── productSlice.ts
│   └── index.ts
├── types/
│   └── index.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
└── tsconfig.json
\`\`\`
\`\`\`
