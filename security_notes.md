# Security Best Practices Implemented

This project follows strict security guidelines for authentication and session management.

## 1. Password Hashing (bcrypt)
**Why we do it**: Storing passwords in plain text is a critical vulnerability. If a database is leaked, attackers have immediate access to all user accounts.
**Implementation**: We use `bcrypt` with a work factor of 10 (`saltRounds = 10`). Bcrypt inherently implements salt generation and is specifically designed to be slow, making brute-force and rainbow-table attacks computationally expensive.

## 2. HTTP-Only Cookies for JWT Storage
**Why `httpOnly` cookies are preferred**: Storing JWTs in `localStorage` makes them accessible to client-side JavaScript. This exposes the tokens to Cross-Site Scripting (XSS) attacks, where malicious injected scripts can steal the tokens.
**Implementation**: By setting the `httpOnly: true` flag on our cookies, the browser ensures that client-side scripts (`document.cookie`) cannot access the token. We also use `SameSite: strict` to mitigate Cross-Site Request Forgery (CSRF) attacks, and `secure: true` (in production) to ensure the cookie is only sent over HTTPS.

## 3. JWT Security Pitfalls Avoided
- **Algorithm Confusion**: We strictly verify the signature using the `jsonwebtoken` library which defaults to `HS256` for symmetric keys.
- **Long Expirations**: JWTs are inherently stateless and difficult to revoke without complex infrastructure (like blacklists). To mitigate the impact of a stolen token, we enforce a short expiration (`expiresIn: '1h'`).
- **Sensitive Data in Payload**: The JWT payload is only Base64 encoded, not encrypted. We only store non-sensitive identifiers (like the user `id`) in the token.

## 4. Protected API Endpoints
All sensitive API endpoints (like `/api/auth/profile` and `/api/auth/dashboard`) are shielded behind a custom `protect` middleware. This middleware:
1. Extracts the token from the `httpOnly` cookie.
2. Verifies the signature and expiration.
3. Attaches the decoded user payload to the request object, strictly ensuring that only authenticated users can fetch protected data.

## 5. Protected React Routes
On the frontend, sensitive routes (Dashboard, Profile) are wrapped in a `ProtectedRoute` component. This component intercepts unauthenticated navigation attempts and automatically redirects users to the `/login` page.
