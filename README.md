# Budget Blocks

Visual budget planner with draggable money blocks, proportional categories, fit-based budget limits, local saving, and configurable currency.

Budget Blocks turns a budget into a spatial board. Add items with amounts, create category budgets, then drag items into categories. Categories reshape visually as items are placed, and an item can only be dropped when the category has enough remaining budget.

## Features

- Add, rename, update, and delete items
- Add, rename, update, and delete categories
- Drag items into categories or back to the loose item dock
- Proportional item/category rendering based on money values
- Drop preview that shows how a category will reshape before placement
- Fit-based restriction that blocks overspending a category
- Currency selector with EUR as the default
- Local browser persistence with localStorage
- Start-over reset
- No build step or backend

## Run Locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 4173
```

Then visit:

```text
http://localhost:4173
```

## Deploy

This is a static site. It can be published with GitHub Pages by serving the repository root.

Repository: https://github.com/petermein/budget-blocks

## Development Notes

The app is intentionally framework-free. State is stored in localStorage, and the UI is implemented with plain HTML, CSS, and JavaScript.

## License

MIT
