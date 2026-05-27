const STORAGE_KEY = "budget-blocks-board-v1";
const LEGACY_STORAGE_KEY = "budget-atlas-board-v1";
const SHARE_HASH_KEY = "board";
const SHARE_VERSION = 1;
const TARGET_BOARD_CELLS = 80;
const CATEGORY_COLUMNS = 10;

const CURRENCIES = {
  EUR: { code: "EUR", name: "Euro", locale: "nl-NL" },
  USD: { code: "USD", name: "US Dollar", locale: "en-US" },
  GBP: { code: "GBP", name: "British Pound", locale: "en-GB" },
  CHF: { code: "CHF", name: "Swiss Franc", locale: "de-CH" },
  JPY: { code: "JPY", name: "Japanese Yen", locale: "ja-JP" },
};

const LANGUAGES = {
  en: { code: "en", name: "English" },
  nl: { code: "nl", name: "Nederlands" },
  de: { code: "de", name: "Deutsch" },
};

const TRANSLATIONS = {
  en: {
    pageTitle: "Budget Blocks",
    metaDescription:
      "Visual budget planner with draggable money blocks, proportional categories, fit-based budget limits, local saving, and configurable currency.",
    appEyebrow: "Visual budget divider",
    appTitle: "Budget Blocks",
    languageLabel: "Language",
    languageAria: "Language",
    currencyLabel: "Currency",
    currencyAria: "Currency",
    shareButton: "Share",
    resetButton: "Start over",
    itemsButton: "Items",
    closeItemsDrawer: "Close items drawer",
    closeDialog: "Close",
    looseItems: "Loose items",
    placeItems: "Place items into categories",
    addItem: "Add item",
    budgetCategories: "Budget categories",
    totalBudget: "Total budget",
    budgetSpent: "Budget spent",
    remaining: "Remaining",
    remainingName: "Remaining",
    addCategory: "Add category",
    create: "Create",
    update: "Update",
    item: "Item",
    category: "Category",
    nameLabel: "Name",
    amountLabel: "Amount",
    cancelButton: "Cancel",
    saveButton: "Save",
    placeItem: "Place item",
    chooseCategory: "Choose category",
    sharedBoard: "Shared board",
    openBudget: "Open this budget?",
    importCopy:
      "This link contains a different Budget Blocks board. Import it to replace the board saved in this browser, or keep your current board.",
    keepBoard: "Keep my board",
    importBoard: "Import shared board",
    linkCopied: "Link copied",
    noLooseItems: "No loose items. Move a categorized item here to unassign it.",
    addFirstCategory: "Add a category to create your first budget area.",
    placedRemaining: "{spent} placed / {remaining} remaining",
    edit: "Edit",
    deleteShort: "Del",
    move: "Move",
    place: "Place",
    out: "Out",
    removeFromCategoryAria: "Remove {name} from category",
    editAria: "Edit {name}",
    deleteAria: "Delete {name}",
    moveAria: "Move {name}",
    placeAria: "Place {name}",
    dropPreview: "Drop preview",
    removeFromCategory: "Remove from category",
    alreadyLoose: "Already loose",
    currentCategory: "Current category",
    available: "{amount} available",
    noRoomSuffix: " - no room",
    noRoom: "No room",
    resetConfirm: "Start over with the sample board?",
  },
  nl: {
    pageTitle: "Budgetblokken",
    metaDescription:
      "Visuele budgetplanner met versleepbare geldblokken, proportionele categorieën, budgetlimieten op basis van beschikbare ruimte, lokale opslag en instelbare valuta.",
    appEyebrow: "Visuele budgetverdeler",
    appTitle: "Budgetblokken",
    languageLabel: "Taal",
    languageAria: "Taal",
    currencyLabel: "Valuta",
    currencyAria: "Valuta",
    shareButton: "Delen",
    resetButton: "Opnieuw",
    itemsButton: "Items",
    closeItemsDrawer: "Itemlade sluiten",
    closeDialog: "Sluiten",
    looseItems: "Losse items",
    placeItems: "Plaats items in categorieën",
    addItem: "Item toevoegen",
    budgetCategories: "Budgetcategorieën",
    totalBudget: "Totaalbudget",
    budgetSpent: "Besteed",
    remaining: "Resterend",
    remainingName: "Resterend",
    addCategory: "Categorie toevoegen",
    create: "Aanmaken",
    update: "Bijwerken",
    item: "Item",
    category: "Categorie",
    nameLabel: "Naam",
    amountLabel: "Bedrag",
    cancelButton: "Annuleren",
    saveButton: "Opslaan",
    placeItem: "Item plaatsen",
    chooseCategory: "Kies categorie",
    sharedBoard: "Gedeeld bord",
    openBudget: "Dit budget openen?",
    importCopy:
      "Deze link bevat een ander Budgetblokken-bord. Importeer het om het bord in deze browser te vervangen, of behoud je huidige bord.",
    keepBoard: "Mijn bord houden",
    importBoard: "Gedeeld bord importeren",
    linkCopied: "Link gekopieerd",
    noLooseItems: "Geen losse items. Verplaats een ingedeeld item hierheen om het los te maken.",
    addFirstCategory: "Voeg een categorie toe om je eerste budgetgebied te maken.",
    placedRemaining: "{spent} geplaatst / {remaining} resterend",
    edit: "Bewerk",
    deleteShort: "Wis",
    move: "Verplaats",
    place: "Plaats",
    out: "Uit",
    removeFromCategoryAria: "{name} uit categorie halen",
    editAria: "{name} bewerken",
    deleteAria: "{name} verwijderen",
    moveAria: "{name} verplaatsen",
    placeAria: "{name} plaatsen",
    dropPreview: "Voorbeeld",
    removeFromCategory: "Uit categorie halen",
    alreadyLoose: "Al los",
    currentCategory: "Huidige categorie",
    available: "{amount} beschikbaar",
    noRoomSuffix: " - geen ruimte",
    noRoom: "Geen ruimte",
    resetConfirm: "Opnieuw beginnen met het voorbeeldbord?",
  },
  de: {
    pageTitle: "Budget Blocks",
    metaDescription:
      "Visueller Budgetplaner mit verschiebbaren Geldblöcken, proportionalen Kategorien, platzbasierten Budgetgrenzen, lokaler Speicherung und konfigurierbarer Währung.",
    appEyebrow: "Visueller Budgetteiler",
    appTitle: "Budget Blocks",
    languageLabel: "Sprache",
    languageAria: "Sprache",
    currencyLabel: "Währung",
    currencyAria: "Währung",
    shareButton: "Teilen",
    resetButton: "Neu starten",
    itemsButton: "Posten",
    closeItemsDrawer: "Postenleiste schließen",
    closeDialog: "Schließen",
    looseItems: "Lose Posten",
    placeItems: "Posten Kategorien zuordnen",
    addItem: "Posten hinzufügen",
    budgetCategories: "Budgetkategorien",
    totalBudget: "Gesamtbudget",
    budgetSpent: "Ausgegeben",
    remaining: "Verbleibend",
    remainingName: "Verbleibend",
    addCategory: "Kategorie hinzufügen",
    create: "Erstellen",
    update: "Aktualisieren",
    item: "Posten",
    category: "Kategorie",
    nameLabel: "Name",
    amountLabel: "Betrag",
    cancelButton: "Abbrechen",
    saveButton: "Speichern",
    placeItem: "Posten platzieren",
    chooseCategory: "Kategorie wählen",
    sharedBoard: "Geteiltes Board",
    openBudget: "Dieses Budget öffnen?",
    importCopy:
      "Dieser Link enthält ein anderes Budget-Blocks-Board. Importiere es, um das in diesem Browser gespeicherte Board zu ersetzen, oder behalte dein aktuelles Board.",
    keepBoard: "Mein Board behalten",
    importBoard: "Geteiltes Board importieren",
    linkCopied: "Link kopiert",
    noLooseItems: "Keine losen Posten. Verschiebe einen kategorisierten Posten hierher, um ihn zu lösen.",
    addFirstCategory: "Füge eine Kategorie hinzu, um deinen ersten Budgetbereich zu erstellen.",
    placedRemaining: "{spent} platziert / {remaining} verbleibend",
    edit: "Bearb.",
    deleteShort: "Lösch.",
    move: "Versch.",
    place: "Platz.",
    out: "Raus",
    removeFromCategoryAria: "{name} aus Kategorie entfernen",
    editAria: "{name} bearbeiten",
    deleteAria: "{name} löschen",
    moveAria: "{name} verschieben",
    placeAria: "{name} platzieren",
    dropPreview: "Vorschau",
    removeFromCategory: "Aus Kategorie entfernen",
    alreadyLoose: "Bereits lose",
    currentCategory: "Aktuelle Kategorie",
    available: "{amount} verfügbar",
    noRoomSuffix: " - kein Platz",
    noRoom: "Kein Platz",
    resetConfirm: "Mit dem Beispielboard neu starten?",
  },
};

