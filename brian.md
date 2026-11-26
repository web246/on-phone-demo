# On-Phone Express Courier: how the business and website fit together

## The business in plain language

On-Phone Express Courier moves documents, parcels, stock and other suitable goods for people and organisations in Nairobi. A customer has something at one place and needs it to reach someone at another. On-Phone matches the job to an appropriate delivery service, confirms the route and price, arranges collection, and completes the hand-off.

The four services described in the project are:

- **Bike Rapid:** documents, medicine when permitted, and smaller parcels.
- **Direct Same:** a dedicated point-to-point trip for one customer’s delivery.
- **Van Secure:** larger loads, equipment, bulk stock or goods needing suitable handling.
- **Business Contract:** planned or repeat routes arranged with a business.

The right vehicle, whether a particular item can be carried, where the company can serve, when it can collect, and the final price all need confirmation from dispatch. Medicine and other regulated or sensitive items also need the business to confirm the applicable rules and handling process.

## How On-Phone earns money

On-Phone earns delivery revenue when a customer pays for an accepted delivery. The company can serve both one-time customers and businesses that send deliveries repeatedly.

### One-time delivery revenue

An individual or shop requests a trip. Dispatch checks the pickup, destination, parcel, service and timing, then quotes the customer. If the customer accepts, On-Phone completes the delivery and records the amount due and the payment received.

### Repeat business revenue

An online shop, office, clinic or retailer may need deliveries every week or every day. On-Phone can discuss regular routes, service arrangements and volume pricing. If management approves an account, agreed invoicing terms may make it easier for the business to book regularly. Repeat orders can make demand more predictable and reduce the effort of finding a new customer for every job.

Any account rate, credit facility or monthly invoice arrangement must be agreed and approved by On-Phone management. The website does not grant credit or approve accounts by itself.

### What “revenue” means

Revenue is money charged for deliveries. It is not the same as profit. To understand profit, On-Phone must also record operating costs such as rider pay, fuel, vehicle maintenance, insurance, packaging, payment charges, administration and taxes. A dashboard that records delivery charges alone cannot tell the owner how much the business has earned after costs.

### A simple example, not a forecast

Suppose a business completes **10 paid deliveries in a day** at an **illustrative average charge of KES 500**. That would be KES 5,000 of gross delivery revenue for the day before costs. If 20 of those deliveries happened each working day for 22 days, the illustrative gross revenue would be KES 220,000 for that month. These are arithmetic examples only. KES 500, delivery volumes, working days and customer demand are not confirmed On-Phone prices or forecasts. Actual revenue depends on approved prices, completed work and successful collection of payment.

## The delivery flow

Here is the full journey a connected system is designed to support:

1. **A customer discovers On-Phone.** They may find the company through Google, a useful service page, a recommendation or social media.
2. **They choose a service and share the route.** The customer provides pickup and destination details, contact numbers, parcel information and preferred collection time.
3. **Dispatch reviews the request.** Staff check whether the route and parcel can be served, clarify missing details and confirm price and availability. A customer approves the quote before the job proceeds.
4. **The booking is confirmed.** A system creates a unique reference and saves the customer’s request in a shared, secure database. Dispatch can see what needs action.
5. **A rider is assigned.** Dispatch selects an available rider and shares only the details needed to do the job.
6. **The rider collects and updates the job.** The rider acknowledges the assignment, records collection, and updates progress using a phone. If delivery fails, the rider records why.
7. **The recipient receives the parcel.** The rider records the completion time and, where appropriate, a photo or signature as proof of delivery.
8. **The customer can check progress.** The sender uses the reference to see authorised status updates. This should be based on actual dispatch or rider updates, never invented GPS positions.
9. **Payment is recorded and reconciled.** Staff record cash, bank transfer, verified mobile money or an approved business invoice. A payment button click is not proof that money arrived.
10. **Management learns from the records.** The owner can review completed jobs, revenue recorded, balances, service demand and operating costs, then make better decisions.

The flow is useful because customer service, dispatch, riders and management can work from the same delivery record. It can reduce repeated calls and retyping, make hand-offs clearer and give the owner a better view of completed work and amounts still due.

## Why the website can help the business

The website is the front door of the operation. A visitor should be able to understand what On-Phone carries, who it serves, what details dispatch needs and how to contact the team. A good website can:

- Make it easier for someone already looking for a courier to start a conversation.
- Explain the difference between bike, dedicated, van and scheduled business services.
- Capture the route and parcel details dispatch needs for a useful quote.
- Encourage online shops and SMEs to ask about regular delivery arrangements.
- Give existing customers a convenient way to contact dispatch again.
- Support local search with accurate, useful Nairobi service information.

