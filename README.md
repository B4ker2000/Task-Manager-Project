# 🚀 Full-Stack Kanban Task Management System

A highly resilient, role-gated Kanban project workspace tracking application engineered with an elite focus on full-stack architecture, relational database integrity, user experience design patterns, and WCAG accessibility compliance standards.

---

## 🛠️ Technology Stack Architecture

- **Backend Engine:** ASP.NET Core Web API (.NET Core 8)
- **Database Vault:** SQLite with Entity Framework Core (Fluent API modeling)
- **Security Protocols:** Role-Based Access Control (RBAC), Bearer Token JWT Claims Authentication
- **Frontend Matrix:** Angular (TypeScript, RxJS reactive architecture)
- **Responsive Layout:** Modular Semantic HTML5, Native Flexbox Split-Grids, & Dynamic CSS Variables

---

## 🎨 Enterprise Product Features & UX Engineering

### 1. Unified Roster Workspace Operations & Permission Gates 🔐
- Features distinct **Project Manager (Owner)** and **Regular Member** security states.
- Permission states are chained contextually during the lifecycle initialization frame, preventing asynchronous race conditions or UI flickering bugs.
- Administrative users can securely invite teammates via registered emails or execute high-contrast, graceful member removal pathways.
- Regular members are equipped with a clear, warning-coded "Abandon Space" resignation circuit to leave a project space safely.

### 2. Contextual 3-Column Kanban Workflow Loop 🎴
- Optimizes workspace horizontal real estate by grouping active task milestones into **Pending**, **In Progress & Review**, and **Completed** structural column cards.
- Deploys an exclusive **"Member Emergency Brake"** permitting assigned users to pull back an accidental review submission before an Owner/PM executes final approval checks.

### 3. Accessible Workspace Tag Classification Highway 🏷️
- Full-stack color-coded tag extension engine built entirely on a standalone One-to-Many relational database structure.
- Automatically handles background table maintenance: deleting a custom tag uses a strict `SetNull` Fluent API rule, clearing the label from card viewports without destroying or disrupting underlying task rows.
- Side-by-side responsive 3/5 (Roster) and 2/5 (Tag Library) container splits provide fluid layout reflows and display real-time task counter metrics.

### 4. High-Contrast Focus Apparitions & Device Adaptability 📱
- Disables unrefined native browser focus outlines, replacing them with ambient, progress-matched blue and green halo glow rings.
- Implements smooth CSS transitions (0.2s cubic-bezier ease fades) for button interactions, protecting low-vision and motion-sensitive users.
- Built-in cross-resolution CSS Media Queries dynamically transform grid canvases into fluid vertical stacked mobile feed streams across any display resolution.

---

## ⚔️ Security, Architecture, & Lessons Learned

> **The Castle Wall Analogy:** *This system is configured using an outer-perimeter security strategy. The controller layers are entirely blanketed behind global `[Authorize]` shields. Only the primary authentication trading gates—Login and Registration—are explicitly opened using `[AllowAnonymous]` directives, securing all internal system endpoints.*

### Key Technical Triumphs:
- **JSON Serialization Cycle Fix:** Resolved an infinite loop serialization panic during nested Category-to-Task object relational fetches by embedding explicit `ReferenceHandler.IgnoreCycles` configurations right inside the web builder middleware engine.
- **Strict Data Integrity:** Enforced precise data handling criteria using strict type-casting boundaries on integer payloads to eliminate JSON string-vs-number strict evaluation mismatch vulnerabilities in template loops.

---

## 🏎️ Local Installation & Deployment Strategy

### Prerequisites
- .NET 8.0 SDK
- Node.js & Angular CLI (`npm install -g @angular/cli`)

### 1. Boot up the Backend Core
```bash
cd Backend
dotnet restore
dotnet ef database update
dotnet run
```

### 2. Boot up the Frontend Matrix
```bash
cd Frontend
npm install
ng serve
```
Open a browser page and navigate straight to `http://localhost:4200` to interact with your secure sandbox board workspace environment!

---

## Supported languages (Proof reading would be appericiated!)
- English (British)
- English (US)
- Russian
- Japanese
- Persian

## Planned locales
- Azeri (including modern, soviet era, Iranian & Old Azery)
- Turkish (including ottomon turkish as an easteregg)
- Other turkic languages like Uzbek, Turkmen, ect. 
- Chinese (Both simplified and traditional)
- German 
- Spanish
- Portuguese
- French
- Arabic
- Armenian
- Georgian
- Mongolian
- Korean 
- Polish
- Romanian
- Hungarian
- Belarusian
- Ukrainian
- Baltic Languages 

---

## To-do list:
To-do list:
- ✅ Add task completion progress on project cards!
- ❌ Disable dragging in mobile view and configure pulse animations when holding a card
- ❌ Disable task card dragging in general for unauthorized members!
- ✅ Add project invitation logic
- ✅ Check if invitations correctly expire or not!
- ❌ Owner Invitation canceling, "sent invitations list" & "expired" badges/pills for expired invitations and change the accept/decline buttons to a single "clear notification" button!
- ❌ Do some more mobile view adjustments
- ✅ Add custom warning/error popups!
- ✅ Add custom drop down menus for task card accessibility/mobile organizing button
- ❌ Total drop-down menu replacement with the new custom one (perhaps?)
- ✅ Add full i18n support
- ❌ Add traditional Japanese Top-to-Bottom, Right-to-Left locale
- ✅ Add full Screen Reader support (Feedback would be appreciated!)
- ✅ Add colorblind and font changing options 
- ✅ Add Theme support + themes
- ❌ Do a general refactor run to remove dead html classes!
- ✅ Add Fronend models
- ❌ Project filter options in the dashboard!
- ❌ Add "edit project info" menu
- ❌ Many to many task categories and assignees (perhaps?)
- ✅ Do a general backend SOC refactor
- ❌ Change favicon.ico in to a custom one!
- ❌ Add more Spinner/Loading messages!
- ❌ Add project deadlines?
- ✅ Drag-n-drop task card organizing
- ✅ Drag-n-drop project card organizing (needs some more polish as well as accessibility/mobile buttons!)