const palette = ["#f0c85a", "#8fb6a3", "#e58a64", "#91a8d1", "#c7a6d8", "#d8b06a"];

const defaults = createDefaultState();
const startup = resolveStartupState();

let state = startup.state;
let pendingSharedState = startup.pendingSharedState;
let urlSyncPaused = Boolean(pendingSharedState);
let editorIntent = null;
let draggedItemId = null;
let assigningItemId = null;
let activeTilePopover = null;
let tilePopoverTimer = null;
let shareStatusTimer = null;

const els = {
  topbar: document.querySelector(".topbar"),
  topbarActions: document.querySelector(".topbar__actions"),
  appShell: document.querySelector(".app-shell"),
  language: document.querySelector("#languageSelect"),
  currency: document.querySelector("#currencySelect"),
  totalBudget: document.querySelector("#totalBudget"),
  budgetSpent: document.querySelector("#budgetSpent"),
  budgetRemaining: document.querySelector("#budgetRemaining"),
  addItem: document.querySelector("#addItem"),
  addCategory: document.querySelector("#addCategory"),
  shareBoard: document.querySelector("#shareBoard"),
  shareStatus: document.querySelector("#shareStatus"),
  resetBoard: document.querySelector("#resetBoard"),
  openItems: document.querySelector("#openItems"),
  closeItems: document.querySelector("#closeItems"),
  drawerBackdrop: document.querySelector("#drawerBackdrop"),
  itemDock: document.querySelector("#itemDock"),
  unassignedDropZone: document.querySelector("#unassignedDropZone"),
  unassignedItems: document.querySelector("#unassignedItems"),
  categories: document.querySelector("#categories"),
  dialog: document.querySelector("#editorDialog"),
  form: document.querySelector("#editorForm"),
  assignDialog: document.querySelector("#assignDialog"),
  assignTitle: document.querySelector("#assignTitle"),
  assignList: document.querySelector("#assignList"),
  importDialog: document.querySelector("#importDialog"),
  importSharedBoard: document.querySelector("#importSharedBoard"),
  editorMode: document.querySelector("#editorMode"),
  editorTitle: document.querySelector("#editorTitle"),
  nameInput: document.querySelector("#nameInput"),
  amountInput: document.querySelector("#amountInput"),
  metaDescription: document.querySelector('meta[name="description"]'),
  ogDescription: document.querySelector('meta[property="og:description"]'),
  i18nNodes: document.querySelectorAll("[data-i18n]"),
};

