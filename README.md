<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/0aa6623b-2e61-4c9a-9e1d-74e5c55dc533

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## Roles (NGO & Admin)

Accounts, NGOs, documents and stories are persisted in `localStorage` (`kh_platform_v1`) — this is a front-end demo; swap `src/data/platform.ts` for a real API/backend before production (passwords are stored in plain text only for the demo).

| Role  | Demo login                                  | Lands on            |
|-------|---------------------------------------------|---------------------|
| Admin | admin@kindredhub.org / Admin@123            | Admin dashboard     |
| NGO   | ngo@helpinghands.org / Ngo@12345            | NGO dashboard       |
| NGO (pending review) | contact@sahyogtrust.org / Sahyog@12345 | NGO dashboard |
| Donor | aditya@example.com / Donor@123              | Impact feed         |

**NGO:** dashboard, document verification (upload 5 docs), public profile editor, impact stories list, create story.
**Admin:** dashboard stats, users list (remove), NGO list with details (remove / verify / revoke), document review queue (verify / reject with note).
Unverified NGOs are hidden from Explore, Map, Donate and the Impact Feed until the admin marks them verified.
