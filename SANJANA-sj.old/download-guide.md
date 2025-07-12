# Download Guide for ReWear Project

## 📥 How to Download and Set Up Locally

### Step 1: Create Project Directory
```bash
mkdir rewear-app
cd rewear-app
```

### Step 2: Initialize Project
```bash
npm create vite@latest . -- --template react-ts
```

### Step 3: Install Dependencies
```bash
npm install
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 4: Copy Files
Copy all the source files from this Bolt project:

**Required Files:**
- `src/App.tsx`
- `src/main.tsx`
- `src/index.css`
- `src/components/` (all files)
- `src/context/` (all files)
- `src/pages/` (all files)
- `tailwind.config.js`
- `index.html`

### Step 5: Update Configuration Files

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**index.html:** (update title)
```html
<title>ReWear - Community Clothing Exchange Platform</title>
```

### Step 6: Run the Project
```bash
npm run dev
```

## 🔧 Alternative: Manual File Creation

If you prefer to create files manually, here's the complete file structure you need to recreate:

```
rewear-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ItemCard.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── AdminRoute.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ItemContext.tsx
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ItemDetail.tsx
│   │   ├── AddItem.tsx
│   │   └── AdminPanel.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

Copy the content from each file in the Bolt file explorer to recreate the project locally.