const mobileLayout = window.matchMedia("(max-width: 560px)");

function resolveStartupState() {
  const localState = loadStoredState();
  const sharedState = loadSharedState();

  if (!sharedState) {
    return { state: localState || clone(defaults), pendingSharedState: null };
  }

  if (!localState || canonicalState(localState) === canonicalState(sharedState)) {
    return { state: sharedState, pendingSharedState: null };
  }

  return { state: localState, pendingSharedState: sharedState };
}

function loadStoredState() {
  const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!stored) return null;

  try {
    const nextState = normalizeState(JSON.parse(stored));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    return nextState;
  } catch {
    return null;
  }
}

function createDefaultState() {
  return {
    language: "en",
    currency: "EUR",
    items: [
      { id: makeId(), name: "Plants", amount: 50, categoryId: null, color: "#8fbf72" },
      { id: makeId(), name: "Chair", amount: 100, categoryId: null, color: "#e9b96e" },
      { id: makeId(), name: "Paint", amount: 175, categoryId: null, color: "#91a8d1" },
    ],
    categories: [
      { id: makeId(), name: "Garden", amount: 1000, color: "#6f9f68" },
      { id: makeId(), name: "House", amount: 1000, color: "#d59a2d" },
    ],
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function makeId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  syncUrl();
}

function loadSharedState() {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const payload = params.get(SHARE_HASH_KEY);
  if (!payload) return null;

  try {
    return normalizeState(JSON.parse(decodeSharePayload(payload)));
  } catch {
    return null;
  }
}

function normalizeState(value) {
  const categories = Array.isArray(value?.categories)
    ? value.categories.map(normalizeCategory).filter(Boolean)
    : clone(defaults.categories);
  const categoryIds = new Set(categories.map((category) => category.id));
  const items = Array.isArray(value?.items)
    ? value.items.map((item, index) => normalizeItem(item, index, categoryIds)).filter(Boolean)
    : clone(defaults.items);

  return {
    language: normalizeLanguage(value?.language),
    currency: normalizeCurrency(value?.currency),
    items,
    categories,
  };
}

function normalizeCategory(category, index) {
  if (!category || typeof category !== "object") return null;
  const name = cleanName(category.name, `Category ${index + 1}`);
  return {
    id: cleanId(category.id),
    name,
    amount: cleanAmount(category.amount),
    color: cleanColor(category.color, palette[index % palette.length]),
  };
}

function normalizeItem(item, index, categoryIds) {
  if (!item || typeof item !== "object") return null;
  const categoryId = cleanId(item.categoryId);
  return {
    id: cleanId(item.id),
    name: cleanName(item.name, `Item ${index + 1}`),
    amount: cleanAmount(item.amount),
    categoryId: categoryIds.has(categoryId) ? categoryId : null,
    color: cleanColor(item.color, palette[index % palette.length]),
  };
}

function cleanName(value, fallback) {
  const name = String(value || "").trim();
  return name ? name.slice(0, 80) : fallback;
}

function cleanId(value) {
  const id = String(value || "").trim();
  return id ? id.slice(0, 120) : makeId();
}

function cleanAmount(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount < 0) return 0;
  return amount;
}

function cleanColor(value, fallback) {
  const color = String(value || "").trim();
  return /^#[0-9a-f]{6}$/i.test(color) ? color : fallback;
}

function canonicalState(value) {
  return JSON.stringify(normalizeState(value));
}

function shareUrl() {
  const url = new URL(window.location.href);
  url.hash = `${SHARE_HASH_KEY}=${encodeSharePayload(JSON.stringify(state))}`;
  return url.toString();
}

