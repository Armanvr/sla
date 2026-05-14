import { useLocation } from 'preact-iso'
import { NAV_ITEMS } from './nav-items'

export function SideNav() {
  const { url } = useLocation()

  return (
    <aside class="sla-sidenav">
      {NAV_ITEMS.map((item) => {
        const active = url === item.href || (item.href !== '/' && url.startsWith(item.href))
        return (
          <a
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 16px',
              fontFamily: 'var(--sla-font-hud)',
              fontSize: 'var(--sla-text-xs)',
              letterSpacing: 'var(--sla-ls-wider)',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: active ? 'var(--sla-ember)' : 'var(--sla-text-muted)',
              borderLeft: active ? '2px solid var(--sla-ember)' : '2px solid transparent',
              background: active ? 'rgba(194, 94, 28, 0.06)' : 'transparent',
              transition: 'color 0.15s, border-color 0.15s, background 0.15s',
            }}
          >
            <span style={{ fontSize: 14, lineHeight: 1, opacity: active ? 1 : 0.5 }}>{item.icon}</span>
            {item.label}
          </a>
        )
      })}
    </aside>
  )
}
