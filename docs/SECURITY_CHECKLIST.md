# Security Audit Checklist

- [x] All user input is sanitized (HTML escaping)
- [x] Rate limiting is enabled on all POST endpoints
- [ ] CORS headers are properly configured
- [ ] CSP headers are set
- [x] HTTPS is enforced
- [ ] File uploads are validated (MIME type, size, content)
- [x] Database queries use parameterized statements
- [x] Secrets are in environment variables, not code
- [x] Error messages don't leak sensitive info
- [x] Session tokens (magic codes) are sufficiently random
- [x] Report threshold prevents abuse
- [x] Media URLs are served from separate domain
- [x] No PII is logged