function syncUrl() {
  if (urlSyncPaused) return;
  window.history.replaceState(null, "", shareUrl());
}

function encodeSharePayload(value) {
  const bytes = new TextEncoder().encode(JSON.stringify({ v: SHARE_VERSION, state: JSON.parse(value) }));
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function decodeSharePayload(value) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  const parsed = JSON.parse(new TextDecoder().decode(bytes));
  if (parsed?.v !== SHARE_VERSION || !parsed.state) throw new Error("Unsupported share payload");
  return JSON.stringify(parsed.state);
}

async function copyShareLink() {
  syncUrl();
  const url = shareUrl();

  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(url);
  } catch {
    copyTextFallback(url);
  }

  showShareStatus(t("linkCopied"));
}

function copyTextFallback(value) {
  const field = document.createElement("textarea");
  field.value = value;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.top = "-100vh";
  document.body.append(field);
  field.select();
  document.execCommand("copy");
  field.remove();
}

function showShareStatus(message) {
  window.clearTimeout(shareStatusTimer);
  els.shareStatus.textContent = message;
  shareStatusTimer = window.setTimeout(() => {
    els.shareStatus.textContent = "";
  }, 2200);
}

function showImportPrompt() {
  if (!pendingSharedState) return;
  els.importDialog.showModal();
}

function importSharedBoard() {
  if (!pendingSharedState) return;
  state = pendingSharedState;
  pendingSharedState = null;
  urlSyncPaused = false;
  render();
}

function keepLocalBoard() {
  pendingSharedState = null;
  urlSyncPaused = false;
  render();
}

function money(value) {
  const config = CURRENCIES[state.currency] || CURRENCIES.EUR;
  const amount = Number(value || 0);
  const digits = currencyDigits(config);
  const hasFraction = digits > 0 && !Number.isInteger(amount);

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
    currencyDisplay: "symbol",
    minimumFractionDigits: hasFraction ? digits : 0,
    maximumFractionDigits: digits,
  }).format(amount);
}

function normalizeCurrency(currency) {
  return CURRENCIES[currency] ? currency : "EUR";
}

function normalizeLanguage(language) {
  return LANGUAGES[language] ? language : "en";
}

function t(key, replacements = {}) {
  const translations = TRANSLATIONS[state.language] || TRANSLATIONS.en;
  let value = translations[key] || TRANSLATIONS.en[key] || key;
  Object.entries(replacements).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, replacement);
  });
  return value;
}

function applyStaticText() {
  document.documentElement.lang = state.language;
  document.title = t("pageTitle");
  els.metaDescription?.setAttribute("content", t("metaDescription"));
  els.ogDescription?.setAttribute("content", t("metaDescription"));
  els.i18nNodes.forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  els.language.setAttribute("aria-label", t("languageAria"));
  els.currency.setAttribute("aria-label", t("currencyAria"));
  els.openItems.textContent = t("itemsButton");
  els.itemDock.setAttribute("aria-label", t("looseItems"));
  els.closeItems.setAttribute("aria-label", t("closeItemsDrawer"));
  document.querySelectorAll('.editor .icon-button[value="cancel"], .assign-dialog .icon-button[value="cancel"]').forEach((button) => {
    button.setAttribute("aria-label", t("closeDialog"));
  });
  document.querySelector(".budget-stage")?.setAttribute("aria-label", t("budgetCategories"));
}

function currencyDigits(config) {
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
  }).resolvedOptions().maximumFractionDigits;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function totals() {
  const total = state.categories.reduce((sum, category) => sum + Number(category.amount || 0), 0);
  const spent = state.items
    .filter((item) => item.categoryId)
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  return { total, spent, remaining: total - spent };
}

function categorySpent(categoryId) {
  return state.items
    .filter((item) => item.categoryId === categoryId)
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
}

function cellValue() {
  const total = Math.max(1, totals().total);
  const raw = total / TARGET_BOARD_CELLS;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const normalized = raw / magnitude;
  const steps = [1, 2, 2.5, 5, 10];
  const step = steps.find((entry) => normalized <= entry) || 10;
  return Math.max(1, step * magnitude);
}

function cellsFor(amount) {
  if (Number(amount || 0) <= 0) return 0;
  return Math.max(1, Math.ceil(Number(amount || 0) / cellValue()));
}

function tileShape(amount) {
  const cells = cellsFor(amount);
  if (cells <= 4) return { cells, columns: Math.max(1, cells), rows: 1 };

  for (let columns = Math.min(CATEGORY_COLUMNS, Math.ceil(Math.sqrt(cells))); columns <= CATEGORY_COLUMNS; columns += 1) {
    if (cells % columns === 0) return { cells, columns, rows: cells / columns };
  }

  const columns = Math.min(CATEGORY_COLUMNS, cells);
  return { cells, columns, rows: Math.ceil(cells / columns) };
}

