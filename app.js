const STORAGE_KEY = "budget-blocks-board-v1";
const LEGACY_STORAGE_KEY = "budget-atlas-board-v1";
const TARGET_BOARD_CELLS = 80;
const CATEGORY_COLUMNS = 10;

const CURRENCIES = {
  EUR: { code: "EUR", name: "Euro", locale: "nl-NL" },
  USD: { code: "USD", name: "US Dollar", locale: "en-US" },
  GBP: { code: "GBP", name: "British Pound", locale: "en-GB" },
  CHF: { code: "CHF", name: "Swiss Franc", locale: "de-CH" },
  JPY: { code: "JPY", name: "Japanese Yen", locale: "ja-JP" },
};

const palette = ["#f0c85a", "#8fb6a3", "#e58a64", "#91a8d1", "#c7a6d8", "#d8b06a"];

const defaults = createDefaultState();

let state = loadState();
let editorIntent = null;
let draggedItemId = null;
let assigningItemId = null;
let activeTilePopover = null;
let tilePopoverTimer = null;

const els = {
  topbar: document.querySelector(".topbar"),
  topbarActions: document.querySelector(".topbar__actions"),
  appShell: document.querySelector(".app-shell"),
  currency: document.querySelector("#currencySelect"),
  totalBudget: document.querySelector("#totalBudget"),
  budgetSpent: document.querySelector("#budgetSpent"),
  budgetRemaining: document.querySelector("#budgetRemaining"),
  addItem: document.querySelector("#addItem"),
  addCategory: document.querySelector("#addCategory"),
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
  editorMode: document.querySelector("#editorMode"),
  editorTitle: document.querySelector("#editorTitle"),
  nameInput: document.querySelector("#nameInput"),
  amountInput: document.querySelector("#amountInput"),
};

const mobileLayout = window.matchMedia("(max-width: 560px)");

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!stored) return clone(defaults);

  try {
    const parsed = JSON.parse(stored);
    const nextState = {
      currency: normalizeCurrency(parsed.currency),
      items: Array.isArray(parsed.items) ? parsed.items : defaults.items,
      categories: Array.isArray(parsed.categories) ? parsed.categories : defaults.categories,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    return nextState;
  } catch {
    return clone(defaults);
  }
}

function createDefaultState() {
  return {
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
    els.unassignedItems.append(emptyState("No loose items. Move a categorized item here to unassign it."));
    return;
  }

  unassigned.forEach((item) => els.unassignedItems.append(itemElement(item)));
}

function renderCategories() {
  els.categories.innerHTML = "";

  if (!state.categories.length) {
    els.categories.append(emptyState("Add a category to create your first budget area."));
    return;
  }

  state.categories.forEach((category) => {
    const spent = categorySpent(category.id);
    const remaining = Number(category.amount || 0) - spent;
    const fill = category.amount > 0 ? clamp((spent / category.amount) * 100, 0, 100) : 0;
    const node = document.createElement("article");
    node.className = `category${remaining <= 0 ? " is-full" : ""}`;
    node.dataset.categoryId = category.id;
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
          <p class="category__meta">${money(spent)} placed / ${money(Math.max(0, remaining))} remaining</p>
        </div>
        <div class="category__actions">
          <button class="mini-button" type="button" data-action="edit-category" data-id="${category.id}" aria-label="Edit ${escapeHtml(category.name)}">Edit</button>
          <button class="mini-button mini-button--danger" type="button" data-action="delete-category" data-id="${category.id}" aria-label="Delete ${escapeHtml(category.name)}">Del</button>
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
    ...(remaining > 0 ? [{ id: "remaining", name: "Remaining", amount: remaining, kind: "remaining" }] : []),
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
      <button class="mini-button" type="button" data-action="assign-item" data-id="${item.id}" aria-label="Move ${escapeHtml(item.name)}">Move</button>
      <button class="mini-button" type="button" data-action="unassign-item" data-id="${item.id}" aria-label="Remove ${escapeHtml(item.name)} from category">Out</button>
      <button class="mini-button" type="button" data-action="edit-item" data-id="${item.id}" aria-label="Edit ${escapeHtml(item.name)}">Edit</button>
      <button class="mini-button mini-button--danger" type="button" data-action="delete-item" data-id="${item.id}" aria-label="Delete ${escapeHtml(item.name)}">Del</button>
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
  const moveLabel = item.categoryId ? "Move" : "Place";
  node.innerHTML = `
    <div>
      <p class="item__name">${escapeHtml(item.name)}</p>
      <p class="item__amount">${money(Number(item.amount || 0))}</p>
    </div>
    ${
      options.preview
        ? '<p class="preview-label">Drop preview</p>'
        : `<div class="item__actions">
            <button class="mini-button" type="button" data-action="assign-item" data-id="${item.id}" aria-label="${moveLabel} ${escapeHtml(item.name)}">${moveLabel}</button>
            ${item.categoryId ? `<button class="mini-button" type="button" data-action="unassign-item" data-id="${item.id}" aria-label="Remove ${escapeHtml(item.name)} from category">Out</button>` : ""}
            <button class="mini-button" type="button" data-action="edit-item" data-id="${item.id}" aria-label="Edit ${escapeHtml(item.name)}">Edit</button>
            <button class="mini-button mini-button--danger" type="button" data-action="delete-item" data-id="${item.id}" aria-label="Delete ${escapeHtml(item.name)}">Del</button>
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
    <p class="item__name">Remaining</p>
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
  els.assignTitle.textContent = item.categoryId ? `Move ${item.name}` : `Place ${item.name}`;
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
    <strong>Loose items</strong>
    <span>${item.categoryId ? "Remove from category" : "Already loose"}</span>
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
      <span>${isCurrent ? "Current category" : `${money(Math.max(0, remaining))} available${fits ? "" : " - no room"}`}</span>
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
  els.editorMode.textContent = mode === "create" ? "Create" : "Update";
  els.editorTitle.textContent = isItem ? "Item" : "Category";
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
els.openItems.addEventListener("click", () => setItemsDrawer(true));
els.closeItems.addEventListener("click", () => setItemsDrawer(false));
els.drawerBackdrop.addEventListener("click", () => setItemsDrawer(false));
els.currency.addEventListener("change", (event) => {
  state.currency = normalizeCurrency(event.target.value);
  render();
});

els.resetBoard.addEventListener("click", () => {
  const shouldReset = confirm("Start over with the sample board?");
  if (!shouldReset) return;
  state = clone(createDefaultState());
  render();
});

els.form.addEventListener("submit", (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  commitEditor();
  els.dialog.close();
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
