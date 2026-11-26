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
- `platform.html` — fictional interactive customer, business, rider and administrator demo

Shared rendering and interactions are in `app.js`; styles are in `styles.css`. The logo and courier photographs are in `assets/`.

The booking and enquiry forms prepare WhatsApp messages and temporary references. They do not send messages or save requests centrally. The platform demo and guided tour use fictional sample data. A production launch needs an approved server, database, role-based access, and verified payment and messaging integrations.