function categoryHeight(amount) {
  const maxAmount = Math.max(1, ...state.categories.map((category) => Number(category.amount || 0)));
  const ratio = Math.sqrt(Number(amount || 0) / maxAmount);
  return `${clamp(15 + ratio * 17, 15, 32)}rem`;
}

function treemap(entries, x = 0, y = 0, width = 100, height = 100) {
  const total = entries.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  if (!entries.length || total <= 0) return [];
  if (entries.length === 1) return [{ ...entries[0], x, y, width, height }];

  const sorted = [...entries].sort((a, b) => Number(b.amount || 0) - Number(a.amount || 0));
  const half = total / 2;
  let running = 0;
  let splitIndex = 0;

  while (splitIndex < sorted.length - 1 && running + Number(sorted[splitIndex].amount || 0) <= half) {
    running += Number(sorted[splitIndex].amount || 0);
    splitIndex += 1;
  }

  if (splitIndex === 0) {
    running = Number(sorted[0].amount || 0);
    splitIndex = 1;
  }

  const first = sorted.slice(0, splitIndex);
  const second = sorted.slice(splitIndex);
  const firstRatio = running / total;

  if (width >= height) {
    const firstWidth = width * firstRatio;
    return [
      ...treemap(first, x, y, firstWidth, height),
      ...treemap(second, x + firstWidth, y, width - firstWidth, height),
    ];
  }

  const firstHeight = height * firstRatio;
  return [
    ...treemap(first, x, y, width, firstHeight),
    ...treemap(second, x, y + firstHeight, width, height - firstHeight),
  ];
}

function render() {
  state.language = normalizeLanguage(state.language);
  els.language.value = state.language;
  applyStaticText();
  els.currency.value = state.currency;
  const budget = totals();
  els.totalBudget.textContent = money(budget.total);
  els.budgetSpent.textContent = money(budget.spent);
  els.budgetRemaining.textContent = money(budget.remaining);
  els.budgetRemaining.classList.toggle("is-negative", budget.remaining < 0);

  renderItems();
  renderCategories();
  saveState();
}

function renderItems() {
  const unassigned = state.items.filter((item) => !item.categoryId);
  els.unassignedItems.innerHTML = "";

  if (!unassigned.length) {
    els.unassignedItems.append(emptyState(t("noLooseItems")));
    return;
  }

  unassigned.forEach((item) => els.unassignedItems.append(itemElement(item)));
}

function renderCategories() {
  els.categories.innerHTML = "";

  if (!state.categories.length) {
    els.categories.append(emptyState(t("addFirstCategory")));
    return;
  }

  state.categories.forEach((category) => {
    const spent = categorySpent(category.id);
    const remaining = Number(category.amount || 0) - spent;
    const fill = category.amount > 0 ? clamp((spent / category.amount) * 100, 0, 100) : 0;
    const node = document.createElement("article");
    node.className = `category${remaining <= 0 ? " is-full" : ""}`;
    node.dataset.categoryId = category.id;
    node.dataset.blockedLabel = t("noRoom");
    node.style.setProperty("--fill-width", `${fill}%`);
    node.style.setProperty("--category-color", category.color);
    node.style.setProperty("--category-height", categoryHeight(category.amount));
    node.innerHTML = `
      <div class="category__head">
        <div>
          <div class="category__title">
            <h3>${escapeHtml(category.name)}</h3>
            <strong>${money(Number(category.amount || 0))}</strong>
          </div>
          <p class="category__meta">${t("placedRemaining", { spent: money(spent), remaining: money(Math.max(0, remaining)) })}</p>
        </div>
        <div class="category__actions">
          <button class="mini-button" type="button" data-action="edit-category" data-id="${category.id}" aria-label="${escapeHtml(t("editAria", { name: category.name }))}">${t("edit")}</button>
          <button class="mini-button mini-button--danger" type="button" data-action="delete-category" data-id="${category.id}" aria-label="${escapeHtml(t("deleteAria", { name: category.name }))}">${t("deleteShort")}</button>
        </div>
      </div>
      <div class="category__body items-grid"></div>
    `;

    const body = node.querySelector(".category__body");
    renderCategoryBody(body, category);

    attachDropZone(node, category.id);
    els.categories.append(node);
  });
}

