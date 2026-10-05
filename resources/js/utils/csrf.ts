export function getCsrfToken(): string {
    const xsrfCookie = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('XSRF-TOKEN='))

    if (xsrfCookie) {
        return decodeURIComponent(xsrfCookie.slice('XSRF-TOKEN='.length))
    }

    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
}
