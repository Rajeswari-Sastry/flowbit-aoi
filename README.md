# Flowbit AOI Creation – Frontend Engineer Internship Assignment

This project is a single-page React application built for the Flowbit Frontend Engineer Internship assignment. It follows the required tech stack: **React + TypeScript + Vite + Tailwind CSS + Playwright + Leaflet** and implements the core map UI along with bonus improvements.

---

# 🚀 How to Run

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
The app runs at:
```
http://localhost:5173/
```

### 3. Run Playwright tests
```bash
npx playwright test
```

---

# 🧭 Features Implemented

### ✔ Pixel-accurate layout
Topbar, sidebar, and map area structured according to the Figma design.

### ✔ Leaflet map with WMS layer
Loads the required WMS satellite layer from:  
`https://www.wms.nrw.de/geobasis/wms_nw_dop`

### ✔ Interactive map  
Panning, zooming, tile loading, custom controls.

### ✔ Clean component structure  
`AppLayout` (UI layout) + `MapView` (map logic) + `App.tsx` (app assembly).

### ✔ Tailwind styling  
Consistent spacing, fonts, colors, and responsiveness.

### ✔ Working Playwright E2E tests  
Tests include layout visibility and map smoke tests.

### ✔ BONUS FEATURES  
- **WMS Layer Toggle** (Layer Management UI)  
- **Custom Zoom + Reset Controls**  
- **Accessibility improvements through aria-labels**  
- **Sidebar structured for AOI tools**

---

# 🗺️ Map Library Choice

### **Chosen:** Leaflet + React-Leaflet

### Why Leaflet?
- Easiest WMS support  
- Lightweight and fast  
- Mature ecosystem  
- Great React integration  
- Simple to extend with custom controls  

### Alternatives Considered
- **MapLibre** – better for vector tiles, heavier for WMS  
- **OpenLayers** – powerful but too large for this scope  
- **react-map-gl** – great for Mapbox, not ideal for WMS  

---

# 🏗️ Architecture Decisions

### Directory Structure
```
src/
 │
 ├─ components/
 │    ├─ MapView.tsx
 │    └─ layout/
 │         └─ AppLayout.tsx
 │
 ├─ App.tsx
 ├─ main.tsx
 └─ index.css
```

### Component Breakdown

#### **AppLayout**
Topbar, sidebar, and main content layout.

#### **MapView**
Leaflet map, OSM base tile, WMS layer, custom zoom/reset controls.

#### **App.tsx**
Controls state: WMS layer visibility, passes props to layout + map.

---

# ⚡ Performance Considerations

### Scaling plan for 1000+ AOIs  
✔ Marker/polygon clustering  
✔ Vector tiles (MVT)  
✔ Lazy-loading by bounding box  
✔ Debounced map events  
✔ Caching tiles  
✔ Memoized heavy UI components  

---

# 🧪 Testing Strategy (Playwright)

### What’s tested
- Layout loads  
- Sidebar visible  
- Map container visible  
- Smoke test for map  

### With more time
- Drawing AOIs  
- Layer toggles  
- Search  
- Sidebar CRUD  
- Keyboard accessibility  

---

# 🧪 Playwright Test Files

## `playwright.config.ts`
```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',  use: { ...devices['Desktop Safari'] } },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## `tests/app.spec.ts`
```ts
import { test, expect } from '@playwright/test';

test('app loads with layout and map', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('topbar-title')).toBeVisible();
  await expect(page.getByTestId('sidebar')).toBeVisible();
  await expect(page.getByTestId('map-container')).toBeVisible();
});

test('map basic smoke test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const map = page.getByTestId('map-container');
  await expect(map).toBeVisible();
  await page.waitForTimeout(1000);
});
```

---

# 🎨 Bonus Features Implemented

### ⭐ WMS Layer Toggle  
Sidebar button to hide/show WMS layer.

### ⭐ Custom Map Controls  
Zoom In, Zoom Out, Reset View.

### ⭐ Accessibility Enhancements  
ARIA labels added.

---

# 🔧 Tradeoffs

- AOI drawing tools not added due to time  
- Sidebar shows placeholders  
- Base map kept simple for clarity  

---

# 🛠 Production Readiness (Future Work)

- AOI drawing (points/polygons)  
- Search bar (Nominatim)  
- Tile caching  
- Better error handling  
- ESLint + Prettier  
- Docker support  
- CI pipelines  

---

# ⏱ Time Spent

| Task | Time |
|------|------|
| Project setup | 45 min |
| Map + WMS integration | 1 hr |
| Layout + UI | 1.5 hr |
| Bonus features | 40 min |
| Playwright tests | 30 min |
| README + final touches | 45 min |
| **Total** | **~5 hours+** |

---

# 🎥 Demo Video  
https://drive.google.com/file/d/1HZZt10gZWrnsr5uvIXEPVqvj-ehOclK_/view?usp=drive_link

# 📂 GitHub Repository  
https://github.com/Rajeswari-Sastry/flowbit-aoi