function renderCategoryBody(body, category, previewItem = null) {
  hideTilePopover();

  const categoryItems = state.items
    .filter((item) => item.categoryId === category.id)
    .map((item) => ({ ...item, kind: "item" }));
  const shouldPreview = previewItem && previewItem.categoryId !== category.id;
  const placedItems = shouldPreview ? [...categoryItems, { ...previewItem, kind: "preview" }] : categoryItems;
  const spent = placedItems.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const remaining = Math.max(0, Number(category.amount || 0) - spent);
  const layout = treemap([
    ...placedItems,
    ...(remaining > 0 ? [{ id: "remaining", name: t("remainingName"), amount: remaining, kind: "remaining" }] : []),
  ]);

  body.innerHTML = "";
  layout.forEach((entry) => {
    const rect =
      entry.kind === "remaining"
        ? remainingElement(entry.amount)
        : itemElement(entry, { preview: entry.kind === "preview" });
    rect.classList.add("treemap-tile");
    rect.style.left = `${entry.x}%`;
    rect.style.top = `${entry.y}%`;
    rect.style.width = `${entry.width}%`;
    rect.style.height = `${entry.height}%`;
    const isTight = entry.width < 24 || entry.height < 26;
    rect.classList.toggle("is-tight", isTight);
    rect.classList.toggle("is-tiny", entry.width < 16 || entry.height < 14);
    rect.classList.toggle("is-micro", entry.width < 9 || entry.height < 8);
    rect.classList.toggle("is-right-edge", entry.x + entry.width > 72);
    rect.classList.toggle("is-bottom-edge", entry.y + entry.height > 76);
    body.append(rect);
    if (entry.kind === "item" && (isTight || mobileLayout.matches)) attachTilePopover(rect, entry, body);
  });
}

function attachTilePopover(tile, item, body) {
  tile.addEventListener("mouseenter", () => showTilePopover(tile, item, body));
  tile.addEventListener("focusin", () => showTilePopover(tile, item, body));
  tile.addEventListener("click", (event) => {
    if (event.target.closest("button")) return;
    showTilePopover(tile, item, body);
  });
  tile.addEventListener("mouseleave", scheduleTilePopoverHide);
  tile.addEventListener("focusout", (event) => {
    if (!activeTilePopover?.contains(event.relatedTarget)) scheduleTilePopoverHide();
  });
}

function showTilePopover(tile, item, body) {
  window.clearTimeout(tilePopoverTimer);
  hideTilePopover();

  const popover = document.createElement("article");
  popover.className = "item-card tile-popover";
  popover.dataset.itemId = item.id;
  popover.style.setProperty("--item-color", item.color);
  popover.innerHTML = `
    <div>
      <p class="item__name">${escapeHtml(item.name)}</p>
      <p class="item__amount">${money(Number(item.amount || 0))}</p>
    </div>
    <div class="item__actions">
      <button class="mini-button" type="button" data-action="assign-item" data-id="${item.id}" aria-label="${escapeHtml(t("moveAria", { name: item.name }))}">${t("move")}</button>
      <button class="mini-button" type="button" data-action="unassign-item" data-id="${item.id}" aria-label="${escapeHtml(t("removeFromCategoryAria", { name: item.name }))}">${t("out")}</button>
      <button class="mini-button" type="button" data-action="edit-item" data-id="${item.id}" aria-label="${escapeHtml(t("editAria", { name: item.name }))}">${t("edit")}</button>
      <button class="mini-button mini-button--danger" type="button" data-action="delete-item" data-id="${item.id}" aria-label="${escapeHtml(t("deleteAria", { name: item.name }))}">${t("deleteShort")}</button>
    </div>
  `;

  popover.addEventListener("mouseenter", () => window.clearTimeout(tilePopoverTimer));
  popover.addEventListener("mouseleave", scheduleTilePopoverHide);
  popover.addEventListener("focusin", () => window.clearTimeout(tilePopoverTimer));
  popover.addEventListener("focusout", scheduleTilePopoverHide);

  body.append(popover);
  activeTilePopover = popover;

  const width = Math.min(256, body.clientWidth - 24);
  const height = 136;
  const left = clamp(tile.offsetLeft, 12, Math.max(12, body.clientWidth - width - 12));
  const top = clamp(tile.offsetTop, 12, Math.max(12, body.clientHeight - height - 12));

  popover.style.width = `${width}px`;
  popover.style.height = `${height}px`;
  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
}

function scheduleTilePopoverHide() {
  window.clearTimeout(tilePopoverTimer);
  tilePopoverTimer = window.setTimeout(hideTilePopover, 120);
}

function hideTilePopover() {
  window.clearTimeout(tilePopoverTimer);
  activeTilePopover?.remove();
  activeTilePopover = null;
}

