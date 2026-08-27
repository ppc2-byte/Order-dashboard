PENDING ORDERS DASHBOARD — Team-Shared App
==================================================

This folder contains everything needed to host the dashboard as a
shared link your whole team can open — and see the SAME, current
data — without anyone manually importing anything.

HOW THE SHARING WORKS
-------------------------------------------------------------
Every time someone opens the dashboard link, it automatically loads
the file at:

    data/pending_orders.xlsx

That's it — one fixed file, one fixed name, inside this same folder.
Your daily job is simply to REPLACE that one file each morning with
your latest export. Everyone who opens (or refreshes) the dashboard
after that automatically sees the new data. No one on the team needs
to touch the "Import Excel" button at all.

A sample file is already included at data/pending_orders.xlsx so the
dashboard works immediately once hosted.

DAILY UPDATE ROUTINE (once hosting is set up — see below)
-------------------------------------------------------------
1. Export/save your latest pending orders as an .xlsx file.
2. Rename it to exactly:  pending_orders.xlsx
3. Upload it to the SAME location as before, replacing the old one
   (exact steps depend on which hosting option you picked — see
   "HOSTING OPTIONS" below for the specific replace steps).
4. Done. Anyone who opens the dashboard link now (or clicks the
   "Refresh Data" button inside an already-open tab) sees today's
   numbers.

HOSTING OPTIONS
-------------------------------------------------------------

>>> GitHub Pages (recommended for daily updates — easiest to replace
    a single file each morning)
    1. Create a free account at github.com if you don't have one.
    2. Create a new repository (Public), e.g. "orders-dashboard".
    3. Upload ALL files and folders here (including the "data" folder
       with pending_orders.xlsx inside it) using "Add file" ->
       "Upload files" in the repo's web page.
    4. Go to Settings -> Pages -> under "Branch" choose "main" and
       "/ (root)" -> Save.
    5. Wait ~1 minute. Your link will be:
       https://yourusername.github.io/orders-dashboard/
    6. TO UPDATE DAILY: open the repo, click into the "data" folder,
       click "pending_orders.xlsx", click the pencil/upload icon, and
       upload your new file to replace it (or just drag-drop a file
       with the same name onto the folder page — GitHub will offer to
       replace it). Commit the change. Takes under a minute.

>>> Netlify Drop (fastest to set up, but re-uploading daily means
    re-dragging the WHOLE folder each time, not just one file)
    1. Go to https://app.netlify.com/drop
    2. Drag this whole folder onto the page — you get a live link.
    3. TO UPDATE DAILY: replace data/pending_orders.xlsx in your local
       copy of this folder, then drag the WHOLE folder onto the same
       Netlify Drop page again — it redeploys to the same link.

>>> Your own web server / company intranet / SharePoint site with
    static file hosting: copy all these files there; update the one
    file in "data/" each morning the same way you'd update any file
    on that server.

INSTALLING AS AN APP (OPTIONAL, PER PERSON)
-------------------------------------------------------------
Once hosted over HTTPS, anyone on the team can open the link and tap
"Install App" in the toolbar (or use their browser's own install
option) to add it to their home screen / desktop like a native app.
This is optional — the dashboard works the same in a normal browser
tab too.

IF SOMEONE ALSO WANTS TO LOAD THEIR OWN FILE TEMPORARILY
-------------------------------------------------------------
The "Import Excel" button still works for anyone who wants to
preview a different file on their own device — but this is temporary
and personal: the next time they open the dashboard, it will go back
to loading the shared team file from data/pending_orders.xlsx as
normal.

FILES IN THIS FOLDER
-------------------------------------------------------------
index.html                  - the dashboard itself
manifest.json                - makes it installable as an app
service-worker.js            - enables offline caching
icon-192.png, icon-512.png   - app icons
data/pending_orders.xlsx     - the shared data file - REPLACE THIS DAILY
