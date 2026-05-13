# scripts/wp/

Small Node scripts for editing iaypaa.org via the WordPress REST API.

## Setup

Credentials live in `.env.local` at the repo root (gitignored):

```
WP_BASE_URL=https://iaypaa.org
WP_USERNAME=<wp-username>
WP_APP_PASSWORD=<24-char application password from wp-admin/profile.php>
```

To rotate: revoke at `https://iaypaa.org/wp-admin/profile.php` → Application Passwords, generate a new one, update `.env.local`.

## Usage

```bash
node scripts/wp/list-pages.mjs        # read-only inventory
node scripts/wp/<edit-script>.mjs     # dry run — prints what WOULD change
node scripts/wp/<edit-script>.mjs --apply   # actually writes to iaypaa.org
```

**Convention**: every write script defaults to dry-run. The `--apply` flag is required to send the change. No script writes to the live site without explicit invocation.