function itemElement(item, options = {}) {
  const shape = tileShape(item.amount);
  const node = document.createElement("article");
  node.className = `item-card${options.preview ? " is-preview" : ""}`;
  node.draggable = !options.preview;
  node.dataset.itemId = item.id;
  node.dataset.cells = shape.cells;
  node.style.setProperty("--tile-cols", shape.columns);
  node.style.setProperty("--tile-rows", shape.rows);
  node.style.setProperty("--tile-cells", shape.cells);
  node.style.setProperty("--item-color", item.color);
  const moveKey = item.categoryId ? "move" : "place";
  const moveLabel = t(moveKey);
  const moveAria = t(item.categoryId ? "moveAria" : "placeAria", { name: item.name });
  node.innerHTML = `
    <div>
      <p class="item__name">${escapeHtml(item.name)}</p>
      <p class="item__amount">${money(Number(item.amount || 0))}</p>
    </div>
    ${
      options.preview
        ? `<p class="preview-label">${t("dropPreview")}</p>`
        : `<div class="item__actions">
            <button class="mini-button" type="button" data-action="assign-item" data-id="${item.id}" aria-label="${escapeHtml(moveAria)}">${moveLabel}</button>
            ${item.categoryId ? `<button class="mini-button" type="button" data-action="unassign-item" data-id="${item.id}" aria-label="${escapeHtml(t("removeFromCategoryAria", { name: item.name }))}">${t("out")}</button>` : ""}
            <button class="mini-button" type="button" data-action="edit-item" data-id="${item.id}" aria-label="${escapeHtml(t("editAria", { name: item.name }))}">${t("edit")}</button>
            <button class="mini-button mini-button--danger" type="button" data-action="delete-item" data-id="${item.id}" aria-label="${escapeHtml(t("deleteAria", { name: item.name }))}">${t("deleteShort")}</button>
          </div>`
    }
  `;

  if (options.preview) return node;

  node.addEventListener("dragstart", (event) => {
    draggedItemId = item.id;
    node.classList.add("is-dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", item.id);
  });

  node.addEventListener("dragend", () => {
    draggedItemId = null;
    node.classList.remove("is-dragging");
    document.querySelectorAll(".is-over, .is-blocked").forEach((el) => el.classList.remove("is-over", "is-blocked"));
    clearAllPreviews();
  });

  return node;
}

function remainingElement(amount) {
  const node = document.createElement("div");
  node.className = "remaining-tile";
  node.innerHTML = `
    <p class="item__name">${t("remainingName")}</p>
    <p class="item__amount">${money(Number(amount || 0))}</p>
  `;
  return node;
}

function emptyState(text) {
  const node = document.createElement("div");
  node.className = "empty-state";
  node.textContent = text;
  return node;
}

function attachDropZone(node, categoryId) {
  node.addEventListener("dragover", (event) => {
    const id = event.dataTransfer.getData("text/plain") || draggedItemId;
    const fits = canMoveItem(id, categoryId);
    if (fits) event.preventDefault();

    node.classList.toggle("is-over", fits);
    node.classList.toggle("is-blocked", !fits && Boolean(id));
    if (fits && categoryId) previewMove(node, categoryId, id);
    if (event.dataTransfer) event.dataTransfer.dropEffect = fits ? "move" : "none";
  });

  node.addEventListener("dragleave", (event) => {
    if (!node.contains(event.relatedTarget)) {
      node.classList.remove("is-over", "is-blocked");
      clearPreview(node);
    }
  });

  node.addEventListener("drop", (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain") || draggedItemId;
    moveItem(id, categoryId);
    node.classList.remove("is-over", "is-blocked");
    clearPreview(node);
  });
}

function previewMove(node, categoryId, itemId) {
  if (node.dataset.previewItemId === itemId) return;

  const category = state.categories.find((entry) => entry.id === categoryId);
  const item = state.items.find((entry) => entry.id === itemId);
  const body = node.querySelector(".category__body");
  if (!category || !item || !body) return;

  node.dataset.previewItemId = itemId;
  renderCategoryBody(body, category, item);
}

function clearPreview(node) {
  if (!node.dataset.previewItemId) return;

  const category = state.categories.find((entry) => entry.id === node.dataset.categoryId);
  const body = node.querySelector(".category__body");
  delete node.dataset.previewItemId;
  if (category && body) renderCategoryBody(body, category);
}

function clearAllPreviews() {
  document.querySelectorAll(".category[data-preview-item-id]").forEach(clearPreview);
}

function canMoveItem(itemId, categoryId) {
  if (!categoryId) return true;

  const item = state.items.find((entry) => entry.id === itemId);
  const category = state.categories.find((entry) => entry.id === categoryId);
  if (!item || !category) return false;
  if (item.categoryId === categoryId) return true;

  return categorySpent(categoryId) + Number(item.amount || 0) <= Number(category.amount || 0);
}

function moveItem(itemId, categoryId) {
  if (!canMoveItem(itemId, categoryId)) return;

  const item = state.items.find((entry) => entry.id === itemId);
  if (!item) return;
  item.categoryId = categoryId;
  render();
}

function openAssignDialog(itemId) {
  const item = state.items.find((entry) => entry.id === itemId);
  if (!item) return;

  assigningItemId = itemId;
  els.assignTitle.textContent = t(item.categoryId ? "moveAria" : "placeAria", { name: item.name });
  renderAssignList(item);
  setItemsDrawer(false);
  els.assignDialog.showModal();
}

