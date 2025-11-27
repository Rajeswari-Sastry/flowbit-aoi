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
- **WMS Layer Toggle** (Layer Management UI in sidebar)  
- **Custom Zoom + Reset Controls** on top of the map  
- **Better Accessibility** through aria-labels  
- **Improved sidebar structure ready for AOI tools**

---

# 🗺️ Map Library Choice

### **Chosen:** **Leaflet + React-Leaflet**

### Why Leaflet?
- Direct and simple WMS layer support  
- Lightweight and fast for a frontend-only assignment  
- Clean integration with React  
- Well-documented and reliable  
- Easy to extend (drawing tools, custom controls, clustering)

### Alternatives & Why Not Used
| Library | Reason |
|--------|--------|
| **MapLibre** | Strong for vector tiles, but heavier and slower to configure for WMS. |
| **OpenLayers** | Very powerful but has a steeper learning curve for quick UI implementation. |
| **react-map-gl / Mapbox** | Best for vector maps; WMS is not first-class. Requires more glue code. |

**Final choice:** Leaflet gave the best balance of simplicity, speed, and WMS support.

---

# 🏗️ Architecture Decisions

### Directory Structure
```
src/
 ├─ components/
 │   ├─ MapView.tsx          → Map rendering + WMS + custom controls
 │   └─ layout/
 │        └─ AppLayout.tsx   → Topbar, sidebar, layout structure
 ├─ App.tsx                  → Wraps layout + map + state
 ├─ main.tsx                 → App entry
 └─ index.css                → Tailwind + Leaflet global styles
```

### Component Breakdown

#### **AppLayout**
- Handles top navigation bar  
- Handles left sidebar (AOI section + Layer Management section)  
- Contains layout grid for map/content  

#### **MapView**
- Loads the Leaflet map
- Shows base OSM layer
- Loads or hides WMS layer depending on sidebar toggle  
- Includes custom zoom in/out/reset controls placed over the map  

#### **App.tsx**
- Central place for application state  
- Manages `showWms` boolean for toggling satellite overlay  
- Passes props into layout and map  

---

# ⚡ Performance Considerations

### Scaling plan for handling 1000+ points/polygons:

✔ **Marker/Polygon Clustering**  
Use supercluster or Leaflet.markercluster to avoid DOM overload.

✔ **Vector Tiles**  
Convert large AOI datasets into Mapbox Vector Tiles (MVT) and load as vector layers.

✔ **Lazy-loading by bounding box**  
Load AOIs for the visible map extent only.

✔ **Debounced map events**  
Prevents excessive re-rendering on pan/zoom.

✔ **Memoized components**  
Use React.memo for heavy or repeated components.

✔ **Tile caching**  
Let the browser cache tiles & use ETag-based refresh.

---

# 🧪 Testing Strategy (Playwright)

### What is covered
1. Application loads successfully  
2. Topbar, sidebar, and map container visible  
3. Map smoke test to ensure Leaflet initialization  

### What would be tested with more time
- AOI tools  
- Toggle features  
- Search bar  
- Accessibility interactions  
- Sidebar state management  

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
  await page.waitForTimeout(1000); // wait for tiles
});
```

---

# 🎨 Bonus Features Implemented

### ⭐ **1. WMS Layer Toggle (Layer Management UI)**  
Allows hiding/showing the WMS satellite layer from the sidebar using a clean toggle button.

### ⭐ **2. Custom Map Controls (Zoom + Reset)**  
Custom-designed "+", "−", and "Reset" buttons floating on the map.  
Fully integrated with Leaflet using `useMap`.

### ⭐ **3. Accessibility Improvements**  
Custom controls include `aria-label` attributes.

These additions improve usability and hit multiple bonus categories.

---

# 🔧 Tradeoffs Made

- AOI tools not added due to time constraints  
- Base map kept simple for clarity  
- Sidebar includes placeholders instead of full AOI CRUD  

---

# 🛠 Production Readiness Improvements (Future Work)

- AOI creation tools (point/polygon drawing)  
- Search bar with Nominatim  
- Offline caching  
- Global error boundaries  
- ESLint + Prettier + Husky hooks  
- Docker deployment  
- Keyboard navigation support  

---

# ⏱ Time Spent

| Task | Time |
|------|------|
| Project setup | 45 min |
| Map + WMS integration | 1 hr |
| Layout + UI | 1.5 hr |
| Bonus features | 40 min |
| Playwright tests | 30 min |
| README + polish | 45 min |
| **Total** | **~5 hours+** |

---

# 🎥 Demo Video



---

# 📂 GitHub Repository



---

# ✔ End of README
