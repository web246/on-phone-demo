# OnPhone Express Courier

Customer-facing static website for On-Phone Express Courier, built with HTML, CSS and vanilla JavaScript.

## Run locally

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open <http://127.0.0.1:4173/>.

## Pages

- `index.html` — home, services, route quote request, coverage and delivery process
- `services.html` — service options and quote requests
- `coverage.html` — Nairobi delivery areas
- `book.html` — delivery request form
- `updates.html` — customer updates and delivery tips
- `contact.html` — dispatch contact details and enquiry form
- `platform.html` — customer, business, dispatch, rider, tracking and management demo

Shared rendering and public-page interactions are in `app.js`. Demo-system workflows are in `demo.js`, and styles are in `styles.css`. The logo and courier photographs are in `assets/`.

The public booking and enquiry forms prepare WhatsApp messages; the visitor must send them. The separate demo workspace lets you create sample bookings, confirm and assign them, update rider statuses, track references, import sample business orders from CSV, and view dashboard counts. Fictional records are saved only in local storage on that browser. Use **Reset demo data** to restore the sample set. The roles are simulations and do not have authentication or access controls.

No demo action contacts a customer, takes a payment, or records live GPS. Production operation needs a server and database, secure role-based access, and verified payment and messaging integrations.
