(() => {
  const root = document.getElementById('demo-view');
  if (!root) return;

  const key = 'onphone-demo-system-v1';
  const riders = ['Amina Sample Rider', 'Juma Sample Rider'];
  const statuses = ['Booking received', 'Confirmed', 'Rider assigned', 'Collected', 'In transit', 'Delivered', 'Delivery failed'];
  const seed = [
    { ref: 'DEMO-OP-1042', kind: 'customer', customer: 'Leah Sample', phone: '+254700000001', recipient: 'Maya Example', recipientPhone: '+254700000002', pickup: 'Westlands', dropoff: 'Nairobi CBD', service: 'Bike Rapid', packageType: 'Document', status: 'Booking received', rider: '', history: ['Sample booking received'] },
    { ref: 'DEMO-OP-1041', kind: 'business', customer: 'Acacia Online Shop (Demo)', phone: '+254700000003', recipient: 'Kito Example', recipientPhone: '+254700000004', pickup: 'Kilimani', dropoff: 'Upper Hill', service: 'Direct Same-Day', packageType: 'Small parcel', status: 'Confirmed', rider: '', history: ['Sample business request received', 'Sample request confirmed'] },
    { ref: 'DEMO-OP-1040', kind: 'business', customer: 'Acacia Online Shop (Demo)', phone: '+254700000003', recipient: 'Nia Example', recipientPhone: '+254700000005', pickup: 'CBD', dropoff: 'Parklands', service: 'Bike Rapid', packageType: 'Small parcel', status: 'Rider assigned', rider: riders[0], history: ['Sample business request received', 'Sample request confirmed', 'Assigned to ' + riders[0]] }
  ];
  const cloneSeed = () => seed.map(item => ({ ...item, history: [...item.history] }));
  let records;
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    records = Array.isArray(saved) ? saved : cloneSeed();
  } catch { records = cloneSeed(); }
  let activeRole = 'customer';
  let lastCreatedRef = '';
  let businessRows = 2;
  let pendingCsv = [];

  const escape = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const save = () => { try { localStorage.setItem(key, JSON.stringify(records)); } catch { /* The demo still works for this page view. */ } };
  const find = ref => records.find(item => item.ref.toLowerCase() === String(ref || '').trim().toLowerCase());
  const refCode = () => {
    let ref;
    do { ref = 'DEMO-OP-' + Math.random().toString(36).slice(2, 8).toUpperCase(); }
    while (records.some(item => item.ref === ref));
    return ref;
  };
  const services = () => ['Bike Rapid', 'Direct Same-Day', 'Van Secure', 'Business Contract'].map(name => `<option>${name}</option>`).join('');
  const addHistory = (item, note) => { item.history.push(note); item.updatedAt = new Date().toISOString(); };
  const freshRecord = (data, kind = 'customer') => ({
    ref: refCode(), kind, customer: data.customer || data.name || 'Demo customer', phone: data.phone || '+254700000099',
    recipient: data.recipient || data.recipientName || 'Demo recipient', recipientPhone: data.recipientPhone || '+254700000098',
    pickup: data.pickup, dropoff: data.dropoff, service: data.service || 'Bike Rapid', packageType: data.packageType || 'Small parcel',
    notes: data.notes || '', status: 'Booking received', rider: '', createdAt: new Date().toISOString(), history: ['Sample booking received']
  });
  const sorted = () => [...records].reverse();
  const table = rows => rows.length ? `<div class="demo-table-wrap"><table class="demo-table"><thead><tr><th>Reference</th><th>Customer</th><th>Pickup</th><th>Destination</th><th>Service</th><th>Status</th><th>Rider</th></tr></thead><tbody>${rows.map(item => `<tr><td><b>${escape(item.ref)}</b></td><td>${escape(item.customer)}</td><td>${escape(item.pickup)}</td><td>${escape(item.dropoff)}</td><td>${escape(item.service)}</td><td><span class="demo-status">${escape(item.status)}</span></td><td>${escape(item.rider || 'Unassigned')}</td></tr>`).join('')}</tbody></table></div>` : '<p class="demo-empty">No sample deliveries yet. Create a request to start the workflow.</p>';
  const metric = (label, value) => `<div class="demo-metric"><small>${label}</small><b>${value}</b></div>`;
  const orderFields = index => `<fieldset class="demo-order"><legend>Delivery ${index}</legend><div class="demo-form-grid"><label>Recipient name<input name="recipient" required placeholder="Example recipient"></label><label>Recipient phone<input name="recipientPhone" required type="tel" placeholder="+254700000000"></label><label>Pickup<input name="pickup" required placeholder="Area or landmark"></label><label>Destination<input name="dropoff" required placeholder="Area or landmark"></label><label>Package type<select name="packageType"><option>Document</option><option>Small parcel</option><option>Equipment or bulk freight</option></select></label><label>Service<select name="service">${services()}</select></label></div></fieldset>`;
  const trackCard = item => {
    if (!item) return '<div class="demo-alert">No sample delivery matches that reference. Check it and try again.</div>';
    const progress = item.status === 'Delivery failed' ? statuses.indexOf('In transit') : statuses.indexOf(item.status);
    return `<article class="demo-track-card"><div class="demo-track-head"><div><span class="eyebrow">SAMPLE TRACKING RECORD</span><h3>${escape(item.ref)}</h3></div><span class="demo-status">${escape(item.status)}</span></div><p><b>${escape(item.pickup)}</b> to <b>${escape(item.dropoff)}</b> · ${escape(item.service)}</p><p>Recipient: ${escape(item.recipient)} · Rider: ${escape(item.rider || 'Not assigned')}</p><ol class="demo-timeline">${statuses.slice(0, 6).map((status, index) => `<li class="${index <= progress ? 'done' : ''}"><span>${index + 1}</span>${status}</li>`).join('')}</ol>${item.status === 'Delivery failed' ? '<p class="demo-alert">This sample delivery did not complete. Dispatch follow-up is needed.</p>' : ''}<p class="form-note">Sample history: ${item.history.map(escape).join(' · ')}</p></article>`;
  };
  const riderJobs = rider => {
    const jobs = records.filter(item => item.rider === rider && !['Delivered', 'Delivery failed'].includes(item.status));
    if (!jobs.length) return '<p class="demo-empty">No active sample deliveries are assigned to this rider.</p>';
    return jobs.map(item => {
      const next = { 'Rider assigned': 'Collected', Collected: 'In transit', 'In transit': 'Delivered' }[item.status];
      return `<article class="demo-rider-job"><span class="eyebrow">${escape(item.ref)}</span><h3>${escape(item.pickup)} to ${escape(item.dropoff)}</h3><p>${escape(item.packageType)} · Recipient ${escape(item.recipient)} · ${escape(item.recipientPhone)}</p><p>Current status: <b>${escape(item.status)}</b></p><div class="demo-inline-actions">${next ? `<button type="button" class="btn btn-primary" data-rider-status="${escape(item.ref)}">Mark ${next.toLowerCase()}</button>` : ''}<button type="button" class="btn btn-outline" data-rider-fail="${escape(item.ref)}">Record delivery failed</button></div></article>`;
    }).join('');
  };

  function render(role = activeRole) {
    activeRole = role;
    document.querySelectorAll('[data-role]').forEach(button => button.classList.toggle('active', button.dataset.role === role));
    const recent = sorted();
    let html = '';
    if (role === 'customer') html = `<div class="demo-intro"><h3>Request one delivery</h3><p>Create a sample booking and send its reference to the dispatch view.</p></div><form id="demo-customer-form" class="demo-form"><div class="demo-form-grid"><label>Your name<input name="name" required placeholder="Demo sender"></label><label>Your phone<input name="phone" required type="tel" placeholder="+254700000000"></label><label>Recipient name<input name="recipientName" required placeholder="Example recipient"></label><label>Recipient phone<input name="recipientPhone" required type="tel" placeholder="+254700000000"></label><label>Pickup<input name="pickup" required placeholder="Area or landmark"></label><label>Destination<input name="dropoff" required placeholder="Area or landmark"></label><label>Package type<select name="packageType"><option>Document</option><option>Small parcel</option><option>Equipment or bulk freight</option></select></label><label>Service<select name="service">${services()}</select></label><label class="demo-full">Special instructions<textarea name="notes" placeholder="Optional sample note"></textarea></label></div><button class="btn btn-primary" type="submit">Create sample booking</button></form>${lastCreatedRef ? `<div class="demo-success">Sample request created. Reference: <b>${escape(lastCreatedRef)}</b>. Use Track a delivery to find it.</div>` : ''}<h3 class="demo-section-title">Recent sample requests</h3>${table(recent.slice(0, 5))}`;
    if (role === 'business') html = `<div class="demo-intro"><h3>Business bulk booking</h3><p>Prepare multiple deliveries together. Each order receives a sample reference. Demo business: Acacia Online Shop.</p></div><form id="demo-business-form" class="demo-form"><div id="business-order-rows">${Array.from({ length: businessRows }, (_, index) => orderFields(index + 1)).join('')}</div><div class="demo-inline-actions"><button class="btn btn-outline" type="button" id="business-add-row">Add another delivery</button><button class="btn btn-primary" type="submit">Submit sample deliveries</button></div></form><div class="demo-csv"><h3>Import sample orders from CSV</h3><p>Required columns: recipient, recipientPhone, pickup, dropoff, packageType, service. The file is read in this browser and is not uploaded.</p><a href="data:text/csv;charset=utf-8,recipient%2CrecipientPhone%2Cpickup%2Cdropoff%2CpackageType%2Cservice%0ASam%20Example%2C%2B254700000006%2CKilimani%2CWestlands%2CSmall%20parcel%2CBike%20Rapid" download="onphone-demo-orders.csv" class="text-link">Download CSV template</a><label class="demo-file">Choose CSV file<input id="demo-csv-file" type="file" accept=".csv,text/csv"></label><div id="demo-csv-preview"></div></div><h3 class="demo-section-title">Business sample deliveries</h3>${table(records.filter(item => item.kind === 'business'))}`;
    if (role === 'dispatch') html = `<div class="demo-intro"><h3>Review, confirm and assign</h3><p>Actions here update the same sample records shown to customers, riders and management. No real price is entered or charged.</p></div>${table(recent)}<div class="demo-dispatch-list">${recent.map(item => `<article class="demo-dispatch-row"><div><b>${escape(item.ref)}</b><span>${escape(item.pickup)} to ${escape(item.dropoff)}</span><span class="demo-status">${escape(item.status)}</span></div><label>Sample rider<select data-rider-for="${escape(item.ref)}"><option value="">Select sample rider</option>${riders.map(name => `<option ${item.rider === name ? 'selected' : ''}>${name}</option>`).join('')}</select></label><button type="button" class="btn btn-primary" data-dispatch-ref="${escape(item.ref)}" ${['Booking received', 'Confirmed'].includes(item.status) ? '' : 'disabled'}>${item.status === 'Booking received' ? 'Confirm request' : item.status === 'Confirmed' ? 'Assign rider' : 'No dispatch action'}</button></article>`).join('')}</div>`;
    if (role === 'rider') html = `<div class="demo-intro"><h3>Rider delivery list</h3><p>Choose a fictional rider and advance the status of jobs assigned to them.</p></div><label class="demo-rider-select">Sample rider<select id="active-demo-rider">${riders.map(name => `<option>${name}</option>`).join('')}</select></label><div id="rider-jobs">${riderJobs(riders[0])}</div>`;
    if (role === 'track') { const ref = new URLSearchParams(location.search).get('ref') || lastCreatedRef; html = `<div class="demo-intro"><h3>Track with a reference</h3><p>Look up a sample reference from the records in this browser.</p></div><form id="demo-track-form" class="demo-track-form"><label>Booking reference<input id="demo-track-ref" required placeholder="For example DEMO-OP-1042" value="${escape(ref)}"></label><button class="btn btn-primary" type="submit">Look up delivery</button></form><div id="demo-track-result">${ref ? trackCard(find(ref)) : ''}</div>`; }
    if (role === 'management') {
      const count = status => records.filter(item => item.status === status).length;
      html = `<div class="demo-intro"><h3>Sample operating overview</h3><p>These counts come from fictional records saved in this browser. No revenue or profit is shown.</p></div><div class="demo-dashboard">${metric('TOTAL SAMPLE DELIVERIES', records.length)}${metric('AWAITING DISPATCH', count('Booking received'))}${metric('ACTIVE / ASSIGNED', records.filter(item => ['Rider assigned', 'Collected', 'In transit'].includes(item.status)).length)}${metric('COMPLETED', count('Delivered'))}${metric('FAILED', count('Delivery failed'))}${metric('BUSINESS REQUESTS', records.filter(item => item.kind === 'business').length)}</div><h3 class="demo-section-title">Sample delivery ledger</h3>${table(recent)}`;
    }
    root.innerHTML = html;
    document.getElementById('demo-title').textContent = ({ customer: 'Customer booking', business: 'Business workspace', dispatch: 'Dispatch desk', rider: 'Rider workspace', track: 'Customer tracking', management: 'Management overview' })[role];
  }
  function persist() { save(); render(activeRole); }
  function createCustomer(event) {
    event.preventDefault(); const data = Object.fromEntries(new FormData(event.target)); const item = { ...freshRecord(data), notes: data.notes || '' };
    records.push(item); lastCreatedRef = item.ref; persist();
  }
  function createBusiness(event) {
    event.preventDefault(); const data = new FormData(event.target); const names = data.getAll('recipient');
    const items = names.map((name, index) => freshRecord({ customer: 'Acacia Online Shop (Demo)', phone: '+254700000003', recipient: name, recipientPhone: data.getAll('recipientPhone')[index], pickup: data.getAll('pickup')[index], dropoff: data.getAll('dropoff')[index], packageType: data.getAll('packageType')[index], service: data.getAll('service')[index] }, 'business'));
    records.push(...items); lastCreatedRef = items[0]?.ref || ''; businessRows = 2; persist();
  }
  function parseCsvLine(line) {
    const cells = []; let cell = '', quoted = false;
    for (let i = 0; i < line.length; i++) { const ch = line[i]; if (ch === '"' && line[i + 1] === '"' && quoted) { cell += '"'; i++; } else if (ch === '"') quoted = !quoted; else if (ch === ',' && !quoted) { cells.push(cell.trim()); cell = ''; } else cell += ch; }
    cells.push(cell.trim()); return cells;
  }
  function validateCsv(text) {
    const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter(line => line.trim());
    if (lines.length < 2) return { rows: [], errors: ['CSV needs a header and at least one delivery row.'] };
    const headers = parseCsvLine(lines[0]).map(value => value.toLowerCase()); const required = ['recipient', 'recipientphone', 'pickup', 'dropoff', 'packagetype', 'service'];
    const missing = required.filter(keyName => !headers.includes(keyName)); if (missing.length) return { rows: [], errors: ['Missing columns: ' + missing.join(', ')] };
    const rows = [], errors = [];
    lines.slice(1).forEach((line, index) => { const values = parseCsvLine(line); const row = Object.fromEntries(headers.map((keyName, i) => [keyName, values[i] || ''])); const empty = required.filter(keyName => !row[keyName]); if (empty.length) errors.push('Line ' + (index + 2) + ': missing ' + empty.join(', ')); else if (!['Bike Rapid', 'Direct Same-Day', 'Van Secure', 'Business Contract'].some(service => service.toLowerCase() === row.service.toLowerCase())) errors.push('Line ' + (index + 2) + ': unknown service ' + row.service); else rows.push({ recipient: row.recipient, recipientPhone: row.recipientphone, pickup: row.pickup, dropoff: row.dropoff, packageType: row.packagetype, service: row.service }); });
    return { rows, errors };
  }

  document.querySelectorAll('[data-role]').forEach(button => button.addEventListener('click', () => render(button.dataset.role)));
  root.addEventListener('submit', event => {
    if (event.target.id === 'demo-customer-form') createCustomer(event);
    if (event.target.id === 'demo-business-form') createBusiness(event);
    if (event.target.id === 'demo-track-form') { event.preventDefault(); const item = find(document.getElementById('demo-track-ref').value); document.getElementById('demo-track-result').innerHTML = trackCard(item); }
  });
  root.addEventListener('change', event => {
    if (event.target.id === 'active-demo-rider') document.getElementById('rider-jobs').innerHTML = riderJobs(event.target.value);
    if (event.target.id === 'demo-csv-file') {
      const file = event.target.files[0]; if (!file) return;
      const reader = new FileReader(); reader.onload = () => { const result = validateCsv(String(reader.result)); pendingCsv = result.rows; const preview = document.getElementById('demo-csv-preview'); preview.innerHTML = `<p>${result.rows.length} valid row(s), ${result.errors.length} issue(s).</p>${result.errors.map(error => `<div class="demo-alert">${escape(error)}</div>`).join('')}<button type="button" id="demo-csv-import" class="btn btn-primary" ${pendingCsv.length ? '' : 'disabled'}>Import valid sample rows</button>`; }; reader.readAsText(file);
    }
  });
  document.getElementById('reset-demo').addEventListener('click', () => { if (confirm('Reset fictional demo records saved in this browser?')) { records = cloneSeed(); lastCreatedRef = ''; businessRows = 2; pendingCsv = []; try { localStorage.removeItem(key); } catch { /* Ignore unavailable local storage. */ } render('customer'); } });
  root.addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    if (button.id === 'business-add-row') { const form = root.querySelector('#demo-business-form'); const names = ['recipient', 'recipientPhone', 'pickup', 'dropoff', 'packageType', 'service']; const values = Object.fromEntries(names.map(name => [name, [...form.querySelectorAll(`[name="${name}"]`)].map(input => input.value)])); businessRows++; render('business'); names.forEach(name => root.querySelectorAll(`[name="${name}"]`).forEach((input, index) => { if (values[name][index] !== undefined) input.value = values[name][index]; })); }
    if (button.id === 'demo-csv-import') { const created = pendingCsv.map(row => freshRecord({ customer: 'Acacia Online Shop (Demo)', phone: '+254700000003', ...row }, 'business')); records.push(...created); lastCreatedRef = created[0]?.ref || ''; pendingCsv = []; persist(); }
    if (button.dataset.dispatchRef) {
      const item = find(button.dataset.dispatchRef); if (!item) return;
      if (item.status === 'Booking received') { item.status = 'Confirmed'; addHistory(item, 'Sample quote confirmed by dispatch'); }
      else if (item.status === 'Confirmed') { const select = [...root.querySelectorAll('[data-rider-for]')].find(option => option.dataset.riderFor === item.ref); if (!select?.value) { alert('Choose a sample rider first.'); return; } item.rider = select.value; item.status = 'Rider assigned'; addHistory(item, 'Assigned to ' + item.rider); }
      persist();
    }
    if (button.dataset.riderStatus) { const item = find(button.dataset.riderStatus); const next = { 'Rider assigned': 'Collected', Collected: 'In transit', 'In transit': 'Delivered' }[item?.status]; if (item && next) { item.status = next; addHistory(item, 'Sample rider updated status to ' + next); persist(); } }
    if (button.dataset.riderFail) { const item = find(button.dataset.riderFail); if (item) { item.status = 'Delivery failed'; addHistory(item, 'Sample rider recorded delivery failure'); persist(); } }
    if (button.id === 'reset-demo' && confirm('Reset fictional demo records saved in this browser?')) { records = cloneSeed(); lastCreatedRef = ''; businessRows = 2; pendingCsv = []; try { localStorage.removeItem(key); } catch { /* Ignore unavailable local storage. */ } render('customer'); }
  });
  render('customer');
})();