function renderAssignList(item) {
  els.assignList.innerHTML = "";

  const unassignedButton = document.createElement("button");
  unassignedButton.className = "assign-option";
  unassignedButton.type = "button";
  unassignedButton.disabled = !item.categoryId;
  unassignedButton.dataset.action = "assign-choice";
  unassignedButton.dataset.categoryId = "";
  unassignedButton.innerHTML = `
    <strong>${t("looseItems")}</strong>
    <span>${item.categoryId ? t("removeFromCategory") : t("alreadyLoose")}</span>
  `;
  els.assignList.append(unassignedButton);

  state.categories.forEach((category) => {
    const spent = categorySpent(category.id);
    const remaining = Number(category.amount || 0) - spent;
    const fits = canMoveItem(item.id, category.id);
    const isCurrent = item.categoryId === category.id;
    const button = document.createElement("button");
    button.className = "assign-option";
    button.type = "button";
    button.disabled = isCurrent || !fits;
    button.dataset.action = "assign-choice";
    button.dataset.categoryId = category.id;
    button.innerHTML = `
      <strong>${escapeHtml(category.name)}</strong>
      <span>${
        isCurrent
          ? t("currentCategory")
          : t("available", { amount: money(Math.max(0, remaining)) }) + (fits ? "" : t("noRoomSuffix"))
      }</span>
    `;
    els.assignList.append(button);
  });
}

function chooseAssignment(categoryId) {
  if (!assigningItemId) return;
  moveItem(assigningItemId, categoryId || null);
  assigningItemId = null;
  els.assignDialog.close();
  setItemsDrawer(false);
}

function openEditor(type, mode, id = null) {
  const isItem = type === "item";
  const record = id
    ? isItem
      ? state.items.find((item) => item.id === id)
      : state.categories.find((category) => category.id === id)
    : null;

  editorIntent = { type, mode, id };
  els.editorMode.textContent = t(mode === "create" ? "create" : "update");
  els.editorTitle.textContent = t(isItem ? "item" : "category");
  els.nameInput.value = record?.name || "";
  els.amountInput.value = record?.amount || "";
  els.dialog.showModal();
  els.nameInput.focus();
}

function commitEditor() {
  const name = els.nameInput.value.trim();
  const amount = Number(els.amountInput.value);
  if (!editorIntent || !name || Number.isNaN(amount) || amount < 0) return;

  if (editorIntent.type === "item") {
    if (editorIntent.mode === "create") {
      state.items.push({
        id: makeId(),
        name,
        amount,
        categoryId: null,
        color: palette[state.items.length % palette.length],
      });
    } else {
      const item = state.items.find((entry) => entry.id === editorIntent.id);
      if (item) Object.assign(item, { name, amount });
    }
  } else if (editorIntent.mode === "create") {
    state.categories.push({
      id: makeId(),
      name,
      amount,
      color: palette[state.categories.length % palette.length],
    });
  } else {
    const category = state.categories.find((entry) => entry.id === editorIntent.id);
    if (category) Object.assign(category, { name, amount });
  }

  editorIntent = null;
  render();
}

function deleteItem(id) {
  state.items = state.items.filter((item) => item.id !== id);
  render();
}

function deleteCategory(id) {
  state.categories = state.categories.filter((category) => category.id !== id);
  state.items = state.items.map((item) => (item.categoryId === id ? { ...item, categoryId: null } : item));
  render();
}

function setItemsDrawer(open) {
  els.itemDock.classList.toggle("is-open", open);
  els.drawerBackdrop.hidden = !open;
  els.openItems.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("drawer-open", open);
}

function placeSettingsControls() {
  if (mobileLayout.matches) {
    els.appShell.after(els.topbarActions);
  } else {
    els.topbar.append(els.topbarActions);
  }
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

attachDropZone(els.unassignedDropZone, null);

els.addItem.addEventListener("click", () => openEditor("item", "create"));
els.addCategory.addEventListener("click", () => openEditor("category", "create"));
els.shareBoard.addEventListener("click", copyShareLink);
els.openItems.addEventListener("click", () => setItemsDrawer(true));
els.closeItems.addEventListener("click", () => setItemsDrawer(false));
els.drawerBackdrop.addEventListener("click", () => setItemsDrawer(false));
els.language.addEventListener("change", (event) => {
  state.language = normalizeLanguage(event.target.value);
  render();
});
els.currency.addEventListener("change", (event) => {
  state.currency = normalizeCurrency(event.target.value);
  render();
});

els.resetBoard.addEventListener("click", () => {
  const language = state.language;
  const shouldReset = confirm(t("resetConfirm"));
  if (!shouldReset) return;
  state = clone(createDefaultState());
  state.language = language;
  render();
});

els.form.addEventListener("submit", (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  commitEditor();
  els.dialog.close();
});

els.importDialog.addEventListener("submit", (event) => {
  if (event.submitter?.value === "import") {
    importSharedBoard();
  } else {
    keepLocalBoard();
  }
});

els.importDialog.addEventListener("close", () => {
  if (pendingSharedState) keepLocalBoard();
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const { action, id } = button.dataset;
  if (action === "edit-item") openEditor("item", "edit", id);
  if (action === "delete-item") deleteItem(id);
  if (action === "assign-item") openAssignDialog(id);
  if (action === "unassign-item") moveItem(id, null);
  if (action === "assign-choice") chooseAssignment(button.dataset.categoryId);
  if (action === "edit-category") openEditor("category", "edit", id);
  if (action === "delete-category") deleteCategory(id);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setItemsDrawer(false);
});

mobileLayout.addEventListener("change", placeSettingsControls);
placeSettingsControls();
render();
showImportPrompt();
