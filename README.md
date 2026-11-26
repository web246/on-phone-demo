# OnPhone Express Courier

Customer-facing static website for OnPhone Express Courier, built with HTML, CSS and vanilla JavaScript.

## Run locally

From this directory, start a static server:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open <http://127.0.0.1:4173/>.

## Pages

- `index.html` — services, instant estimate, coverage, delivery process and customer booking links
- `services.html` — service options and starting rates
- `coverage.html` — Nairobi delivery areas
- `book.html` — delivery request form
- `updates.html` — customer updates, delivery tips, offers and event delivery information
- `contact.html` — dispatch contact details and enquiry form

Shared page rendering and interactions are in `app.js`; styling is in `styles.css`. Photos and the OnPhone Express logo asset are in `assets/`.

The booking and enquiry forms prepare WhatsApp messages. Requests are stored only in the visitor's browser in this static demo; a production launch needs an approved server endpoint to persist requests centrally.