The site cannot guarantee search rankings or a number of new customers. It creates a clearer path from discovery to enquiry; the business still needs to respond promptly, quote accurately, deliver reliably, ask satisfied customers to return, and maintain an accurate Google Business Profile.

## What is working in this website now

This project is a static website made with HTML, CSS and browser JavaScript. It includes pages for home, services, coverage, booking, updates, contact and a demo operations workspace. It uses the existing logo and local courier photographs and has a mobile layout.

The public booking page validates fields in the browser and prepares a WhatsApp message containing the details. **The customer must still send the WhatsApp message; that request does not enter the demo operations workspace.**

The demo workspace is a separate, working simulation. You can create one customer request or several business requests, import sample orders from CSV, confirm a request as dispatch, assign a sample rider, advance rider statuses, look up a reference, and see counts in the management view. Those roles share fictional sample records saved in this browser's local storage. The reset button restores the starting examples. This is useful for demonstrating the intended workflow but it is not a secure multi-user service: it has no logins, company database, real customer data, messages, payment processing or GPS.

### Try the end-to-end demo

1. Open `platform.html` from the website and choose **Customer**. Create a sample delivery and keep the `DEMO-OP-...` reference.
2. Choose **Dispatch**. Confirm the new request, choose a sample rider, and assign it.
3. Choose **Rider**. Mark the assigned delivery collected, in transit and delivered.
4. Choose **Track a delivery** and look up the same reference. The status history should now show the rider updates.
5. Choose **Management** to see the sample booking and completion counts change.
6. Choose **Business** to prepare several deliveries at once or import the downloadable CSV template. The preview reports valid rows and errors before you import.
7. Use **Reset demo data** to restore the original fictional examples.

The demo records are shared only between these role views in the same browser. Clearing browser storage also clears the changes.

The quote area now asks the customer to request a route quote. This is deliberate: the project contained exact sample prices, delivery windows and weight limits, but the supplied business description did not confirm them. Dispatch should provide actual rates, timing, capacity, service area, business terms, address, phone numbers and hours before those claims are published as facts.

## What needs to be built before this is an operating system

The prompt’s backend architecture section ends mid-sentence in the supplied file. It proposes a frontend, Supabase/PostgreSQL, secure role-based authentication, file storage, hosting, payments and notifications, but the rest of that section was not included. The current project itself has no backend, database, login, admin dashboard, rider portal, bulk CSV booking, live customer tracking, payment gateway or automated messaging.

To make the full system real, the next stages would be:

1. Confirm the company’s actual service areas, approved rate rules, capacity, operating hours, restrictions, contact details, cancellation rules and business-account terms.
2. Choose and configure a backend and database. Supabase/PostgreSQL could fit the existing static frontend, but it requires an owner-controlled project, secure configuration and careful access policies.
3. Build and test role-based access for customer, business, rider and administrator. A business must see only its own records; a rider must see only assigned jobs; management-only actions must be protected.
4. Store bookings, status history, assignments, business approvals, rates and payment records centrally. Protect personal information and define retention and backup practices.
5. Add a dispatch workflow, rider mobile screens, real status updates, proof-of-delivery uploads, and a customer tracking lookup that reveals only authorised information.
6. Add bulk order import with a downloadable template, validation and clear error messages before creating jobs.
7. Integrate SMS, WhatsApp or email only through an approved provider and a server-side service. Do not put provider secrets in public browser code.
8. Integrate M-Pesa or another payment provider only after the business selects a provider and trusted server-side verification is implemented. Never treat a button click as a confirmed payment.
9. Build reports from actual records. Show recorded revenue separately from payments received, outstanding invoices and profit. Profit needs expense records.
10. Review security, privacy, access, error handling and backups; test the full customer-to-rider-to-payment journey; then deploy through an owner-approved hosting account.

## A practical Google Business Profile checklist

- Claim or verify the official business profile and make sure the owner controls it.
- Use the real business name, phone, hours and service area. Do not publish an address unless customers are genuinely served there.
- Select the closest accurate business category and describe actual courier services in plain language.
- Add real, current photographs of the office, riders, vehicles and delivery process, with permission.
- Keep the service list, phone, website link and hours consistent with the website.
- Ask real customers for honest reviews after completed jobs; never buy or invent reviews.
- Reply to reviews and questions in a professional, timely way.
- Check calls, direction requests and website visits periodically and compare them with real enquiries and completed orders.

## The main benefit for On-Phone

The strongest business case is the connection between **getting found, making it simple to request a delivery, serving customers consistently, and learning from real records**. The website can help convert interest into enquiries. A secure operations system can help turn those enquiries into well-coordinated deliveries, repeat business and reliable financial records. Together, they give On-Phone more opportunities to win work and a better way to manage that work as the business grows.
