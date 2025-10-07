# Security Audit Checklist

- [ ] All user input is sanitized (HTML escaping)
- [ ] Rate limiting is enabled on all POST endpoints
- [ ] CORS headers are properly configured
- [ ] CSP headers are set
- [ ] HTTPS is enforced
- [ ] File uploads are validated (MIME type, size, content)
- [ ] Database queries use parameterized statements
- [ ] Secrets are in environment variables, not code
- [ ] Error messages don't leak sensitive info
- [ ] Session tokens (magic codes) are sufficiently random
- [ ] Report threshold prevents abuse
- [ ] Media URLs are served from separate domain
- [ ] No PII is logged
