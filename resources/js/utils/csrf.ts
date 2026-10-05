export function getCsrfToken(): string {
    const xsrfCookie = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('XSRF-TOKEN='))

    const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''

    if (metaToken) {
        return metaToken
    }

    return xsrfCookie
        ? decodeURIComponent(xsrfCookie.slice('XSRF-TOKEN='.length))
        : ''
}

export async function refreshCsrfToken(): Promise<string> {
    try {
        const response = await fetch('/admin/media/csrf-token', {
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })

        const result = await response.json().catch(() => null)

        if (response.ok && typeof result?.token === 'string' && result.token) {
            document.querySelector('meta[name="csrf-token"]')?.setAttribute('content', result.token)
            return result.token
        }
    } catch {
        // Use the token already available in the page as a fallback.
    }

    return getCsrfToken()
}
