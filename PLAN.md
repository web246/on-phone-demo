# On-Phone Express website update plan

## What I found

- The project is a small static site: plain HTML, CSS and vanilla JavaScript. It has no package manifest, server application, database, authentication or deployment configuration.
- `app.js` renders the home, services, coverage, booking, updates and contact pages. Existing booking and enquiry forms save a copy in the visitor's browser and prepare a WhatsApp message; they do not send or persist bookings centrally.
- The project includes the On-Phone Express logo and three locally stored courier photos. The existing navy, ocean-blue and maroon identity will be retained.
- The pasted master prompt is truncated during its backend architecture section. I will use all complete requirements supplied and flag the missing portion rather than assume what it said.
- Some existing content states exact rates, delivery times, coverage, a street address and business capabilities. These need owner verification before being treated as operating facts. I will make estimate limitations explicit and avoid representing demo records as live business data.

## Plan

1. Preserve the current static architecture and design; avoid adding a framework or backend without credentials and an agreed production setup.
2. Improve the public acquisition path: make service choices, quote limitations, booking, business-account enquiries and contact options clear and usable on mobile.
3. Extend the booking request with recipient/contact, parcel, preferred collection and special-instruction details, while keeping dispatch confirmation explicit. Keep its WhatsApp hand-off and local-only reference behavior honest.
4. Add an interactive, accessible platform tour covering owner, individual-customer and business-customer flows. Include progress, back/next/skip/restart controls and clearly labelled fictional demonstration content.
5. Add a clearly labelled demo experience that illustrates the request → dispatch → rider update → customer tracking → management review flow without implying it uses real records, GPS, payments or messaging.
6. Improve page metadata and search readiness (canonical/OG metadata, sitemap and robots guidance) using only business details already present, marking facts needing verification in the owner guide.
7. Write `brian.md` in plain language: explain the business, customer and dispatch flows, the commercial value, how revenue is earned, what the website can currently do, what needs a backend, and a practical next-step checklist.
8. Run the static site locally and inspect all pages and key interactions in a browser-capable way available in the environment; fix issues found. Do not push or deploy.

## Completion checks

- The static server starts and all site routes/assets load locally.
- The tour opens, advances, goes backward, skips and restarts; its role tracks are understandable.
- Booking validation, reference generation and WhatsApp preparation work, with a clear notice that data is not centrally stored.
- Demo actions remain visibly simulated and do not claim to contact customers, charge money, or locate riders.
- `brian.md` distinguishes current functions from proposed production capabilities and explains revenue without inventing financial results.

## Work completed

- Added the public platform-tour entry point and a responsive demo workspace with customer, business, rider and administrator views.
- Added three guided tour tracks with progress, previous/next, skip, restart-by-reopening, fictional sample labels and a personal-demo contact handoff.
- Expanded the delivery request form with email, recipient details, parcel type, scheduled collection and special instructions. Requests prepare a WhatsApp message and temporary reference; no personal details are stored in local storage or a server.
- Removed unverified sample prices, delivery windows, capacity limits and a follower-count claim from the public presentation. Dispatch is asked to confirm routes, price and availability.
- Added page metadata, canonical/Open Graph tags, `robots.txt`, `sitemap.xml`, a project README update and `brian.md`.
- Ran `node --check app.js`, served the project at `http://127.0.0.1:4173/`, checked all site routes and important assets over HTTP, and inspected desktop and mobile Firefox screenshots of the home, demo and open tour.

The current project remains a front-end demonstration. Server-side storage, authentication, real dispatch/rider workflows, online tracking, payments, messaging and reports require a backend and business-approved integrations.
